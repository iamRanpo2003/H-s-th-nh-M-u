import React, { useState } from 'react';
import { sourcesList, contributorAcknowledgments } from '../data/sourcesData';
import {
  BookCheck,
  ExternalLink,
  ShieldCheck,
  Landmark,
  Search,
  Filter,
  CheckCircle2,
  Copy,
  Check,
  HeartHandshake,
  AlertTriangle,
  Lock,
} from 'lucide-react';

export { sourcesList };

function extractDirectHttpUrl(rawUrl: string): string | null {
  const match = rawUrl.match(/https?:\/\/[^\s)]+/);
  return match ? match[0] : null;
}

export const SourcesTab: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('ALL');
  const [search, setSearch] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = sourcesList.filter((s) => {
    if (filterType !== 'ALL' && s.type !== filterType) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchTitle = s.title.toLowerCase().includes(q);
      const matchPublisher = s.publisher.toLowerCase().includes(q);
      const matchDesc = s.description.toLowerCase().includes(q);
      if (!matchTitle && !matchPublisher && !matchDesc) return false;
    }
    return true;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const officialCount = sourcesList.filter((s) => s.isOfficialGov).length;

  return (
    <div id="nguon-va-ghi-nhan" className="space-y-8 max-w-6xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#7a1717] via-[#8c1c1c] to-[#4e0c0c] text-white p-5 sm:p-8 rounded-2xl shadow-xl border-2 border-amber-500/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 text-xs font-semibold mb-2 border border-amber-400/30">
              <BookCheck className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              Cơ Sở Đối Chiếu Khoa Học, Pháp Lý & Bản Quyền
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-culture text-amber-100">
              Nguồn và Ghi nhận
            </h2>
            <p className="text-base text-amber-100/90 mt-2 max-w-2xl leading-relaxed">
              Liệt kê toàn bộ {sourcesList.length} nguồn dữ liệu đang dùng trong ứng dụng gồm tên nguồn, đơn vị phát hành, năm và đường dẫn. Các trường chưa xác minh trong mã nguồn được đánh dấu rõ <strong>[CẦN BỔ SUNG]</strong>, không tự bịa đặt.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="px-4 py-2.5 rounded-xl bg-amber-950/70 border border-amber-400/40 text-center">
              <span className="text-2xl font-bold text-amber-300 block">{sourcesList.length}</span>
              <span className="text-sm text-amber-200/90">Nguồn đang dùng</span>
            </div>
            <div className="px-4 py-2.5 rounded-xl bg-amber-950/70 border border-emerald-400/40 text-center">
              <span className="text-2xl font-bold text-emerald-400 block">{officialCount}</span>
              <span className="text-sm text-emerald-200/90">Nguồn chính thống</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-amber-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 min-w-0">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tên nguồn, đơn vị phát hành..."
            className="w-full min-h-[44px] pl-10 pr-4 py-2.5 text-base bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 min-w-0">
          <Filter className="w-4 h-4 text-amber-800 shrink-0" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full sm:w-auto min-w-0 min-h-[44px] px-3 py-2 text-base bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="ALL">Tất cả nguồn ({sourcesList.length})</option>
            <option value="chinh_thong">Nguồn Chính thống & Pháp luật ({officialCount})</option>
            <option value="hoc_thuat">Nghiên cứu Học thuật</option>
            <option value="bao_tang_vien">Bảo tàng, Viện & Địa phương</option>
          </select>
        </div>
      </div>

      {/* Overview Table wrapped in horizontal scroll container for 360px compliance */}
      <section className="bg-white rounded-2xl border border-amber-200 shadow-sm overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-amber-100 bg-amber-50/50">
          <h3 className="text-lg font-bold font-serif-culture text-[#741515]">
            Bảng Tổng Hợp Toàn Bộ Nguồn Dữ Liệu Đang Dùng
          </h3>
          <p className="text-base text-gray-700 mt-1">
            Mỗi dòng gồm đủ 4 thông tin: Tên nguồn, Đơn vị phát hành, Năm và Đường dẫn. Vuốt ngang bảng nếu màn hình hẹp.
          </p>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[720px] text-left border-collapse">
            <thead>
              <tr className="bg-[#6b1414] text-amber-100 text-base uppercase tracking-wider">
                <th className="p-3.5 font-bold">Tên nguồn</th>
                <th className="p-3.5 font-bold">Đơn vị phát hành</th>
                <th className="p-3.5 font-bold whitespace-nowrap">Năm</th>
                <th className="p-3.5 font-bold">Đường dẫn</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100 text-base text-gray-800">
              {filtered.map((item) => {
                const directHref = extractDirectHttpUrl(item.url);
                const needsCompletion = item.year.includes('[CẦN BỔ SUNG]') || item.url.includes('[CẦN BỔ SUNG]');
                return (
                  <tr key={`row-${item.id}`} className="hover:bg-amber-50/40 align-top">
                    <td className="p-3.5 font-semibold text-gray-900">
                      {item.title}
                      {needsCompletion && (
                        <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-xs font-bold">
                          Có mục [CẦN BỔ SUNG]
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-gray-700">{item.publisher}</td>
                    <td className="p-3.5 whitespace-nowrap font-medium">
                      {item.year === '[CẦN BỔ SUNG]' ? (
                        <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-950 font-bold text-sm">
                          [CẦN BỔ SUNG]
                        </span>
                      ) : (
                        item.year
                      )}
                    </td>
                    <td className="p-3.5 break-words max-w-xs">
                      {directHref ? (
                        <div className="space-y-1">
                          <a
                            href={directHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 min-h-[44px] text-[#881c1c] font-semibold underline hover:text-amber-700 break-all"
                          >
                            <span>{directHref}</span>
                            <ExternalLink className="w-4 h-4 shrink-0" />
                          </a>
                          {item.url.includes('[CẦN BỔ SUNG]') && (
                            <span className="block text-sm text-amber-900 font-medium">
                              (Liên kết chi tiết văn bản/ấn phẩm: [CẦN BỔ SUNG])
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="inline-block px-2 py-1 rounded bg-amber-100 text-amber-950 font-bold text-sm">
                          [CẦN BỔ SUNG]
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Detailed Sources Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((item) => {
          const isCopied = copiedId === item.id;
          const directHref = extractDirectHttpUrl(item.url);

          return (
            <article
              key={item.id}
              className={`bg-white rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between shadow-sm hover:shadow-md min-w-0 ${
                item.isOfficialGov
                  ? 'border-amber-300 hover:border-amber-500 ring-1 ring-amber-100'
                  : 'border-gray-200 hover:border-amber-300'
              }`}
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                      item.isOfficialGov
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : 'bg-amber-100 text-amber-900 border border-amber-300'
                    }`}
                  >
                    {item.isOfficialGov ? (
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    ) : (
                      <Landmark className="w-3.5 h-3.5 text-amber-700" />
                    )}
                    <span>{item.typeLabel}</span>
                  </span>

                  {item.isOfficialGov && (
                    <span className="text-xs uppercase font-bold tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded">
                      Chính thống
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-lg font-serif-culture text-gray-900 leading-snug">
                    {item.title}
                  </h3>
                  <div className="mt-2 space-y-1 text-base text-gray-700">
                    <p>
                      <strong className="text-red-900">Đơn vị phát hành:</strong> {item.publisher}
                    </p>
                    <p>
                      <strong className="text-red-900">Năm:</strong>{' '}
                      <span className={item.year.includes('[CẦN BỔ SUNG]') ? 'px-2 py-0.5 rounded bg-amber-100 text-amber-950 font-bold' : ''}>
                        {item.year}
                      </span>
                    </p>
                    <p className="break-words">
                      <strong className="text-red-900">Đường dẫn:</strong>{' '}
                      <span className={item.url.includes('[CẦN BỔ SUNG]') ? 'text-amber-950 font-medium' : 'text-gray-700'}>
                        {item.url}
                      </span>
                    </p>
                  </div>
                </div>

                <p className="text-base text-gray-700 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Action link & copy button */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() =>
                    handleCopy(
                      item.id,
                      `${item.title} | Đơn vị phát hành: ${item.publisher} | Năm: ${item.year} | Đường dẫn: ${item.url}`
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3 min-h-[44px] rounded-xl text-sm font-semibold text-gray-700 hover:text-amber-950 hover:bg-amber-50 border border-gray-200 transition-colors"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">Đã chép!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Chép trích dẫn</span>
                    </>
                  )}
                </button>

                {directHref ? (
                  <a
                    href={directHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 min-h-[44px] rounded-xl bg-[#881c1c] text-white hover:bg-[#6b1414] text-sm font-semibold shadow-xs transition-colors"
                  >
                    <span>Mở nguồn</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 min-h-[44px] rounded-xl bg-amber-100 text-amber-950 text-sm font-bold border border-amber-300">
                    <AlertTriangle className="w-4 h-4 text-amber-700" />
                    <span>[CẦN BỔ SUNG]</span>
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Dedicated Acknowledgments Section ("Mục Ghi nhận cho người đóng góp tư liệu") */}
      <section className="bg-white rounded-2xl border-2 border-amber-300 p-5 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-start gap-3 border-b border-amber-200 pb-4">
          <div className="p-2.5 rounded-xl bg-red-100 text-[#741515] shrink-0">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-red-800 tracking-wider uppercase block">
              Minh bạch & Tôn trọng Chủ thể Di sản
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-serif-culture text-[#741515]">
              Ghi nhận Người đóng góp Tư liệu & Phạm vi Sử dụng
            </h3>
            <p className="text-base text-gray-700 mt-1 leading-relaxed">
              Tri ân các cơ quan nghiên cứu, cơ quan quản lý văn hóa và các nghệ nhân thực hành đã góp phần bảo tồn và công bố các tư liệu chính thống được tổng hợp trong ứng dụng.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contributorAcknowledgments.map((c) => (
            <div key={c.id} className="p-4 sm:p-5 rounded-xl bg-amber-50/50 border border-amber-200 space-y-2">
              <span className="inline-block px-2.5 py-0.5 rounded bg-amber-200/70 text-amber-950 text-xs font-bold">
                {c.role}
              </span>
              <h4 className="font-bold text-lg text-gray-900 leading-snug">{c.name}</h4>
              <p className="text-base text-gray-700 leading-relaxed">{c.contribution}</p>
              <div className="pt-2 border-t border-amber-200/70 flex items-start gap-2 text-base text-emerald-950">
                <Lock className="w-4 h-4 text-emerald-700 shrink-0 mt-1" />
                <span>
                  <strong>Phạm vi được phép dùng:</strong> {c.permittedScope}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Compliance statement */}
      <div className="p-4 sm:p-5 rounded-xl bg-amber-50 border border-amber-200 text-base text-amber-950 flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-1" />
        <div className="leading-relaxed">
          <strong>Cam kết trung thực nguồn tư liệu:</strong> Toàn bộ bản ghi di sản trong ứng dụng đều dẫn nguồn từ danh mục trên. Các trường thông tin chưa có dữ liệu xác thực trong mã nguồn đều giữ dấu <strong>[CẦN BỔ SUNG]</strong> để hoàn thiện đối chiếu từ bản gốc, tuyệt đối không tự bịa nguồn hoặc đường dẫn giả mạo.
        </div>
      </div>
    </div>
  );
};
