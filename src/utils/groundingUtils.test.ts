import test from 'node:test';
import assert from 'node:assert/strict';
import {
  NO_DATA_RESPONSE,
  searchGroundingEngine,
  normalizeGeminiResponse,
  buildGeminiSystemPrompt,
} from './groundingUtils';
import { DiSanItem } from '../types/heritage';

const sampleRecords: DiSanItem[] = [
  {
    id: 'ds-02',
    ten_chinh_thuc: 'Quần thể Di tích và Lễ hội Phủ Dầy',
    ten_goi_khac: 'Lễ hội Phủ Dầy, Lễ hội Thánh Mẫu Liễu Hạnh',
    loai_hinh: 'Lễ hội truyền thống',
    dia_phuong: 'Xã Kim Thái, Huyện Vụ Bản, Tỉnh Nam Định (tên hành chính cũ trước sắp xếp năm 2025)',
    mo_ta_dac_trung: 'Trung tâm thờ Mẫu tôn vinh Thánh Mẫu Liễu Hạnh vào tháng 3 âm lịch.',
    nghe_nhan_tieu_bieu: 'NNND Trần Thị Duyên',
    tinh_trang_ghi_danh: 'Di sản văn hóa phi vật thể quốc gia (QĐ 5079/QĐ-BVHTTDL)',
    nguon_tu_lieu: 'Cục Di sản Văn hóa (QĐ 5079/QĐ-BVHTTDL); VICAS',
  },
];

test('searchGroundingEngine answers in-app record questions with source name', () => {
  const result = searchGroundingEngine('Lễ hội Phủ Dầy ở đâu và nguồn tư liệu là gì?', sampleRecords);
  assert.ok(result.answer.includes('Quần thể Di tích và Lễ hội Phủ Dầy'));
  assert.ok(result.referencedSource.includes('5079/QĐ-BVHTTDL'));
  assert.equal(result.isUnverified, false);

  const shortQuery = searchGroundingEngine('Phủ Dầy ở đâu và có đặc trưng gì?', sampleRecords);
  assert.ok(shortQuery.answer.includes('Quần thể Di tích và Lễ hội Phủ Dầy'));
  assert.equal(shortQuery.isUnverified, false);

  const outOfScopeTemple = searchGroundingEngine(
    'Giá vé tham quan Đền Ngọc Sơn ở Hoàn Kiếm hôm nay là bao nhiêu?',
    sampleRecords
  );
  assert.ok(outOfScopeTemple.answer.startsWith(NO_DATA_RESPONSE));
  assert.equal(outOfScopeTemple.isUnverified, true);
});

test('searchGroundingEngine returns exact missing phrase and official sources for out-of-scope queries', () => {
  const result = searchGroundingEngine('Giá vé máy bay đi Nhật Bản hôm nay bao nhiêu?', sampleRecords);
  assert.ok(result.answer.startsWith(NO_DATA_RESPONSE));
  assert.ok(result.answer.includes('https://ich.unesco.org'));
  assert.ok(result.answer.includes('http://dsvh.gov.vn/'));
  assert.equal(result.isUnverified, true);
});

test('searchGroundingEngine handles exploitation question using legal framework in app', () => {
  const result = searchGroundingEngine('Cắt âm giải hạn hàng chục triệu đồng có phải biến tướng không?', sampleRecords);
  assert.ok(result.answer.includes('Luật Tín ngưỡng, tôn giáo'));
  assert.ok(result.referencedSource.includes('02/2016/QH14'));
  assert.equal(result.isUnverified, false);
});

test('normalizeGeminiResponse enforces exact NO_DATA_RESPONSE & official links when Gemini reports missing info', () => {
  const fallback = searchGroundingEngine('Đền XYZ không tồn tại', sampleRecords);
  const normalized = normalizeGeminiResponse(
    'Ứng dụng chưa có thông tin này về đền XYZ.',
    fallback,
    sampleRecords
  );
  assert.ok(normalized.answer.includes(NO_DATA_RESPONSE));
  assert.ok(normalized.answer.includes('http://dsvh.gov.vn/'));
  assert.equal(normalized.isUnverified, true);
});

test('buildGeminiSystemPrompt embeds strict NO_DATA_RESPONSE instruction and dataset', () => {
  const prompt = buildGeminiSystemPrompt(sampleRecords);
  assert.ok(prompt.includes(NO_DATA_RESPONSE));
  assert.ok(prompt.includes('Quần thể Di tích và Lễ hội Phủ Dầy'));
});
