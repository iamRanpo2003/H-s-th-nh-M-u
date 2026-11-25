import React from 'react';
import {
  GraduationCap,
  HeartHandshake,
  AlertCircle,
  Compass,
  FileCode2,
  Lock,
} from 'lucide-react';

export const AboutTab: React.FC = () => {
  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#741515] via-[#8c1c1c] to-[#591010] text-white p-5 sm:p-8 rounded-2xl shadow-xl border-2 border-amber-500/40">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 text-xs font-semibold mb-2 border border-amber-400/30">
          <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
          Hồ Sơ Dự Án Thực Tập Sinh & Bản Quyền Khoa Học
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-serif-culture text-amber-100">
          Giới Thiệu Ứng Dụng & Thông Tin Sinh Viên
        </h2>
        <p className="text-base text-amber-100/90 mt-2 max-w-3xl leading-relaxed">
          Cổng thông tin được xây dựng nhằm chuẩn hóa tri thức, bảo vệ sự trong sáng của di sản văn hóa phi vật thể Tín ngưỡng thờ Mẫu Tam phủ của người Việt, đồng thời hỗ trợ cộng đồng tuân thủ pháp luật hiện hành.
        </p>
      </div>

      {/* Student & Project Credentials Box */}
      <section className="bg-white rounded-2xl border-2 border-amber-400 p-5 sm:p-8 shadow-md space-y-5">
        <div className="flex items-center gap-3 border-b pb-4">
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 shrink-0">
            <GraduationCap className="w-6 h-6 text-[#741515]" />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-800 tracking-wider uppercase block">
              Báo cáo thực tập sinh chính thức
            </span>
            <h3 className="text-lg sm:text-xl font-bold font-serif-culture text-[#741515]">
              Thông Tin Thực Hiện Dự Án
            </h3>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-amber-50/90 border-2 border-amber-300 text-base text-gray-800 leading-relaxed space-y-2">
          <div className="text-lg font-bold text-red-950 font-serif-culture">
            Sản phẩm thực tập của Nguyễn Viết Hải, mã sinh viên PH63500, Nhóm 01, Chương trình Thực tập sinh Đợt 15 FPT Polytechnic và IMTA TECH, dự án xã hội phi lợi nhuận.
          </div>
          <p className="text-base text-gray-700">
            Dự án là sản phẩm phục vụ nghiên cứu học tập, bảo tồn di sản văn hóa dân tộc và hỗ trợ cộng đồng nhận diện hành vi mê tín dị đoan, thương mại hóa tâm linh.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <span className="text-sm font-semibold text-gray-600 block mb-1">Tên ứng dụng:</span>
            <strong className="text-base text-gray-900 block leading-snug font-serif-culture">
              Hồ Sơ Thực Hành Tín Ngưỡng Thờ Mẫu Tam Phủ
            </strong>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <span className="text-sm font-semibold text-gray-600 block mb-1">Họ và tên sinh viên:</span>
            <strong className="text-base text-gray-900 block font-bold">Nguyễn Viết Hải</strong>
            <span className="text-base text-gray-700">Mã SV: PH63500</span>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <span className="text-sm font-semibold text-gray-600 block mb-1">Nhóm thực hiện:</span>
            <strong className="text-base text-gray-900 block font-bold">Nhóm 01</strong>
            <span className="text-base text-gray-700">TTS Đợt 15 FPT Poly & IMTA TECH</span>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <span className="text-sm font-semibold text-gray-600 block mb-1">Mô hình vận hành:</span>
            <strong className="text-base text-emerald-800 block font-bold">Dự án Xã hội Phi Lợi Nhuận</strong>
            <span className="text-base text-gray-700">Không thu thập dữ liệu cá nhân</span>
          </div>
        </div>
      </section>

      {/* Scope of Heritage Selected */}
      <section className="bg-white rounded-2xl border border-amber-200 p-5 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b pb-3 text-[#741515]">
          <Compass className="w-5 h-5 text-red-700 shrink-0" />
          <h3 className="text-lg sm:text-xl font-bold font-serif-culture">
            Phạm Vi Di Sản Đã Chọn Nghiên Cứu
          </h3>
        </div>

        <div className="space-y-3 text-base text-gray-700 leading-relaxed">
          <p>
            • <strong>Đối tượng di sản:</strong> <em>&ldquo;Thực hành Tín ngưỡng thờ Mẫu Tam phủ của người Việt&rdquo;</em> – Di sản văn hóa phi vật thể đại diện của nhân loại được UNESCO ghi danh tại Kỳ họp thứ 11 Ủy ban Liên Chính phủ (12/2016).
          </p>
          <p>
            • <strong>Địa bàn không gian văn hóa (tên hành chính cũ theo hồ sơ trước sắp xếp năm 2025):</strong> Tập trung vào các trung tâm thờ Mẫu tiêu biểu gồm: Nam Định (Phủ Dầy), Hà Nội (Phủ Tây Hồ, Đền Rừng), Hà Nam (Đền Lảnh Giang), Lào Cai (Đền Bảo Hà), Thanh Hóa (Đền Sòng Sơn – Đền Chín Giếng), Yên Bái (Đền Đông Cuông), Nghệ An – Hà Tĩnh (Đền Hoàng Mười), Hải Dương (Đền Tranh), Lạng Sơn (Đền Bắc Lệ), Tuyên Quang (Cụm Đền Mẫu), Ninh Bình (Đền Dâu, Đền Quán Cháo), Bắc Giang (Đền Suối Mỡ).
          </p>
          <p>
            • <strong>Các thành tố cốt lõi được chuẩn hóa:</strong> Không gian kiến trúc thờ tự đền phủ; Quy chuẩn y phục Tứ phủ ngũ sắc; Bộ nhạc cụ và thể điệu Hát Chầu Văn mẫu mực; Trình tự 8 bước thực hành khóa hầu đồng; và Khung pháp lý hiện hành (Luật Tín ngưỡng, tôn giáo 2016, Nghị định 38/2021/NĐ-CP, Nghị định 110/2018/NĐ-CP).
          </p>
        </div>
      </section>

      {/* Hidden section preserved per user instruction */}
      <section className="hidden bg-amber-50/70 border-2 border-amber-300 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3 border-b border-amber-300 pb-3 text-amber-950">
          <AlertCircle className="w-5 h-5 text-amber-700" />
          <h3 className="text-lg font-bold font-serif-culture">
            Những Gì Chưa Làm Được & Hướng Phát Triển Tiếp Theo
          </h3>
        </div>
      </section>

      {/* Contributors and Scope of Permitted Use */}
      <section className="bg-white rounded-2xl border border-amber-200 p-5 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b pb-4">
          <div className="p-2.5 rounded-xl bg-red-100 text-[#741515] shrink-0">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-red-800 tracking-wider uppercase block">
              Minh bạch bản quyền & tư liệu
            </span>
            <h3 className="text-lg sm:text-xl font-bold font-serif-culture text-[#741515]">
              Mục Ghi Nhận Người Cung Cấp & Phạm Vi Được Phép Sử Dụng
            </h3>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-gray-900 text-base mb-2">
              1. Ghi nhận cơ quan, nhà khoa học và nghệ nhân cung cấp tư liệu:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-base text-gray-700">
              <div className="p-3.5 bg-gray-50 rounded-lg border">
                <strong>Cố GS. Ngô Đức Thịnh (1944 – 2020):</strong> Tác giả các công trình khảo cứu <em>&ldquo;Đạo Mẫu ở Việt Nam&rdquo;</em>, <em>&ldquo;Đạo Mẫu và các hình thức thờ cúng Nữ thần&rdquo;</em>.
              </div>
              <div className="p-3.5 bg-gray-50 rounded-lg border">
                <strong>Viện Văn hóa Nghệ thuật quốc gia Việt Nam (VICAS):</strong> Đơn vị chủ trì xây dựng Hồ sơ di sản đệ trình UNESCO số 01064.
              </div>
              <div className="p-3.5 bg-gray-50 rounded-lg border">
                <strong>Cục Di sản Văn hóa (Bộ VHTTDL):</strong> Công bố các quyết định ghi danh di sản phi vật thể quốc gia và văn bản quy phạm pháp luật.
              </div>
              <div className="p-3.5 bg-gray-50 rounded-lg border">
                <strong>Các Nghệ nhân Dân gian & Thủ nhang:</strong> NNND Trần Thị Duyên, NNƯT Đặng Ngọc Anh, NNƯT Nguyễn Tất Kim Hùng, NNƯT Trọng Quỳnh cùng các nghệ nhân trong hồ sơ công khai.
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-emerald-50/80 border border-emerald-300 text-base text-emerald-950 space-y-2.5">
            <div className="flex items-center gap-2 font-bold text-emerald-900">
              <Lock className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>2. Phạm vi được phép sử dụng & bảo vệ quyền riêng tư:</span>
            </div>
            <p className="leading-relaxed text-gray-700">
              • Toàn bộ dữ liệu và văn bản trích dẫn trong ứng dụng phục vụ mục đích học tập, nghiên cứu khoa học và bảo tồn di sản phi lợi nhuận theo tinh thần Creative Commons CC BY-NC-ND 4.0.
            </p>
            <p className="leading-relaxed text-gray-700">
              • <strong>Chính sách dữ liệu mở (Open Data):</strong> Hỗ trợ xuất dữ liệu ra tệp JSON, CSV (UTF-8 BOM), Markdown và BibTeX cũng như API <code>/api/disan/export</code> để tái sử dụng cho nghiên cứu.
            </p>
            <p className="leading-relaxed text-gray-700">
              • <strong>Nguyên tắc không xâm phạm riêng tư:</strong> Ứng dụng không yêu cầu đăng nhập, không thu thập dữ liệu cá nhân người truy cập, không công bố thông tin đời tư hay nội dung người giữ tư liệu đề nghị không công bố.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Architecture & API Key Security */}
      <section className="bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-6 text-base text-gray-700 space-y-2">
        <div className="flex items-center gap-2 font-semibold text-gray-900">
          <FileCode2 className="w-5 h-5 text-amber-700 shrink-0" />
          <span>Cam kết bảo mật khóa API phía máy chủ:</span>
        </div>
        <p className="leading-relaxed">
          Chức năng hỏi đáp Gemini kết nối thông qua máy chủ Express Backend proxy (<code>/api/chat</code>), đọc khóa API từ biến môi trường cấu hình riêng trên máy chủ và tuyệt đối không đưa khóa API vào mã nguồn trình duyệt hoặc nhật ký hệ thống.
        </p>
      </section>
    </div>
  );
};
