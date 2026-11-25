# Security Summary

- **API Key Isolation (`GEMINI_API_KEY`)**: Checked all client files (`src/**`, `index.html`, `vite.config.ts`) and build output (`dist/assets/*.js`). The `@google/genai` SDK is imported and executed solely on the server (`server.ts`), reading the credential exclusively from `process.env.GEMINI_API_KEY?.trim()`. Zero API keys or `VITE_*` secret environment variables exist in browser code, UI strings, or Vite `define` blocks.
- **Repository & Log Hygiene**: `.gitignore` ignores all `.env*` files while keeping only a sanitized `.env.example` template (`GEMINI_API_KEY="MY_GEMINI_API_KEY"`). Exception handlers in `server.ts` (`/api/chat` and `/api/disan`) avoid logging raw error objects, request headers, or credentials to stdout/stderr or HTTP error responses.
- **Input Validation & Access**: `/api/chat` validates `req.body?.question` as a non-empty string capped at 2,000 characters, returning `400 Bad Request` for empty or malformed inputs. All user-facing heritage views and endpoints operate publicly without login gates or undisclosed personal data collection.
- **Grounding & Anti-Hallucination Control**: Gemini (`gemini-4-hydrogen`) receives a strict in-app system instruction and is post-processed via `normalizeGeminiResponse` / `searchGroundingEngine` (`src/utils/groundingUtils.ts`). Out-of-scope questions strictly return `"Ứng dụng chưa có thông tin này"` along with official verification sources and explicit citation attribution.
- **Dependencies & Browser Hygiene**: `bun audit` completed with 0 known vulnerabilities across 260 packages; `window.alert` and `window.open` were eliminated in favor of inline UI state.

## PoC Verification

- **Bundle Secret Non-Exposure**: Ran `npm run build` followed by pattern inspection (`grep -E "AIzaSy|GoogleGenAI" dist/assets/*.js`), confirming zero credentials or server SDK symbols in built client assets.
- **API Validation & Strict Grounding**:
  - `POST /api/chat` with `{"question": "   "}` returned HTTP `400` (`Vui lòng cung cấp câu hỏi hợp lệ.`).
  - `POST /api/chat` with out-of-scope query (`"Giá vé tham quan Đền Ngọc Sơn ở Hoàn Kiếm hôm nay là bao nhiêu?"`) returned `200` with `"Ứng dụng chưa có thông tin này"`, official UNESCO / Cục Di sản Văn hóa / Luật Tín ngưỡng references, and `isUnverified: true`.
  - `POST /api/chat` with in-app heritage query (`"Phủ Dầy ở đâu và có đặc trưng gì?"`) matched `Quần thể Di tích và Lễ hội Phủ Dầy` and cited `"Cục Di sản Văn hóa... (Quyết định 5079/QĐ-BVHTTDL); Bản tin VICAS"`.
- **Automated Unit & Mobile Checks**: All Node unit tests (`src/utils/*.test.ts`) pass, TypeScript (`tsc --noEmit`) and production build (`compile_applet`) succeed, and Playwright headless Chromium audit at `360x844` confirmed zero horizontal overflow (`scrollWidth = 360`), `>= 16px` body text, and `>= 44px` touch targets across all 7 tabs.
