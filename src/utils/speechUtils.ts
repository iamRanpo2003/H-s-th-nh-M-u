import { Language, DiSanItem } from '../types/heritage';

/**
 * Sanitizes text for audio text-to-speech reading by removing markdown artifacts,
 * symbols, URLs, and excessive punctuation that degrade voice synthesis.
 */
export function cleanTextForSpeech(text: string): string {
  if (!text) return '';

  let cleaned = text
    // Remove markdown links [title](url) -> title
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove standalone URLs
    .replace(/https?:\/\/[^\s]+/g, '')
    // Remove markdown headers or standalone hash characters
    .replace(/#+/g, '')
    // Remove bold/italic markers
    .replace(/[*_~`]{1,3}/g, '')
    // Replace bullet points with pause commas
    .replace(/^[\s•\-\*]+\s*/gm, ', ')
    // Normalize dashes and slashes
    .replace(/[\/|\\]/g, ' ')
    // Remove excessive symbols
    .replace(/[⚠️✓❌•▸→►✨⭐🔍🔊📖⚖️🏛️🛡️]/g, '')
    // Collapse multiple whitespaces
    .replace(/\s+/g, ' ')
    .trim();

  return cleaned;
}

/**
 * Clamps speech rate between 0.5 and 1.8 for accessibility (elderly & visually impaired).
 */
export function clampSpeechRate(rate: number): number {
  if (isNaN(rate)) return 1.0;
  return Math.min(Math.max(rate, 0.5), 1.8);
}

/**
 * Returns the BCP 47 language code for speech synthesis.
 */
export function getVoiceLangTag(lang: Language): string {
  return lang === 'en' ? 'en-US' : 'vi-VN';
}

/**
 * Checks if a voice is a native Vietnamese voice.
 */
export function isVietnameseVoice(voice: SpeechSynthesisVoice): boolean {
  if (!voice) return false;
  const lang = (voice.lang || '').toLowerCase().replace('_', '-');
  return lang.startsWith('vi');
}

/**
 * Filters the list of available voices to find all Vietnamese voices.
 */
export function filterVietnameseVoices(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice[] {
  if (!voices || voices.length === 0) return [];
  return voices.filter(isVietnameseVoice);
}

/**
 * Finds the most suitable SpeechSynthesisVoice object for the given language.
 * Prefers natural/local Vietnamese voices (Google, Microsoft, Apple, Android) when lang is 'vi'.
 */
export function selectBestVoice(
  voices: SpeechSynthesisVoice[], 
  lang: Language, 
  preferredUri?: string | null
): SpeechSynthesisVoice | null {
  if (!voices || voices.length === 0) return null;

  // If a preferred voice URI is requested and matches, return it
  if (preferredUri) {
    const matched = voices.find(v => v.voiceURI === preferredUri);
    if (matched) return matched;
  }

  const targetLang = lang === 'en' ? 'en' : 'vi';

  // 1. Try exact language match (e.g. vi-VN or en-US)
  const langMatches = voices.filter((v) => 
    v.lang.toLowerCase().replace('_', '-').startsWith(targetLang)
  );

  if (langMatches.length > 0) {
    // Prefer Google, Microsoft, Apple or default voices
    const qualityVoice = langMatches.find(v => 
      v.name.includes('Google') || 
      v.name.includes('Natural') || 
      v.name.includes('HoaiMy') || 
      v.name.includes('An') || 
      v.name.includes('Linh') ||
      v.default
    );
    return qualityVoice || langMatches[0];
  }

  // 2. Fallback to default voice or first available
  const defaultVoice = voices.find(v => v.default);
  return defaultVoice || voices[0] || null;
}

/**
 * Generates an empathetic, respectful, and well-structured spoken script for a heritage record,
 * optimized for elderly listeners and visually impaired users.
 */
export function buildRecordSpeechScript(
  record: DiSanItem, 
  lang: Language = 'vi'
): { title: string; text: string } {
  if (lang === 'en' && record.en) {
    const title = record.en.ten_chinh_thuc;
    const parts = [
      `Heritage Dossier: ${record.en.ten_chinh_thuc}.`,
      record.en.ten_goi_khac ? `Also known as: ${record.en.ten_goi_khac}.` : '',
      `Classification: ${record.en.loai_hinh}.`,
      `Geographical Area: ${record.en.dia_phuong}.`,
      `UNESCO and National Inscription Status: ${record.en.tinh_trang_ghi_danh}.`,
      `Representative Master Bearers: ${record.en.nghe_nhan_tieu_bieu}.`,
      `Cultural Essence and Characteristics: ${record.en.mo_ta_dac_trung}.`,
      `Archival Source and Scientific Verification: ${record.en.nguon_tu_lieu}.`
    ].filter(Boolean);

    return {
      title,
      text: cleanTextForSpeech(parts.join(' '))
    };
  }

  // Vietnamese script: Clear, respectful phrasing
  const title = record.ten_chinh_thuc;
  const parts = [
    `Hồ sơ di sản: ${record.ten_chinh_thuc}.`,
    record.ten_goi_khac ? `Tên gọi dân gian: ${record.ten_goi_khac}.` : '',
    `Loại hình di sản: ${record.loai_hinh}.`,
    `Địa phương thực hành: ${record.dia_phuong}.`,
    `Tình trạng ghi danh: ${record.tinh_trang_ghi_danh}.`,
    `Nghệ nhân ưu tú và thủ nhang tiêu biểu: ${record.nghe_nhan_tieu_bieu}.`,
    `Đặc trưng di sản và giá trị văn hóa: ${record.mo_ta_dac_trung}.`,
    `Nguồn tư liệu kiểm chứng khoa học: ${record.nguon_tu_lieu}.`
  ].filter(Boolean);

  return {
    title,
    text: cleanTextForSpeech(parts.join(' '))
  };
}

/**
 * Formats rate label with descriptive context for elderly and visually impaired users.
 */
export function formatSpeechRateLabel(rate: number, lang: Language = 'vi'): string {
  if (lang === 'en') {
    if (rate <= 0.75) return `${rate}x (Very slow - for clear listening)`;
    if (rate <= 0.85) return `${rate}x (Slow & gentle)`;
    if (rate <= 1.05) return `${rate}x (Standard normal)`;
    return `${rate}x (Fast pace)`;
  }

  if (rate <= 0.75) return `${rate}x (Rất chậm - Dễ nghe cho người cao tuổi)`;
  if (rate <= 0.85) return `${rate}x (Chậm rãi, rõ chữ)`;
  if (rate <= 1.05) return `${rate}x (Chuẩn mực)`;
  return `${rate}x (Nhanh)`;
}
