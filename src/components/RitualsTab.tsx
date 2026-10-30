import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  Shirt, 
  Music, 
  ListOrdered, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

export const RitualsTab: React.FC = () => {
  const [subTab, setSubTab] = useState<'space' | 'costume' | 'music' | 'sequence'>('sequence');

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#7a1717] to-[#992222] text-white p-6 sm:p-8 rounded-2xl shadow-lg border-2 border-amber-500/40">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          Quy Chuẩn Di Sản Văn Hóa Phi Vật Thể Nhân Loại
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-serif-culture text-amber-100">
          Nghi Thức Thực Hành Chuẩn Mực
        </h2>
        <p className="text-sm text-amber-100/80 mt-1 max-w-3xl leading-relaxed">
          Hệ thống hóa quy chuẩn không gian thờ tự, y phục nghi lễ Tứ phủ, dàn nhạc chầu văn và trình tự 8 bước một khóa hầu đồng truyền thống theo đúng hồ sơ khoa học UNESCO và các nghiên cứu của GS. Ngô Đức Thịnh.
        </p>

        {/* Sub Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-6">
          <button
            onClick={() => setSubTab('sequence')}
            className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              subTab === 'sequence'
                ? 'bg-amber-400 text-red-950 shadow-md font-bold'
                : 'bg-white/10 text-amber-100 hover:bg-white/20'
            }`}
          >
            <ListOrdered className="w-4 h-4" />
            <span>Trình tự 8 bước hầu đồng</span>
          </button>

          <button
            onClick={() => setSubTab('costume')}
            className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              subTab === 'costume'
                ? 'bg-amber-400 text-red-950 shadow-md font-bold'
                : 'bg-white/10 text-amber-100 hover:bg-white/20'
            }`}
          >
            <Shirt className="w-4 h-4" />
            <span>Trang phục Tứ phủ</span>
          </button>

          <button
            onClick={() => setSubTab('music')}
            className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              subTab === 'music'
                ? 'bg-amber-400 text-red-950 shadow-md font-bold'
                : 'bg-white/10 text-amber-100 hover:bg-white/20'
            }`}
          >
            <Music className="w-4 h-4" />
            <span>Nhạc Chầu văn</span>
          </button>

          <button
            onClick={() => setSubTab('space')}
            className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              subTab === 'space'
                ? 'bg-amber-400 text-red-950 shadow-md font-bold'
                : 'bg-white/10 text-amber-100 hover:bg-white/20'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Không gian thờ tự</span>
          </button>
        </div>
      </div>

      {/* Content for: Sequence of 8 Steps */}
      {subTab === 'sequence' && (
        <div className="space-y-6">
          <div className="bg-amber-50/80 p-4 rounded-xl border border-amber-200 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-gray-700">
              <strong className="text-amber-950">Quy chuẩn trình tự hầu đồng truyền thống:</strong> Một buổi lên đồng chuẩn mực kéo dài từ 2 đến 4 giờ, thực hiện tuần tự qua các cấp bậc thần linh từ cao xuống thấp (Quan Lớn, Chầu Bà, Quan Hoàng, Tiên Cô, Thánh Cậu). Tuyệt đối Thánh Mẫu không trực tiếp nhập đồng mà chỉ tráng bóng qua khăn phủ diện.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                step: 'Bước 1',
                title: 'Chuẩn Bị Nghi Lễ & Khai Đàn',
                desc: 'Thanh đồng tắm gội thanh tịnh, ăn chay hoặc giữ tâm ý trong sạch; chuẩn bị sắm sanh khăn áo, cơi trầu, hoa quả tươi, hương đăng trà quả tại bản đền bản điện.',
                rule: 'Lễ vật thanh tịnh, tùy tâm, không xa hoa phô trương.',
              },
              {
                step: 'Bước 2',
                title: 'Nghi Lễ Phát Tấu Thỉnh Thánh',
                desc: 'Cung văn dâng văn phát tấu thỉnh sứ giả ngũ phương, thiên quan, phát tấu sớ điệp lên thiên đình xin phép mở đàn hầu.',
                rule: 'Tụng niệm trang nghiêm, khấn thỉnh đúng bài khoa cúng.',
              },
              {
                step: 'Bước 3',
                title: 'Tráng Bóng Tam Tòa Thánh Mẫu',
                desc: 'Thanh đồng ngồi tĩnh tọa, đầu trùm khăn đỏ (khăn phủ diện). Cung văn dâng bài văn thỉnh Mẫu. Thanh đồng làm lễ bái tạ trong trạng thái tĩnh tâm.',
                rule: 'NGUYÊN TẮC BẤT DI BẤT DỊCH: Thánh Mẫu là đấng tối cao, KHÔNG GIÁNG ĐỒNG, chỉ chứng tâm tráng bóng.',
              },
              {
                step: 'Bước 4',
                title: 'Hầu Các Giá Quan Lớn (Đệ Nhất đến Đệ Thập)',
                desc: 'Thanh đồng mở khăn phủ diện, ngự áo Quan lớn (Quan Đệ Nhất áo đỏ, Quan Đệ Nhị áo xanh, Quan Đệ Tam áo trắng, Quan Đệ Tứ áo vàng, Quan Đệ Ngũ Tuần Tranh áo lam). Múa kiếm, cờ lệnh oai nghiêm.',
                rule: 'Phong thái uy dũng, múa kiếm chuẩn xác, không múa loạn xạ.',
              },
              {
                step: 'Bước 5',
                title: 'Hầu Các Giá Chầu Bà (Tứ Phủ Chầu Bà)',
                desc: 'Các giá Chầu Đệ Nhất, Chầu Đệ Nhị, Chầu Đệ Tam, Chầu Đệ Tứ, Chầu Lục, Chầu Mười Đồng Mỏ, Chầu Bé Bắc Lệ... Thanh đồng múa quạt, múa mồi hoa lửa linh thiêng, ban phát lộc hoa quả trái cây.',
                rule: 'Múa mồi khoan thai, trang phục nhã nhặn, tôn trọng bản sắc vùng miền.',
              },
              {
                step: 'Bước 6',
                title: 'Hầu Các Giá Quan Hoàng (Hoàng Bơ, Hoàng Bảy, Hoàng Mười...)',
                desc: 'Thanh đồng khoác áo gấm thêu rồng, thưởng trà sen, ngâm thơ vịnh cảnh, dâng hương, chấm đồng và ban tài lộc, nhắc nhở con cháu giữ đạo hiếu và giữ nghiêm phép nước.',
                rule: 'Tuyệt đối cấm hút thuốc phiện, uống rượu say sưa mất kiểm soát hoặc đánh bạc trá hình.',
              },
              {
                step: 'Bước 7',
                title: 'Hầu Các Giá Tiên Cô & Thánh Cậu',
                desc: 'Các giá Cô Bơ, Cô Chín Sòng Sơn, Cô Bé Thượng Ngàn; Cậu Bơ, Cậu Bé. Vũ điệu vui tươi, chèo thuyền, múa quạt lụa, múa hèo, rải lộc hoa trái bánh kẹo cho con nhang đệ tử.',
                rule: 'Động tác múa thanh thoát, duyên dáng, nghiêm cấm các điệu uốn éo khêu gợi dung tục.',
              },
              {
                step: 'Bước 8',
                title: 'Tạ Lễ & Hoàn Đàn (Hạ Đồ Lễ)',
                desc: 'Sau khi hoàn tất các giá đồng, thanh đồng làm lễ tạ ơn Phật Thánh, hạ đồ lễ, chia đều lộc cho mọi người cùng thụ lộc hoan hỉ, bình đẳng.',
                rule: 'Không tranh cướp lộc, không phát tán tiền polyme gây hỗn loạn nơi tôn nghiêm.',
              },
            ].map((item, idx) => (
              <div 
                key={idx}
                className="bg-white p-5 rounded-xl border border-amber-200/90 shadow-sm hover:border-amber-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-900 text-xs font-bold">
                      {item.step}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">0{idx + 1}/08</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-2 font-serif-culture">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-3">
                    {item.desc}
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-amber-50 text-[11px] text-amber-900 border border-amber-200/60 font-medium">
                  <strong>Chuẩn mực:</strong> {item.rule}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content for: Costume */}
      {subTab === 'costume' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-amber-200 shadow-sm space-y-4">
            <h3 className="text-xl font-bold font-serif-culture text-[#741515]">
              Quy Chuẩn Ngũ Sắc & Y Phục Nghi Lễ Tứ Phủ
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Trang phục trong Tín ngưỡng thờ Mẫu là sự tổng hòa của mỹ thuật dân tộc, biểu trưng cho quyền năng của các vị thánh thuộc 4 cõi vũ trụ. Mọi sự lai căng biến tấu lố lăng đều là vi phạm tính thiêng của di sản.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-red-200 bg-red-50/50">
                <div className="w-8 h-8 rounded-lg bg-red-600 text-white font-bold flex items-center justify-center text-xs mb-3 shadow">
                  Đỏ
                </div>
                <h4 className="font-bold text-red-950 text-sm">Sắc Đỏ - Thiên Phủ</h4>
                <p className="text-xs text-gray-600 mt-1">
                  Đại diện cõi Trời. Dành cho Quan Lớn Đệ Nhất, Chầu Đệ Nhất, Cô Đệ Nhất. Áo mãng đỏ thêu rồng, nét đỏ, trâm cài vàng.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-xs mb-3 shadow">
                  Xanh
                </div>
                <h4 className="font-bold text-emerald-950 text-sm">Sắc Xanh - Nhạc Phủ</h4>
                <p className="text-xs text-gray-600 mt-1">
                  Đại diện miền Rừng Núi. Dành cho Quan Đệ Nhị, Chầu Đệ Nhị, Cô Đôi Thượng Ngàn. Áo thêu hoa cỏ, kiềng bạc hoa cúc, khăn kết kiểu miền sơn cước.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-sky-200 bg-sky-50/50">
                <div className="w-8 h-8 rounded-lg bg-white border border-gray-300 text-sky-900 font-bold flex items-center justify-center text-xs mb-3 shadow">
                  Trắng
                </div>
                <h4 className="font-bold text-sky-950 text-sm">Sắc Trắng - Thoải Phủ</h4>
                <p className="text-xs text-gray-600 mt-1">
                  Đại diện miền Sông Nước. Dành cho Quan Đệ Tam, Chầu Đệ Tam, Cô Bơ Thoải Phủ. Áo trắng thêu lân sóng nước, dải lụa trắng thanh tao.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-white font-bold flex items-center justify-center text-xs mb-3 shadow">
                  Vàng
                </div>
                <h4 className="font-bold text-amber-950 text-sm">Sắc Vàng - Địa Phủ</h4>
                <p className="text-xs text-gray-600 mt-1">
                  Đại diện cõi Đất Đai. Dành cho Quan Đệ Tứ, Chầu Đệ Tứ. Y phục màu vàng thêu hoa văn cổ, toát lên vẻ chững chạc, uy nghi, nhân hậu.
                </p>
              </div>
            </div>

            {/* Warning rules on costume */}
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs sm:text-sm space-y-2 mt-4">
              <div className="flex items-center gap-2 font-bold text-rose-800">
                <ShieldAlert className="w-4 h-4 text-rose-700" />
                <span>Những hành vi vi phạm chuẩn mực trang phục hầu đồng cần bài trừ:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-xs">
                <li>Mặc trang phục hở hang, xuyên thấu hoặc xẻ tà phản cảm trái thuần phong mỹ tục.</li>
                <li>Đính đá sa kề lấp lánh như váy dạ hội sân khấu hoặc đính lông vũ cải biên ngoại lai.</li>
                <li>Sử dụng trang phục cosplay phim kiếm hiệp, triều đại ngoại quốc không thuộc văn hóa trang phục truyền thống Việt Nam.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Content for: Music */}
      {subTab === 'music' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-amber-200 shadow-sm space-y-4">
            <h3 className="text-xl font-bold font-serif-culture text-[#741515]">
              Nghệ Thuật Hát Chầu Văn & Nhạc Cụ Nghi Lễ
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Hát văn (Hát chầu văn) là linh hồn của nghi lễ lên đồng. Lời văn là những áng thi ca ngợi ca chiến công dẹp giặc, hộ quốc an dân của các vị Thánh.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Instruments */}
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200">
                <h4 className="font-bold text-amber-950 text-sm mb-2 flex items-center gap-2">
                  <Music className="w-4 h-4 text-amber-700" />
                  <span>Bộ Nhạc Cụ Cổ Truyền Bắt Buộc</span>
                </h4>
                <ul className="space-y-2 text-xs text-gray-700">
                  <li><strong>Đàn Nguyệt (Kìm):</strong> Nhạc cụ chủ đạo dẫn dắt giai điệu, đòi hỏi tay ngón nhấn nhá điêu luyện thể hiện chất xuất thần.</li>
                  <li><strong>Phách Tre:</strong> Giữ nhịp đập rộn rã, kết hợp uyển chuyển giữa tiếng phách giòn và giọng hát ngâm ngợi.</li>
                  <li><strong>Trống Bản & Trống Con:</strong> Tạo tiết tấu giục giã, rộn ràng khi các giá Quan ra trận múa kiếm hoặc các giá Cô múa quạt.</li>
                  <li><strong>Cảnh (Thanh la), Sáo trúc, Đàn nhị:</strong> Bổ trợ âm sắc thanh thoát, ngân nga miền sông nước, rừng núi.</li>
                </ul>
              </div>

              {/* Rhythms */}
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200">
                <h4 className="font-bold text-amber-950 text-sm mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>Các Thể Điệu Văn Hát Chính</span>
                </h4>
                <ul className="space-y-2 text-xs text-gray-700">
                  <li><strong>Điệu Hát Dọc:</strong> Tiết tấu dứt khoát, hào sảng dùng cho các giá Quan lớn khi phát tấu, ra quân.</li>
                  <li><strong>Điệu Hát Cờn:</strong> Nhịp điệu uyển chuyển, trữ tình, dùng cho các giá Chầu, giá Quan Hoàng ngâm vịnh.</li>
                  <li><strong>Điệu Hát Xá (Xá Thượng, Xá Thoải):</strong> Rộn rã, đậm sắc thái dân ca miền núi Tày, Nùng cho giá Chúa và Cô Bé.</li>
                  <li><strong>Điệu Hát Phú (Phú Chênh, Phú Bình):</strong> Trầm bổng, lắng đọng thể hiện nỗi niềm cứu độ, tích truyện lịch sử.</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-amber-100/60 border border-amber-300 text-xs text-amber-950">
              <strong>Cảnh báo bảo tồn âm nhạc:</strong> Tuyệt đối bài trừ việc đưa đàn organ điện tử cài sẵn điệu disco, remix hoặc hát các bài tân nhạc tình yêu sến súa vào thánh điện làm mất đi tính thiêng liêng cổ truyền.
            </div>
          </div>
        </div>
      )}

      {/* Content for: Space */}
      {subTab === 'space' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-amber-200 shadow-sm space-y-4">
            <h3 className="text-xl font-bold font-serif-culture text-[#741515]">
              Quy Chuẩn Không Gian Thờ Tự & Sắp Đặt Thánh Điện
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Đền, phủ thờ Mẫu được thiết kế theo nguyên tắc trang nghiêm, thanh tịnh. Gian giữa là cung cấm thờ Tam Tòa Thánh Mẫu, tiền đường là nơi thực hành diễn xướng hầu đồng.
            </p>

            <div className="space-y-3 text-xs sm:text-sm text-gray-700">
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 flex items-start gap-3">
                <ChevronRight className="w-4 h-4 text-red-700 mt-1 flex-shrink-0" />
                <div>
                  <strong className="text-gray-900 block">1. Cung Cấm (Thượng Điện):</strong>
                  Nơi thâm nghiêm nhất, chỉ thủ nhang đồng đền được phép vào bao sái, dọn dẹp. Tôn trí tượng Tam Tòa Thánh Mẫu (Đệ Nhất ngự giữa áo đỏ, Đệ Nhị bên trái áo xanh, Đệ Tam bên phải áo trắng).
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 flex items-start gap-3">
                <ChevronRight className="w-4 h-4 text-red-700 mt-1 flex-shrink-0" />
                <div>
                  <strong className="text-gray-900 block">2. Cung Trung & Ban Công Đồng Tứ Phủ:</strong>
                  Thờ Ngũ Vị Tôn Quan, Tứ Phủ Chầu Bà, Thập Vị Quan Hoàng, Thập Nhị Tiên Cô, Thập Vị Triều Cậu. Bên tả thờ Ban Trần Triều (Đức Thánh Trần dẹp giặc), bên hữu thờ Ban Chúa Sơn Trang.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 flex items-start gap-3">
                <ChevronRight className="w-4 h-4 text-red-700 mt-1 flex-shrink-0" />
                <div>
                  <strong className="text-gray-900 block">3. Hạ Ban & Linh Vật Thiêng:</strong>
                  Dưới gầm ban thờ chính là Hạ Ban tôn thờ Quan Ngũ Hổ (năm vị Hổ tướng ngũ phương trấn giữ tà ma) và Đôi Thanh Xà - Bạch Xà vắt trên xà nhà bảo vệ thánh điện.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 flex items-start gap-3">
                <ChevronRight className="w-4 h-4 text-red-700 mt-1 flex-shrink-0" />
                <div>
                  <strong className="text-gray-900 block">4. Chiếu Hầu (Không Gian Diễn Xướng):</strong>
                  Trải chiếu hoa chính diện ban thờ. Thanh đồng ngồi xếp bằng hướng mặt vào ban thờ Phật Thánh; cung văn ngồi bên cánh tả; con nhang đệ tử ngồi hai bên giữ trật tự tôn nghiêm.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
