import { DiSanItem } from '../types/heritage';

/**
 * Checks if a heritage record is missing its source citation.
 * When true, the UI must render an orange warning badge.
 */
export function isMissingSource(item: DiSanItem): boolean {
  return !item.nguon_tu_lieu || item.nguon_tu_lieu.trim() === '';
}

/**
 * Formats a standardized academic and legal citation string for copying.
 */
export function formatCitation(item: DiSanItem): string {
  const aliasPart = item.ten_goi_khac ? ` (Tên gọi khác: ${item.ten_goi_khac})` : '';
  const sourcePart = item.nguon_tu_lieu && item.nguon_tu_lieu.trim().length > 0
    ? item.nguon_tu_lieu.trim()
    : 'Chưa có thông tin nguồn kiểm chứng chính thức';

  return `[Hồ sơ Di sản Tín ngưỡng thờ Mẫu] ${item.ten_chinh_thuc}${aliasPart}. Địa phương: ${item.dia_phuong}. Tình trạng ghi danh: ${item.tinh_trang_ghi_danh}. Nguồn tư liệu tham khảo: ${sourcePart}. Trích xuất từ Cổng thông tin Thực hành Tín ngưỡng thờ Mẫu Tam phủ.`;
}

/**
 * Filters heritage records by location, recognition status, and keyword search.
 */
export function filterHeritage(
  items: DiSanItem[],
  filters: {
    diaPhuong?: string;
    tinhTrang?: string;
    search?: string;
  }
): DiSanItem[] {
  const { diaPhuong, tinhTrang, search } = filters;
  const cleanSearch = (search || '').toLowerCase().trim();

  return items.filter((item) => {
    // Filter by location
    if (diaPhuong && diaPhuong !== 'ALL') {
      if (!item.dia_phuong.toLowerCase().includes(diaPhuong.toLowerCase())) {
        return false;
      }
    }

    // Filter by recognition status
    if (tinhTrang && tinhTrang !== 'ALL') {
      if (!item.tinh_trang_ghi_danh.toLowerCase().includes(tinhTrang.toLowerCase())) {
        return false;
      }
    }

    // Filter by keyword search
    if (cleanSearch) {
      const matchOfficial = item.ten_chinh_thuc.toLowerCase().includes(cleanSearch);
      const matchAlias = item.ten_goi_khac.toLowerCase().includes(cleanSearch);
      const matchDesc = item.mo_ta_dac_trung.toLowerCase().includes(cleanSearch);
      const matchArtist = item.nghe_nhan_tieu_bieu.toLowerCase().includes(cleanSearch);
      const matchSource = item.nguon_tu_lieu.toLowerCase().includes(cleanSearch);

      if (!matchOfficial && !matchAlias && !matchDesc && !matchArtist && !matchSource) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Extract unique standardized location tags
 */
export function extractUniqueLocations(items: DiSanItem[]): string[] {
  const locSet = new Set<string>();
  items.forEach((item) => {
    if (item.dia_phuong) {
      // Split common separators if any, or add direct
      locSet.add(item.dia_phuong.trim());
    }
  });
  return Array.from(locSet);
}

/**
 * Extract unique status tags
 */
export function extractUniqueStatuses(items: DiSanItem[]): string[] {
  const statusSet = new Set<string>();
  items.forEach((item) => {
    if (item.tinh_trang_ghi_danh) {
      statusSet.add(item.tinh_trang_ghi_danh.trim());
    }
  });
  return Array.from(statusSet);
}
