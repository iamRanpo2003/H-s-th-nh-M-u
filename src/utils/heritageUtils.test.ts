import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isMissingSource,
  formatCitation,
  filterHeritage,
  extractUniqueLocations,
  extractUniqueStatuses
} from './heritageUtils';
import { DiSanItem } from '../types/heritage';

const mockItems: DiSanItem[] = [
  {
    id: '1',
    ten_chinh_thuc: 'Nghi lễ Lên đồng',
    ten_goi_khac: 'Hầu bóng',
    loai_hinh: 'Tập quán',
    dia_phuong: 'Nam Định, Hà Nội',
    mo_ta_dac_trung: 'Diễn xướng tâm linh kết hợp âm nhạc chầu văn',
    nghe_nhan_tieu_bieu: 'NNƯT Đặng Ngọc Anh',
    tinh_trang_ghi_danh: 'UNESCO 2016',
    nguon_tu_lieu: 'Hồ sơ đệ trình UNESCO số 01064'
  },
  {
    id: '2',
    ten_chinh_thuc: 'Lễ hội Đền Sòng',
    ten_goi_khac: 'Đền Mẫu Sòng Sơn',
    loai_hinh: 'Lễ hội',
    dia_phuong: 'Thanh Hóa',
    mo_ta_dac_trung: 'Lễ hội đền Sòng Sơn thờ Mẫu Liễu Hạnh',
    nghe_nhan_tieu_bieu: 'Thủ nhang đền Sòng',
    tinh_trang_ghi_danh: 'Di sản cấp Quốc gia',
    nguon_tu_lieu: '' // Empty source
  }
];

test('isMissingSource correctly identifies empty or whitespace sources', () => {
  assert.equal(isMissingSource(mockItems[0]), false);
  assert.equal(isMissingSource(mockItems[1]), true);
  assert.equal(isMissingSource({ ...mockItems[0], nguon_tu_lieu: '   ' }), true);
});

test('formatCitation generates correct citation string', () => {
  const citation1 = formatCitation(mockItems[0]);
  assert.match(citation1, /\[Hồ sơ Di sản Tín ngưỡng thờ Mẫu\]/);
  assert.match(citation1, /Nghi lễ Lên đồng/);
  assert.match(citation1, /Hồ sơ đệ trình UNESCO số 01064/);

  const citation2 = formatCitation(mockItems[1]);
  assert.match(citation2, /Chưa có thông tin nguồn kiểm chứng chính thức/);
});

test('filterHeritage filters by location and status and keyword', () => {
  const namDinhResults = filterHeritage(mockItems, { diaPhuong: 'Nam Định' });
  assert.equal(namDinhResults.length, 1);
  assert.equal(namDinhResults[0].id, '1');

  const unescoResults = filterHeritage(mockItems, { tinhTrang: 'UNESCO' });
  assert.equal(unescoResults.length, 1);
  assert.equal(unescoResults[0].id, '1');

  const keywordResults = filterHeritage(mockItems, { search: 'chầu văn' });
  assert.equal(keywordResults.length, 1);
  assert.equal(keywordResults[0].id, '1');

  const emptyMatch = filterHeritage(mockItems, { search: 'không tồn tại xyz' });
  assert.equal(emptyMatch.length, 0);
});

test('extractUniqueLocations and extractUniqueStatuses', () => {
  const locations = extractUniqueLocations(mockItems);
  assert.equal(locations.length, 2);
  const statuses = extractUniqueStatuses(mockItems);
  assert.equal(statuses.length, 2);
});
