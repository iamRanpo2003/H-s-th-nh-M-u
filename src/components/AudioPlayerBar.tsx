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
  Accessibility,
  Sliders,
  FastForward,
  Rewind,
  Eye
} from 'lucide-react';

interface AudioPlayerBarProps {
  onReadCurrentPage: () => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({ onReadCurrentPage }) => {
  const { 
    isSpeaking, 
    isPaused, 
    currentTitle, 
    currentText,
    rate, 
    setRate, 
    pause, 
    resume, 
    stop, 
    isSupported, 
    currentLang,
    setIsAccessibilityCenterOpen,
    highContrast,
    queue,
    currentQueueIndex,
    playNextInQueue,
    playPrevInQueue
  } = useAudioReader();

  const t = translations[currentLang].audioBar;

  if (!isSupported) {
    return null;
  }

  return (
    <aside 
      aria-label="Thanh điều khiển đọc giọng nói hỗ trợ tiếp cận"
      className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-40 max-w-[calc(100vw-1.5rem)] sm:max-w-md transition-all duration-300"
    >
      <div 
        className={`backdrop-blur-md rounded-2xl shadow-2xl p-3 sm:p-4 flex flex-col gap-2.5 transition-all ${
          highContrast
            ? 'bg-black text-amber-300 border-2 border-amber-400 ring-2 ring-amber-500'
            : 'bg-[#24120c]/95 text-amber-100 border-2 border-amber-500/80 ring-2 ring-black/40'
        }`}
      >
        {/* Top Header Row of Audio Bar */}
        <div className="flex items-center justify-between gap-3 border-b border-amber-800/60 pb-2">
          <button
            type="button"
            onClick={() => setIsAccessibilityCenterOpen(true)}
            className="flex items-center gap-2 text-left group hover:opacity-90 transition-opacity"
            title="Mở Bảng Chế độ đọc cho Người cao tuổi & Khiếm thị (Phím tắt: Alt + V)"
          >
            <div className={`p-1.5 rounded-lg flex-shrink-0 transition-transform group-hover:scale-110 ${
              isSpeaking ? 'bg-amber-400 text-red-950 animate-bounce' : 'bg-amber-900/60 text-amber-300 border border-amber-600/40'
            }`}>
              <Accessibility className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wide">
                  Chế độ Đọc Trợ Năng
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold hidden sm:inline">
                  Alt+V
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-amber-100/90 truncate max-w-[190px] sm:max-w-[220px]">
                {isSpeaking ? (
                  <>
                    <span className="flex gap-0.5 items-end h-3 flex-shrink-0">
                      <span className="w-1 bg-emerald-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-2"></span>
                      <span className="w-1 bg-emerald-400 rounded-full animate-[pulse_0.4s_ease-in-out_infinite] h-3"></span>
                      <span className="w-1 bg-emerald-400 rounded-full animate-[pulse_0.7s_ease-in-out_infinite] h-1.5"></span>
                    </span>
                    <strong className="text-emerald-300 font-semibold truncate">{currentTitle}</strong>
                  </>
                ) : (
                  <span className="text-amber-200/70 italic text-[11px]">Sẵn sàng đọc (Người cao tuổi & Khiếm thị)</span>
                )}
              </div>
            </div>
          </button>

          {/* Quick Hub Open Button */}
          <button
            type="button"
            onClick={() => setIsAccessibilityCenterOpen(true)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-red-950 font-bold text-xs shadow-xs transition-colors flex-shrink-0"
            title="Mở Bảng cài đặt cỡ chữ, tốc độ và danh sách phát"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cài đặt</span>
          </button>
        </div>

        {/* Text Snippet if Reading */}
        {isSpeaking && currentText && (
          <div 
            tabIndex={0}
            aria-live="polite"
            className="text-[11px] sm:text-xs text-amber-200/90 line-clamp-2 italic bg-black/30 p-1.5 rounded-lg border border-amber-800/40"
          >
            "{currentText}"
          </div>
        )}

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
                    title="Tiếp tục đọc (Phím Space)"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Tiếp</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={pause}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-xs"
                    title="Tạm dừng đọc (Phím Space)"
                  >
                    <Pause className="w-3.5 h-3.5 fill-current" />
                    <span>Dừng</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={stop}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-800/90 hover:bg-red-700 text-white font-bold text-xs shadow-xs"
                  title="Dừng phát thanh hoàn toàn (Phím Esc)"
                >
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>Tắt</span>
                </button>

                {/* Queue buttons if playlist is running */}
                {queue.length > 0 && (
                  <div className="flex items-center gap-0.5 ml-1">
                    <button
                      type="button"
                      onClick={playPrevInQueue}
                      disabled={currentQueueIndex <= 0}
                      className="p-1 rounded bg-black/40 text-amber-200 hover:bg-black/60 disabled:opacity-40"
                      title="Mục trước"
                    >
                      <Rewind className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={playNextInQueue}
                      disabled={currentQueueIndex >= queue.length - 1}
                      className="p-1 rounded bg-black/40 text-amber-200 hover:bg-black/60 disabled:opacity-40"
                      title="Mục sau"
                    >
                      <FastForward className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <button
                type="button"
                onClick={onReadCurrentPage}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-900/60 hover:bg-amber-800 text-amber-200 text-xs font-semibold border border-amber-600/40"
                title="Bắt đầu đọc toàn bộ nội dung trang hiện tại"
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Đọc trang này</span>
              </button>
            )}
          </div>

          {/* Speed Selector Buttons */}
          <div className="flex items-center gap-1 text-[11px] text-amber-200/80">
            <Gauge className="w-3.5 h-3.5 text-amber-400" />
            <div className="inline-flex rounded-lg bg-black/40 p-0.5 border border-amber-800/60">
              <button
                type="button"
                onClick={() => setRate(0.75)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  rate === 0.75 ? 'bg-amber-400 text-red-950 shadow-xs' : 'text-amber-200 hover:text-white'
                }`}
                title="Tốc độ 0.75x: Rất chậm, dễ nghe cho người lớn tuổi"
              >
                0.75x
              </button>
              <button
                type="button"
                onClick={() => setRate(0.85)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  rate === 0.85 ? 'bg-amber-400 text-red-950 shadow-xs' : 'text-amber-200 hover:text-white'
                }`}
                title="Tốc độ 0.85x: Chậm rãi truyền cảm"
              >
                0.85x
              </button>
              <button
                type="button"
                onClick={() => setRate(1.0)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  rate === 1.0 ? 'bg-amber-400 text-red-950 shadow-xs' : 'text-amber-200 hover:text-white'
                }`}
                title="Tốc độ 1.0x: Chuẩn mực"
              >
                1.0x
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
