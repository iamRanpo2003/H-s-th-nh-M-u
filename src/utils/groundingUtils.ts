import { DiSanItem } from '../types/heritage';
import { sourcesList } from '../data/sourcesData';

export const NO_DATA_RESPONSE = 'Ứng dụng chưa có thông tin này';

export const OFFICIAL_SUGGESTION_BLOCK = `Để tra cứu thêm từ nguồn chính thống ngoài dữ liệu hiện có của ứng dụng, Quý vị có thể tham khảo:
- Hồ sơ UNESCO số 01064: https://ich.unesco.org/en/RL/practices-related-to-the-viet-beliefs-in-the-mother-goddesses-of-three-realms-01064
- Cục Di sản Văn hóa (Bộ Văn hóa, Thể thao và Du lịch): http://dsvh.gov.vn/
- Luật Tín ngưỡng, tôn giáo số 02/2016/QH14 (Cổng Thông tin Chính phủ): https://vanban.chinhphu.vn/?pageid=27160&docid=187425`;

export interface GroundingSearchResult {
  answer: string;
  referencedRecord: string;
  referencedSource: string;
  isWarning: boolean;
  isUnverified: boolean;
}

export const IN_APP_STATIC_KNOWLEDGE = {
  tamToa: [
    'Mẫu Đệ Nhất Thượng Thiên (Thiên Phủ – sắc đỏ): Mẫu Liễu Hạnh / Mẫu Cửu Trùng Thanh Vân, ngự cõi Trời.',
    'Mẫu Đệ Nhị Thượng Ngàn (Nhạc Phủ – sắc xanh): Lê Mại Đại Vương / Diệu Tín Thiền Sư, cai quản rừng núi.',
    'Mẫu Đệ Tam Thoải Phủ (Thoải Phủ – sắc trắng): Xích Lân Long Nữ, cai quản sông ngòi, biển hồ.',
    'Mẫu Đệ Tứ Địa Phủ (Địa Phủ – sắc vàng): Địa Tiên Thánh Mẫu, cai quản đất đai, thổ địa.',
  ],
  eightSteps: [
    'Bước 1: Chuẩn bị nghi lễ & khai đàn (tắm gội thanh tịnh, lễ vật tùy tâm).',
    'Bước 2: Nghi lễ phát tấu thỉnh Thánh.',
    'Bước 3: Tráng bóng Tam Tòa Thánh Mẫu (Thánh Mẫu là đấng tối cao, KHÔNG giáng đồng, chỉ chứng tâm tráng bóng qua khăn phủ diện).',
    'Bước 4: Hầu các giá Quan Lớn (Đệ Nhất đỏ, Đệ Nhị xanh, Đệ Tam trắng, Đệ Tứ vàng, Đệ Ngũ Tuần Tranh lam).',
    'Bước 5: Hầu các giá Chầu Bà (múa quạt, múa mồi, ban phát hoa trái).',
    'Bước 6: Hầu các giá Quan Hoàng (Hoàng Bơ, Hoàng Bảy, Hoàng Mười; nghiêm cấm thuốc phiện, rượu say mất kiểm soát).',
    'Bước 7: Hầu các giá Tiên Cô & Thánh Cậu (vũ điệu thanh thoát, cấm động tác dung tục).',
    'Bước 8: Tạ lễ & hoàn đàn (chia đều lộc, không phát tán tiền polyme gây hỗn loạn).',
  ],
  chauVanInstruments:
    'Bộ nhạc cụ cổ truyền bắt buộc: Đàn Nguyệt (Kìm), Phách tre, Trống bản & trống con, Cảnh (thanh la), sáo trúc, đàn nhị. Thể điệu chính: Hát Dọc, Hát Cờn, Hát Xá, Hát Phú, Hãm. Nghiêm cấm đưa nhạc điện tử remix hoặc tân nhạc vào thánh điện.',
  worshipSpace:
    '4 khu vực chính trong đền phủ: (1) Cung Cấm / Thượng Điện thờ Tam Tòa Thánh Mẫu; (2) Cung Trung & Ban Công Đồng Tứ Phủ (tả thờ Ban Trần Triều, hữu thờ Ban Chúa Sơn Trang); (3) Hạ Ban thờ Quan Ngũ Hổ & Đôi Thanh Xà - Bạch Xà; (4) Chiếu Hầu nơi diễn xướng hầu đồng.',
  fiveRedFlags: [
    'Dấu hiệu #01: Dọa dẫm căn quả, ép làm lễ kẻo gặp họa sát thân.',
    'Dấu hiệu #02: Hét giá khóa lễ hàng chục đến hàng trăm triệu đồng.',
    'Dấu hiệu #03: Rải tiền polyme mệnh giá lớn gây xô đẩy, giẫm đạp.',
    'Dấu hiệu #04: Múa máy dung tục, trang phục xuyên thấu hở hang.',
    'Dấu hiệu #05: Bói toán mê tín, truyền bá tà thuyết, trục lợi tâm linh.',
  ],
  legalFramework: [
    'Luật Tín ngưỡng, tôn giáo số 02/2016/QH14 (thông qua 18/11/2016): Điều 5 nghiêm cấm lợi dụng hoạt động tín ngưỡng để trục lợi; Điều 6 bảo hộ quyền tự do tín ngưỡng; Điều 12 & 13 quy định đăng ký hoạt động tín ngưỡng với UBND cấp xã.',
    'Nghị định số 38/2021/NĐ-CP (Điều 14): Phạt tiền 3.000.000–5.000.000 đồng hành vi lợi dụng lên đồng, xem bói, gọi hồn để trục lợi hoặc đốt vàng mã sai quy định; phạt 5.000.000–10.000.000 đồng phục hồi hủ tục ảnh hưởng sức khỏe, nhân phẩm; buộc nộp lại toàn bộ số lợi bất hợp pháp.',
    'Nghị định số 110/2018/NĐ-CP: Quản lý và tổ chức lễ hội trang trọng, an toàn, phòng chống cháy nổ; cấm thương mại hóa, ép đóng góp kinh phí.',
    'Bộ luật Hình sự (Điều 320): Tội hành nghề mê tín, dị đoan có thể bị phạt tù từ 06 tháng đến 10 năm nếu đã bị xử phạt hành chính hoặc gây hậu quả nghiêm trọng.',
  ],
};

function stripDiacritics(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

export function buildNotFoundResponse(reason?: string): GroundingSearchResult {
  const detail = reason ? `\n(${reason})\n` : '\n';
  return {
    answer: `${NO_DATA_RESPONSE}.${detail}\n${OFFICIAL_SUGGESTION_BLOCK}`,
    referencedRecord: 'Không tìm thấy trong dữ liệu ứng dụng',
    referencedSource:
      'Chưa có nguồn trong ứng dụng — Gợi ý tra cứu chính thống: Hồ sơ UNESCO số 01064; Cục Di sản Văn hóa (dsvh.gov.vn); Luật Tín ngưỡng, tôn giáo số 02/2016/QH14',
    isWarning: true,
    isUnverified: true,
  };
}

/**
 * Deterministic grounding search strictly over in-app records and in-app standards.
 * Returns NO_DATA_RESPONSE whenever the question falls outside available app data.
 */
export function searchGroundingEngine(
  question: string,
  disanRecords: DiSanItem[]
): GroundingSearchResult {
  const qLower = question.toLowerCase().trim();
  const qAscii = stripDiacritics(qLower);

  if (!qLower) {
    return buildNotFoundResponse();
  }

  // 1. Deviation / Exploitation / Commercialization ("căn quả / cắt âm / giải hạn / rải tiền / biến tướng")
  if (
    qLower.includes('căn quả') ||
    qLower.includes('cắt âm') ||
    qLower.includes('giải hạn') ||
    qLower.includes('hàng chục triệu') ||
    qLower.includes('trục lợi') ||
    qLower.includes('biến tướng') ||
    qLower.includes('rải tiền') ||
    qLower.includes('mê tín') ||
    qAscii.includes('can qua') ||
    qAscii.includes('cat am') ||
    qAscii.includes('bien tuong')
  ) {
    return {
      answer: `Dựa trên dữ liệu quy chuẩn và khung pháp lý trong ứng dụng:

1. ĐỐI CHIẾU CHUẨN MỰC DI SẢN:
- Trong Thực hành Tín ngưỡng thờ Mẫu Tam phủ, chi phí làm lễ phải tùy tâm và phù hợp điều kiện gia đình. Tín ngưỡng chân chính không có tục dọa dẫm "căn cao bóng nặng" để ép làm lễ cắt âm, giải hạn hàng chục triệu đồng hay tung rải tiền polyme mệnh giá lớn gây hỗn loạn.
- Năm dấu hiệu biến tướng được ứng dụng cảnh báo gồm: dọa dẫm căn quả, hét giá tiền triệu, rải tiền xô bồ, múa máy dung tục và bói toán mê tín.

2. ĐỐI CHIẾU PHÁP LÝ TRONG ỨNG DỤNG:
- Điều 5 Luật Tín ngưỡng, tôn giáo số 02/2016/QH14 nghiêm cấm hành vi lợi dụng hoạt động tín ngưỡng để trục lợi.
- Điều 14 Nghị định số 38/2021/NĐ-CP phạt tiền hành vi lợi dụng lên đồng, xem bói, gọi hồn để trục lợi và buộc nộp lại số lợi bất hợp pháp.
- Điều 320 Bộ luật Hình sự quy định xử lý hình sự đối với tội hành nghề mê tín, dị đoan khi gây hậu quả nghiêm trọng hoặc tái phạm.

3. KÊNH PHẢN ÁNH ĐƯỢC GHI NHẬN TRONG ỨNG DỤNG:
- Người dân thu thập bằng chứng và trình báo Công an xã/phường/thị trấn (đường dây nóng 113), Thanh tra Sở Văn hóa & Thể thao hoặc UBND xã/phường sở tại.`,
      referencedRecord: 'Bộ tiêu chuẩn Phân biệt Biến tướng & Khung Pháp lý Nhà nước',
      referencedSource:
        'Hồ sơ UNESCO số 01064 (2016); Luật Tín ngưỡng, tôn giáo số 02/2016/QH14 (Điều 5); Nghị định 38/2021/NĐ-CP (Điều 14); Bộ luật Hình sự (Điều 320)',
      isWarning: false,
      isUnverified: false,
    };
  }

  // 2. Legal questions covered in LegalTab
  if (
    qLower.includes('luật tín ngưỡng') ||
    qLower.includes('nghị định 38') ||
    qLower.includes('nghị định 110') ||
    qLower.includes('pháp luật') ||
    qLower.includes('điều 5') ||
    qLower.includes('điều 14') ||
    qLower.includes('điều 320') ||
    qLower.includes('xử phạt')
  ) {
    return {
      answer: `Theo mục Khung Pháp lý trong ứng dụng, hệ thống hiện lưu trữ các quy định sau:
- Luật Tín ngưỡng, tôn giáo số 02/2016/QH14 (18/11/2016): Điều 5 nghiêm cấm lợi dụng tín ngưỡng để trục lợi; Điều 6 quy định quyền tự do tín ngưỡng; Điều 12 và 13 quy định đăng ký hoạt động với UBND cấp xã.
- Nghị định số 38/2021/NĐ-CP (Điều 14): Phạt 3–5 triệu đồng hành vi lợi dụng lên đồng, xem bói, gọi hồn để trục lợi hoặc đốt vàng mã sai nơi quy định; phạt 5–10 triệu đồng hành vi phục hồi hủ tục ảnh hưởng sức khỏe, nhân phẩm; buộc nộp lại lợi bất hợp pháp.
- Nghị định số 110/2018/NĐ-CP: Quy định tổ chức lễ hội trang trọng, an toàn, không thương mại hóa hoặc ép buộc đóng góp kinh phí.
- Bộ luật Hình sự (Điều 320): Xử lý hình sự tội hành nghề mê tín, dị đoan từ 06 tháng đến 10 năm tù khi đủ yếu tố cấu thành.`,
      referencedRecord: 'Khung Pháp Lý Về Tín Ngưỡng, Tôn Giáo & Lễ Hội',
      referencedSource:
        'Luật Tín ngưỡng, tôn giáo số 02/2016/QH14; Nghị định 38/2021/NĐ-CP; Nghị định 110/2018/NĐ-CP; Bộ luật Hình sự (Điều 320)',
      isWarning: false,
      isUnverified: false,
    };
  }

  // 3. Specific Heritage Records matching
  // Extract distinctive words and 2-word phrases across title, alias, and location
  const stopTokens = new Set([
    'di', 'tich', 'lich', 'su', 'le', 'hoi', 'tin', 'nguong', 'tho', 'mau', 'tam', 'phu',
    'nguoi', 'viet', 'den', 'chua', 'cua', 'cac', 'nhung', 'trong', 'theo', 'nao', 'sao',
    'co', 'khong', 'la', 'gi', 've', 'van', 'hoa', 'quoc', 'gia', 'tinh', 'huyen', 'xa', 'phuong',
    'nam', '2025', 'sap', 'xep', 'don', 'vi', 'hanh', 'chinh', 'nguon', 'tu', 'lieu', 'nghe', 'nhan',
    'quan', 'the', 'cum', 'thang', 'canh', 'ten', 'hanh', 'cu', 'truoc', 'va', 'o', 'dau', 'dac', 'trung',
    'thanh', 'pho', 'thi', 'tieu', 'bieu', 'thuc', 'hanh'
  ]);

  let bestRecord: DiSanItem | null = null;
  let bestScore = 0;

  for (const record of disanRecords) {
    const titleL = record.ten_chinh_thuc.toLowerCase();
    const aliasL = (record.ten_goi_khac || '').toLowerCase();
    const locL = record.dia_phuong.toLowerCase();

    if (qLower.includes(titleL) || (aliasL && aliasL.length > 4 && qLower.includes(aliasL))) {
      bestRecord = record;
      bestScore = 100;
      break;
    }

    const phraseSources = [titleL, ...(aliasL ? aliasL.split(/[,;]/).map((s) => s.trim()) : []), locL];
    let score = 0;

    for (const src of phraseSources) {
      const words = src
        .replace(/[^\p{L}\p{N}\s]/gu, ' ')
        .split(/\s+/)
        .filter((w) => w.length >= 2);

      // 2-word distinctive phrases (e.g. "phủ dầy", "bảo hà", "tây hồ", "sòng sơn", "suối mỡ")
      for (let i = 0; i < words.length - 1; i++) {
        const w1 = words[i];
        const w2 = words[i + 1];
        const w1Ascii = stripDiacritics(w1);
        const w2Ascii = stripDiacritics(w2);
        // Require at least one word in the bigram to NOT be a generic stop token
        if (stopTokens.has(w1Ascii) && stopTokens.has(w2Ascii)) continue;

        const bigram = `${w1} ${w2}`;
        const bigramAscii = `${w1Ascii} ${w2Ascii}`;
        if (qLower.includes(bigram)) {
          score += 6;
        } else if (qAscii.includes(bigramAscii)) {
          score += 5;
        }
      }

      // Single distinctive tokens
      const uniqueWords = Array.from(new Set(words));
      for (const w of uniqueWords) {
        const wAscii = stripDiacritics(w);
        if (wAscii.length < 3 || stopTokens.has(wAscii)) continue;
        if (qLower.includes(w)) {
          score += w.length >= 5 ? 2 : 1;
        }
      }
    }

    if (score > bestScore && score >= 4) {
      bestScore = score;
      bestRecord = record;
    }
  }

  if (bestRecord) {
    const hasSource = Boolean(bestRecord.nguon_tu_lieu && bestRecord.nguon_tu_lieu.trim());
    return {
      answer: `Theo dữ liệu hồ sơ lưu trữ trong ứng dụng:
- Tên chính thức: ${bestRecord.ten_chinh_thuc}
- Tên gọi khác: ${bestRecord.ten_goi_khac || 'Không ghi nhận'}
- Loại hình: ${bestRecord.loai_hinh}
- Địa phương: ${bestRecord.dia_phuong}
- Tình trạng ghi danh: ${bestRecord.tinh_trang_ghi_danh}
- Mô tả đặc trưng: ${bestRecord.mo_ta_dac_trung}
- Nghệ nhân / Chủ thể tiêu biểu: ${bestRecord.nghe_nhan_tieu_bieu || 'Chưa ghi nhận trong hồ sơ'}`,
      referencedRecord: bestRecord.ten_chinh_thuc,
      referencedSource: hasSource ? bestRecord.nguon_tu_lieu : 'Chưa có nguồn kiểm chứng trong bản ghi [CẦN BỔ SUNG]',
      isWarning: !hasSource,
      isUnverified: !hasSource,
    };
  }

  // 4. General Rituals & Tam Toa questions covered in RitualsTab / HomeTab
  if (
    qLower.includes('tam tòa') ||
    qLower.includes('tứ phủ') ||
    qLower.includes('màu sắc') ||
    qLower.includes('trang phục') ||
    qLower.includes('8 bước') ||
    qLower.includes('hầu đồng') ||
    qLower.includes('cung cấm') ||
    qLower.includes('nhạc cụ') ||
    qLower.includes('vàng mã') ||
    qLower.includes('chầu văn')
  ) {
    return {
      answer: `Theo phần Quy chuẩn Thực hành và Hệ thống Tam Tòa Thánh Mẫu trong ứng dụng:
- Hệ thống Tam Tòa & Tứ Phủ:
  + ${IN_APP_STATIC_KNOWLEDGE.tamToa[0]}
  + ${IN_APP_STATIC_KNOWLEDGE.tamToa[1]}
  + ${IN_APP_STATIC_KNOWLEDGE.tamToa[2]}
  + ${IN_APP_STATIC_KNOWLEDGE.tamToa[3]}
- Trình tự 8 bước hầu đồng: từ Bước 1 Chuẩn bị khai đàn, Bước 2 Phát tấu, Bước 3 Tráng bóng Tam Tòa Thánh Mẫu (Thánh Mẫu không trực tiếp giáng đồng), các giá Quan Lớn, Chầu Bà, Quan Hoàng, Tiên Cô – Thánh Cậu đến Bước 8 Tạ lễ hoàn đàn.
- Âm nhạc & Không gian: ${IN_APP_STATIC_KNOWLEDGE.chauVanInstruments} Vàng mã chỉ mang tính biểu trưng, đốt an toàn tiết kiệm, tránh lãng phí ô nhiễm.`,
      referencedRecord: 'Nghi thức Thực hành Chuẩn mực & Khái quát Tam Tòa Thánh Mẫu',
      referencedSource:
        'Hồ sơ UNESCO số 01064 (2016); GS. Ngô Đức Thịnh ("Đạo Mẫu ở Việt Nam", NXB KHXH, 2010); Viện Âm nhạc Quốc gia Việt Nam',
      isWarning: false,
      isUnverified: false,
    };
  }

  // 5. Fallback: strictly refuse speculation and return mandatory exact phrase + official sources
  return buildNotFoundResponse();
}

/**
 * Builds strict grounding system prompt restricting Gemini to in-app data only.
 */
export function buildGeminiSystemPrompt(disanRecords: DiSanItem[]): string {
  return `Bạn là Trợ lý Tra cứu Tư liệu Di sản của ứng dụng "Hồ Sơ Thực Hành Tín Ngưỡng Thờ Mẫu Tam Phủ".

QUY TẮC TỐI THƯỢNG – TUYỆT ĐỐI TUÂN THỦ:
1. CHỈ ĐƯỢC PHÉP trả lời dựa trên dữ liệu có sẵn trong ứng dụng được cung cấp dưới đây (bao gồm 16+ bản ghi di sản disan.json, quy chuẩn nghi lễ, bảng phân biệt biến tướng, khung pháp lý và danh mục nguồn tư liệu).
2. TUYỆT ĐỐI KHÔNG dùng kiến thức bên ngoài, KHÔNG tự suy đoán, KHÔNG bịa đặt sự kiện lịch sử, địa danh mới chưa có trong dữ liệu, năm ban hành hoặc đường dẫn nguồn.
3. NẾU câu hỏi nằm ngoài dữ liệu trong ứng dụng hoặc dữ liệu ứng dụng không đề cập tới (ví dụ: đền/phủ không có trong danh sách, nhân vật lịch sử ngoài hồ sơ, thông tin đời tư, sự kiện thời sự, chủ đề ngoài Tín ngưỡng thờ Mẫu...):
   BẠN PHẢI BẮT ĐẦU CÂU TRẢ LỜI BẰNG CỤM TỪ CHÍNH XÁC:
   "${NO_DATA_RESPONSE}"
   Sau đó liệt kê gợi ý các nguồn chính thống sau để người dùng tự tra cứu:
   ${OFFICIAL_SUGGESTION_BLOCK}
4. MỖI câu trả lời BẮT BUỘC phải ghi rõ ở cuối mục **"Nguồn đã dùng:"** với tên nguồn cụ thể trích từ dữ liệu ứng dụng.
5. Phần nào dữ liệu trong ứng dụng chỉ ghi nhận khung chung mà chưa có chi tiết kiểm chứng riêng (hoặc có nhãn [CẦN BỔ SUNG]), phải ghi chú rõ là "[Chưa có tư liệu chi tiết trong ứng dụng để kiểm chứng thêm]".
6. Về địa danh: giữ đúng chú thích đơn vị hành chính trước sắp xếp năm 2025 nếu bản ghi ghi nhận tên cũ.

--- DỮ LIỆU TRONG ỨNG DỤNG ---
[A. HỆ THỐNG TAM TÒA THÁNH MẪU & NGHI THỨC CHUẨN MỰC]
${IN_APP_STATIC_KNOWLEDGE.tamToa.join('\n')}
Trình tự 8 bước: ${IN_APP_STATIC_KNOWLEDGE.eightSteps.join(' | ')}
Nhạc Chầu văn: ${IN_APP_STATIC_KNOWLEDGE.chauVanInstruments}
Không gian thờ tự: ${IN_APP_STATIC_KNOWLEDGE.worshipSpace}

[B. DẤU HIỆU BIẾN TƯỚNG & KHUNG PHÁP LÝ]
5 dấu hiệu đỏ: ${IN_APP_STATIC_KNOWLEDGE.fiveRedFlags.join(' | ')}
Pháp luật: ${IN_APP_STATIC_KNOWLEDGE.legalFramework.join('\n')}

[C. CÁC BẢN GHI DI SẢN (disan.json)]
${JSON.stringify(disanRecords, null, 2)}

[D. DANH MỤC NGUỒN TƯ LIỆU TRONG ỨNG DỤNG]
${JSON.stringify(
    sourcesList.map((s) => ({
      id: s.id,
      title: s.title,
      publisher: s.publisher,
      year: s.year,
      url: s.url,
    })),
    null,
    2
  )}`;
}

/**
 * Post-processes Gemini text output to guarantee source attribution and strict
 * NO_DATA_RESPONSE normalization when Gemini states data is missing.
 */
export function normalizeGeminiResponse(
  rawText: string,
  fallbackResult: GroundingSearchResult,
  disanRecords: DiSanItem[]
): GroundingSearchResult {
  const trimmed = (rawText || '').trim();
  if (!trimmed) {
    return fallbackResult;
  }

  const lower = trimmed.toLowerCase();
  const indicatesMissing =
    lower.includes('ứng dụng chưa có thông tin này') ||
    lower.includes('chưa có thông tin này') ||
    lower.includes('không có trong dữ liệu') ||
    lower.includes('không tìm thấy trong dữ liệu');

  if (indicatesMissing) {
    const hasSuggestions = lower.includes('unesco') || lower.includes('dsvh.gov.vn');
    return {
      answer: hasSuggestions
        ? trimmed
        : `${NO_DATA_RESPONSE}.\n\n${OFFICIAL_SUGGESTION_BLOCK}`,
      referencedRecord: 'Không có trong dữ liệu ứng dụng',
      referencedSource:
        'Chưa có nguồn trong ứng dụng — Gợi ý tra cứu: Hồ sơ UNESCO số 01064; Cục Di sản Văn hóa (dsvh.gov.vn); Luật Tín ngưỡng, tôn giáo 02/2016/QH14',
      isWarning: true,
      isUnverified: true,
    };
  }

  let referencedRecord = fallbackResult.referencedRecord;
  let referencedSource = fallbackResult.referencedSource;

  for (const record of disanRecords) {
    if (trimmed.includes(record.ten_chinh_thuc)) {
      referencedRecord = record.ten_chinh_thuc;
      referencedSource = record.nguon_tu_lieu || 'Chưa có nguồn kiểm chứng [CẦN BỔ SUNG]';
      break;
    }
  }

  if (referencedRecord === 'Không tìm thấy trong dữ liệu ứng dụng') {
    if (lower.includes('luật') || lower.includes('nghị định') || lower.includes('điều 5')) {
      referencedRecord = 'Khung Pháp Lý Về Tín Ngưỡng, Tôn Giáo & Lễ Hội';
      referencedSource = 'Luật Tín ngưỡng, tôn giáo 02/2016/QH14; Nghị định 38/2021/NĐ-CP; Nghị định 110/2018/NĐ-CP';
    } else if (lower.includes('tam tòa') || lower.includes('hầu đồng') || lower.includes('chầu văn')) {
      referencedRecord = 'Quy chuẩn Nghi thức Thực hành trong ứng dụng';
      referencedSource = 'Hồ sơ UNESCO số 01064 (2016); GS. Ngô Đức Thịnh (NXB KHXH, 2010)';
    }
  }

  return {
    answer: trimmed,
    referencedRecord,
    referencedSource,
    isWarning: !referencedSource || referencedSource.includes('CẦN BỔ SUNG'),
    isUnverified: false,
  };
}
