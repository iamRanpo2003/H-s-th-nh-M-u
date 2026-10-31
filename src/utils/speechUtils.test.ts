import test from 'node:test';
import assert from 'node:assert/strict';
import { cleanTextForSpeech, clampSpeechRate, getVoiceLangTag } from './speechUtils';

test('cleanTextForSpeech strips markdown formatting and urls', () => {
  const input = '**Tín ngưỡng thờ Mẫu** là [di sản](https://ich.unesco.org). # Tiêu chuẩn:\n• Điểm 1\n• Điểm 2 ⚠️';
  const cleaned = cleanTextForSpeech(input);

  assert.doesNotMatch(cleaned, /\*\*/);
  assert.doesNotMatch(cleaned, /https?:\/\//);
  assert.doesNotMatch(cleaned, /#/);
  assert.doesNotMatch(cleaned, /⚠️/);
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
