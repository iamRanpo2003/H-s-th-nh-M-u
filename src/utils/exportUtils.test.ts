/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert';
import {
  exportToJson,
  exportToCsv,
  exportToMarkdown,
  exportToBibTeX,
  escapeCsvField,
} from './exportUtils';
import { DiSanItem } from '../types/heritage';

const sampleRecords: DiSanItem[] = [
  {
    id: 'ds-01',
    ten_chinh_thuc: 'Lễ hội Phủ Dầy',
    ten_goi_khac: 'Lễ hội Đền Mẫu Phủ Dầy',
    loai_hinh: 'Lễ hội truyền thống',
    dia_phuong: 'Nam Định',
    mo_ta_dac_trung: 'Lễ hội gắn với Thánh Mẫu Liễu Hạnh, có kéo chữ "Hoa trượng hội".',
    nghe_nhan_tieu_bieu: 'Nghệ nhân ưu tú Trần Thị Duyên',
    tinh_trang_ghi_danh: 'Di sản văn hóa phi vật thể Quốc gia (2012)',
    nguon_tu_lieu: 'Quyết định số 5079/QĐ-BVHTTDL ngày 27/12/2012 của Bộ VHTTDL',
  },
  {
    id: 'ds-02',
    ten_chinh_thuc: 'Hát Chầu Văn (Hát Văn)',
    loai_hinh: 'Nghệ thuật trình diễn dân gian',
    dia_phuong: 'Nam Định, Hà Nam, Hà Nội',
    mo_ta_dac_trung: 'Âm nhạc phụng vụ tâm linh trong nghi thức hầu đồng với đàn nguyệt, trống bản.',
    nghe_nhan_tieu_bieu: 'NNƯT Trọng Quỳnh',
    tinh_trang_ghi_danh: 'Di sản phi vật thể Quốc gia (2012)',
    nguon_tu_lieu: 'Hồ sơ khoa học di sản văn hóa phi vật thể quốc gia',
  },
];

test('escapeCsvField properly escapes commas, quotes, and newlines', () => {
  assert.strictEqual(escapeCsvField('Hello, World'), '"Hello, World"');
  assert.strictEqual(escapeCsvField('He said "Hi"'), '"He said ""Hi"""');
  assert.strictEqual(escapeCsvField(null), '""');
  assert.strictEqual(escapeCsvField(undefined), '""');
  assert.strictEqual(escapeCsvField('Simple text'), '"Simple text"');
});

test('exportToJson generates valid JSON structure with metadata and all records', () => {
  const jsonStr = exportToJson(sampleRecords);
  const parsed = JSON.parse(jsonStr);

  assert.ok(parsed.metadata);
  assert.strictEqual(parsed.metadata.totalRecords, 2);
  assert.strictEqual(parsed.metadata.student, 'Nguyễn Viết Hải');
  assert.strictEqual(parsed.metadata.studentId, 'PH63500');
  assert.strictEqual(parsed.records.length, 2);
  assert.strictEqual(parsed.records[0].ten_chinh_thuc, 'Lễ hội Phủ Dầy');
});

test('exportToCsv includes UTF-8 BOM and correct column headers', () => {
  const csv = exportToCsv(sampleRecords);

  // Check UTF-8 BOM
  assert.ok(csv.startsWith('\uFEFF'));
  // Check headers present
  assert.ok(csv.includes('"Mã định danh (ID)"'));
  assert.ok(csv.includes('"Tên chính thức"'));
  assert.ok(csv.includes('"Nguồn tư liệu kiểm chứng"'));
  // Check records present
  assert.ok(csv.includes('"Lễ hội Phủ Dầy"'));
  assert.ok(csv.includes('"Hát Chầu Văn (Hát Văn)"'));
});

test('exportToMarkdown creates well-formed Markdown document', () => {
  const md = exportToMarkdown(sampleRecords);

  assert.ok(md.includes('# HỒ SƠ TƯ LIỆU THỰC HÀNH TÍN NGƯỠNG THỜ MẪU TAM PHỦ'));
  assert.ok(md.includes('Nguyễn Viết Hải'));
  assert.ok(md.includes('PH63500'));
  assert.ok(md.includes('## 1. Lễ hội Phủ Dầy'));
  assert.ok(md.includes('## 2. Hát Chầu Văn (Hát Văn)'));
  assert.ok(md.includes('Quyết định số 5079/QĐ-BVHTTDL'));
});

test('exportToBibTeX creates valid academic citation entries', () => {
  const bib = exportToBibTeX(sampleRecords);

  assert.ok(bib.includes('@misc{ds_01_2016,'));
  assert.ok(bib.includes('title = {{Lễ hội Phủ Dầy}}'));
  assert.ok(bib.includes('@misc{ds_02_2016,'));
  assert.ok(bib.includes('title = {{Hát Chầu Văn (Hát Văn)}}'));
});
