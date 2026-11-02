import test from 'node:test';
import assert from 'node:assert/strict';
import { 
  cleanTextForSpeech, 
  clampSpeechRate, 
  getVoiceLangTag, 
  buildRecordSpeechScript,
  formatSpeechRateLabel,
  isVietnameseVoice,
  filterVietnameseVoices,
  selectBestVoice
} from './speechUtils';
import { DiSanItem } from '../types/heritage';

test('cleanTextForSpeech strips markdown formatting and urls', () => {
  const input = '**Tín ngưỡng thờ Mẫu** là [di sản](https://ich.unesco.org). # Tiêu chuẩn:\n• Điểm 1\n• Điểm 2 ⚠️ ✨';
  const cleaned = cleanTextForSpeech(input);

  assert.doesNotMatch(cleaned, /\*\*/);
  assert.doesNotMatch(cleaned, /https?:\/\//);
  assert.doesNotMatch(cleaned, /#/);
  assert.doesNotMatch(cleaned, /⚠️/);
  assert.doesNotMatch(cleaned, /✨/);
  assert.match(cleaned, /Tín ngưỡng thờ Mẫu là di sản/);
});

test('clampSpeechRate enforces safe speed boundaries for accessibility', () => {
  assert.equal(clampSpeechRate(0.2), 0.5);
  assert.equal(clampSpeechRate(3.0), 1.8);
  assert.equal(clampSpeechRate(1.0), 1.0);
  assert.equal(clampSpeechRate(NaN), 1.0);
});

test('getVoiceLangTag returns correct BCP 47 tags', () => {
  assert.equal(getVoiceLangTag('vi'), 'vi-VN');
  assert.equal(getVoiceLangTag('en'), 'en-US');
});

test('buildRecordSpeechScript generates complete Vietnamese spoken narrative for heritage record', () => {
  const sample: DiSanItem = {
    id: 'test-1',
    ten_chinh_thuc: 'Nghi lễ Chầu văn Nam Định',
    ten_goi_khac: 'Hát văn đền phủ',
    loai_hinh: 'Nghệ thuật trình diễn dân gian',
    dia_phuong: 'Tỉnh Nam Định',
    tinh_trang_ghi_danh: 'Di sản phi vật thể quốc gia',
    nghe_nhan_tieu_bieu: 'Nghệ nhân Ưu tú Trịnh Ngọc Minh',
    mo_ta_dac_trung: 'Gồm dàn nhạc ngũ âm với đàn nguyệt, phách tre, trống bản.',
    nguon_tu_lieu: 'Quyết định số 508/QĐ-BVHTTDL ngày 14/02/2013'
  };

  const script = buildRecordSpeechScript(sample, 'vi');
  assert.equal(script.title, 'Nghi lễ Chầu văn Nam Định');
  assert.match(script.text, /Hồ sơ di sản: Nghi lễ Chầu văn Nam Định/);
  assert.match(script.text, /Tên gọi dân gian: Hát văn đền phủ/);
  assert.match(script.text, /Địa phương thực hành: Tỉnh Nam Định/);
  assert.match(script.text, /Nguồn tư liệu kiểm chứng khoa học: Quyết định số 508/);
  assert.match(script.text, /QĐ-BVHTTDL/);
});

test('formatSpeechRateLabel identifies elderly-friendly speeds', () => {
  const slowLabelVi = formatSpeechRateLabel(0.75, 'vi');
  assert.match(slowLabelVi, /người cao tuổi/i);

  const normalLabelVi = formatSpeechRateLabel(1.0, 'vi');
  assert.match(normalLabelVi, /Chuẩn mực/i);
});

test('voice detection and filtering identifies Vietnamese voices properly', () => {
  const mockVoices = [
    { name: 'Google US English', lang: 'en-US', voiceURI: 'en-1', default: false, localService: true },
    { name: 'Google Tiếng Việt', lang: 'vi-VN', voiceURI: 'vi-1', default: false, localService: true },
    { name: 'Microsoft HoaiMy Online (Natural) - Vietnamese (Vietnam)', lang: 'vi-VN', voiceURI: 'vi-2', default: false, localService: false },
    { name: 'French Voice', lang: 'fr-FR', voiceURI: 'fr-1', default: false, localService: true },
  ] as unknown as SpeechSynthesisVoice[];

  const viVoices = filterVietnameseVoices(mockVoices);
  assert.equal(viVoices.length, 2);
  assert.equal(isVietnameseVoice(mockVoices[1]), true);
  assert.equal(isVietnameseVoice(mockVoices[0]), false);

  const bestVi = selectBestVoice(mockVoices, 'vi');
  assert.ok(bestVi);
  assert.match(bestVi.lang, /vi/i);
});
