import { Language } from '../types/heritage';

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
    .replace(/[⚠️✓❌•▸→►]/g, '')
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
 * Finds the most suitable SpeechSynthesisVoice object for the given language.
 */
export function selectBestVoice(voices: SpeechSynthesisVoice[], lang: Language): SpeechSynthesisVoice | null {
  if (!voices || voices.length === 0) return null;

  const targetLang = lang === 'en' ? 'en' : 'vi';

  // 1. Try exact match (e.g. vi-VN or en-US)
  const exact = voices.find((v) => v.lang.toLowerCase().replace('_', '-').startsWith(targetLang));
  if (exact) return exact;

  // 2. Fallback to any voice
  return voices[0] || null;
}
