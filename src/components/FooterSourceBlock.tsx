import React from 'react';
import { BookCheck, FileText, Landmark, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface FooterSourceBlockProps {
  onOpenSourcesPage?: () => void;
}

export const FooterSourceBlock: React.FC<FooterSourceBlockProps> = ({ onOpenSourcesPage }) => {
  const handleNavigateSources = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (onOpenSourcesPage) {
      e.preventDefault();
      onOpenSourcesPage();
    }
  };

  return (
    <footer
      id="khoi-nguon-tu-lieu-bat-buoc"
      aria-label="Khối hiển thị nguồn tư liệu chính thống và liên kết trang Nguồn và Ghi nhận"
      className="mt-16 bg-[#2a1711] text-amber-100/90 border-t-4 border-amber-600 pt-10 pb-8 px-4 sm:px-6 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header of the mandatory source section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-amber-900/60 gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
              <BookCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-serif-culture tracking-wide text-amber-200">
                NGUỒN TƯ LIỆU CHÍNH THỐNG & GHI NHẬN ĐÓNG GÓP
              </h3>
              <p className="text-base text-amber-300/80 mt-1">
                Khối đối chiếu tư liệu thường trực – Xem đầy đủ nguồn dữ liệu, năm phát hành, đường dẫn và ghi nhận người đóng góp.
              </p>
            </div>
          </div>

          <a
            href="#nguon-va-ghi-nhan"
            onClick={handleNavigateSources}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl bg-amber-400 hover:bg-amber-300 text-red-950 font-bold text-base shadow-md transition-colors shrink-0"
          >
            <BookCheck className="w-4 h-4" />
            <span>Trang Nguồn và Ghi nhận</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Citations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-base">
          {/* Column 1: Scientific & UNESCO dossiers */}
          <div className="bg-[#1e110c] p-4 sm:p-5 rounded-xl border border-amber-900/40">
            <div className="flex items-center gap-2 mb-3 text-amber-300 font-semibold">
              <Landmark className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Hồ sơ Di sản UNESCO & Quốc gia</span>
            </div>
            <ul className="space-y-3 text-base text-amber-100/85 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>
                  <strong>Hồ sơ UNESCO số 01064 (2016):</strong> Thực hành Tín ngưỡng thờ Mẫu Tam phủ của người Việt.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>
                  <strong>Cục Di sản Văn hóa (Bộ VHTTDL):</strong> Các Quyết định 5079/QĐ-BVHTTDL (Hội Phủ Dầy), 446/QĐ-BVHTTDL (Hát Chầu Văn) và các quyết định ghi danh cấp quốc gia.
                </span>
              </li>
            </ul>
          </div>

          {/* Column 2: Academic and Folk Cultural Studies */}
          <div className="bg-[#1e110c] p-4 sm:p-5 rounded-xl border border-amber-900/40">
            <div className="flex items-center gap-2 mb-3 text-amber-300 font-semibold">
              <FileText className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Tư liệu Học thuật & Ghi nhận</span>
            </div>
            <ul className="space-y-3 text-base text-amber-100/85 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>
                  <strong>Cố GS. Ngô Đức Thịnh:</strong> <em>Đạo Mẫu ở Việt Nam</em> (NXB KHXH, 2010); <em>Đạo Mẫu và các hình thức thờ cúng Nữ thần</em> (NXB KHXH, 1996).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>
                  <strong>Viện VICAS, Viện Âm nhạc Quốc gia & Bảo tàng Phụ nữ Việt Nam:</strong> Tài liệu nghiên cứu, ký âm và trưng bày hiện vật.
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal Framework */}
          <div className="bg-[#1e110c] p-4 sm:p-5 rounded-xl border border-amber-900/40">
            <div className="flex items-center gap-2 mb-3 text-amber-300 font-semibold">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Khung Pháp lý Nhà nước Việt Nam</span>
            </div>
            <ul className="space-y-3 text-base text-amber-100/85 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>
                  <strong>Luật Tín ngưỡng, tôn giáo số 02/2016/QH14:</strong> Quy định Điều 5, Điều 6, Điều 12, Điều 13.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>
                  <strong>Nghị định 38/2021/NĐ-CP & Nghị định 110/2018/NĐ-CP:</strong> Xử phạt trục lợi tín ngưỡng và quản lý tổ chức lễ hội.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer links & copyright notice */}
        <div className="mt-8 pt-5 border-t border-amber-950/90 flex flex-col items-center gap-3 text-center text-base text-amber-300/90">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleNavigateSources}
              className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[44px] rounded-xl bg-amber-950/80 hover:bg-amber-900 text-amber-200 border border-amber-700/60 font-semibold underline transition-colors"
            >
              <span>Xem đầy đủ trang Nguồn và Ghi nhận</span>
            </button>
          </div>
          <p className="text-amber-200/90">
            Cổng Thông Tin Hồ Sơ Di Sản Thực Hành Tín Ngưỡng Thờ Mẫu Tam Phủ • Dự án Xã hội Phi Lợi Nhuận
          </p>
          <p className="text-amber-300/75">
            Sản phẩm thực tập của sinh viên: <strong className="text-amber-200">Nguyễn Viết Hải</strong> | Mã SV: <strong className="text-amber-200">PH63500</strong> | Nhóm: <strong className="text-amber-200">01</strong> | Chương trình Thực tập sinh Đợt 15 FPT Polytechnic và IMTA TECH.
          </p>
        </div>
      </div>
    </footer>
  );
};
