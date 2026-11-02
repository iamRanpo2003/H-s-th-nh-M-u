import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { Language, DiSanItem } from '../types/heritage';
import { 
  cleanTextForSpeech, 
  clampSpeechRate, 
  getVoiceLangTag, 
  selectBestVoice,
  filterVietnameseVoices,
  buildRecordSpeechScript
} from '../utils/speechUtils';

export interface ReadingQueueItem {
  id: string;
  title: string;
  text: string;
  meta?: string;
}

export type TextSizeMode = 'normal' | 'large' | 'xlarge';

interface AudioReaderContextType {
  isSpeaking: boolean;
  isPaused: boolean;
  currentText: string;
  currentTitle: string;
  rate: number;
  setRate: (rate: number) => void;
  pitch: number;
  setPitch: (pitch: number) => void;
  speak: (text: string, title?: string, langOverride?: Language) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  isSupported: boolean;
  currentLang: Language;
  setCurrentLang: (lang: Language) => void;

  // Accessibility & Elderly specific features
  textSizeMode: TextSizeMode;
  setTextSizeMode: (mode: TextSizeMode) => void;
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
  isAccessibilityCenterOpen: boolean;
  setIsAccessibilityCenterOpen: (open: boolean) => void;
  
  // Voice management
  availableVoices: SpeechSynthesisVoice[];
  vietnameseVoices: SpeechSynthesisVoice[];
  selectedVoiceUri: string | null;
  setSelectedVoiceUri: (uri: string | null) => void;
  testVoice: () => void;

  // Sequential reading queue (Elderly / Visually Impaired reading playlist)
  queue: ReadingQueueItem[];
  currentQueueIndex: number;
  playQueue: (items: ReadingQueueItem[], startIndex?: number) => void;
  playNextInQueue: () => void;
  playPrevInQueue: () => void;
  speakRecord: (record: DiSanItem, lang?: Language) => void;
  activeReadingRecordId: string | null;
}

const AudioReaderContext = createContext<AudioReaderContextType | undefined>(undefined);

export const AudioReaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [currentText, setCurrentText] = useState<string>('');
  const [currentTitle, setCurrentTitle] = useState<string>('');
  const [rate, setRateState] = useState<number>(0.85); // Default to comfortable, gentle 0.85x for elderly
  const [pitch, setPitchState] = useState<number>(1.0);
  const [currentLang, setCurrentLang] = useState<Language>('vi');
  const [isSupported, setIsSupported] = useState<boolean>(true);

  // Accessibility controls
  const [textSizeMode, setTextSizeMode] = useState<TextSizeMode>('normal');
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [isAccessibilityCenterOpen, setIsAccessibilityCenterOpen] = useState<boolean>(false);

  // Voices
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [vietnameseVoices, setVietnameseVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceUri, setSelectedVoiceUri] = useState<string | null>(null);

  // Sequential queue
  const [queue, setQueue] = useState<ReadingQueueItem[]>([]);
  const [currentQueueIndex, setCurrentQueueIndex] = useState<number>(-1);
  const [activeReadingRecordId, setActiveReadingRecordId] = useState<string | null>(null);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Apply high contrast & font size class to document body
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      
      // Text size classes
      root.classList.remove('text-size-normal', 'text-size-large', 'text-size-xlarge');
      root.classList.add(`text-size-${textSizeMode}`);
      
      if (textSizeMode === 'large') {
        root.style.fontSize = '17.5px';
      } else if (textSizeMode === 'xlarge') {
        root.style.fontSize = '19.5px';
      } else {
        root.style.fontSize = '16px';
      }

      // High contrast
      if (highContrast) {
        root.classList.add('a11y-high-contrast');
      } else {
        root.classList.remove('a11y-high-contrast');
      }
    }
  }, [textSizeMode, highContrast]);

  // Load browser voices
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;

      const loadVoices = () => {
        const v = synthRef.current?.getVoices() || [];
        voicesRef.current = v;
        setAvailableVoices(v);
        const vi = filterVietnameseVoices(v);
        setVietnameseVoices(vi);
      };

      loadVoices();
      if (synthRef.current?.onvoiceschanged !== undefined) {
        synthRef.current.onvoiceschanged = loadVoices;
      }
    } else {
      setIsSupported(false);
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const stop = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsSpeaking(false);
    setIsPaused(false);
    setCurrentText('');
    setCurrentTitle('');
    setActiveReadingRecordId(null);
  }, []);

  const pause = useCallback(() => {
    if (synthRef.current && isSpeaking && !isPaused) {
      synthRef.current.pause();
      setIsPaused(true);
    }
  }, [isSpeaking, isPaused]);

  const resume = useCallback(() => {
    if (synthRef.current && isPaused) {
      synthRef.current.resume();
      setIsPaused(false);
    }
  }, [isPaused]);

  const setRate = useCallback((newRate: number) => {
    const clamped = clampSpeechRate(newRate);
    setRateState(clamped);
    if (isSpeaking && currentText) {
      // Re-trigger speak with new rate
      stop();
    }
  }, [isSpeaking, currentText, stop]);

  const setPitch = useCallback((newPitch: number) => {
    const clamped = Math.min(Math.max(newPitch, 0.5), 1.5);
    setPitchState(clamped);
  }, []);

  // Base speak function
  const speak = useCallback((text: string, title?: string, langOverride?: Language, onComplete?: () => void) => {
    if (!synthRef.current) return;

    const cleaned = cleanTextForSpeech(text);
    if (!cleaned) return;

    // Cancel current speech if any
    synthRef.current.cancel();

    const targetLang = langOverride || currentLang;
    const utterance = new SpeechSynthesisUtterance(cleaned);
    utteranceRef.current = utterance;

    utterance.lang = getVoiceLangTag(targetLang);
    utterance.rate = rate;
    utterance.pitch = pitch;

    const bestVoice = selectBestVoice(voicesRef.current, targetLang, selectedVoiceUri);
    if (bestVoice) {
      utterance.voice = bestVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
      setCurrentText(cleaned);
      setCurrentTitle(title || (targetLang === 'en' ? 'Heritage Content' : 'Nội dung Di sản'));
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setCurrentText('');
      setCurrentTitle('');
      if (onComplete) {
        onComplete();
      }
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis notice:', e);
      setIsSpeaking(false);
      setIsPaused(false);
      setCurrentText('');
      setCurrentTitle('');
    };

    synthRef.current.speak(utterance);
  }, [currentLang, rate, pitch, selectedVoiceUri]);

  // Read a single heritage dossier in a warm, respectful tone
  const speakRecord = useCallback((record: DiSanItem, langOverride?: Language) => {
    const targetLang = langOverride || currentLang;
    const script = buildRecordSpeechScript(record, targetLang);
    setActiveReadingRecordId(record.id);
    speak(script.text, script.title, targetLang, () => {
      setActiveReadingRecordId(null);
    });
  }, [currentLang, speak]);

  // Queue playback
  const playQueueIndex = useCallback((index: number, queueToUse?: ReadingQueueItem[]) => {
    const activeQueue = queueToUse || queue;
    if (index < 0 || index >= activeQueue.length) {
      stop();
      setCurrentQueueIndex(-1);
      return;
    }

    setCurrentQueueIndex(index);
    const item = activeQueue[index];
    setActiveReadingRecordId(item.id);

    speak(item.text, item.title, currentLang, () => {
      // Auto advance to next item in queue
      if (index + 1 < activeQueue.length) {
        playQueueIndex(index + 1, activeQueue);
      } else {
        setActiveReadingRecordId(null);
        setCurrentQueueIndex(-1);
      }
    });
  }, [queue, currentLang, speak, stop]);

  const playQueue = useCallback((items: ReadingQueueItem[], startIndex = 0) => {
    if (!items || items.length === 0) return;
    setQueue(items);
    playQueueIndex(startIndex, items);
  }, [playQueueIndex]);

  const playNextInQueue = useCallback(() => {
    if (queue.length > 0 && currentQueueIndex + 1 < queue.length) {
      playQueueIndex(currentQueueIndex + 1);
    }
  }, [queue, currentQueueIndex, playQueueIndex]);

  const playPrevInQueue = useCallback(() => {
    if (queue.length > 0 && currentQueueIndex - 1 >= 0) {
      playQueueIndex(currentQueueIndex - 1);
    }
  }, [queue, currentQueueIndex, playQueueIndex]);

  // Test voice greeting
  const testVoice = useCallback(() => {
    const greeting = currentLang === 'en'
      ? 'Hello. This is the text to speech accessibility voice for the Mother Goddess Worship Heritage Portal.'
      : 'Kính chào Quý vị. Đây là giọng đọc tiếng Việt hỗ trợ người cao tuổi và người khiếm thị trên Cổng thông tin Di sản Thờ Mẫu Tam Phủ.';
    speak(greeting, currentLang === 'en' ? 'Voice Test' : 'Thử nghiệm giọng đọc');
  }, [currentLang, speak]);

  // Global Keyboard Shortcuts for Elderly & Visually Impaired Visitors
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input, textarea, or contentEditable
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      // Spacebar: Toggle Play/Pause when speech is active or paused
      if (e.code === 'Space' && (isSpeaking || isPaused)) {
        e.preventDefault();
        if (isPaused) {
          resume();
        } else {
          pause();
        }
        return;
      }

      // Escape: Stop reading immediately
      if (e.key === 'Escape' && isSpeaking) {
        e.preventDefault();
        stop();
        return;
      }

      // Alt + V or Alt + A: Open/Close Accessibility Center
      if (e.altKey && (e.key.toLowerCase() === 'v' || e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        setIsAccessibilityCenterOpen(prev => !prev);
        return;
      }

      // ArrowRight: Next in reading queue
      if (e.code === 'ArrowRight' && isSpeaking && queue.length > 0) {
        e.preventDefault();
        playNextInQueue();
        return;
      }

      // ArrowLeft: Prev in reading queue
      if (e.code === 'ArrowLeft' && isSpeaking && queue.length > 0) {
        e.preventDefault();
        playPrevInQueue();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSpeaking, isPaused, resume, pause, stop, queue.length, playNextInQueue, playPrevInQueue]);

  return (
    <AudioReaderContext.Provider
      value={{
        isSpeaking,
        isPaused,
        currentText,
        currentTitle,
        rate,
        setRate,
        pitch,
        setPitch,
        speak,
        pause,
        resume,
        stop,
        isSupported,
        currentLang,
        setCurrentLang,

        textSizeMode,
        setTextSizeMode,
        highContrast,
        setHighContrast,
        isAccessibilityCenterOpen,
        setIsAccessibilityCenterOpen,

        availableVoices,
        vietnameseVoices,
        selectedVoiceUri,
        setSelectedVoiceUri,
        testVoice,

        queue,
        currentQueueIndex,
        playQueue,
        playNextInQueue,
        playPrevInQueue,
        speakRecord,
        activeReadingRecordId,
      }}
    >
      {children}
    </AudioReaderContext.Provider>
  );
};

export const useAudioReader = () => {
  const context = useContext(AudioReaderContext);
  if (!context) {
    throw new Error('useAudioReader must be used within an AudioReaderProvider');
  }
  return context;
};
