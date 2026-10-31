import React from 'react';
import { useAudioReader } from '../context/AudioReaderContext';
import { translations } from '../i18n/translations';
import { 
  Volume2, 
  VolumeX, 
  Pause, 
  Play, 
  Square, 
  Gauge, 
  Sparkles,
  Accessibility
} from 'lucide-react';

interface AudioPlayerBarProps {
  onReadCurrentPage: () => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({ onReadCurrentPage }) => {
  const { 
    isSpeaking, 
    isPaused, 
    currentTitle, 
    rate, 
    setRate, 
    pause, 
    resume, 
    stop, 
    isSupported, 
    currentLang 
  } = useAudioReader();

  const t = translations[currentLang].audioBar;

  if (!isSupported) {
    return null;
  }

  return (
    <aside 
      aria-label={t.title}
      className={`fixed bottom-4 right-4 z-40 transition-all duration-300 ${
        isSpeaking ? 'scale-100' : 'scale-95'
      }`}
    >
      <div className="bg-[#24120c]/95 text-amber-100 backdrop-blur-md border-2 border-amber-500/80 rounded-2xl shadow-2xl p-3 sm:p-4 max-w-sm sm:max-w-md flex flex-col gap-2.5 ring-2 ring-black/40">
        {/* Top Header Row of Audio Bar */}
        <div className="flex items-center justify-between gap-3 border-b border-amber-800/60 pb-2">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg ${isSpeaking ? 'bg-amber-500 text-red-950 animate-bounce' : 'bg-amber-900/60 text-amber-300'}`}>
              <Accessibility className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wide block">
                {t.title}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-amber-100/90 truncate max-w-[200px] sm:max-w-[240px]">
                {isSpeaking ? (
                  <>
                    <span className="flex gap-0.5 items-end h-3">
                      <span className="w-1 bg-emerald-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-2"></span>
                      <span className="w-1 bg-emerald-400 rounded-full animate-[pulse_0.4s_ease-in-out_infinite] h-3"></span>
                      <span className="w-1 bg-emerald-400 rounded-full animate-[pulse_0.7s_ease-in-out_infinite] h-1.5"></span>
                    </span>
                    <strong className="text-emerald-300 font-semibold truncate">{currentTitle}</strong>
                  </>
                ) : (
                  <span className="text-amber-200/60 italic">{t.ready}</span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Read Page Button */}
          {!isSpeaking && (
            <button
              type="button"
              onClick={onReadCurrentPage}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-red-950 font-bold text-xs shadow-xs transition-colors flex-shrink-0"
              title={t.readPage}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{t.readPage}</span>
            </button>
          )}
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between gap-2 pt-0.5">
          {/* Play / Pause / Stop controls */}
          <div className="flex items-center gap-1.5">
            {isSpeaking ? (
              <>
                {isPaused ? (
                  <button
                    type="button"
                    onClick={resume}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs"
                    title={t.resume}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{t.resume}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={pause}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-xs"
                    title={t.pause}
                  >
                    <Pause className="w-3.5 h-3.5 fill-current" />
                    <span>{t.pause}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={stop}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-800/90 hover:bg-red-700 text-white font-bold text-xs shadow-xs"
                  title={t.stop}
                >
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>{t.stop}</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={onReadCurrentPage}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-900/60 hover:bg-amber-800 text-amber-200 text-xs font-medium"
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Bấm vào thẻ hoặc đây để nghe</span>
              </button>
            )}
          </div>

          {/* Speed Selector */}
          <div className="flex items-center gap-1 text-[11px] text-amber-200/80">
            <Gauge className="w-3 h-3 text-amber-400" />
            <div className="inline-flex rounded-lg bg-black/40 p-0.5 border border-amber-800/60">
              <button
                type="button"
                onClick={() => setRate(0.8)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  rate === 0.8 ? 'bg-amber-400 text-red-950' : 'text-amber-200 hover:text-white'
                }`}
                title="Tốc độ chậm cho người cao tuổi"
              >
                0.8x
              </button>
              <button
                type="button"
                onClick={() => setRate(1.0)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  rate === 1.0 ? 'bg-amber-400 text-red-950' : 'text-amber-200 hover:text-white'
                }`}
                title="Tốc độ đọc tiêu chuẩn"
              >
                1.0x
              </button>
              <button
                type="button"
                onClick={() => setRate(1.2)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  rate === 1.2 ? 'bg-amber-400 text-red-950' : 'text-amber-200 hover:text-white'
                }`}
                title="Tốc độ đọc nhanh"
              >
                1.2x
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
