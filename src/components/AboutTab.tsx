import React from 'react';
import { 
  GraduationCap, 
  HeartHandshake, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Compass, 
  Sparkles, 
  FileCode2,
  Lock,
  Layers
} from 'lucide-react';

export const AboutTab: React.FC = () => {
  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#741515] via-[#8c1c1c] to-[#591010] text-white p-6 sm:p-8 rounded-2xl shadow-xl border-2 border-amber-500/40">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 text-xs font-semibold mb-2 border border-amber-400/30">
          <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
          Hồ Sơ Dự Án Thực Tập Sinh & Bản Quyền Khoa Học
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-serif-culture text-amber-100">
          Giới Thiệu Ứng Dụng & Thông Tin Sinh Viên
        </h2>
        <p className="text-xs sm:text-sm text-amber-100/80 mt-1 max-w-3xl leading-relaxed">
          Cổng thông tin được xây dựng nhằm mục tiêu chuẩn hóa tri thức, bảo vệ sự trong sáng của di sản văn hóa phi vật thể Tín ngưỡng thờ Mẫu Tam phủ của người Việt, đồng thời nâng cao ý thức tuân thủ pháp luật cho cộng đồng tín đồ và thanh đồng đạo quan.
        </p>
      </div>

      {/* Mandatory Student & Project Credentials Box */}
      <section className="bg-white rounded-2xl border-2 border-amber-400 p-6 sm:p-8 shadow-md space-y-5">
        <div className="flex items-center gap-3 border-b pb-4">
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-900 border border-amber-300">
            <GraduationCap className="w-6 h-6 text-[#741515]" />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-800 tracking-wider uppercase block">Báo cáo thực tập sinh chính thức</span>
            <h3 className="text-lg sm:text-xl font-bold font-serif-culture text-[#741515]">
              Thông Tin Thực Hiện Dự Án
            </h3>
          </div>
        </div>

        {/* Required verbatim declaration */}
        <div className="p-5 rounded-xl bg-amber-50/90 border-2 border-amber-300 text-xs sm:text-sm text-gray-800 leading-relaxed space-y-2">
          <div className="text-base font-bold text-red-950 font-serif-culture">
            sản phẩm thực tập của [Nguyễn Viết Hải], mã sinh viên [PH63500], Nhóm [01], Chương trình Thực tập sinh Đợt 15 FPT Polytechnic và IMTA TECH, dự án xã hội phi lợi nhuận.
          </div>
          <p className="text-xs text-gray-600">
            Dự án là sản phẩm độc lập phục vụ nghiên cứu học tập, bảo tồn di sản văn hóa dân tộc và hỗ trợ cộng đồng nhận diện các hành vi mê tín dị đoan và thương mại hóa tâm linh.
          </p>
        </div>

        {/* Detailed Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <span className="text-xs font-semibold text-gray-500 block mb-1">Tên ứng dụng:</span>
            <strong className="text-sm text-gray-900 block leading-tight font-serif-culture">
              Hồ Sơ Thực Hành Tín Ngưỡng Thờ Mẫu Tam Phủ
            </strong>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <span className="text-xs font-semibold text-gray-500 block mb-1">Họ và tên sinh viên:</span>
            <strong className="text-sm text-gray-900 block font-bold">Nguyễn Viết Hải</strong>
            <span className="text-xs text-gray-600">Mã SV: PH63500</span>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <span className="text-xs font-semibold text-gray-500 block mb-1">Nhóm thực hiện:</span>
            <strong className="text-sm text-gray-900 block font-bold">Nhóm 01</strong>
            <span className="text-xs text-gray-600">TTS Đợt 15 FPT Poly & IMTA TECH</span>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <span className="text-xs font-semibold text-gray-500 block mb-1">Mô hình vận hành:</span>
            <strong className="text-sm text-emerald-800 block font-bold">Dự án Xã hội Phi Lợi Nhuận</strong>
            <span className="text-xs text-gray-600">Mã nguồn mở phi thương mại</span>
          </div>
        </div>
      </section>

      {/* Scope of Heritage Selected */}
      <section className="bg-white rounded-2xl border border-amber-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b pb-3 text-[#741515]">
          <Compass className="w-5 h-5 text-red-700" />
          <h3 className="text-lg font-bold font-serif-culture">
            Phạm Vi Di Sản Đã Chọn Nghiên Cứu
          </h3>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <p>
            • <strong>Đối tượng di sản:</strong> <em>"Thực hành Tín ngưỡng thờ Mẫu Tam phủ của người Việt"</em> – Di sản văn hóa phi vật thể đại diện của nhân loại được UNESCO ghi danh chính thức tại Kỳ họp thứ 11 Ủy ban Liên Chính phủ (tháng 12/2016).
          </p>
          <p>
            • <strong>Địa bàn không gian văn hóa:</strong> Tập trung vào 12 tỉnh/thành phố trung tâm thờ Mẫu cổ truyền phía Bắc và Bắc Trung Bộ gồm: Nam Định (Phủ Dầy), Hà Nội (Phủ Tây Hồ, Đền Rừng), Hà Nam (Đền Lảnh Giang), Lào Cai (Đền Bảo Hà), Thanh Hóa (Đền Sòng Sơn, Đền Chín Giếng), Yên Bái (Đền Đông Cuông), Nghệ An (Đền Hoàng Mười), Hải Dương (Đền Tranh), Lạng Sơn (Đền Bắc Lệ), Tuyên Quang (Cụm Đền Mẫu), Ninh Bình (Đền Dâu, Đền Quán Cháo), Bắc Giang (Đền Suối Mỡ).
          </p>
          <p>
            • <strong>Các thành tố cốt lõi được chuẩn hóa:</strong> Không gian kiến trúc thờ tự đền phủ (Thượng điện, Cung trung, Hạ ban); Quy chuẩn y phục khăn áo Tứ phủ ngũ sắc; Bộ nhạc cụ và 5 thể điệu Hát Chầu Văn mẫu mực; Trình tự 8 bước thực hành khóa hầu đồng; và Bộ khung pháp lý hiện hành (Luật Tín ngưỡng, tôn giáo 2016, Nghị định 38/2021/NĐ-CP).
          </p>
        </div>
      </section>

      {/* Limitations / What is not yet accomplished */}
      <section className="hidden bg-amber-50/70 border-2 border-amber-300 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3 border-b border-amber-300 pb-3 text-amber-950">
          <AlertCircle className="w-5 h-5 text-amber-700" />
          <h3 className="text-lg font-bold font-serif-culture">
            Những Gì Chưa Làm Được & Hướng Phát Triển Tiếp Theo
          </h3>
        </div>

        <div className="space-y-2.5 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <div className="flex items-start gap-2">
            <span className="text-amber-700 font-bold">•</span>
            <span>
              <strong>Số hóa 3D không gian Cung Cấm (Thượng Điện):</strong> Hiện tại ứng dụng mới cung cấp sơ đồ mặt bằng 2D chuẩn tắc; chưa thể thực hiện quét 3D toàn cảnh không gian Cung Cấm của các đại bản đền do quy định thâm nghiêm và bảo mật tâm linh của nhà đền.
            </span>
          </div>

          <div className="flex items-start gap-2">
            <span className="text-amber-700 font-bold">•</span>
            <span>
              <strong>Bản đồ số GIS toàn diện 63 tỉnh thành:</strong> Hiện tại hệ thống đã chuẩn hóa 16 bản ghi di tích đền phủ tiêu biểu nhất; chưa thể định vị vệ tinh chi tiết cho hơn 1.000 ngôi đền, phủ, điện thờ tư gia quy mô nhỏ trên toàn quốc.
            </span>
          </div>

          <div className="flex items-start gap-2">
            <span className="text-amber-700 font-bold">•</span>
            <span>
              <strong>Kho bản thu âm thanh nguyên bản thế kỷ 20:</strong> Chưa thể tích hợp phát trực tiếp toàn bộ các cuộn băng cối thu thanh điệu văn cổ truyền của các nghệ nhân bậc thầy quá cố do vấn đề bản quyền lưu trữ chuyên sâu của Viện Âm nhạc Quốc gia.
            </span>
          </div>

          <div className="flex items-start gap-2">
            <span className="text-amber-700 font-bold">•</span>
            <span>
              <strong>Nhận diện trang phục giá đồng bằng thị giác máy tính (AI Computer Vision):</strong> Chưa xây dựng mô hình AI nhận diện trực tiếp hoa văn khăn áo qua ảnh chụp điện thoại; dự kiến sẽ nghiên cứu phát triển ở giai đoạn nâng cấp tiếp theo.
            </span>
          </div>
        </div>
      </section>

      {/* Contributors and Scope of Permitted Use */}
      <section className="bg-white rounded-2xl border border-amber-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b pb-4">
          <div className="p-2.5 rounded-xl bg-red-100 text-[#741515]">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-red-800 tracking-wider uppercase block">Minh bạch bản quyền & tư liệu</span>
            <h3 className="text-lg sm:text-xl font-bold font-serif-culture text-[#741515]">
              Mục Ghi Nhận Người Cung Cấp & Phạm Vi Được Phép Sử Dụng
            </h3>
          </div>
        </div>

        <div className="space-y-4">
          {/* Contributors acknowledgment */}
          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-2">1. Ghi nhận cơ quan, nhà khoa học và nghệ nhân cung cấp tư liệu:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-gray-700">
              <div className="p-3 bg-gray-50 rounded-lg border">
                <strong>Cố GS. Ngô Đức Thịnh (1944 – 2020):</strong> Tác giả các công trình khảo cứu <em>"Đạo Mẫu ở Việt Nam"</em>, <em>"Đạo Mẫu và các hình thức thờ cúng Nữ thần"</em>.
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border">
                <strong>Viện Văn hóa Nghệ thuật quốc gia Việt Nam (VICAS):</strong> Đơn vị chủ trì xây dựng Hồ sơ di sản đệ trình UNESCO số 01064.
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border">
                <strong>Cục Di sản Văn hóa (Bộ VHTTDL):</strong> Cung cấp hồ sơ công nhận di sản phi vật thể quốc gia và văn bản quy phạm pháp luật.
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border">
                <strong>Các Nghệ nhân Dân gian & Thủ nhang:</strong> NNND Trần Thị Duyên, NNƯT Đặng Ngọc Anh, NNƯT Nguyễn Tất Kim Hùng, NNƯT Trọng Quỳnh cùng cộng đồng thanh đồng đạo quan Bắc Bộ.
              </div>
            </div>
          </div>

          {/* Scope of Permitted Use */}
          <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-300 text-xs sm:text-sm text-emerald-950 space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-900">
              <Lock className="w-4 h-4 text-emerald-700" />
              <span>2. Phạm vi được phép sử dụng tư liệu:</span>
            </div>
            <p className="leading-relaxed text-gray-700 text-xs">
              • Toàn bộ dữ liệu, hình ảnh đồ họa và văn bản trích dẫn trong ứng dụng được phép sử dụng cho mục đích: <strong>Học tập, nghiên cứu khoa học, giảng dạy và tuyên truyền bảo tồn di sản văn hóa phi lợi nhuận</strong> theo tinh thần Giấy phép Bản quyền Mở <em>Creative Commons CC BY-NC-ND 4.0</em> (Ghi công - Phi thương mại - Không phái sinh).
            </p>
            <p className="leading-relaxed text-gray-700 text-xs">
              • <strong>Nghiêm cấm:</strong> Mọi hành vi sao chép, trích xuất dữ liệu để phục vụ quảng cáo thương mại, bán vé, in ấn kinh doanh hoặc sử dụng danh nghĩa dự án để hành nghề bói toán, buôn thần bán thánh, trục lợi tâm linh trái với Điều 5 Luật Tín ngưỡng, tôn giáo 2016.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Architecture & API Key Security */}
      <section className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-xs text-gray-600 space-y-2">
        <div className="flex items-center gap-2 font-semibold text-gray-800">
          <FileCode2 className="w-4 h-4 text-amber-700" />
          <span>Cam kết bảo mật công nghệ & không lộ khóa API:</span>
        </div>
        <p className="leading-relaxed">
          Ứng dụng được thiết kế theo kiến trúc Full-stack bảo mật: Mô hình Gemini 3.8 Flash được kết nối độc quyền thông qua máy chủ Node.js Express Backend proxy (`/api/chat`). Tuyệt đối không lưu trữ hoặc để lộ khóa bí mật API (`GEMINI_API_KEY`) trong mã nguồn JavaScript phía trình duyệt người dùng.
        </p>
      </section>
    </div>
  );
};
