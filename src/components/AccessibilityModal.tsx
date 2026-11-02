import React from 'react';
import { useAudioReader } from '../context/AudioReaderContext';
import { DiSanItem, TabKey, Language } from '../types/heritage';
import { formatSpeechRateLabel } from '../utils/speechUtils';
import {
  Volume2,
  VolumeX,
  Pause,
  Play,
  Square,
  FastForward,
  Rewind,
  Gauge,
  Sliders,
  Type,
  Eye,
  Keyboard,
  CheckCircle2,
  X,
  BookOpen,
  ShieldAlert,
  Scale,
  Sparkles,
  HelpCircle,
  Headphones
} from 'lucide-react';

interface AccessibilityModalProps {
  records: DiSanItem[];
  activeTab: TabKey;
  onNavigateTab: (tab: TabKey) => void;
  onReadCurrentPage: () => void;
}

export const AccessibilityModal: React.FC<AccessibilityModalProps> = ({
  records,
  activeTab,
  onNavigateTab,
  onReadCurrentPage
}) => {
  const {
    isSpeaking,
    isPaused,
    currentText,
    currentTitle,
    rate,
    setRate,
    pitch,
    setPitch,
    pause,
    resume,
    stop,
    speak,
    testVoice,
    currentLang,
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
    queue,
    currentQueueIndex,
    playQueue,
    playNextInQueue,
    playPrevInQueue
  } = useAudioReader();

  if (!isAccessibilityCenterOpen) return null;

  // Start reading all 16 heritage records sequentially
  const handleReadEntireRecordsQueue = () => {
    const queueItems = records.map((rec, index) => {
      const isEn = currentLang === 'en' && rec.en;
      const title = isEn ? rec.en!.ten_chinh_thuc : rec.ten_chinh_thuc;
      const text = isEn
        ? `Record number ${index + 1} of ${records.length}. Title: ${rec.en!.ten_chinh_thuc}. Area: ${rec.en!.dia_phuong}. Classification: ${rec.en!.loai_hinh}. Significance: ${rec.en!.mo_ta_dac_trung}. Verification Source: ${rec.en!.nguon_tu_lieu}.`
        : `Hồ sơ số ${index + 1} trên ${records.length}. Tên chính thức: ${rec.ten_chinh_thuc}. Địa phương: ${rec.dia_phuong}. Loại hình: ${rec.loai_hinh}. Đặc trưng di sản: ${rec.mo_ta_dac_trung}. Nguồn tư liệu kiểm chứng: ${rec.nguon_tu_lieu}.`;
      return {
        id: rec.id,
        title,
        text,
        meta: rec.dia_phuong
      };
    });

    playQueue(queueItems, 0);
  };

  // Preset topic scripts
  const handleReadRitualsSummary = () => {
    const text = currentLang === 'en'
      ? 'Standard ritual practices in Mother Goddess worship include 8 steps: Step 1 Sanctuary preparation. Step 2 Summoning ritual. Step 3 Incense offering. Step 4 Trance descent of the Three Realms Goddesses. Step 5 Quan Lon mandarins. Step 6 Holy Princesses. Step 7 Holy Princes and Little Maidens. Step 8 Final Thanksgiving and altar closure.'
      : 'Quy chuẩn thực hành nghi lễ thờ Mẫu gồm 8 bước tuần tự: Bước 1 Chuẩn bị đàn tràng và y phục nghiêm trang. Bước 2 Phát tấu thỉnh Phật Thánh. Bước 3 Thỉnh chuông dâng hương. Bước 4 Tráng bóng Tam Tòa Thánh Mẫu. Bước 5 Hầu hàng Quan Lớn có công dựng nước. Bước 6 Hầu hàng Chầu Bà và Cô Bé. Bước 7 Hầu hàng Cậu Bé. Bước 8 Tạ lễ Hoàn đàn và phát lộc bình an.';
    speak(text, currentLang === 'en' ? 'Standard 8-step Ritual' : 'Quy chuẩn 8 bước một buổi hầu đồng');
  };

  const handleReadDistinctionSummary = () => {
    const text = currentLang === 'en'
      ? 'Five danger signs of commercialized deviation to avoid: Number 1: Threatening worshippers with bad destiny to extort money. Number 2: Demanding tens of millions of dong for trance rituals. Number 3: Throwing large polymer cash causing violent scrambles. Number 4: Vulgar, erotic dance gestures contradicting tradition. Number 5: Superstitious fortune-telling and fake spirit channels.'
      : 'Cảnh báo 5 dấu hiệu biến tướng và trục lợi tâm linh cần bài trừ: Dấu hiệu số 1: Dọa dẫm căn quả, ép buộc làm lễ cắt âm giải hạn tiền triệu. Dấu hiệu số 2: Hét giá khóa lễ, hầu đồng hàng chục đến hàng trăm triệu đồng. Dấu hiệu số 3: Rải tiền polyme mệnh giá lớn tạo cảnh chen lấn, giẫm đạp nơi thánh điện. Dấu hiệu số 4: Múa may uốn éo dung tục, phản cảm, xuyên tạc phong cách truyền thống. Dấu hiệu số 5: Bói toán mê tín dị đoan, buôn thần bán thánh, tự xưng nhập cốt lừa đảo.';
    speak(text, currentLang === 'en' ? 'Five Deviation Warning Signs' : 'Cảnh báo 5 dấu hiệu biến tướng');
  };

  const handleReadLegalSummary = () => {
    const text = currentLang === 'en'
      ? 'Legal statutes of the Socialist Republic of Vietnam: Article 5 of the 2016 Law on Belief and Religion strictly prohibits taking advantage of religious activities for profit, fraud, or damaging public order. Government Decree 38 of 2021 imposes administrative fines from 5 to 10 million dong and confiscates all illegal revenue.'
      : 'Quy định pháp luật Nhà nước Việt Nam: Điều 5 Luật Tín ngưỡng, tôn giáo 2016 nghiêm cấm hành vi lợi dụng tín ngưỡng, tôn giáo để trục lợi, tuyên truyền mê tín dị đoan và vi phạm pháp luật. Nghị định số 38 năm 2021 của Chính phủ quy định phạt tiền từ 5 đến 10 triệu đồng đối với hành vi lợi dụng tín ngưỡng trục lợi, đồng thời buộc nộp lại toàn bộ số lợi bất hợp pháp.';
    speak(text, currentLang === 'en' ? 'Legal Framework' : 'Quy định Pháp luật Nhà nước');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="accessibility-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
    >
      <div 
        className={`w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all duration-200 border-4 ${
          highContrast 
            ? 'bg-black text-amber-300 border-amber-400 ring-4 ring-amber-500/50' 
            : 'bg-[#21110b] text-amber-50 border-amber-600/80 ring-2 ring-black/60'
        }`}
      >
        {/* Header Ribbon */}
        <div className={`p-4 sm:p-6 border-b flex items-start justify-between gap-4 ${
          highContrast ? 'bg-amber-950/60 border-amber-500' : 'bg-[#32170f] border-amber-800/80'
        }`}>
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500 text-red-950 shadow-md flex-shrink-0 mt-0.5">
              <Headphones className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 text-red-950">
                  Hỗ trợ tiếp cận • Accessibility
                </span>
                <span className="text-xs text-amber-300/80 font-medium hidden sm:inline">
                  (Tiếng Việt & English)
                </span>
              </div>
              <h2 id="accessibility-modal-title" className="text-xl sm:text-2xl font-bold font-serif-culture text-amber-200">
                Chế độ đọc cho Người cao tuổi & Khiếm thị
              </h2>
              <p className="text-xs sm:text-sm text-amber-100/80 mt-1 max-w-2xl">
                Công cụ hỗ trợ chuyên dụng: giọng đọc tiếng Việt chuẩn, đọc to rõ ràng từng hồ sơ, phóng to cỡ chữ, tương phản cao và phím tắt điều hướng bàn phím.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsAccessibilityCenterOpen(false)}
            className="p-2 rounded-xl bg-black/40 hover:bg-black/60 text-amber-300 hover:text-white border border-amber-600/60 transition-colors flex-shrink-0"
            title="Đóng bảng điều khiển (Phím Esc)"
            aria-label="Đóng bảng điều khiển"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
          
          {/* 1. Live Audio Player & Speech Monitor */}
          <div className={`p-4 sm:p-5 rounded-2xl border-2 ${
            highContrast ? 'bg-zinc-950 border-amber-400' : 'bg-black/40 border-amber-700/60'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-800/40">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${isSpeaking ? 'bg-emerald-500 text-black animate-pulse' : 'bg-amber-900/40 text-amber-400'}`}>
                  {isSpeaking ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </div>
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-amber-400 block">
                    {isSpeaking ? (isPaused ? 'Đang tạm dừng' : 'Đang phát âm thanh') : 'Sẵn sàng đọc'}
                  </span>
                  <span className="text-base sm:text-lg font-bold text-amber-100">
                    {currentTitle || 'Chưa chọn nội dung phát'}
                  </span>
                </div>
              </div>

              {/* Core Playback Control Buttons */}
              <div className="flex items-center gap-2">
                {isSpeaking ? (
                  <>
                    {isPaused ? (
                      <button
                        type="button"
                        onClick={resume}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm shadow-md transition-transform active:scale-95"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>Tiếp tục</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={pause}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-red-950 font-bold text-sm shadow-md transition-transform active:scale-95"
                      >
                        <Pause className="w-4 h-4 fill-current" />
                        <span>Tạm dừng</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={stop}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-700 hover:bg-red-600 text-white font-bold text-sm shadow-md transition-transform active:scale-95"
                    >
                      <Square className="w-4 h-4 fill-current" />
                      <span>Dừng</span>
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={onReadCurrentPage}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-red-950 font-bold text-sm shadow-md transition-transform active:scale-95"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Đọc trang này</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={testVoice}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-black/40 hover:bg-black/60 text-amber-200 border border-amber-600/50 text-xs font-semibold"
                  title="Nghe câu chào thử giọng tiếng Việt"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Thử giọng</span>
                </button>
              </div>
            </div>

            {/* Live Read Text Transcript Display */}
            {isSpeaking && currentText && (
              <div className="mt-3.5 pt-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300/80 block mb-1">
                  Nội dung đang được đọc thành tiếng:
                </span>
                <div 
                  tabIndex={0}
                  aria-live="polite"
                  className={`p-3 rounded-xl border text-sm sm:text-base leading-relaxed max-h-32 overflow-y-auto select-text font-serif-culture ${
                    highContrast
                      ? 'bg-black text-amber-200 border-amber-400'
                      : 'bg-black/50 text-amber-100 border-amber-700/50'
                  }`}
                >
                  {currentText}
                </div>
              </div>
            )}

            {/* Queue Controls if sequential reading active */}
            {queue.length > 0 && (
              <div className="mt-3 pt-3 border-t border-amber-800/40 flex items-center justify-between gap-2 text-xs">
                <span className="text-amber-300 font-medium">
                  Danh sách đọc: Mục {currentQueueIndex + 1} / {queue.length}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={playPrevInQueue}
                    disabled={currentQueueIndex <= 0}
                    className="px-2.5 py-1 rounded bg-black/40 hover:bg-black/60 disabled:opacity-40 text-amber-200 flex items-center gap-1 font-semibold"
                  >
                    <Rewind className="w-3.5 h-3.5" />
                    <span>Trước</span>
                  </button>
                  <button
                    type="button"
                    onClick={playNextInQueue}
                    disabled={currentQueueIndex >= queue.length - 1}
                    className="px-2.5 py-1 rounded bg-black/40 hover:bg-black/60 disabled:opacity-40 text-amber-200 flex items-center gap-1 font-semibold"
                  >
                    <span>Tiếp</span>
                    <FastForward className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 2. Reading Speed Settings - Specifically tailored for the Elderly */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-2xl border ${
              highContrast ? 'bg-zinc-950 border-amber-400' : 'bg-black/30 border-amber-800/60'
            }`}>
              <div className="flex items-center gap-2 mb-2.5">
                <Gauge className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-sm sm:text-base text-amber-200">
                  Tốc độ đọc (Dành cho Người cao tuổi)
                </h3>
              </div>
              <p className="text-xs text-amber-200/70 mb-3">
                Người cao tuổi nên chọn <strong>0.75x hoặc 0.85x</strong> để nghe từng từ ngữ rõ ràng, truyền cảm.
              </p>

              <div className="grid grid-cols-2 gap-2 mb-3">
                {[
                  { val: 0.75, label: '0.75x - Rất chậm', sub: 'Dễ nghe nhất' },
                  { val: 0.85, label: '0.85x - Chậm rãi', sub: 'Khuyên dùng' },
                  { val: 1.0, label: '1.0x - Chuẩn', sub: 'Tốc độ thường' },
                  { val: 1.25, label: '1.25x - Nhanh', sub: 'Nghe nhanh' },
                ].map(opt => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => setRate(opt.val)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      rate === opt.val
                        ? 'bg-amber-400 text-red-950 border-amber-300 font-bold shadow-md'
                        : 'bg-black/40 text-amber-100 border-amber-700/50 hover:bg-black/60'
                    }`}
                  >
                    <div className="text-xs font-bold">{opt.label}</div>
                    <div className={`text-[10px] ${rate === opt.val ? 'text-red-950/80' : 'text-amber-300/70'}`}>
                      {opt.sub}
                    </div>
                  </button>
                ))}
              </div>

              <div className="text-[11px] text-amber-300/90 font-medium">
                Tốc độ hiện tại: <span className="text-amber-200 font-bold">{formatSpeechRateLabel(rate, currentLang)}</span>
              </div>
            </div>

            {/* 3. Visual Text Size & High Contrast Mode */}
            <div className={`p-4 rounded-2xl border ${
              highContrast ? 'bg-zinc-950 border-amber-400' : 'bg-black/30 border-amber-800/60'
            }`}>
              <div className="flex items-center gap-2 mb-2.5">
                <Eye className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-sm sm:text-base text-amber-200">
                  Thị giác & Kích thước chữ hiển thị
                </h3>
              </div>
              <p className="text-xs text-amber-200/70 mb-3">
                Hỗ trợ người mắt kém hoặc người cao tuổi đọc báo và xem hồ sơ to rõ hơn.
              </p>

              {/* Text Size Switcher */}
              <div className="mb-3">
                <span className="text-xs font-semibold text-amber-300 block mb-1.5 flex items-center gap-1.5">
                  <Type className="w-4 h-4" /> Cỡ chữ toàn trang web:
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'normal', label: 'Chuẩn', scale: '100%' },
                    { id: 'large', label: 'Lớn', scale: '115%' },
                    { id: 'xlarge', label: 'Rất lớn', scale: '130%' },
                  ].map(sz => (
                    <button
                      key={sz.id}
                      type="button"
                      onClick={() => setTextSizeMode(sz.id as any)}
                      className={`p-2 rounded-xl text-center border text-xs font-bold transition-all ${
                        textSizeMode === sz.id
                          ? 'bg-amber-400 text-red-950 border-amber-300 shadow-md'
                          : 'bg-black/40 text-amber-100 border-amber-700/50 hover:bg-black/60'
                      }`}
                    >
                      <div>{sz.label}</div>
                      <div className="text-[10px] opacity-80">{sz.scale}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* High Contrast Toggle */}
              <div>
                <button
                  type="button"
                  onClick={() => setHighContrast(!highContrast)}
                  className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-xs font-bold transition-all ${
                    highContrast
                      ? 'bg-amber-400 text-red-950 border-amber-300'
                      : 'bg-black/40 text-amber-200 border-amber-700/50 hover:bg-black/60'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Sliders className="w-4 h-4" />
                    <span>Chế độ Tương phản cao (Nền tối chữ vàng đậm)</span>
                  </span>
                  <span>{highContrast ? 'BẬT ✓' : 'TẮT'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* 4. Vietnamese Voice Selector */}
          <div className={`p-4 rounded-2xl border ${
            highContrast ? 'bg-zinc-950 border-amber-400' : 'bg-black/30 border-amber-800/60'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-sm sm:text-base text-amber-200">
                  Bộ đọc Tiếng Việt (`vi-VN`)
                </h3>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-semibold self-start sm:self-auto">
                {vietnameseVoices.length > 0 
                  ? `Tìm thấy ${vietnameseVoices.length} giọng đọc Tiếng Việt` 
                  : 'Sử dụng bộ đọc Tiếng Việt mặc định hệ thống'}
              </span>
            </div>

            {vietnameseVoices.length > 0 ? (
              <div className="space-y-1.5 mt-2.5">
                <label className="text-xs text-amber-300 font-medium block">
                  Chọn giọng đọc phát thanh:
                </label>
                <select
                  value={selectedVoiceUri || ''}
                  onChange={(e) => setSelectedVoiceUri(e.target.value || null)}
                  className="w-full p-2.5 rounded-xl bg-black/60 text-amber-100 border border-amber-600/60 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-400 font-medium"
                >
                  <option value="">Giọng đọc tự động tối ưu nhất (Khuyên dùng)</option>
                  {vietnameseVoices.map((v) => (
                    <option key={v.voiceURI} value={v.voiceURI}>
                      {v.name} ({v.lang}) {v.localService ? '• Ngoại tuyến' : '• Trực tuyến'}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <p className="text-xs text-amber-200/80 mt-1">
                Trình duyệt sẽ tự động phát âm bằng mã ngôn ngữ tiếng Việt (<strong>vi-VN</strong>). Mẹo: Để có chất lượng tốt nhất, người dùng có thể cài đặt thêm gói "Google Tiếng Việt" hoặc "Microsoft HoaiMy" trong cài đặt hệ điều hành.
              </p>
            )}
          </div>

          {/* 5. Pre-curated Spoken Playlists */}
          <div className={`p-4 rounded-2xl border ${
            highContrast ? 'bg-zinc-950 border-amber-400' : 'bg-black/30 border-amber-800/60'
          }`}>
            <h3 className="font-bold text-sm sm:text-base text-amber-200 mb-2 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              <span>Chủ đề nghe nhanh (Không cần nhìn màn hình)</span>
            </h3>
            <p className="text-xs text-amber-200/70 mb-3">
              Nhấp vào một trong các chuyên đề dưới đây để trợ lý phát thanh đọc trọn vẹn nội dung:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              <button
                type="button"
                onClick={handleReadEntireRecordsQueue}
                className="p-3 rounded-xl bg-amber-900/40 hover:bg-amber-800/60 border border-amber-600/50 text-left transition-all group"
              >
                <div className="flex items-center gap-1.5 text-amber-300 font-bold text-xs mb-1">
                  <BookOpen className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>16 Hồ sơ Di sản</span>
                </div>
                <div className="text-[11px] text-amber-100/70 leading-relaxed">
                  Đọc lần lượt từng hồ sơ chuẩn mực từ Nam Định, Hà Nam đến Huế.
                </div>
              </button>

              <button
                type="button"
                onClick={handleReadRitualsSummary}
                className="p-3 rounded-xl bg-amber-900/40 hover:bg-amber-800/60 border border-amber-600/50 text-left transition-all group"
              >
                <div className="flex items-center gap-1.5 text-amber-300 font-bold text-xs mb-1">
                  <Sparkles className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>8 Bước Hầu đồng</span>
                </div>
                <div className="text-[11px] text-amber-100/70 leading-relaxed">
                  Trình tự chuẩn mực từ Chuẩn bị đàn tràng đến Tạ lễ Hoàn đàn.
                </div>
              </button>

              <button
                type="button"
                onClick={handleReadDistinctionSummary}
                className="p-3 rounded-xl bg-amber-900/40 hover:bg-amber-800/60 border border-amber-600/50 text-left transition-all group"
              >
                <div className="flex items-center gap-1.5 text-amber-300 font-bold text-xs mb-1">
                  <ShieldAlert className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>5 Cảnh báo Biến tướng</span>
                </div>
                <div className="text-[11px] text-amber-100/70 leading-relaxed">
                  Nhận diện thủ đoạn dọa căn quả, hét giá tiền triệu, rải tiền lộn xộn.
                </div>
              </button>

              <button
                type="button"
                onClick={handleReadLegalSummary}
                className="p-3 rounded-xl bg-amber-900/40 hover:bg-amber-800/60 border border-amber-600/50 text-left transition-all group"
              >
                <div className="flex items-center gap-1.5 text-amber-300 font-bold text-xs mb-1">
                  <Scale className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>Quy định Pháp luật</span>
                </div>
                <div className="text-[11px] text-amber-100/70 leading-relaxed">
                  Điều 5 Luật Tín ngưỡng 2016 và mức xử phạt theo Nghị định 38.
                </div>
              </button>
            </div>
          </div>

          {/* 6. Keyboard Shortcuts Guide for Visually Impaired Visitors */}
          <div className="p-3.5 rounded-2xl bg-black/40 border border-amber-800/40 text-xs text-amber-200/90">
            <div className="flex items-center gap-2 font-bold text-amber-300 mb-1.5">
              <Keyboard className="w-4 h-4 text-amber-400" />
              <span>Phím tắt hỗ trợ người khiếm thị & người dùng bàn phím:</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <div><kbd className="px-1.5 py-0.5 rounded bg-black border border-amber-600 font-mono text-amber-300">Space</kbd>: Tạm dừng / Đọc tiếp</div>
              <div><kbd className="px-1.5 py-0.5 rounded bg-black border border-amber-600 font-mono text-amber-300">Esc</kbd>: Dừng đọc ngay</div>
              <div><kbd className="px-1.5 py-0.5 rounded bg-black border border-amber-600 font-mono text-amber-300">Alt + V</kbd>: Mở / Đóng bảng này</div>
              <div><kbd className="px-1.5 py-0.5 rounded bg-black border border-amber-600 font-mono text-amber-300">→</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-black border border-amber-600 font-mono text-amber-300">←</kbd>: Bài tiếp / Bài trước</div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className={`p-4 border-t flex flex-wrap items-center justify-between gap-3 ${
          highContrast ? 'bg-amber-950/60 border-amber-500' : 'bg-[#32170f] border-amber-800/80'
        }`}>
          <div className="text-xs text-amber-300/80">
            Cổng thông tin Thực hành Tín ngưỡng Thờ Mẫu Tam Phủ • Chuẩn mực di sản nhân loại
          </div>
          <button
            type="button"
            onClick={() => setIsAccessibilityCenterOpen(false)}
            className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-red-950 font-bold text-sm shadow-md transition-colors"
          >
            Đóng bảng hỗ trợ (Xong)
          </button>
        </div>
      </div>
    </div>
  );
};
