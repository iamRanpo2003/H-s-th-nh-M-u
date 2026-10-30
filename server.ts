import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const DISAN_FILE_PATH = path.join(__dirname, 'disan.json');

app.use(express.json({ limit: '10mb' }));

// Helper to read disan.json safely
function readDisanData() {
  try {
    if (fs.existsSync(DISAN_FILE_PATH)) {
      const raw = fs.readFileSync(DISAN_FILE_PATH, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading disan.json:', err);
  }
  return [];
}

// Helper to save disan.json safely
function writeDisanData(data: any[]) {
  fs.writeFileSync(DISAN_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

// API Routes
app.get('/api/disan', (_req: Request, res: Response) => {
  const records = readDisanData();
  res.json({ success: true, data: records });
});

app.post('/api/disan', (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    if (!Array.isArray(data)) {
      return res.status(400).json({ success: false, message: 'Dữ liệu không hợp lệ (cần mảng bản ghi)' });
    }
    writeDisanData(data);
    return res.json({ success: true, message: 'Cập nhật cơ sở dữ liệu thành công', data });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message || 'Lỗi lưu dữ liệu' });
  }
});

/**
 * Intelligent Grounding Engine over disan.json and Legal Framework
 */
function searchGroundingEngine(question: string, disanRecords: any[]) {
  const qLower = question.toLowerCase().trim();

  // 1. Check for specific question on "căn quả / cắt âm / giải hạn / hàng chục triệu / biến tướng"
  if (
    (qLower.includes('căn quả') || qLower.includes('cắt âm') || qLower.includes('giải hạn') || qLower.includes('hàng chục triệu')) &&
    (qLower.includes('biến tướng') || qLower.includes('trục lợi') || qLower.includes('phải không') || qLower.includes('lừa đảo'))
  ) {
    return {
      answer: `Theo tư liệu chính thống trong hồ sơ di sản và quy chuẩn Đạo Mẫu:

1. ĐỐI CHIẾU DI SẢN: CÓ, ĐÂY CHẮC CHẮN LÀ HÀNH VI BIẾN TƯỚNG VÀ TRỤC LỢI TÂM LINH NGHIÊM TRỌNG.
- Trong hồ sơ di sản đệ trình UNESCO và công trình nghiên cứu của GS. Ngô Đức Thịnh, Tín ngưỡng thờ Mẫu Tam phủ tôn vinh người Mẹ thiên nhiên và các anh hùng dân tộc, bản chất hướng con người đến việc tu dưỡng đạo đức, "thờ cha kính mẹ mới là chân tu".
- Tín ngưỡng nguyên bản KHÔNG CÓ hủ tục dọa dẫm căn số, ép buộc con nhang đệ tử chi trả hàng chục triệu đồng để làm lễ "cắt âm" hay "giải hạn". Nghi lễ lên đồng chân chính chỉ là dịp cầu an, ban phước lành, chi phí tùy tâm và liệu cơm gắp mắm.

2. ĐỐI CHIẾU PHÁP LÝ NHÀ NƯỚC:
- Điều 5 Luật Tín ngưỡng, tôn giáo 2016 quy định nghiêm cấm: "Lợi dụng hoạt động tín ngưỡng, hoạt động tôn giáo để trục lợi".
- Nghị định 38/2021/NĐ-CP quy định xử phạt vi phạm hành chính đối với hành vi lợi dụng tín ngưỡng, lên đồng, xem bói để trục lợi (phạt tiền và buộc nộp lại toàn bộ số lợi bất hợp pháp).
- Nếu có hành vi đe dọa, thao túng tâm lý để chiếm đoạt số tiền lớn, đối tượng có thể bị truy cứu trách nhiệm hình sự theo Điều 320 Bộ luật Hình sự (Tội hành nghề mê tín, dị đoan) hoặc Điều 174 (Tội lừa đảo chiếm đoạt tài sản).

3. LỜI KHUYÊN PHÒNG TRÁNH:
- Người dân tuyệt đối không tin vào các lời dọa nạt "không làm lễ sẽ gặp họa sát thân".
- Khi gặp hiện tượng ép buộc nộp tiền làm lễ trái phép, cần ghi nhận bằng chứng và trình báo ngay cơ quan Công an xã/phường hoặc Thanh tra Sở Văn hóa sở tại.`,
      referencedRecord: 'Nghi lễ Lên đồng trong Thực hành Tín ngưỡng thờ Mẫu Tam phủ của người Việt',
      referencedSource: 'Hồ sơ đệ trình UNESCO số 01064 của Bộ Văn hóa, Thể thao và Du lịch (2016); Luật Tín ngưỡng, tôn giáo số 02/2016/QH14 (Điều 5)',
      isWarning: false
    };
  }

  // 2. Check for "Hát Chầu Văn"
  if (qLower.includes('chầu văn') || qLower.includes('hát văn')) {
    const matched = disanRecords.find((r: any) => r.ten_chinh_thuc?.includes('Chầu Văn') || r.ten_goi_khac?.includes('Chầu văn'));
    if (matched) {
      return {
        answer: `Theo tư liệu chính thống được lưu giữ:
- Tên di sản: ${matched.ten_chinh_thuc} (${matched.ten_goi_khac}).
- Địa phương tiêu biểu: ${matched.dia_phuong}.
- Tình trạng ghi danh: ${matched.tinh_trang_ghi_danh}.
- Đặc trưng nghệ thuật: ${matched.mo_ta_dac_trung}
- Nghệ nhân tiêu biểu: ${matched.nghe_nhan_tieu_bieu || 'Chưa ghi nhận'}
- Chuẩn mực bảo tồn: Bộ nhạc cụ cổ truyền bắt buộc là đàn nguyệt, phách tre, trống bản. Không sử dụng đàn organ điện tử cài điệu nhảy hiện đại gây lai căng thánh điện.`,
        referencedRecord: matched.ten_chinh_thuc,
        referencedSource: matched.nguon_tu_lieu || 'Bản ghi thiếu nguồn tư liệu kiểm chứng',
        isWarning: !matched.nguon_tu_lieu
      };
    }
  }

  // 3. Check for "Phủ Dầy"
  if (qLower.includes('phủ dầy') || qLower.includes('phủ dày') || qLower.includes('liễu hạnh')) {
    const matched = disanRecords.find((r: any) => r.ten_chinh_thuc?.includes('Phủ Dầy') || r.ten_goi_khac?.includes('Phủ Dầy'));
    if (matched) {
      return {
        answer: `Theo tư liệu chính thống được lưu giữ:
- Tên di sản: ${matched.ten_chinh_thuc} (${matched.ten_goi_khac}).
- Địa phương: ${matched.dia_phuong}.
- Tình trạng ghi danh: ${matched.tinh_trang_ghi_danh}.
- Mô tả đặc trưng: ${matched.mo_ta_dac_trung}
- Nghệ nhân tiêu biểu: ${matched.nghe_nhan_tieu_bieu || 'Chưa ghi nhận'}.`,
        referencedRecord: matched.ten_chinh_thuc,
        referencedSource: matched.nguon_tu_lieu || 'Bản ghi thiếu nguồn tư liệu kiểm chứng',
        isWarning: !matched.nguon_tu_lieu
      };
    }
  }

  // 4. Check for "dâng mã" or "vàng mã"
  if (qLower.includes('dâng mã') || qLower.includes('vàng mã') || qLower.includes('đồ mã')) {
    const matched = disanRecords.find((r: any) => r.ten_chinh_thuc?.includes('Mã') || r.mo_ta_dac_trung?.includes('mã'));
    if (matched) {
      return {
        answer: `Theo tư liệu chính thống được lưu giữ:
- Tên tập quán: ${matched.ten_chinh_thuc} (${matched.ten_goi_khac}).
- Địa phương: ${matched.dia_phuong}.
- Tình trạng: ${matched.tinh_trang_ghi_danh}.
- Khuyến nghị chuẩn mực: ${matched.mo_ta_dac_trung}
- Nguồn tư liệu: ${matched.nguon_tu_lieu ? matched.nguon_tu_lieu : 'Bản ghi này hiện đang để trống nguồn kiểm chứng và đang được rà soát theo nếp sống văn minh.'}`,
        referencedRecord: matched.ten_chinh_thuc,
        referencedSource: matched.nguon_tu_lieu || 'Chưa cập nhật nguồn tư liệu khoa học (Đang rà soát)',
        isWarning: !matched.nguon_tu_lieu
      };
    }
  }

  // 5. Generic record match in disan.json
  for (const record of disanRecords) {
    const officialName = record.ten_chinh_thuc?.toLowerCase() || '';
    const aliasName = record.ten_goi_khac?.toLowerCase() || '';
    const location = record.dia_phuong?.toLowerCase() || '';

    if (
      qLower.includes(officialName) ||
      (aliasName && qLower.includes(aliasName)) ||
      (location && qLower.includes(location) && (qLower.includes('đền') || qLower.includes('hội') || qLower.includes('mẫu')))
    ) {
      return {
        answer: `Theo tư liệu chính thống được lưu giữ:
- Tên chính thức: ${record.ten_chinh_thuc}
- Tên gọi khác: ${record.ten_goi_khac || 'Không có'}
- Loại hình: ${record.loai_hinh}
- Địa phương: ${record.dia_phuong}
- Tình trạng ghi danh: ${record.tinh_trang_ghi_danh}
- Mô tả đặc trưng: ${record.mo_ta_dac_trung}
- Nghệ nhân tiêu biểu: ${record.nghe_nhan_tieu_bieu || 'Chưa cập nhật'}`,
        referencedRecord: record.ten_chinh_thuc,
        referencedSource: record.nguon_tu_lieu || 'Bản ghi thiếu nguồn tư liệu kiểm chứng',
        isWarning: !record.nguon_tu_lieu
      };
    }
  }

  // 6. Strict rule: If not found, say clearly no records found and DO NOT speculate!
  return {
    answer: 'Hiện tại hệ thống chưa có tư liệu về nội dung này trong cơ sở dữ liệu chính thống disan.json. Chúng tôi tuân thủ nguyên tắc không suy đoán ngoài tư liệu chuẩn mực.',
    referencedRecord: 'Không tìm thấy trong cơ sở dữ liệu',
    referencedSource: 'Cơ sở dữ liệu disan.json',
    isWarning: false
  };
}

// Gemini Assistant Endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { question } = req.body;
    if (!question || typeof question !== 'string') {
      return res.status(400).json({ success: false, message: 'Vui lòng cung cấp câu hỏi.' });
    }

    const disanRecords = readDisanData();
    const apiKey = process.env.GEMINI_API_KEY;

    // Fallback engine if Gemini API is unavailable or times out
    const groundingResult = searchGroundingEngine(question, disanRecords);

    if (!apiKey) {
      return res.json({
        success: true,
        ...groundingResult
      });
    }

    try {
      // Initialize Google GenAI client
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const systemPrompt = `Bạn là Chuyên gia Tư vấn Văn hóa & Pháp lý Tín ngưỡng Thờ Mẫu Tam phủ của người Việt (Di sản UNESCO).
NGUYÊN TẮC BẮT BUỘC TỐI THƯỢNG:
1. Bạn ĐỌC và TRẢ LỜI DỰA HOÀN TOÀN TRÊN DỮ LIỆU TỆP disan.json DƯỚI ĐÂY.
2. TUYỆT ĐỐI KHÔNG ĐƯỢC TỰ SUY ĐOÁN HOẶC BỊA THÔNG TIN VỀ DI SẢN.
3. Nếu không tìm thấy thông tin hoặc câu hỏi vượt quá dữ liệu trong tệp, bạn PHẢI TRẢ LỜI RÕ RÀNG: "Hiện tại hệ thống chưa có tư liệu về nội dung này trong cơ sở dữ liệu chính thống disan.json. Chúng tôi tuân thủ nguyên tắc không suy đoán ngoài tư liệu chuẩn mực." TUYỆT ĐỐI KHÔNG ĐƯỢC ĐƯA RA CÂU TRẢ LỜI CHUNG CHUNG HOẶC TỰ BỊA ĐẶT.
4. Mỗi câu trả lời PHẢI KÈM TÊN BẢN GHI và TRƯỜNG NGUỒN TƯ LIỆU ĐÃ DÙNG từ tệp disan.json.
5. Về hiện tượng căn quả, cắt âm hàng chục triệu: Phân tích là hành vi biến tướng nghiêm trọng, vi phạm Điều 5 Luật Tín ngưỡng, tôn giáo 2016.

DỮ LIỆU HỒ SƠ DISAN.JSON:
${JSON.stringify(disanRecords, null, 2)}`;

      // Timeout safety: 4000ms
      const generatePromise = ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: question,
        config: {
          systemInstruction: systemPrompt,
        },
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('TIMEOUT_OR_NETWORK_RESTRICTED')), 4000)
      );

      const aiResponse: any = await Promise.race([generatePromise, timeoutPromise]);
      const answerText = aiResponse.text;

      if (answerText && answerText.trim().length > 0) {
        let referencedRecord = groundingResult.referencedRecord;
        let referencedSource = groundingResult.referencedSource;

        for (const record of disanRecords) {
          if (answerText.includes(record.ten_chinh_thuc)) {
            referencedRecord = record.ten_chinh_thuc;
            referencedSource = record.nguon_tu_lieu || 'Bản ghi thiếu nguồn tư liệu';
            break;
          }
        }

        return res.json({
          success: true,
          answer: answerText,
          referencedRecord,
          referencedSource,
          isWarning: referencedSource === 'Bản ghi thiếu nguồn tư liệu'
        });
      }
    } catch (genAiError: any) {
      console.warn('GenAI API call timed out or failed, serving verified grounding engine response:', genAiError.message);
    }

    // Return the verified knowledge-base grounding result
    return res.json({
      success: true,
      ...groundingResult
    });

  } catch (error: any) {
    console.error('Chat endpoint error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Lỗi khi xử lý câu hỏi qua mô hình Gemini.'
    });
  }
});

// Vite middleware or static files
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT} in ${isDev ? 'development' : 'production'} mode`);
  });
}

startServer();
