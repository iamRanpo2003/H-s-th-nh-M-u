import React from 'react';
import { BookCheck, FileText, Landmark, ShieldCheck } from 'lucide-react';

export const FooterSourceBlock: React.FC = () => {
  return (
    <footer 
      id="khoi-nguon-tu-lieu-bat-buoc" 
      aria-label="Khối hiển thị nguồn tư liệu chính thống"
      className="mt-16 bg-[#2a1711] text-amber-100/90 border-t-4 border-amber-600 pt-10 pb-8 px-4 sm:px-6 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header of the mandatory source section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-amber-900/60 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <BookCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif-culture tracking-wide text-amber-200">
                KHỐI HIỂN THỊ NGUỒN TƯ LIỆU CHÍNH THỐNG & CƠ SỞ ĐỐI CHIẾU
              </h3>
              <p className="text-xs text-amber-300/70">
                (Khối tư liệu quy chuẩn thường trực – Luôn hiển thị cuối trang theo quy định nghiên cứu bảo tồn)
              </p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-950/80 border border-amber-700/50 text-xs text-amber-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Nguồn kiểm chứng cấp Quốc gia & UNESCO</span>
          </div>
        </div>

        {/* Citations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          {/* Column 1: Scientific & UNESCO dossiers */}
          <div className="bg-[#1e110c] p-4 rounded-xl border border-amber-900/40">
            <div className="flex items-center gap-2 mb-3 text-amber-300 font-semibold">
              <Landmark className="w-4 h-4 text-amber-400" />
              <span>Hồ sơ Di sản UNESCO & Quốc gia</span>
            </div>
            <ul className="space-y-2.5 text-xs text-amber-100/80 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>
                  <strong>Hồ sơ UNESCO số 01064 (2016):</strong> "Thực hành Tín ngưỡng thờ Mẫu Tam phủ của người Việt" – Ghi danh Di sản văn hóa phi vật thể đại diện của nhân loại tại Kỳ họp thứ 11 Ủy ban Liên Chính phủ (Addis Ababa, Ethiopia).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>
                  <strong>Hồ sơ Di sản quốc gia:</strong> Quyết định số 5079/QĐ-BVHTTDL (Hội Phủ Dầy, Nam Định); Quyết định số 446/QĐ-BVHTTDL (Hát Chầu Văn của người Việt).
                </span>
              </li>
            </ul>
          </div>

          {/* Column 2: Academic and Folk Cultural Studies */}
          <div className="bg-[#1e110c] p-4 rounded-xl border border-amber-900/40">
            <div className="flex items-center gap-2 mb-3 text-amber-300 font-semibold">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Tư liệu Học thuật & Khảo cứu Dân gian</span>
            </div>
            <ul className="space-y-2.5 text-xs text-amber-100/80 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>
                  <strong>GS. Ngô Đức Thịnh:</strong> <em>Đạo Mẫu ở Việt Nam</em> (NXB Khoa học Xã hội, 2010); <em>Đạo Mẫu và các hình thức thờ cúng Nữ thần, Thánh Mẫu ở Việt Nam</em> (NXB KHXH, 1996).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>
                  <strong>Viện Văn hóa Nghệ thuật quốc gia Việt Nam (VICAS):</strong> Kỷ yếu Hội thảo quốc tế "Thực hành Tín ngưỡng thờ Mẫu: Lịch sử, Bản sắc và Đương đại".
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>
                  <strong>Viện Âm nhạc Quốc gia Việt Nam:</strong> Tuyển tập Hát Văn nghi lễ đền phủ Bắc Bộ.
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal Framework */}
          <div className="bg-[#1e110c] p-4 rounded-xl border border-amber-900/40">
            <div className="flex items-center gap-2 mb-3 text-amber-300 font-semibold">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Khung Pháp lý Nhà nước Việt Nam</span>
            </div>
            <ul className="space-y-2.5 text-xs text-amber-100/80 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>
                  <strong>Luật Tín ngưỡng, tôn giáo số 02/2016/QH14:</strong> Quốc hội khóa XIV thông qua ngày 18/11/2016 (Điều 5 về hành vi nghiêm cấm, Điều 6 về quyền tự do tín ngưỡng).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>
                  <strong>Nghị định số 38/2021/NĐ-CP:</strong> Xử phạt vi phạm hành chính trong lĩnh vực văn hóa, lễ hội; xử lý hành vi lợi dụng tín ngưỡng, mê tín dị đoan.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>
                  <strong>Nghị định số 110/2018/NĐ-CP:</strong> Quy định về quản lý và tổ chức lễ hội.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright notice required */}
        <div className="mt-8 pt-4 border-t border-amber-950/90 text-center text-xs text-amber-400/80">
          <p>
            Cổng Thông Tin Hồ Sơ Di Sản Thực Hành Tín Ngưỡng Thờ Mẫu Tam Phủ • Dự án Xã hội Phi Lợi Nhuận
          </p>
          <p className="mt-1 text-amber-300/60">
            Sản phẩm thực tập của sinh viên: <strong className="text-amber-200">Nguyễn Viết Hải</strong> | Mã SV: <strong className="text-amber-200">PH63500</strong> | Nhóm: <strong className="text-amber-200">01</strong> | Chương trình Thực tập sinh Đợt 15 FPT Polytechnic và IMTA TECH.
          </p>
        </div>
      </div>
    </footer>
  );
};
