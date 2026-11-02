/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DiSanItem } from '../types/heritage';

export interface ExportMetadata {
  title: string;
  source: string;
  license: string;
  exportedAt: string;
  totalRecords: number;
  project: string;
  student: string;
  studentId: string;
}

/**
 * Generates structured JSON string with metadata
 */
export function exportToJson(
  records: DiSanItem[],
  customMetadata?: Partial<ExportMetadata>
): string {
  const metadata: ExportMetadata = {
    title: 'Hồ Sơ Thực Hành Tín Ngưỡng Thờ Mẫu Tam Phủ Của Người Việt',
    source: 'Hệ sinh thái chuẩn hóa Di sản Văn hóa phi vật thể UNESCO 2016',
    license: 'Creative Commons CC BY-NC-ND 4.0 (Phi thương mại - Ghi công)',
    exportedAt: new Date().toISOString(),
    totalRecords: records.length,
    project: 'Chương trình Thực tập sinh Đợt 15 FPT Polytechnic và IMTA TECH',
    student: 'Nguyễn Viết Hải',
    studentId: 'PH63500',
    ...customMetadata,
  };

  return JSON.stringify(
    {
      metadata,
      records,
    },
    null,
    2
  );
}

/**
 * Escapes a single CSV field value according to RFC 4180
 */
export function escapeCsvField(value: string | undefined | null): string {
  if (value === undefined || value === null) {
    return '""';
  }
  const stringValue = String(value);
  // Replace internal quotes with double quotes
  const escaped = stringValue.replace(/"/g, '""');
  return `"${escaped}"`;
}

/**
 * Generates CSV string with UTF-8 BOM for Microsoft Excel / Google Sheets compatibility
 */
export function exportToCsv(records: DiSanItem[]): string {
  const BOM = '\uFEFF';
  const headers = [
    'Mã định danh (ID)',
    'Tên chính thức',
    'Tên gọi khác',
    'Loại hình di sản',
    'Địa phương',
    'Mô tả đặc trưng',
    'Nghệ nhân tiêu biểu',
    'Tình trạng ghi danh',
    'Nguồn tư liệu kiểm chứng',
  ];

  const headerRow = headers.map(h => escapeCsvField(h)).join(',');

  const rows = records.map(r => {
    return [
      escapeCsvField(r.id),
      escapeCsvField(r.ten_chinh_thuc),
      escapeCsvField(r.ten_goi_khac || ''),
      escapeCsvField(r.loai_hinh),
      escapeCsvField(r.dia_phuong),
      escapeCsvField(r.mo_ta_dac_trung),
      escapeCsvField(r.nghe_nhan_tieu_bieu || 'Chưa ghi nhận'),
      escapeCsvField(r.tinh_trang_ghi_danh),
      escapeCsvField(r.nguon_tu_lieu || 'Chưa có nguồn kiểm chứng'),
    ].join(',');
  });

  return BOM + [headerRow, ...rows].join('\r\n');
}

/**
 * Generates structured Markdown research dossier (.md)
 */
export function exportToMarkdown(records: DiSanItem[]): string {
  const dateStr = new Date().toLocaleDateString('vi-VN');
  let md = `# HỒ SƠ TƯ LIỆU THỰC HÀNH TÍN NGƯỠNG THỜ MẪU TAM PHỦ\n\n`;
  md += `> **Dự án:** Hồ Sơ Thực Hành Tín Ngưỡng Thờ Mẫu Tam Phủ\n`;
  md += `> **Người thực hiện:** Nguyễn Viết Hải (Mã SV: PH63500) - Nhóm 01\n`;
  md += `> **Chương trình:** Thực tập sinh Đợt 15 FPT Polytechnic và IMTA TECH (Dự án xã hội phi lợi nhuận)\n`;
  md += `> **Bản quyền:** Creative Commons CC BY-NC-ND 4.0\n`;
  md += `> **Ngày xuất:** ${dateStr} | **Tổng số hồ sơ:** ${records.length} bản ghi\n\n`;
  md += `---\n\n`;

  records.forEach((r, idx) => {
    md += `## ${idx + 1}. ${r.ten_chinh_thuc}\n\n`;
    if (r.ten_goi_khac) {
      md += `* **Tên gọi khác:** ${r.ten_goi_khac}\n`;
    }
    md += `* **Địa phương tiêu biểu:** ${r.dia_phuong}\n`;
    md += `* **Loại hình di sản:** ${r.loai_hinh}\n`;
    md += `* **Tình trạng ghi danh:** ${r.tinh_trang_ghi_danh}\n`;
    md += `* **Nghệ nhân tiêu biểu:** ${r.nghe_nhan_tieu_bieu || 'Cộng đồng thanh đồng và thủ nhang địa phương'}\n\n`;
    md += `### Đặc trưng & Giá trị văn hóa\n\n${r.mo_ta_dac_trung}\n\n`;
    md += `> **Nguồn tư liệu kiểm chứng:** ${r.nguon_tu_lieu || 'Chưa có nguồn kiểm chứng'}\n\n`;
    md += `---\n\n`;
  });

  return md;
}

/**
 * Generates BibTeX citations for academic researchers
 */
export function exportToBibTeX(records: DiSanItem[]): string {
  return records
    .map(r => {
      // Clean ID for BibTeX key
      const key = (r.id || 'tho_mau')
        .replace(/[^a-zA-Z0-9_]/g, '_')
        .toLowerCase();
      const title = r.ten_chinh_thuc.replace(/[{}]/g, '');
      const note = (r.nguon_tu_lieu || 'Hồ sơ Di sản Thờ Mẫu').replace(/[{}]/g, '');
      const location = r.dia_phuong.replace(/[{}]/g, '');

      return `@misc{${key}_2016,
  title = {{${title}}},
  author = {{Bộ Văn hóa, Thể thao và Du lịch Việt Nam}},
  howpublished = {Hồ sơ di sản văn hóa phi vật thể đại diện của nhân loại UNESCO},
  year = {2016},
  address = {{${location}}},
  note = {{Nguồn tư liệu: ${note}}}
}`;
    })
    .join('\n\n');
}

/**
 * Downloads a string content as a client-side file
 */
export function triggerFileDownload(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
