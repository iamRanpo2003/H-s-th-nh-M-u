import React from 'react';
import { 
  Award, 
  BookHeart, 
  GraduationCap, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  Building,
  HeartHandshake,
  CheckCircle2
} from 'lucide-react';

export const AboutTab: React.FC = () => {
  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#741515] via-[#8c1c1c] to-[#591010] text-white p-6 sm:p-8 rounded-2xl shadow-xl border-2 border-amber-500/40">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 text-xs font-semibold mb-2 border border-amber-400/30">
          <BookHeart className="w-3.5 h-3.5 text-amber-300" />
          Dự Án Xã Hội Phi Lợi Nhuận
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-serif-culture text-amber-100">
          Giới Thiệu Dự Án & Bản Quyền Khoa Học
        </h2>
        <p className="text-xs sm:text-sm text-amber-100/80 mt-1 max-w-3xl leading-relaxed">
          Cổng thông tin được xây dựng nhằm chuẩn hóa tri thức, bảo vệ sự trong sáng của di sản văn hóa phi vật thể Tín ngưỡng thờ Mẫu Tam phủ của người Việt, đồng thời nâng cao ý thức tuân thủ pháp luật cho cộng đồng tín đồ và thanh đồng đạo quan.
        </p>
      </div>

      {/* Mandatory Internship Attribution Section */}
      <section className="bg-white rounded-2xl border-2 border-amber-300 p-6 sm:p-8 shadow-md space-y-4">
        <div className="flex items-center gap-3 border-b pb-4">
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-900 border border-amber-300">
            <GraduationCap className="w-6 h-6 text-[#741515]" />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-800 tracking-wider uppercase block">Thông tin bản quyền thực hiện</span>
            <h3 className="text-lg sm:text-xl font-bold font-serif-culture text-[#741515]">
              Hồ Sơ Dự Án Thực Tập Sinh
            </h3>
          </div>
        </div>

        {/* Exact text required by prompt */}
        <div className="p-5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs sm:text-sm text-gray-800 leading-relaxed space-y-2">
          <div className="text-base font-semibold text-red-950 font-serif-culture">
            sản phẩm thực tập của [Nguyễn Viết Hải], mã sinh viên [PH63500], Nhóm [01], Chương trình Thực tập sinh Đợt 15 FPT Polytechnic và IMTA TECH, dự án xã hội phi lợi nhuận.
          </div>
          <p className="text-xs text-gray-600">
            Dự án được xây dựng với mục tiêu ứng dụng công nghệ thông tin vào bảo tồn di sản văn hóa dân tộc, cung cấp công cụ đối chiếu thông tin minh bạch, nói không với thương mại hóa và trục lợi tâm linh.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-gray-50 border">
            <span className="text-xs text-gray-500 block">Sinh viên thực hiện:</span>
            <strong className="text-sm text-gray-900">Nguyễn Viết Hải</strong>
            <span className="text-xs text-gray-600 block mt-0.5">Mã SV: PH63500 • Nhóm 01</span>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border">
            <span className="text-xs text-gray-500 block">Đơn vị đào tạo & liên kết:</span>
            <strong className="text-sm text-gray-900">FPT Polytechnic & IMTA TECH</strong>
            <span className="text-xs text-gray-600 block mt-0.5">Chương trình Thực tập sinh Đợt 15</span>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border">
            <span className="text-xs text-gray-500 block">Hình thức vận hành:</span>
            <strong className="text-sm text-emerald-800">Dự án Xã hội Phi Lợi Nhuận</strong>
            <span className="text-xs text-gray-600 block mt-0.5">Mã nguồn mở phục vụ nghiên cứu cộng đồng</span>
          </div>
        </div>
      </section>

      {/* Mandatory Contributors / Data Providers Section */}
      <section className="bg-white rounded-2xl border border-amber-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b pb-4">
          <div className="p-2.5 rounded-xl bg-red-100 text-[#741515]">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-red-800 tracking-wider uppercase block">Tri ân & Kính tạ</span>
            <h3 className="text-lg sm:text-xl font-bold font-serif-culture text-[#741515]">
              Mục Ghi Nhận Người Cung Cấp & Biên Soạn Tư Liệu
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          Ban phát triển dự án xin trân trọng ghi nhận và bày tỏ lòng tri ân sâu sắc đến các nhà khoa học, chuyên gia văn hóa, các cơ quan quản lý di sản và các thế hệ nghệ nhân dân gian đã cống hiến trọn đời để gìn giữ nguồn tư liệu quý báu:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 space-y-1.5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <strong className="text-sm text-gray-900">Cố GS. Ngô Đức Thịnh (1944 – 2020)</strong>
            </div>
            <p className="text-xs text-gray-600 pl-6">
              Nguyên Viện trưởng Viện Nghiên cứu Văn hóa Dân gian Việt Nam, Giám đốc Trung tâm Nghiên cứu và Bảo tồn Văn hóa Tín ngưỡng Việt Nam. Người thầy lớn đã đặt nền móng khoa học vững chắc giải oan và nâng tầm Đạo Mẫu thành Di sản nhân loại.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 space-y-1.5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <strong className="text-sm text-gray-900">Viện Văn hóa Nghệ thuật quốc gia Việt Nam (VICAS)</strong>
            </div>
            <p className="text-xs text-gray-600 pl-6">
              Đơn vị chủ trì xây dựng Hồ sơ quốc gia đệ trình UNESCO ghi danh "Thực hành Tín ngưỡng thờ Mẫu Tam phủ của người Việt" (năm 2016).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 space-y-1.5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <strong className="text-sm text-gray-900">Cục Di sản Văn hóa – Bộ VHTTDL</strong>
            </div>
            <p className="text-xs text-gray-600 pl-6">
              Cơ quan quản lý nhà nước cung cấp các văn bản quy chuẩn, quyết định công nhận di sản phi vật thể và các chỉ thị chấn chỉnh thực hành lễ hội.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 space-y-1.5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <strong className="text-sm text-gray-900">Các Nghệ Nhân Dân Gian & Thủ Nhang Đền Phủ</strong>
            </div>
            <p className="text-xs text-gray-600 pl-6">
              NNND Trần Thị Duyên, NNƯT Đặng Ngọc Anh, NNƯT Nguyễn Tất Kim Hùng cùng các thủ nhang, cung văn tại Quần thể Phủ Dầy (Nam Định), Đền Sòng Sơn (Thanh Hóa), Đền Bảo Hà (Lào Cai).
            </p>
          </div>
        </div>
      </section>

      {/* Non-profit & Cultural Integrity Pledge */}
      <section className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-xs sm:text-sm text-emerald-950 space-y-2">
        <div className="flex items-center gap-2 font-bold text-base text-emerald-900">
          <ShieldCheck className="w-5 h-5 text-emerald-700" />
          <span>Cam Kết Văn Hóa & Tôn Trọng Bản Sắc</span>
        </div>
        <p className="leading-relaxed text-gray-700">
          Dự án tuân thủ nghiêm ngặt quy định: Không thương mại hóa, không thu phí người dùng, không chèn quảng cáo trục lợi và tuyệt đối không tự sinh ảnh hiện vật linh thiêng bằng trí tuệ nhân tạo làm sai lệch di sản truyền thống.
        </p>
      </section>
    </div>
  );
};
