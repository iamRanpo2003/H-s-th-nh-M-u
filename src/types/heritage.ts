export type Language = 'vi' | 'en';

export interface DiSanItem {
  id: string;
  ten_chinh_thuc: string;
  ten_goi_khac: string;
  loai_hinh: string;
  dia_phuong: string;
  mo_ta_dac_trung: string;
  nghe_nhan_tieu_bieu: string;
  tinh_trang_ghi_danh: string;
  nguon_tu_lieu: string;
  // English translation fields
  en?: {
    ten_chinh_thuc: string;
    ten_goi_khac: string;
    loai_hinh: string;
    dia_phuong: string;
    mo_ta_dac_trung: string;
    nghe_nhan_tieu_bieu: string;
    tinh_trang_ghi_danh: string;
    nguon_tu_lieu: string;
  };
}

export type TabKey = 'home' | 'rituals' | 'distinction' | 'legal' | 'advisor' | 'sources' | 'about';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  referencedRecord?: string;
  referencedSource?: string;
  isWarning?: boolean;
}

export interface SourceReference {
  id: string;
  title: string;
  author: string;
  type: 'chinh_thong' | 'hoc_thuat' | 'bao_tang_vien';
  typeLabel: string;
  description: string;
  url: string;
  isOfficialGov: boolean;
}
