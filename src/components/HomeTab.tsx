import React, { useState, useMemo } from 'react';
import { DiSanItem, TabKey } from '../types/heritage';
import { 
  isMissingSource, 
  formatCitation, 
  filterHeritage, 
  extractUniqueLocations, 
  extractUniqueStatuses 
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
  Sparkles, 
  ShieldAlert, 
  Scale, 
  Bot, 
  Eye, 
  X,
  FileJson,
  Layers,
  BookOpen
} from 'lucide-react';

interface HomeTabProps {
  records: DiSanItem[];
  onNavigateTab: (tab: TabKey) => void;
  onAddRecord: (record: DiSanItem) => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({ records, onNavigateTab, onAddRecord }) => {
  const [selectedLocation, setSelectedLocation] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [inspectRecord, setInspectRecord] = useState<DiSanItem | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New record form state
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

  // Extract unique locations and statuses
  const locations = useMemo(() => extractUniqueLocations(records), [records]);
  const statuses = useMemo(() => extractUniqueStatuses(records), [records]);

  // Filtered list
  const filteredRecords = useMemo(() => {
    return filterHeritage(records, {
      diaPhuong: selectedLocation,
      tinhTrang: selectedStatus,
      search: searchQuery,
    });
  }, [records, selectedLocation, selectedStatus, searchQuery]);

  const handleCopyCitation = (item: DiSanItem) => {
    const text = formatCitation(item);
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newForm.ten_chinh_thuc.trim()) {
      alert('Vui lòng nhập tên chính thức của di sản!');
      return;
    }
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
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#741515] via-[#8c1c1c] to-[#470a0a] text-white p-6 sm:p-10 shadow-xl border-2 border-amber-500/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/30 text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Hệ thống Hồ sơ Khoa học & Chuẩn hóa Nghi lễ
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-serif-culture tracking-wide text-amber-100 leading-tight">
            Tín Ngưỡng Thờ Mẫu Tam Phủ Của Người Việt
          </h1>

          <p className="text-amber-100/90 text-sm sm:text-base leading-relaxed">
            Tín ngưỡng thờ Mẫu Tam phủ tôn vinh Mẫu – người Mẹ bao dung của vũ trụ và thiên nhiên, kết tinh lòng biết ơn sâu sắc của người Việt đối với trời đất và các vị tiền nhân có công với đất nước. Cổng thông tin ra đời nhằm xây dựng hệ sinh thái thông tin chính thống, đẩy lùi biến tướng thương mại hóa, mê tín dị đoan và bảo tồn di sản theo đúng tinh thần Công ước UNESCO 2003.
          </p>

          {/* Quick Nav Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            <button
              onClick={() => onNavigateTab('rituals')}
              className="flex flex-col p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-amber-300/30 text-left transition-all group"
            >
              <div className="flex items-center justify-between text-amber-300 mb-1">
                <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium opacity-80">Xem</span>
              </div>
              <span className="text-sm font-bold text-white">Nghi thức chuẩn</span>
              <span className="text-[11px] text-amber-200/80">Không gian, y phục, văn ca</span>
            </button>

            <button
              onClick={() => onNavigateTab('distinction')}
              className="flex flex-col p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-amber-300/30 text-left transition-all group"
            >
              <div className="flex items-center justify-between text-rose-300 mb-1">
                <ShieldAlert className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium opacity-80">Phân biệt</span>
              </div>
              <span className="text-sm font-bold text-white">Chống biến tướng</span>
              <span className="text-[11px] text-amber-200/80">Đối chiếu 5 dấu hiệu đỏ</span>
            </button>

            <button
              onClick={() => onNavigateTab('legal')}
              className="flex flex-col p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-amber-300/30 text-left transition-all group"
            >
              <div className="flex items-center justify-between text-amber-300 mb-1">
                <Scale className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium opacity-80">Tra cứu</span>
              </div>
              <span className="text-sm font-bold text-white">Khung pháp lý</span>
              <span className="text-[11px] text-amber-200/80">Luật 2016, Nghị định xử phạt</span>
            </button>

            <button
              onClick={() => onNavigateTab('advisor')}
              className="flex flex-col p-3 rounded-xl bg-amber-400 text-red-950 hover:bg-amber-300 border border-amber-300 text-left transition-all group shadow-md"
            >
              <div className="flex items-center justify-between text-red-950 mb-1">
                <Bot className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold">Hỏi AI</span>
              </div>
              <span className="text-sm font-extrabold">Trợ lý Thông minh</span>
              <span className="text-[11px] text-red-900 font-medium">Hỏi đáp từ disan.json</span>
            </button>
          </div>
        </div>
      </section>

      {/* Overview of Tam Tòa Thánh Mẫu & Tứ Phủ */}
      <section className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 sm:p-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-xl sm:text-2xl font-bold font-serif-culture text-[#741515]">
            Khái Quát Hệ Thống Tam Tòa Thánh Mẫu & Tứ Phủ Vạn Linh
          </h2>
          <p className="text-sm text-gray-700 mt-2">
            Hệ thống thần điện Đạo Mẫu Việt Nam đại diện cho vũ trụ quan hài hòa: Trời (Thiên), Rừng núi (Nhạc), Sông nước (Thoải) và Đất (Địa).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Mau De Nhat */}
          <div className="bg-white rounded-xl p-5 border-t-4 border-red-600 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full bg-red-600"></span>
              <span className="text-xs font-bold text-red-700 tracking-wider uppercase">Thiên Phủ (Màu Đỏ)</span>
            </div>
            <h3 className="font-bold text-gray-900 text-base mb-1">Mẫu Đệ Nhất Thượng Thiên</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Mẫu Liễu Hạnh / Mẫu Cửu Trùng Thanh Vân. Ngự cõi Trời, ban phúc lành, cai quản các vị thần linh vùng trời, y phục sắc đỏ thắm.
            </p>
          </div>

          {/* Mau De Nhi */}
          <div className="bg-white rounded-xl p-5 border-t-4 border-emerald-600 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
              <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">Nhạc Phủ (Màu Xanh)</span>
            </div>
            <h3 className="font-bold text-gray-900 text-base mb-1">Mẫu Đệ Nhị Thượng Ngàn</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Lê Mại Đại Vương / Diệu Tín Thiền Sư. Cai quản miền rừng núi, che chở muôn loài, thảo mộc, bách thú; y phục sắc xanh lục.
            </p>
          </div>

          {/* Mau De Tam */}
          <div className="bg-white rounded-xl p-5 border-t-4 border-sky-600 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full bg-sky-500"></span>
              <span className="text-xs font-bold text-sky-700 tracking-wider uppercase">Thoải Phủ (Màu Trắng)</span>
            </div>
            <h3 className="font-bold text-gray-900 text-base mb-1">Mẫu Đệ Tam Thoải Phủ</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Xích Lân Long Nữ. Cai quản sông ngòi, biển hồ, dòng nước tưới tiêu nông nghiệp; y phục sắc trắng tinh khôi thanh khiết.
            </p>
          </div>

          {/* Mau De Tu / Dia Tien */}
          <div className="bg-white rounded-xl p-5 border-t-4 border-amber-500 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <span className="text-xs font-bold text-amber-700 tracking-wider uppercase">Địa Phủ (Màu Vàng)</span>
            </div>
            <h3 className="font-bold text-gray-900 text-base mb-1">Mẫu Đệ Tứ Địa Phủ</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Địa Tiên Thánh Mẫu. Cai quản đất đai, bờ cõi, thổ địa màu mỡ nuôi dưỡng sinh linh; y phục sắc vàng hoàng thổ.
            </p>
          </div>
        </div>
      </section>

      {/* Main Heritage Repository Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-amber-200">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-[#881c1c]" />
              <h2 className="text-xl sm:text-2xl font-bold font-serif-culture text-[#741515]">
                Kho Dữ Liệu Hồ Sơ Di Sản Thực Hành
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Tra cứu danh mục thực hành, di tích đền phủ và lễ hội thờ Mẫu đã được xác thực tư liệu
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#881c1c] text-white hover:bg-[#6b1414] text-xs font-semibold shadow-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Nạp bản ghi mới</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-amber-200 shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="sm:col-span-5 relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm theo tên di sản, nghệ nhân, mô tả..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter by Location */}
            <div className="sm:col-span-3">
              <label htmlFor="filter-dia-phuong" className="sr-only">Lọc theo địa phương</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  id="filter-dia-phuong"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                >
                  <option value="ALL">Tất cả địa phương</option>
                  {locations.map((loc, idx) => (
                    <option key={idx} value={loc}>
                      {loc.length > 30 ? loc.slice(0, 30) + '...' : loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filter by Recognition Status */}
            <div className="sm:col-span-4">
              <label htmlFor="filter-tinh-trang" className="sr-only">Lọc theo tình trạng ghi danh</label>
              <div className="relative">
                <Award className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  id="filter-tinh-trang"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                >
                  <option value="ALL">Tất cả tình trạng ghi danh</option>
                  {statuses.map((st, idx) => (
                    <option key={idx} value={st}>
                      {st.length > 35 ? st.slice(0, 35) + '...' : st}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Active Filter Indicators */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-amber-700" />
              <span>Hiển thị: <strong>{filteredRecords.length}</strong> / {records.length} hồ sơ</span>
              {(selectedLocation !== 'ALL' || selectedStatus !== 'ALL' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedLocation('ALL');
                    setSelectedStatus('ALL');
                    setSearchQuery('');
                  }}
                  className="ml-2 text-red-700 hover:underline font-medium"
                >
                  (Xóa bộ lọc)
                </button>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Đã có tư liệu nguồn
              </span>
              <span className="inline-flex items-center gap-1 text-amber-800">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span> Thiếu tư liệu kiểm chứng
              </span>
            </div>
          </div>
        </div>

        {/* Heritage Cards Grid */}
        {filteredRecords.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-dashed border-gray-300">
            <Layers className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 text-base">Không tìm thấy hồ sơ phù hợp</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
              Không có bản ghi nào trùng khớp với bộ lọc hoặc từ khóa bạn nhập. Hãy thử tìm từ khóa khác hoặc xóa bộ lọc.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecords.map((item) => {
              const missing = isMissingSource(item);
              const isCopied = copiedId === item.id;

              return (
                <article
                  key={item.id}
                  className={`bg-white rounded-xl border transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md ${
                    missing ? 'border-amber-400 ring-1 ring-amber-300' : 'border-amber-200/80 hover:border-amber-400'
                  }`}
                >
                  <div className="p-5 space-y-3">
                    {/* Header badge area */}
                    <div className="flex items-start justify-between gap-2">
                      <span className="inline-block px-2.5 py-1 rounded bg-amber-100 text-amber-900 text-[11px] font-semibold">
                        {item.loai_hinh}
                      </span>

                      {/* Orange warning badge if missing source - STRICT REQUIREMENT */}
                      {missing && (
                        <span 
                          aria-label="Cảnh báo thiếu nguồn tư liệu"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-500 text-amber-950 font-bold text-[11px] shadow-sm animate-pulse"
                        >
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-950" />
                          <span>Thiếu nguồn tư liệu</span>
                        </span>
                      )}
                    </div>

                    {/* Official Title */}
                    <div>
                      <h3 className="font-bold text-base font-serif-culture text-gray-900 leading-snug group-hover:text-red-800">
                        {item.ten_chinh_thuc}
                      </h3>
                      {item.ten_goi_khac && (
                        <p className="text-xs text-gray-500 mt-0.5 italic">
                          Tên gọi khác: {item.ten_goi_khac}
                        </p>
                      )}
                    </div>

                    {/* Location & Status Info */}
                    <div className="space-y-1.5 text-xs text-gray-600 pt-1">
                      <div className="flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-red-700 flex-shrink-0 mt-0.5" />
                        <span>{item.dia_phuong}</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <Award className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span className="font-medium text-gray-800">{item.tinh_trang_ghi_danh}</span>
                      </div>
                    </div>

                    {/* Description preview */}
                    <p className="text-xs text-gray-700 line-clamp-3 leading-relaxed pt-1">
                      {item.mo_ta_dac_trung}
                    </p>

                    {/* Artists */}
                    {item.nghe_nhan_tieu_bieu && (
                      <p className="text-[11px] text-gray-500">
                        <strong className="text-gray-700">Nghệ nhân tiêu biểu:</strong> {item.nghe_nhan_tieu_bieu}
                      </p>
                    )}

                    {/* Source section inside card */}
                    <div className="pt-2 border-t border-gray-100">
                      <div className="text-[11px]">
                        <span className="font-semibold text-gray-700">Nguồn tư liệu: </span>
                        {item.nguon_tu_lieu ? (
                          <span className="text-gray-600 italic">{item.nguon_tu_lieu}</span>
                        ) : (
                          <span className="text-amber-700 font-semibold italic bg-amber-50 px-1 py-0.5 rounded">
                            Chưa cập nhật nguồn tư liệu khoa học
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setInspectRecord(item)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:text-red-800 hover:bg-gray-200/70 rounded transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Chi tiết</span>
                    </button>

                    {/* Copy Citation Button - STRICT REQUIREMENT */}
                    <button
                      type="button"
                      onClick={() => handleCopyCitation(item)}
                      title="Sao chép trích dẫn nguồn học thuật"
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded transition-all ${
                        isCopied
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white hover:bg-amber-100/70 text-amber-900 border border-amber-300 shadow-xs'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Đã sao chép!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-amber-700" />
                          <span>Sao chép trích dẫn nguồn</span>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border-2 border-amber-300 space-y-4">
            <div className="flex items-start justify-between gap-4 border-b pb-3">
              <div>
                <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-900 text-xs font-bold">
                  {inspectRecord.loai_hinh}
                </span>
                <h3 className="text-xl font-bold font-serif-culture text-[#741515] mt-2">
                  {inspectRecord.ten_chinh_thuc}
                </h3>
                {inspectRecord.ten_goi_khac && (
                  <p className="text-xs text-gray-500 italic">
                    Tên gọi khác: {inspectRecord.ten_goi_khac}
                  </p>
                )}
              </div>
              <button
                onClick={() => setInspectRecord(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Warning if missing source */}
            {isMissingSource(inspectRecord) && (
              <div className="p-3 bg-amber-50 border-l-4 border-amber-500 rounded text-amber-800 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-600" />
                <span>Bản ghi này đang thiếu trường nguồn tư liệu kiểm chứng theo tiêu chuẩn học thuật.</span>
              </div>
            )}

            <div className="space-y-3 text-sm text-gray-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-amber-50/50 rounded-lg">
                <div>
                  <span className="text-xs font-semibold text-gray-500 block">Địa phương:</span>
                  <span className="font-medium text-gray-800">{inspectRecord.dia_phuong}</span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 block">Tình trạng ghi danh:</span>
                  <span className="font-medium text-amber-900">{inspectRecord.tinh_trang_ghi_danh}</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Mô tả đặc trưng thực hành:</h4>
                <p className="text-gray-600 leading-relaxed text-sm bg-gray-50 p-3 rounded-lg border border-gray-100">
                  {inspectRecord.mo_ta_dac_trung}
                </p>
              </div>

              {inspectRecord.nghe_nhan_tieu_bieu && (
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Nghệ nhân / Nhân chứng văn hóa tiêu biểu:</h4>
                  <p className="text-gray-600 text-sm">
                    {inspectRecord.nghe_nhan_tieu_bieu}
                  </p>
                </div>
              )}

              <div className="pt-2 border-t">
                <h4 className="font-semibold text-gray-800 mb-1">Nguồn tư liệu kiểm chứng:</h4>
                <p className="text-xs text-gray-600 italic bg-amber-50/60 p-2.5 rounded border border-amber-200">
                  {inspectRecord.nguon_tu_lieu || 'Bản ghi hiện chưa bổ sung nguồn tư liệu chính thức.'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t gap-2">
              <button
                type="button"
                onClick={() => handleCopyCitation(inspectRecord)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-100 text-amber-900 font-semibold text-xs hover:bg-amber-200 transition-colors"
              >
                <Copy className="w-4 h-4" />
                <span>Sao chép trích dẫn nguồn</span>
              </button>
              <button
                type="button"
                onClick={() => setInspectRecord(null)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold text-xs"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Record Modal (Allows user to input real data later) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border-2 border-amber-400 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2 text-[#741515]">
                <FileJson className="w-5 h-5" />
                <h3 className="font-bold text-lg font-serif-culture">
                  Thêm Bản Ghi Mới Vào disan.json
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs sm:text-sm">
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
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
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
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Loại hình</label>
                  <input
                    type="text"
                    value={newForm.loai_hinh}
                    onChange={(e) => setNewForm({ ...newForm, loai_hinh: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Địa phương</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Tỉnh Yên Bái"
                    value={newForm.dia_phuong}
                    onChange={(e) => setNewForm({ ...newForm, dia_phuong: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Tình trạng ghi danh</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Di tích Quốc gia / UNESCO"
                    value={newForm.tinh_trang_ghi_danh}
                    onChange={(e) => setNewForm({ ...newForm, tinh_trang_ghi_danh: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
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
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Nghệ nhân tiêu biểu</label>
                <input
                  type="text"
                  placeholder="Họ và tên nghệ nhân, đồng đền, thủ nhang"
                  value={newForm.nghe_nhan_tieu_bieu}
                  onChange={(e) => setNewForm({ ...newForm, nghe_nhan_tieu_bieu: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Nguồn tư liệu kiểm chứng <span className="text-gray-400 font-normal">(Nếu để trống sẽ hiển thị nhãn cảnh báo cam)</span>
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Hồ sơ Bộ VHTTDL số...; Giáo sư Ngô Đức Thịnh..."
                  value={newForm.nguon_tu_lieu}
                  onChange={(e) => setNewForm({ ...newForm, nguon_tu_lieu: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#881c1c] hover:bg-[#6b1414] text-white font-semibold shadow-sm"
                >
                  Lưu Hồ Sơ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
