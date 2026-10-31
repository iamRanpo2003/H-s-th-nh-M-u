import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { Language } from '../types/heritage';
import { cleanTextForSpeech, clampSpeechRate, getVoiceLangTag, selectBestVoice } from '../utils/speechUtils';

interface AudioReaderContextType {
  isSpeaking: boolean;
  isPaused: boolean;
  currentText: string;
  currentTitle: string;
  rate: number;
  setRate: (rate: number) => void;
  speak: (text: string, title?: string, langOverride?: Language) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  isSupported: boolean;
  currentLang: Language;
  setCurrentLang: (lang: Language) => void;
}

const AudioReaderContext = createContext<AudioReaderContextType | undefined>(undefined);

export const AudioReaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [currentText, setCurrentText] = useState<string>('');
  const [currentTitle, setCurrentTitle] = useState<string>('');
  const [rate, setRateState] = useState<number>(1.0);
  const [currentLang, setCurrentLang] = useState<Language>('vi');
  const [isSupported, setIsSupported] = useState<boolean>(true);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;

      const loadVoices = () => {
        voicesRef.current = synthRef.current?.getVoices() || [];
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
      // Re-trigger speak with new rate from current position or restart
      stop();
    }
  }, [isSpeaking, currentText, stop]);

  const speak = useCallback((text: string, title?: string, langOverride?: Language) => {
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

    const bestVoice = selectBestVoice(voicesRef.current, targetLang);
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
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis notice:', e);
      setIsSpeaking(false);
      setIsPaused(false);
      setCurrentText('');
      setCurrentTitle('');
    };

    synthRef.current.speak(utterance);
  }, [currentLang, rate]);

  return (
    <AudioReaderContext.Provider
      value={{
        isSpeaking,
        isPaused,
        currentText,
        currentTitle,
        rate,
        setRate,
        speak,
        pause,
        resume,
        stop,
        isSupported,
        currentLang,
        setCurrentLang,
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
