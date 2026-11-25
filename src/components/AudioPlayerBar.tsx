import React, { useState, useEffect } from 'react';
import { useAudioReader } from '../context/AudioReaderContext';
import {
  Volume2,
  Pause,
  Play,
  Square,
  Gauge,
  Accessibility,
  Sliders,
  FastForward,
  Rewind,
  ChevronDown,
  ChevronUp,
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
    setIsAccessibilityCenterOpen,
    highContrast,
    queue,
    currentQueueIndex,
    playNextInQueue,
    playPrevInQueue,
  } = useAudioReader();

  const [isMinimized, setIsMinimized] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );

  // Automatically expand if playback starts so controls remain accessible
  useEffect(() => {
    if (isSpeaking) {
      setIsMinimized(false);
    }
  }, [isSpeaking]);

  if (!isSupported) {
    return null;
  }

  return (
    <aside
      aria-label="Thanh điều khiển đọc giọng nói hỗ trợ tiếp cận"
      className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-40 max-w-[calc(100vw-1.5rem)] sm:max-w-md transition-all duration-300"
    >
      <div
        className={`backdrop-blur-md rounded-2xl shadow-2xl p-2.5 sm:p-4 flex flex-col gap-2 transition-all ${
          highContrast
            ? 'bg-black text-amber-300 border-2 border-amber-400 ring-2 ring-amber-500'
            : 'bg-[#24120c]/95 text-amber-100 border-2 border-amber-500/80 ring-2 ring-black/40'
        }`}
      >
        {/* Top Header Row of Audio Bar */}
        <div className="flex items-center justify-between gap-2 min-w-0">
          <button
            type="button"
            onClick={() => setIsAccessibilityCenterOpen(true)}
            className="flex items-center gap-2 text-left group hover:opacity-90 transition-opacity min-h-[44px] min-w-0 flex-1"
            title="Mở Bảng Chế độ đọc cho Người cao tuổi & Khiếm thị (Phím tắt: Alt + V)"
          >
            <div
              className={`p-2 rounded-lg flex-shrink-0 transition-transform group-hover:scale-110 ${
                isSpeaking
                  ? 'bg-amber-400 text-red-950 animate-bounce'
                  : 'bg-amber-900/60 text-amber-300 border border-amber-600/40'
              }`}
            >
              <Accessibility className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wide truncate">
                  Đọc Trợ Năng
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-amber-100/90 truncate">
                {isSpeaking ? (
                  <strong className="text-emerald-300 font-semibold truncate">{currentTitle}</strong>
                ) : (
                  <span className="text-amber-200/80 truncate">Sẵn sàng đọc tiếng Việt</span>
                )}
              </div>
            </div>
          </button>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              type="button"
              onClick={() => setIsAccessibilityCenterOpen(true)}
              className="inline-flex items-center gap-1 px-3 min-h-[44px] rounded-xl bg-amber-400 hover:bg-amber-300 text-red-950 font-bold text-sm shadow-xs transition-colors"
              title="Mở Bảng cài đặt cỡ chữ, tốc độ và danh sách phát"
            >
              <Sliders className="w-4 h-4" />
              <span className="hidden sm:inline">Cài đặt</span>
            </button>

            <button
              type="button"
              onClick={() => setIsMinimized((prev) => !prev)}
              aria-expanded={!isMinimized}
              aria-label={isMinimized ? 'Mở rộng thanh đọc trợ năng' : 'Thu gọn thanh đọc trợ năng'}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-black/40 hover:bg-black/60 text-amber-200 border border-amber-600/40"
              title={isMinimized ? 'Mở rộng' : 'Thu gọn'}
            >
              {isMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Text Snippet if Reading */}
            {isSpeaking && currentText && (
              <div
                tabIndex={0}
                aria-live="polite"
                className="text-sm text-amber-200/90 line-clamp-2 italic bg-black/30 p-2 rounded-lg border border-amber-800/40"
              >
                &ldquo;{currentText}&rdquo;
              </div>
            )}

            {/* Controls Row - wraps cleanly at 360px */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1.5 border-t border-amber-800/60">
              <div className="flex flex-wrap items-center gap-1.5">
                {isSpeaking ? (
                  <>
                    {isPaused ? (
                      <button
                        type="button"
                        onClick={resume}
                        className="inline-flex items-center gap-1 px-3 min-h-[44px] rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xs"
                        title="Tiếp tục đọc (Phím Space)"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>Tiếp</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={pause}
                        className="inline-flex items-center gap-1 px-3 min-h-[44px] rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm shadow-xs"
                        title="Tạm dừng đọc (Phím Space)"
                      >
                        <Pause className="w-4 h-4 fill-current" />
                        <span>Dừng</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={stop}
                      className="inline-flex items-center gap-1 px-3 min-h-[44px] rounded-xl bg-red-800/90 hover:bg-red-700 text-white font-bold text-sm shadow-xs"
                      title="Dừng phát thanh hoàn toàn (Phím Esc)"
                    >
                      <Square className="w-4 h-4 fill-current" />
                      <span>Tắt</span>
                    </button>

                    {queue.length > 0 && (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={playPrevInQueue}
                          disabled={currentQueueIndex <= 0}
                          className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-black/40 text-amber-200 hover:bg-black/60 disabled:opacity-40"
                          title="Mục trước"
                        >
                          <Rewind className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={playNextInQueue}
                          disabled={currentQueueIndex >= queue.length - 1}
                          className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-black/40 text-amber-200 hover:bg-black/60 disabled:opacity-40"
                          title="Mục sau"
                        >
                          <FastForward className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={onReadCurrentPage}
                    className="inline-flex items-center gap-1.5 px-3 min-h-[44px] rounded-xl bg-amber-900/60 hover:bg-amber-800 text-amber-200 text-sm font-semibold border border-amber-600/40"
                    title="Bắt đầu đọc toàn bộ nội dung trang hiện tại"
                  >
                    <Volume2 className="w-4 h-4 text-amber-400" />
                    <span>Đọc trang</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1 text-xs text-amber-200/80">
                <Gauge className="w-4 h-4 text-amber-400 hidden sm:inline" />
                <div className="inline-flex rounded-xl bg-black/40 p-0.5 border border-amber-800/60">
                  <button
                    type="button"
                    onClick={() => setRate(0.75)}
                    className={`px-2 min-h-[44px] rounded-lg text-xs font-bold ${
                      rate === 0.75 ? 'bg-amber-400 text-red-950 shadow-xs' : 'text-amber-200 hover:text-white'
                    }`}
                    title="Tốc độ 0.75x: Rất chậm, dễ nghe cho người lớn tuổi"
                  >
                    0.75x
                  </button>
                  <button
                    type="button"
                    onClick={() => setRate(0.85)}
                    className={`px-2 min-h-[44px] rounded-lg text-xs font-bold ${
                      rate === 0.85 ? 'bg-amber-400 text-red-950 shadow-xs' : 'text-amber-200 hover:text-white'
                    }`}
                    title="Tốc độ 0.85x: Chậm rãi truyền cảm"
                  >
                    0.85x
                  </button>
                  <button
                    type="button"
                    onClick={() => setRate(1.0)}
                    className={`px-2 min-h-[44px] rounded-lg text-xs font-bold ${
                      rate === 1.0 ? 'bg-amber-400 text-red-950 shadow-xs' : 'text-amber-200 hover:text-white'
                    }`}
                    title="Tốc độ 1.0x: Chuẩn mực"
                  >
                    1.0x
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};
