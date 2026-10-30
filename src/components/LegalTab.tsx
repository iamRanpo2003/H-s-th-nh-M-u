import React, { useState } from 'react';
import { 
  Scale, 
  FileText, 
  AlertOctagon, 
  CheckCircle, 
  Building2, 
  PhoneCall, 
  HelpCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const LegalTab: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>('luat2016');

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#2a1711] via-[#471f16] to-[#6b1e1e] text-white p-6 sm:p-8 rounded-2xl shadow-xl border-2 border-amber-500/40">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 text-xs font-semibold mb-2 border border-amber-400/30">
          <Scale className="w-3.5 h-3.5 text-amber-300" />
          Thượng Tôn Pháp Luật Nhà Nước Việt Nam
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-serif-culture text-amber-100">
          Khung Pháp Lý Về Tín Ngưỡng, Tôn Giáo & Lễ Hội
        </h2>
        <p className="text-sm text-amber-100/80 mt-1 max-w-3xl leading-relaxed">
          Nhà nước Cộng hòa Xã hội Chủ nghĩa Việt Nam tôn trọng và bảo hộ quyền tự do tín ngưỡng, tôn giáo của mọi công dân, đồng thời xử lý nghiêm minh mọi hành vi lợi dụng tín ngưỡng để xâm phạm trật tự an toàn xã hội, trục lợi tài sản hoặc hoạt động mê tín dị đoan.
        </p>
      </div>

      {/* Accordion Documents */}
      <div className="space-y-4">
        {/* Document 1: Law on Belief and Religion 2016 */}
        <div className="bg-white rounded-2xl border border-amber-200 shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('luat2016')}
            className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 bg-amber-50/40 hover:bg-amber-100/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#881c1c] text-white">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-red-800 tracking-wider uppercase block">Văn bản nền tảng cao nhất</span>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 font-serif-culture">
                  Luật Tín Ngưỡng, Tôn Giáo Số 02/2016/QH14
                </h3>
                <span className="text-xs text-gray-500">Quốc hội nước CHXHCN Việt Nam thông qua ngày 18/11/2016</span>
              </div>
            </div>
            {expandedSection === 'luat2016' ? (
              <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
            )}
          </button>

          {expandedSection === 'luat2016' && (
            <div className="p-6 border-t border-amber-200 space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed bg-white">
              <div className="p-4 rounded-xl bg-red-50 border-l-4 border-red-600 space-y-2">
                <strong className="text-red-950 block text-sm">Điều 5. Các hành vi bị nghiêm cấm</strong>
                <ul className="list-disc list-inside space-y-1.5 text-gray-700">
                  <li>Xâm phạm quốc phòng, an ninh, chủ quyền quốc gia, trật tự, an toàn xã hội, môi trường.</li>
                  <li>Xâm hại đạo đức xã hội; xâm phạm thân thể, sức khỏe, tính mạng, tài sản; xúc phạm danh dự, nhân phẩm của người khác.</li>
                  <li>Cản trở việc thực hiện quyền và nghĩa vụ công dân.</li>
                  <li><strong>Lợi dụng hoạt động tín ngưỡng, hoạt động tôn giáo để trục lợi.</strong></li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gray-50 border">
                  <strong className="text-gray-900 block mb-1">Điều 6. Quyền tự do tín ngưỡng, tôn giáo:</strong>
                  Mọi người có quyền tự do tín ngưỡng, tôn giáo, theo hoặc không theo một tín ngưỡng, tôn giáo nào. Mỗi người có quyền bày tỏ niềm tin tín ngưỡng, tôn giáo; thực hành lễ nghi tín ngưỡng, tôn giáo.
                </div>
                <div className="p-4 rounded-xl bg-gray-50 border">
                  <strong className="text-gray-900 block mb-1">Điều 12 & Điều 13. Đăng ký hoạt động:</strong>
                  Hoạt động tín ngưỡng của cơ sở tín ngưỡng phải tuân thủ việc đăng ký với Ủy ban nhân dân cấp xã nơi có cơ sở tín ngưỡng theo quy định pháp luật.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Document 2: Decree 38/2021 on Sanctions */}
        <div className="bg-white rounded-2xl border border-amber-200 shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('nd38')}
            className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 bg-amber-50/40 hover:bg-amber-100/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-600 text-white">
                <AlertOctagon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-800 tracking-wider uppercase block">Xử phạt vi phạm hành chính</span>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 font-serif-culture">
                  Nghị Định Số 38/2021/NĐ-CP Của Chính Phủ
                </h3>
                <span className="text-xs text-gray-500">Quy định xử phạt vi phạm hành chính trong lĩnh vực văn hóa và quảng cáo</span>
              </div>
            </div>
            {expandedSection === 'nd38' ? (
              <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
            )}
          </button>

          {expandedSection === 'nd38' && (
            <div className="p-6 border-t border-amber-200 space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed bg-white">
              <div className="p-4 rounded-xl bg-amber-50 border-l-4 border-amber-600 space-y-2">
                <strong className="text-amber-950 block text-sm">Điều 14. Vi phạm quy định về tổ chức lễ hội và nếp sống văn minh:</strong>
                <div className="space-y-2 text-xs">
                  <p>
                    • <strong>Phạt tiền từ 3.000.000 đồng đến 5.000.000 đồng:</strong> Đối với hành vi lợi dụng hoạt động lên đồng, xem bói, gọi hồn để trục lợi; hành vi thắp hương hoặc đốt vàng mã không đúng nơi quy định.
                  </p>
                  <p>
                    • <strong>Phạt tiền từ 5.000.000 đồng đến 10.000.000 đồng:</strong> Đối với hành vi phục hồi phong tục, tập quán gây ảnh hưởng đến sức khỏe, nhân phẩm con người và truyền thống văn hóa dân tộc.
                  </p>
                  <p>
                    • <strong>Biện pháp khắc phục hậu quả:</strong> Buộc nộp lại số lợi bất hợp pháp có được do thực hiện hành vi vi phạm.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900">
                <strong className="block mb-1 font-bold">Xử lý hình sự (Bộ luật Hình sự Điều 320 - Tội hành nghề mê tín, dị đoan):</strong>
                Người nào dùng bói toán, đồng bóng hoặc các hình thức mê tín, dị đoan khác đã bị xử phạt vi phạm hành chính hoặc gây hậu quả nghiêm trọng có thể bị phạt tù từ 06 tháng đến 10 năm tù giam.
              </div>
            </div>
          )}
        </div>

        {/* Document 3: Decree 110/2018 on Festival Management */}
        <div className="bg-white rounded-2xl border border-amber-200 shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('nd110')}
            className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 bg-amber-50/40 hover:bg-amber-100/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-700 text-white">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-800 tracking-wider uppercase block">Quản lý và tổ chức lễ hội</span>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 font-serif-culture">
                  Nghị Định Số 110/2018/NĐ-CP Của Chính Phủ
                </h3>
                <span className="text-xs text-gray-500">Quy định về quản lý và tổ chức lễ hội tín ngưỡng, dân gian trên toàn quốc</span>
              </div>
            </div>
            {expandedSection === 'nd110' ? (
              <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
            )}
          </button>

          {expandedSection === 'nd110' && (
            <div className="p-6 border-t border-amber-200 space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed bg-white">
              <ul className="space-y-2 list-disc list-inside">
                <li>Nghi lễ phải được tiến hành trang trọng, theo nghi thức truyền thống; bảo đảm an ninh trật tự, an toàn xã hội, phòng chống cháy nổ.</li>
                <li>Không lợi dụng việc tổ chức lễ hội nhằm mục đích thương mại hóa, trục lợi; không ép buộc tổ chức, cá nhân tham gia đóng góp kinh phí tổ chức lễ hội.</li>
                <li>Cán bộ, công chức, viên chức không tham gia lễ hội trong giờ làm việc; không sử dụng xe công hoặc tài sản công để đi lễ hội (trừ trường hợp thực hiện nhiệm vụ).</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Guide for reporting violations */}
      <section className="bg-amber-50/80 border border-amber-300 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-[#741515]">
          <PhoneCall className="w-5 h-5" />
          <h3 className="text-lg font-bold font-serif-culture">
            Kênh Phản Ánh & Tiếp Nhận Tố Giác Hành Vi Biến Tướng Trục Lợi
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
          Khi phát hiện cơ sở thờ tự hoặc cá nhân có hành vi đe dọa tống tiền, lừa đảo mở phủ giải hạn trái phép, người dân cần thu thập bằng chứng (ghi âm, tin nhắn, biên nhận tiền) và liên hệ:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <span className="text-xs font-bold text-gray-500 block mb-1">Cơ quan Công an sở tại</span>
            <strong className="text-sm text-gray-900 block">Công an Xã/Phường/Thị trấn</strong>
            <p className="text-xs text-gray-600 mt-1">Đường dây nóng 113 hoặc trực ban công an địa bàn nơi diễn ra sự việc.</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <span className="text-xs font-bold text-gray-500 block mb-1">Thanh tra Văn hóa</span>
            <strong className="text-sm text-gray-900 block">Sở Văn hóa & Thể thao địa phương</strong>
            <p className="text-xs text-gray-600 mt-1">Phòng Quản lý Di sản và Lễ hội tiếp nhận phản ánh sai phạm văn hóa.</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <span className="text-xs font-bold text-gray-500 block mb-1">Chính quyền địa phương</span>
            <strong className="text-sm text-gray-900 block">Ủy ban Nhân dân Xã / Phường</strong>
            <p className="text-xs text-gray-600 mt-1">Bộ phận Tư pháp – Văn hóa xã hội chịu trách nhiệm quản lý di tích cấp cơ sở.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
