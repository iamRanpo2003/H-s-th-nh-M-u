import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  HelpCircle, 
  DollarSign, 
  Eye, 
  Flame, 
  Scale,
  Sparkles
} from 'lucide-react';

export const DistinctionTab: React.FC = () => {
  // Self assessment state
  const [answers, setAnswers] = useState<{ [key: string]: boolean | null }>({});
  const [assessmentResult, setAssessmentResult] = useState<string | null>(null);

  const comparisonData = [
    {
      criterion: '1. Tài chính, Chi phí & Tiền Phát Lộc',
      standard: {
        title: 'Thực Hành Chuẩn Mực Dân Gian',
        points: [
          'Chi phí tổ chức hầu đồng gói gọn, liệu cơm gắp mắm, tùy tâm và năng lực kinh tế của gia đình.',
          'Tiền phát lộc mang ý nghĩa tượng trưng ("Một miếng lộc thánh bằng một gánh lộc trần"), dùng tiền mệnh giá nhỏ hoặc bánh kẹo, hoa trái chia đều cho mọi người.',
          'Không dùng tiền bạc để đo lòng thành kính đối với thần linh.',
        ],
      },
      deviant: {
        title: 'Hành Vi Biến Tướng & Trục Lợi',
        points: [
          'Hét giá khóa hầu trăm triệu đến tiền tỷ; ép buộc người mới nhập môn vay mượn nợ nần để làm lễ.',
          'Tung rải cọc tiền polyme mệnh giá 500k, tiền đô la Mỹ gây cảnh xô đẩy, giẫm đạp, tranh cướp hỗn loạn nơi thánh đường.',
          'Khoe khoang của cải, biến nơi tôn nghiêm thành sàn diễn phô trương đẳng cấp tài phiệt trá hình.',
        ],
      },
    },
    {
      criterion: '2. Quan Niệm Về Căn Quả & Giải Hạn Tâm Linh',
      standard: {
        title: 'Thực Hành Chuẩn Mực Dân Gian',
        points: [
          'Căn số là duyên lành để tu tâm dưỡng tính, hướng thiện, hiếu kính cha mẹ và đóng góp cho cộng đồng xã hội.',
          'Thầy đồng có đạo hạnh luôn khuyên giải đệ tử yên tâm làm ăn lương thiện, giữ gìn đạo đức, "thờ cha kính mẹ mới là chân tu".',
          'Không đe dọa, không ép buộc người khác phải bắc ghế hầu đồng.',
        ],
      },
      deviant: {
        title: 'Hành Vi Biến Tướng & Trục Lợi',
        points: [
          'Tự phán người khác "có căn cao bóng nặng, nếu không làm lễ sẽ bị cơ hành phát điên, tán gia bại sản, chết yểu".',
          'Vẽ ra các loại lễ tốn kém: "Cắt âm giải hạn hàng chục triệu", "Mở phủ giá trên trời", trục lợi trên nỗi sợ hãi của nạn nhân.',
          'Lợi dụng danh nghĩa thần thánh để hành nghề bói toán nhảm nhí, lừa đảo chiếm đoạt tài sản.',
        ],
      },
    },
    {
      criterion: '3. Diễn Xướng, Vũ Đạo & Thần Khí Nghi Lễ',
      standard: {
        title: 'Thực Hành Chuẩn Mực Dân Gian',
        points: [
          'Vũ đạo thiêng phản ánh lịch sử và phong tục: múa kiếm hào hùng, múa mồi lung linh, chèo đò thong dong, múa quạt khoan thai.',
          'Thanh đồng giữ tác phong trang nghiêm, thần thái thanh tịnh, tôn trọng không gian thờ tự.',
        ],
      },
      deviant: {
        title: 'Hành Vi Biến Tướng & Trục Lợi',
        points: [
          'Uốn éo, nhảy nhót dung tục, biểu diễn xiếc tạp kỹ quái dị không có trong văn hóa truyền thống.',
          'Có hành vi thô tục, sàm sỡ, nói năng bậy bạ hoặc uống rượu say xỉn quậy phá dưới vỏ bọc "thánh nhập".',
        ],
      },
    },
    {
      criterion: '4. Vàng Mã & Bảo Vệ Môi Trường',
      standard: {
        title: 'Thực Hành Chuẩn Mực Dân Gian',
        points: [
          'Dâng tiến vàng mã mang tính biểu trưng (nón, hia, tráp lễ ngũ sắc) kích thước vừa phải.',
          'Hóa vàng an toàn, tiết kiệm, giữ gìn vệ sinh và phòng cháy chữa cháy theo đúng chỉ đạo của cơ quan quản lý.',
        ],
      },
      deviant: {
        title: 'Hành Vi Biến Tướng & Trục Lợi',
        points: [
          'Đốt hàng xe tải vàng mã khổng lồ (thuyền rồng, nhà lầu, xe hơi, máy bay) gây khói bụi ô nhiễm nghiêm trọng, nguy cơ hỏa hoạn.',
          'Lãng phí hàng chục đến hàng trăm triệu đồng chỉ để thiêu rụi thành tro bụi.',
        ],
      },
    },
  ];

  // Self assessment questions
  const questions = [
    { id: 'q1', text: 'Thầy bói/đồng thầy đe dọa nếu bạn không làm lễ tiền triệu thì gia đình sẽ gặp đại nạn, tán gia bại sản?' },
    { id: 'q2', text: 'Có yêu cầu bạn phải chi trả chi phí bất minh hàng chục đến hàng trăm triệu cho một khóa hầu?' },
    { id: 'q3', text: 'Nơi tổ chức có hiện tượng rải tiền polyme mệnh giá lớn, kích động tranh cướp hỗn loạn?' },
    { id: 'q4', text: 'Có hiện tượng bói toán ra quẻ gở rồi gạ gẫm làm lễ cắt duyên âm, chuộc căn đổi số?' },
    { id: 'q5', text: 'Trang phục và cách múa có biểu hiện hở hang, uốn éo dung tục, nhạc sàn điện tử lai căng?' },
  ];

  const handleAnswer = (qid: string, val: boolean) => {
    setAnswers((prev) => ({ ...prev, [qid]: val }));
  };

  const evaluateRisk = () => {
    const yesCount = Object.values(answers).filter((v) => v === true).length;
    if (Object.keys(answers).length < questions.length) {
      setAssessmentResult('Vui lòng trả lời đầy đủ 5 câu hỏi để nhận kết quả đánh giá chính xác.');
      return;
    }

    if (yesCount === 0) {
      setAssessmentResult('AN TOÀN: Hoạt động bạn tiếp cận có dấu hiệu chuẩn mực, lành mạnh, không có dấu hiệu trục lợi hay mê tín dị đoan.');
    } else if (yesCount <= 2) {
      setAssessmentResult(`CẢNH GIÁC MỨC ĐỘ VỪA (${yesCount}/5 dấu hiệu): Xuất hiện biểu hiện thương mại hóa hoặc dọa nạt tâm linh. Bạn cần tỉnh táo, không nộp các khoản tiền bất thường và tham khảo ý kiến người thân.`);
    } else {
      setAssessmentResult(`NGUY HIỂM CAO (${yesCount}/5 dấu hiệu cảnh báo đỏ): Đây là hành vi biến tướng nghiêm trọng, có dấu hiệu lừa đảo trục lợi tâm linh vi phạm Điều 5 Luật Tín ngưỡng, tôn giáo 2016. Hãy dừng ngay việc chi tiền và báo cho cơ quan công an / chính quyền sở tại nếu bị cưỡng ép.`);
    }
  };

  return (
    <div className="space-y-10">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#881c1c] via-[#741515] to-[#591010] text-white p-6 sm:p-8 rounded-2xl shadow-xl border-2 border-amber-500/40">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-200 text-xs font-semibold mb-2 border border-rose-400/30">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-300" />
          Bảo Vệ Tính Thiêng Của Di Sản UNESCO
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-serif-culture text-amber-100">
          Phân Biệt Chuẩn Mực & Hành Vi Biến Tướng Trục Lợi
        </h2>
        <p className="text-sm text-amber-100/80 mt-1 max-w-3xl leading-relaxed">
          Hiện nay, sự pha tạp và thương mại hóa cực đoan đang làm méo mó giá trị nhân văn của Tín ngưỡng thờ Mẫu. Bảng đối chiếu dưới đây giúp cộng đồng nhận diện rõ ranh giới giữa niềm tin tâm linh chân chính và chiêu trò buôn thần bán thánh.
        </p>
      </div>

      {/* 5 Red Flags Section */}
      <section className="bg-rose-50/70 border-2 border-rose-300 rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-rose-600 text-white rounded-lg shadow">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-rose-950 font-serif-culture">
              5 Dấu Hiệu Cảnh Báo Đỏ Cần Cảnh Giác Ngay Lập Tức
            </h3>
            <p className="text-xs sm:text-sm text-rose-800">
              Nhận diện các chiêu trò tâm lý thao túng để tránh bẫy nợ nần và mê tín dị đoan
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          {[
            {
              num: '01',
              title: 'Dọa dẫm căn quả',
              desc: 'Tuyên bố nạn nhân bị vong theo, nếu không hầu đồng sẽ gặp họa sát thân, tán gia bại sản.',
            },
            {
              num: '02',
              title: 'Hét giá tiền triệu',
              desc: 'Đòi hỏi tiền triệu đến trăm triệu cho tiền đàn mã, sắm lễ xa xỉ không có hóa đơn chứng từ.',
            },
            {
              num: '03',
              title: 'Rải tiền xô bồ',
              desc: 'Tung tiền mệnh giá lớn, kích động đám đông giành giật, dẫm đạp làm hoen ố cửa thiền.',
            },
            {
              num: '04',
              title: 'Múa máy dung tục',
              desc: 'Biểu diễn các động tác phản cảm, uốn éo khiêu khích hoặc trang phục xuyên thấu lố lăng.',
            },
            {
              num: '05',
              title: 'Bói toán truyền bá tà thuyết',
              desc: 'Tự xưng thần nhập để phán bảo nhảm nhí, kích động ly tán gia đình hoặc chữa bệnh mê tín.',
            },
          ].map((flag) => (
            <div key={flag.num} className="bg-white p-4 rounded-xl border border-rose-200 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-black text-rose-600 block mb-1">DẤU HIỆU #{flag.num}</span>
                <h4 className="font-bold text-gray-900 text-sm mb-1.5">{flag.title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{flag.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Side-by-Side Comparison Matrix */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold font-serif-culture text-[#741515]">
            Bảng Đối Chiếu Song Song Toàn Diện
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            So sánh trực quan giữa truyền thống ngàn đời và biến tướng thời hiện đại
          </p>
        </div>

        <div className="space-y-6">
          {comparisonData.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl border border-amber-200 shadow-sm overflow-hidden"
            >
              {/* Category Bar */}
              <div className="bg-[#6b1414] text-amber-200 px-6 py-3 font-bold text-sm sm:text-base font-serif-culture flex items-center justify-between">
                <span>{item.criterion}</span>
                <span className="text-xs font-normal opacity-80">Bộ tiêu chuẩn di sản</span>
              </div>

              {/* Grid 2 columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                {/* Authentic Column */}
                <div className="p-6 bg-emerald-50/30">
                  <div className="flex items-center gap-2 mb-3 text-emerald-800">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <h4 className="font-bold text-sm sm:text-base text-emerald-950">
                      {item.standard.title}
                    </h4>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700 leading-relaxed">
                    {item.standard.points.map((p, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold mt-0.5">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deviant Column */}
                <div className="p-6 bg-rose-50/40">
                  <div className="flex items-center gap-2 mb-3 text-rose-800">
                    <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                    <h4 className="font-bold text-sm sm:text-base text-rose-950">
                      {item.deviant.title}
                    </h4>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700 leading-relaxed">
                    {item.deviant.points.map((p, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="text-rose-600 font-bold mt-0.5">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Risk Assessment Tool */}
      <section className="bg-white rounded-2xl border-2 border-amber-300 p-6 sm:p-8 shadow-md space-y-6">
        <div className="border-b pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
            <Scale className="w-3.5 h-3.5 text-amber-700" />
            Công Cụ Tự Kiểm Tra Trực Tuyến
          </div>
          <h3 className="text-xl font-bold font-serif-culture text-[#741515]">
            Bộ Câu Hỏi Nhận Diện Nguy Cơ Trục Lợi Tâm Linh
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Đánh dấu vào các câu hỏi dưới đây nếu bạn hoặc người thân đang gặp phải tình huống tương tự khi đi lễ hoặc tham gia khóa hầu:
          </p>
        </div>

        <div className="space-y-3">
          {questions.map((q) => (
            <div 
              key={q.id}
              className="p-3.5 sm:p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <HelpCircle className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-gray-800 font-medium">{q.text}</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => handleAnswer(q.id, true)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    answers[q.id] === true
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-white border text-gray-700 hover:bg-rose-50'
                  }`}
                >
                  Có (Có xảy ra)
                </button>
                <button
                  type="button"
                  onClick={() => handleAnswer(q.id, false)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    answers[q.id] === false
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white border text-gray-700 hover:bg-emerald-50'
                  }`}
                >
                  Không có
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t">
          <button
            type="button"
            onClick={evaluateRisk}
            className="px-6 py-2.5 rounded-xl bg-[#881c1c] hover:bg-[#6b1414] text-white font-bold text-sm shadow-md transition-colors"
          >
            Đánh Giá Mức Độ Nguy Cơ
          </button>

          {assessmentResult && (
            <div className={`p-4 rounded-xl text-xs sm:text-sm font-medium flex-1 ${
              assessmentResult.includes('NGUY HIỂM CAO')
                ? 'bg-rose-100 text-rose-950 border border-rose-300'
                : assessmentResult.includes('CẢNH GIÁC')
                ? 'bg-amber-100 text-amber-950 border border-amber-300'
                : 'bg-emerald-100 text-emerald-950 border border-emerald-300'
            }`}>
              {assessmentResult}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
