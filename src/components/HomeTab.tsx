import React, { useState, useMemo, useRef } from 'react';
import { DiSanItem, TabKey, Language } from '../types/heritage';
import { translations, recordTranslationsEn } from '../i18n/translations';
import { useAudioReader } from '../context/AudioReaderContext';
import {
  isMissingSource,
  formatCitation,
  filterHeritage,
  extractUniqueLocations,
  extractUniqueStatuses,
} from '../utils/heritageUtils';
import {
  Search,
  Filter,
  Copy,
  Check,
  AlertTriangle,
  MapPin,
  Award,
  Plus,
  Eye,
  X,
  FileJson,
  Layers,
  BookOpen,
  Volume2,
  VolumeX,
  Download,
  ArrowDown,
} from 'lucide-react';
import { ExportDataModal } from './ExportDataModal';

interface HomeTabProps {
  records: DiSanItem[];
  currentLang: Language;
  onNavigateTab: (tab: TabKey) => void;
  onAddRecord: (record: DiSanItem) => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  records,
  currentLang,
  onAddRecord,
}) => {
  const {
    isSpeaking,
    stop,
    currentTitle,
    speakRecord,
    activeReadingRecordId,
    setIsAccessibilityCenterOpen,
  } = useAudioReader();
  const t = translations[currentLang].home;

  const repoSectionRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [selectedLocation, setSelectedLocation] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [inspectRecord, setInspectRecord] = useState<DiSanItem | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [exportTargetRecord, setExportTargetRecord] = useState<DiSanItem | null>(null);

  const [newForm, setNewForm] = useState<Omit<DiSanItem, 'id'>>({
    ten_chinh_thuc: '',
    ten_goi_khac: '',
    loai_hinh: 'Tập quán xã hội và tín ngưỡng',
    dia_phuong: '',
    mo_ta_dac_trung: '',
    nghe_nhan_tieu_bieu: '',
    tinh_trang_ghi_danh: 'Di sản cấp Tỉnh / Địa phương',
    nguon_tu_lieu: '',
  });

  const locations = useMemo(() => extractUniqueLocations(records), [records]);
  const statuses = useMemo(() => extractUniqueStatuses(records), [records]);

  const filteredRecords = useMemo(() => {
    return filterHeritage(records, {
      diaPhuong: selectedLocation,
      tinhTrang: selectedStatus,
      search: searchQuery,
    });
  }, [records, selectedLocation, selectedStatus, searchQuery]);

  const handleStartNow = () => {
    repoSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 350);
  };

  const handleCopyCitation = (item: DiSanItem) => {
    const text = formatCitation(item);
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  const handleSpeakCard = (item: DiSanItem) => {
    const en = recordTranslationsEn[item.id];
    const isEn = currentLang === 'en' && en;
    const title = isEn ? en.ten_chinh_thuc : item.ten_chinh_thuc;

    if (isSpeaking && (currentTitle === title || activeReadingRecordId === item.id)) {
      stop();
    } else {
      speakRecord(item, currentLang);
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newForm.ten_chinh_thuc.trim()) {
      setFormError(
        currentLang === 'en'
          ? 'Please enter the official heritage name before saving.'
          : 'Vui lòng nhập tên chính thức của di sản trước khi lưu.'
      );
      return;
    }
    setFormError(null);
    const item: DiSanItem = {
      id: `ds-${Date.now()}`,
      ...newForm,
    };
    onAddRecord(item);
    setShowAddModal(false);
    setNewForm({
      ten_chinh_thuc: '',
      ten_goi_khac: '',
      loai_hinh: 'Tập quán xã hội và tín ngưỡng',
      dia_phuong: '',
      mo_ta_dac_trung: '',
      nghe_nhan_tieu_bieu: '',
      tinh_trang_ghi_danh: 'Di sản cấp Tỉnh / Địa phương',
      nguon_tu_lieu: '',
    });
  };

  return (
    <div className="space-y-10">
      {/* First-Time Visitor Hero: Clear Title + Target Audience Sentence + Single Immediate CTA */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#741515] via-[#8c1c1c] to-[#470a0a] text-white p-6 sm:p-10 shadow-xl border-2 border-amber-500/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 max-w-3xl space-y-5">
          <h1 className="text-2xl sm:text-4xl font-extrabold font-serif-culture tracking-wide text-amber-100 leading-tight">
            {t.heroTitle}
          </h1>

          <p className="text-amber-100/95 text-base sm:text-lg leading-relaxed">
            {t.heroDesc}
          </p>

          <div>
            <button
              type="button"
              onClick={handleStartNow}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] rounded-xl bg-amber-400 hover:bg-amber-300 text-red-950 font-extrabold text-base shadow-lg transition-transform active:scale-95 cursor-pointer"
            >
              <span>{t.heroCta}</span>
              <ArrowDown className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Overview of Tam Tòa Thánh Mẫu & Tứ Phủ */}
      <section className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 sm:p-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-xl sm:text-2xl font-bold font-serif-culture text-[#741515]">
            {t.tamToaTitle}
          </h2>
          <p className="text-base text-gray-700 mt-2 leading-relaxed">
            {t.tamToaDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-5 border-t-4 border-red-600 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full bg-red-600 shrink-0"></span>
              <span className="text-xs font-bold text-red-700 tracking-wider uppercase">{t.realmHeaven}</span>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1.5">{t.realmHeavenTitle}</h3>
            <p className="text-base text-gray-700 leading-relaxed">{t.realmHeavenDesc}</p>
          </div>

          <div className="bg-white rounded-xl p-5 border-t-4 border-emerald-600 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full bg-emerald-600 shrink-0"></span>
              <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">{t.realmForest}</span>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1.5">{t.realmForestTitle}</h3>
            <p className="text-base text-gray-700 leading-relaxed">{t.realmForestDesc}</p>
          </div>

          <div className="bg-white rounded-xl p-5 border-t-4 border-sky-600 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full bg-sky-500 shrink-0"></span>
              <span className="text-xs font-bold text-sky-700 tracking-wider uppercase">{t.realmWater}</span>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1.5">{t.realmWaterTitle}</h3>
            <p className="text-base text-gray-700 leading-relaxed">{t.realmWaterDesc}</p>
          </div>

          <div className="bg-white rounded-xl p-5 border-t-4 border-amber-500 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0"></span>
              <span className="text-xs font-bold text-amber-700 tracking-wider uppercase">{t.realmEarth}</span>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1.5">{t.realmEarthTitle}</h3>
            <p className="text-base text-gray-700 leading-relaxed">{t.realmEarthDesc}</p>
          </div>
        </div>
      </section>

      {/* Main Heritage Repository Section */}
      <section id="kho-du-lieu-di-san" ref={repoSectionRef} className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-amber-200">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-[#881c1c] shrink-0" />
              <h2 className="text-xl sm:text-2xl font-bold font-serif-culture text-[#741515]">
                {t.repoTitle}
              </h2>
            </div>
            <p className="text-base text-gray-700 mt-1 leading-relaxed">
              {t.repoDesc}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setIsAccessibilityCenterOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 min-h-[44px] rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-bold shadow-xs transition-all cursor-pointer"
              title="Mở Bảng Chế độ đọc to cho Người cao tuổi & Khiếm thị (Tiếng Việt)"
            >
              <Volume2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>{currentLang === 'en' ? 'Audio Reader' : 'Đọc To (Cao Tuổi)'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setExportTargetRecord(null);
                setShowExportModal(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 min-h-[44px] rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-[#741515] border border-amber-400 text-sm font-bold shadow-xs transition-all cursor-pointer"
              title={currentLang === 'en' ? 'Export open dataset to files' : 'Xuất dữ liệu mở ra tệp'}
            >
              <Download className="w-4 h-4 text-[#741515] shrink-0" />
              <span>{currentLang === 'en' ? 'Export Data' : 'Xuất Dữ Liệu'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setFormError(null);
                setShowAddModal(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 min-h-[44px] rounded-xl bg-[#881c1c] text-white hover:bg-[#6b1414] text-sm font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 shrink-0" />
              <span>{t.btnNewRecord}</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-amber-200 shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            <div className="sm:col-span-5 relative min-w-0">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full min-h-[44px] pl-9 pr-10 py-2 text-base bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Xóa từ khóa tìm kiếm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="sm:col-span-3 min-w-0">
              <label htmlFor="filter-dia-phuong" className="sr-only">Lọc theo địa phương</label>
              <div className="relative min-w-0">
                <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  id="filter-dia-phuong"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full min-w-0 min-h-[44px] pl-9 pr-3 py-2 text-base bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                >
                  <option value="ALL">{t.allLocations}</option>
                  {locations.map((loc, idx) => (
                    <option key={idx} value={loc}>
                      {loc.length > 32 ? loc.slice(0, 32) + '...' : loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-4 min-w-0">
              <label htmlFor="filter-tinh-trang" className="sr-only">Lọc theo tình trạng ghi danh</label>
              <div className="relative min-w-0">
                <Award className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  id="filter-tinh-trang"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full min-w-0 min-h-[44px] pl-9 pr-3 py-2 text-base bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                >
                  <option value="ALL">{t.allStatuses}</option>
                  {statuses.map((st, idx) => (
                    <option key={idx} value={st}>
                      {st.length > 36 ? st.slice(0, 36) + '...' : st}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-100 text-base text-gray-600">
            <div className="flex flex-wrap items-center gap-2">
              <Filter className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                {t.showing}: <strong>{filteredRecords.length}</strong> / {records.length} {t.records}
              </span>
              {(selectedLocation !== 'ALL' || selectedStatus !== 'ALL' || searchQuery) && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedLocation('ALL');
                    setSelectedStatus('ALL');
                    setSearchQuery('');
                  }}
                  className="px-2 min-h-[44px] text-red-700 hover:underline font-medium"
                >
                  {t.clearFilter}
                </button>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="inline-flex items-center gap-1.5 text-emerald-800">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> {t.verifiedSource}
              </span>
              <span className="inline-flex items-center gap-1.5 text-amber-800">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> {t.missingSource}
              </span>
            </div>
          </div>
        </div>

        {/* Heritage Cards Grid */}
        {filteredRecords.length === 0 ? (
          <div className="bg-white rounded-xl p-8 sm:p-12 text-center border border-dashed border-gray-300">
            <Layers className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 text-lg">{t.noResults}</h3>
            <p className="text-base text-gray-600 mt-1 max-w-md mx-auto">
              {t.noResultsDesc}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecords.map((item) => {
              const en = recordTranslationsEn[item.id];
              const isEn = currentLang === 'en' && en;

              const title = isEn ? en.ten_chinh_thuc : item.ten_chinh_thuc;
              const alias = isEn ? en.ten_goi_khac : item.ten_goi_khac;
              const category = isEn ? en.loai_hinh : item.loai_hinh;
              const location = isEn ? en.dia_phuong : item.dia_phuong;
              const desc = isEn ? en.mo_ta_dac_trung : item.mo_ta_dac_trung;
              const artists = isEn ? en.nghe_nhan_tieu_bieu : item.nghe_nhan_tieu_bieu;
              const status = isEn ? en.tinh_trang_ghi_danh : item.tinh_trang_ghi_danh;
              const source = isEn ? en.nguon_tu_lieu : item.nguon_tu_lieu;

              const missing = isMissingSource(item);
              const isCopied = copiedId === item.id;
              const isReadingThis = isSpeaking && (currentTitle === title || activeReadingRecordId === item.id);

              return (
                <article
                  key={item.id}
                  className={`bg-white rounded-xl border transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md min-w-0 ${
                    isReadingThis
                      ? 'border-emerald-600 ring-4 ring-emerald-400 bg-emerald-50/40 shadow-lg'
                      : missing
                      ? 'border-amber-400 ring-1 ring-amber-300'
                      : 'border-amber-200/80 hover:border-amber-400'
                  }`}
                >
                  <div className="p-5 space-y-3">
                    {/* Header badge area */}
                    <div className="flex items-start justify-between gap-2">
                      <span className="inline-block px-2.5 py-1 rounded bg-amber-100 text-amber-900 text-xs font-semibold">
                        {category}
                      </span>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleSpeakCard(item)}
                          className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-sm font-semibold transition-all ${
                            isReadingThis
                              ? 'bg-emerald-500 text-white animate-pulse'
                              : 'bg-amber-100/80 hover:bg-amber-200 text-amber-900'
                          }`}
                          title={isReadingThis ? t.btnStopListen : t.btnListen}
                          aria-label={isReadingThis ? t.btnStopListen : t.btnListen}
                        >
                          {isReadingThis ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </button>

                        {missing && (
                          <span
                            aria-label={t.missingSourceBadge}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-500 text-amber-950 font-bold text-xs shadow-sm animate-pulse"
                          >
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-950" />
                            <span>{t.missingSourceBadge}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Official Title */}
                    <div>
                      <h3 className="font-bold text-lg font-serif-culture text-gray-900 leading-snug">
                        {title}
                      </h3>
                      {alias && (
                        <p className="text-base text-gray-600 mt-1 italic">
                          {t.aliasLabel}: {alias}
                        </p>
                      )}
                    </div>

                    {/* Location & Status Info */}
                    <div className="space-y-1.5 text-base text-gray-700 pt-1">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-red-700 flex-shrink-0 mt-1" />
                        <span className="break-words min-w-0">{location}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Award className="w-4 h-4 text-amber-600 flex-shrink-0 mt-1" />
                        <span className="font-medium text-gray-800 break-words min-w-0">{status}</span>
                      </div>
                    </div>

                    {/* Description preview */}
                    <p className="text-base text-gray-700 line-clamp-3 leading-relaxed pt-1">
                      {desc}
                    </p>

                    {/* Artists */}
                    {artists && (
                      <p className="text-base text-gray-600">
                        <strong className="text-gray-800">{t.artistsLabel}:</strong> {artists}
                      </p>
                    )}

                    {/* Source section inside card */}
                    <div className="pt-2 border-t border-gray-100">
                      <div className="text-base">
                        <span className="font-semibold text-gray-800">{t.sourceLabel}: </span>
                        {source ? (
                          <span className="text-gray-700 italic break-words">{source}</span>
                        ) : (
                          <span className="text-amber-800 font-semibold italic bg-amber-50 px-1.5 py-0.5 rounded">
                            Chưa cập nhật nguồn tư liệu khoa học [CẦN BỔ SUNG]
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="p-3 bg-gray-50 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setInspectRecord(item)}
                      className="inline-flex items-center gap-1.5 px-3 min-h-[44px] text-sm font-semibold text-gray-700 hover:text-red-800 hover:bg-gray-200/70 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>{t.btnDetails}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setExportTargetRecord(item);
                        setShowExportModal(true);
                      }}
                      title={currentLang === 'en' ? 'Export this record' : 'Xuất bản ghi này ra tệp'}
                      className="inline-flex items-center gap-1.5 px-3 min-h-[44px] text-sm font-semibold text-gray-700 hover:text-amber-950 hover:bg-amber-100/70 rounded-lg transition-colors"
                    >
                      <Download className="w-4 h-4 text-amber-800" />
                      <span>{currentLang === 'en' ? 'Export' : 'Xuất'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCopyCitation(item)}
                      title={t.btnCopyCitation}
                      className={`inline-flex items-center gap-1.5 px-3 min-h-[44px] text-sm font-semibold rounded-lg transition-all ${
                        isCopied
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white hover:bg-amber-100/70 text-amber-900 border border-amber-300 shadow-xs'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>{t.btnCopied}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-amber-700" />
                          <span>{t.btnCopyCitation}</span>
                        </>
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Inspect Modal */}
      {inspectRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-2xl border-2 border-amber-300 space-y-4">
            {(() => {
              const en = recordTranslationsEn[inspectRecord.id];
              const isEn = currentLang === 'en' && en;
              const title = isEn ? en.ten_chinh_thuc : inspectRecord.ten_chinh_thuc;
              const alias = isEn ? en.ten_goi_khac : inspectRecord.ten_goi_khac;
              const category = isEn ? en.loai_hinh : inspectRecord.loai_hinh;
              const location = isEn ? en.dia_phuong : inspectRecord.dia_phuong;
              const desc = isEn ? en.mo_ta_dac_trung : inspectRecord.mo_ta_dac_trung;
              const artists = isEn ? en.nghe_nhan_tieu_bieu : inspectRecord.nghe_nhan_tieu_bieu;
              const status = isEn ? en.tinh_trang_ghi_danh : inspectRecord.tinh_trang_ghi_danh;
              const source = isEn ? en.nguon_tu_lieu : inspectRecord.nguon_tu_lieu;

              return (
                <>
                  <div className="flex items-start justify-between gap-4 border-b pb-3">
                    <div className="min-w-0">
                      <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-900 text-xs font-bold">
                        {category}
                      </span>
                      <h3 className="text-xl font-bold font-serif-culture text-[#741515] mt-2">
                        {title}
                      </h3>
                      {alias && (
                        <p className="text-base text-gray-600 italic mt-1">
                          {t.aliasLabel}: {alias}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setInspectRecord(null)}
                      aria-label={t.close}
                      className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 shrink-0"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4 text-base text-gray-700">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-amber-50/50 rounded-lg">
                      <div>
                        <span className="text-sm font-semibold text-gray-600 block">{t.locationLabel}:</span>
                        <span className="font-medium text-gray-900">{location}</span>
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-gray-600 block">{t.statusLabel}:</span>
                        <span className="font-medium text-amber-900">{status}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Mô tả đặc trưng thực hành:</h4>
                      <p className="text-gray-700 leading-relaxed text-base bg-gray-50 p-3.5 rounded-lg border border-gray-100">
                        {desc}
                      </p>
                    </div>

                    {artists && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{t.artistsLabel}:</h4>
                        <p className="text-gray-700 text-base">{artists}</p>
                      </div>
                    )}

                    <div className="pt-2 border-t">
                      <h4 className="font-semibold text-gray-900 mb-1">{t.sourceLabel}:</h4>
                      <p className="text-base text-gray-700 italic bg-amber-50/60 p-3 rounded border border-amber-200">
                        {source || '[CẦN BỔ SUNG]'}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between pt-4 border-t gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleSpeakCard(inspectRecord)}
                        className="inline-flex items-center gap-1.5 px-4 min-h-[44px] rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>{t.btnListen}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCopyCitation(inspectRecord)}
                        className="inline-flex items-center gap-1.5 px-4 min-h-[44px] rounded-xl bg-amber-100 text-amber-900 font-semibold text-sm hover:bg-amber-200 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                        <span>{t.btnCopyCitation}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setExportTargetRecord(inspectRecord);
                          setShowExportModal(true);
                        }}
                        className="inline-flex items-center gap-1.5 px-4 min-h-[44px] rounded-xl bg-red-100 text-[#741515] font-semibold text-sm hover:bg-red-200 transition-colors cursor-pointer"
                      >
                        <Download className="w-4 h-4 text-[#741515]" />
                        <span>{currentLang === 'en' ? 'Export' : 'Xuất tệp'}</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setInspectRecord(null)}
                      className="px-4 min-h-[44px] rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold text-sm"
                    >
                      {t.close}
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Add New Record Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-2xl border-2 border-amber-400 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2 text-[#741515]">
                <FileJson className="w-5 h-5" />
                <h3 className="font-bold text-lg font-serif-culture">
                  {t.btnNewRecord}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                aria-label={t.close}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div role="alert" className="p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-900 text-base font-medium">
                {formError}
              </div>
            )}

            <form onSubmit={handleCreateSubmit} className="space-y-3 text-base">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Tên chính thức <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Đền Chầu Đệ Nhị Thượng Ngàn"
                  value={newForm.ten_chinh_thuc}
                  onChange={(e) => setNewForm({ ...newForm, ten_chinh_thuc: e.target.value })}
                  className="w-full min-h-[44px] px-3 py-2 text-base border rounded-lg focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Tên gọi khác</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Đền Đông Cuông"
                    value={newForm.ten_goi_khac}
                    onChange={(e) => setNewForm({ ...newForm, ten_goi_khac: e.target.value })}
                    className="w-full min-h-[44px] px-3 py-2 text-base border rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Loại hình</label>
                  <input
                    type="text"
                    value={newForm.loai_hinh}
                    onChange={(e) => setNewForm({ ...newForm, loai_hinh: e.target.value })}
                    className="w-full min-h-[44px] px-3 py-2 text-base border rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Địa phương</label>
                  <input
                    type="text"
                    placeholder="Ghi rõ tên mới sau sắp xếp 2025 hoặc tên cũ"
                    value={newForm.dia_phuong}
                    onChange={(e) => setNewForm({ ...newForm, dia_phuong: e.target.value })}
                    className="w-full min-h-[44px] px-3 py-2 text-base border rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Tình trạng ghi danh</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Di tích Quốc gia / UNESCO"
                    value={newForm.tinh_trang_ghi_danh}
                    onChange={(e) => setNewForm({ ...newForm, tinh_trang_ghi_danh: e.target.value })}
                    className="w-full min-h-[44px] px-3 py-2 text-base border rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Mô tả đặc trưng</label>
                <textarea
                  rows={3}
                  placeholder="Mô tả phong tục, trang phục, nghi thức thực hành..."
                  value={newForm.mo_ta_dac_trung}
                  onChange={(e) => setNewForm({ ...newForm, mo_ta_dac_trung: e.target.value })}
                  className="w-full px-3 py-2 text-base border rounded-lg focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Nghệ nhân tiêu biểu</label>
                <input
                  type="text"
                  placeholder="Họ và tên nghệ nhân, đồng đền, thủ nhang"
                  value={newForm.nghe_nhan_tieu_bieu}
                  onChange={(e) => setNewForm({ ...newForm, nghe_nhan_tieu_bieu: e.target.value })}
                  className="w-full min-h-[44px] px-3 py-2 text-base border rounded-lg focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Nguồn tư liệu kiểm chứng
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Hồ sơ Bộ VHTTDL số...; GS. Ngô Đức Thịnh..."
                  value={newForm.nguon_tu_lieu}
                  onChange={(e) => setNewForm({ ...newForm, nguon_tu_lieu: e.target.value })}
                  className="w-full min-h-[44px] px-3 py-2 text-base border rounded-lg focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 min-h-[44px] rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 min-h-[44px] rounded-xl bg-[#881c1c] hover:bg-[#6b1414] text-white font-semibold shadow-sm"
                >
                  Lưu Hồ Sơ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Open Data Export Modal */}
      <ExportDataModal
        isOpen={showExportModal}
        onClose={() => {
          setShowExportModal(false);
          setExportTargetRecord(null);
        }}
        allRecords={records}
        filteredRecords={filteredRecords}
        currentLang={currentLang}
        targetSingleRecord={exportTargetRecord}
      />
    </div>
  );
};
