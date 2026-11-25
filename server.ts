import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.NODE_ENV === 'production' && process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const DISAN_FILE_PATH = path.join(__dirname, 'disan.json');

app.use(express.json({ limit: '10mb' }));

// Helper to read disan.json safely
function readDisanData() {
  try {
    if (fs.existsSync(DISAN_FILE_PATH)) {
      const raw = fs.readFileSync(DISAN_FILE_PATH, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading disan.json:', err);
  }
  return [];
}

// Helper to save disan.json safely
function writeDisanData(data: any[]) {
  fs.writeFileSync(DISAN_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

import { 
  exportToJson, 
  exportToCsv, 
  exportToMarkdown, 
  exportToBibTeX 
} from './src/utils/exportUtils.ts';

// API Routes
app.get('/api/disan', (_req: Request, res: Response) => {
  const records = readDisanData();
  res.json({ success: true, data: records });
});

// Direct file export route for open data reuse
app.get('/api/disan/export', (req: Request, res: Response) => {
  const format = (req.query.format as string || 'json').toLowerCase();
  const records = readDisanData();

  if (format === 'csv') {
    const csvContent = exportToCsv(records);
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="disan-tho-mau.csv"');
    return res.send(csvContent);
  }

  if (format === 'markdown' || format === 'md') {
    const mdContent = exportToMarkdown(records);
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="ho-so-di-san-tho-mau.md"');
    return res.send(mdContent);
  }

  if (format === 'bibtex' || format === 'bib') {
    const bibContent = exportToBibTeX(records);
    res.setHeader('Content-Type', 'application/x-bibtex; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="trich-dan-tho-mau.bib"');
    return res.send(bibContent);
  }

  // Default JSON export
  const jsonContent = exportToJson(records);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="disan-tho-mau.json"');
  return res.send(jsonContent);
});

import {
  searchGroundingEngine,
  buildGeminiSystemPrompt,
  normalizeGeminiResponse,
} from './src/utils/groundingUtils.ts';

app.post('/api/disan', (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    if (!Array.isArray(data)) {
      return res.status(400).json({ success: false, message: 'Dữ liệu không hợp lệ (cần mảng bản ghi)' });
    }
    writeDisanData(data);
    return res.json({ success: true, message: 'Cập nhật cơ sở dữ liệu thành công', data });
  } catch {
    return res.status(500).json({ success: false, message: 'Lỗi lưu dữ liệu' });
  }
});

// Gemini Assistant Endpoint — reads GEMINI_API_KEY strictly from server environment variables
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const rawQuestion = req.body?.question;
    if (!rawQuestion || typeof rawQuestion !== 'string' || !rawQuestion.trim()) {
      return res.status(400).json({ success: false, message: 'Vui lòng cung cấp câu hỏi hợp lệ.' });
    }

    const question = rawQuestion.trim().slice(0, 2000);
    const disanRecords = readDisanData();
    const apiKey = process.env.GEMINI_API_KEY?.trim();

    // Deterministic in-app grounding engine as fallback / baseline verification
    const groundingResult = searchGroundingEngine(question, disanRecords);

    if (!apiKey) {
      return res.json({
        success: true,
        ...groundingResult,
        isAiGenerated: false,
      });
    }

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const systemPrompt = buildGeminiSystemPrompt(disanRecords);

      const generatePromise = ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: question,
        config: {
          systemInstruction: systemPrompt,
        },
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('TIMEOUT_OR_NETWORK_RESTRICTED')), 8000)
      );

      const aiResponse: any = await Promise.race([generatePromise, timeoutPromise]);
      const answerText = aiResponse?.text;

      if (answerText && typeof answerText === 'string' && answerText.trim().length > 0) {
        const normalized = normalizeGeminiResponse(answerText, groundingResult, disanRecords);
        return res.json({
          success: true,
          ...normalized,
          isAiGenerated: true,
        });
      }
    } catch {
      // Never log raw errors or headers that could contain credentials
      console.warn('GenAI request unavailable or timed out; serving verified in-app grounding result.');
    }

    return res.json({
      success: true,
      ...groundingResult,
      isAiGenerated: false,
    });
  } catch {
    console.error('Chat endpoint internal error');
    return res.status(500).json({
      success: false,
      message: 'Lỗi hệ thống khi xử lý yêu cầu tra cứu.',
    });
  }
});

// Vite middleware or static files
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT} in ${isDev ? 'development' : 'production'} mode`);
  });
}

startServer();
