/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { DiSanItem, Language } from '../types/heritage';
import { 
  exportToJson, 
  exportToCsv, 
  exportToMarkdown, 
  exportToBibTeX, 
  triggerFileDownload 
} from '../utils/exportUtils';
import { 
  Download, 
  FileJson, 
  FileSpreadsheet, 
  FileText, 
  BookMarked, 
  Copy, 
  Check, 
  ExternalLink, 
  Database, 
  X,
  Code2,
  Terminal,
  FileCheck
} from 'lucide-react';

interface ExportDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  allRecords: DiSanItem[];
  filteredRecords: DiSanItem[];
  currentLang: Language;
  targetSingleRecord?: DiSanItem | null;
}

type ExportFormat = 'json' | 'csv' | 'markdown' | 'bibtex';
type ExportScope = 'all' | 'filtered' | 'single';

export const ExportDataModal: React.FC<ExportDataModalProps> = ({
  isOpen,
  onClose,
  allRecords,
  filteredRecords,
  currentLang,
  targetSingleRecord,
}) => {
  const isEn = currentLang === 'en';

  // State
  const [scope, setScope] = useState<ExportScope>(targetSingleRecord ? 'single' : 'all');
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('json');
  const [copied, setCopied] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // Active records based on selected scope
  const activeRecords = useMemo(() => {
    if (scope === 'single' && targetSingleRecord) {
      return [targetSingleRecord];
    }
    if (scope === 'filtered') {
      return filteredRecords;
    }
    return allRecords;
  }, [scope, targetSingleRecord, filteredRecords, allRecords]);

  // Compute preview content
  const previewContent = useMemo(() => {
    switch (selectedFormat) {
      case 'csv':
        return exportToCsv(activeRecords);
      case 'markdown':
        return exportToMarkdown(activeRecords);
      case 'bibtex':
        return exportToBibTeX(activeRecords);
      case 'json':
      default:
        return exportToJson(activeRecords);
    }
  }, [selectedFormat, activeRecords]);

  if (!isOpen) return null;

  const handleDownload = () => {
    const timestamp = new Date().toISOString().slice(0, 10);
    let filename = '';
    let mimeType = '';

    switch (selectedFormat) {
      case 'csv':
        filename = `disan-tho-mau-${scope}-${timestamp}.csv`;
        mimeType = 'text/csv;charset=utf-8;';
        break;
      case 'markdown':
        filename = `ho-so-tho-mau-${scope}-${timestamp}.md`;
        mimeType = 'text/markdown;charset=utf-8;';
        break;
      case 'bibtex':
        filename = `trich-dan-tho-mau-${scope}-${timestamp}.bib`;
        mimeType = 'application/x-bibtex;charset=utf-8;';
        break;
      case 'json':
      default:
        filename = `disan-tho-mau-${scope}-${timestamp}.json`;
        mimeType = 'application/json;charset=utf-8;';
        break;
    }

    triggerFileDownload(previewContent, filename, mimeType);
    setDownloadSuccess(filename);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const handleCopyClipboard = () => {
    navigator.clipboard.writeText(previewContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-2xl shadow-2xl border-2 border-amber-500/40 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-[#741515] to-[#8c1c1c] text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-200">
              <Download className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif-culture text-amber-100 flex items-center gap-2">
                {isEn ? 'Export Open Heritage Dataset' : 'Xuất Dữ Liệu Di Sản Ra Tệp'}
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 font-mono">
                  Open Data
                </span>
              </h3>
              <p className="text-xs text-amber-200/80">
                {isEn 
                  ? 'Freedom of research: Export structured records for reuse in Excel, Python, Zotero, and papers.'
                  : 'Quyền tự do nghiên cứu: Xuất dữ liệu mở phục vụ học tập, Excel, Python, Zotero và báo cáo khoa học.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-amber-200 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-gray-800 text-sm">
          {/* Scope Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
              {isEn ? '1. Select Data Scope' : '1. Chọn phạm vi dữ liệu xuất:'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setScope('all')}
                className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                  scope === 'all'
                    ? 'border-red-700 bg-red-50/70 text-[#741515] shadow-xs'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <div>
                  <strong className="block text-xs sm:text-sm font-semibold">
                    {isEn ? 'All Records' : 'Toàn bộ cơ sở dữ liệu'}
                  </strong>
                  <span className="text-xs text-gray-500">
                    {allRecords.length} {isEn ? 'records' : 'bản ghi chuẩn'}
                  </span>
                </div>
                <Database className={`w-4 h-4 ${scope === 'all' ? 'text-red-700' : 'text-gray-400'}`} />
              </button>

              <button
                type="button"
                onClick={() => setScope('filtered')}
                className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                  scope === 'filtered'
                    ? 'border-red-700 bg-red-50/70 text-[#741515] shadow-xs'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <div>
                  <strong className="block text-xs sm:text-sm font-semibold">
                    {isEn ? 'Filtered Results' : 'Kết quả đang lọc'}
                  </strong>
                  <span className="text-xs text-gray-500">
                    {filteredRecords.length} {isEn ? 'records' : 'bản ghi'}
                  </span>
                </div>
                <Code2 className={`w-4 h-4 ${scope === 'filtered' ? 'text-red-700' : 'text-gray-400'}`} />
              </button>

              {targetSingleRecord && (
                <button
                  type="button"
                  onClick={() => setScope('single')}
                  className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                    scope === 'single'
                      ? 'border-red-700 bg-red-50/70 text-[#741515] shadow-xs'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="truncate pr-2">
                    <strong className="block text-xs sm:text-sm font-semibold truncate">
                      {isEn ? 'Selected Record' : 'Bản ghi được chọn'}
                    </strong>
                    <span className="text-xs text-gray-500 truncate block">
                      {targetSingleRecord.ten_chinh_thuc}
                    </span>
                  </div>
                  <FileCheck className={`w-4 h-4 shrink-0 ${scope === 'single' ? 'text-red-700' : 'text-gray-400'}`} />
                </button>
              )}
            </div>
          </div>

          {/* Format Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
              {isEn ? '2. Choose File Format' : '2. Định dạng tệp xuất:'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* JSON */}
              <button
                type="button"
                onClick={() => setSelectedFormat('json')}
                className={`p-3.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  selectedFormat === 'json'
                    ? 'border-amber-600 bg-amber-50 text-amber-950 font-bold shadow-xs'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <div className={`p-2 rounded-lg ${selectedFormat === 'json' ? 'bg-amber-200/70 text-amber-900' : 'bg-gray-100 text-gray-600'}`}>
                  <FileJson className="w-5 h-5" />
                </div>
                <span className="text-xs">JSON (.json)</span>
                <span className="text-[10px] text-gray-500 font-normal">Dữ liệu mở API</span>
              </button>

              {/* CSV */}
              <button
                type="button"
                onClick={() => setSelectedFormat('csv')}
                className={`p-3.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  selectedFormat === 'csv'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <div className={`p-2 rounded-lg ${selectedFormat === 'csv' ? 'bg-emerald-200/70 text-emerald-900' : 'bg-gray-100 text-gray-600'}`}>
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <span className="text-xs">CSV (.csv)</span>
                <span className="text-[10px] text-gray-500 font-normal">Excel UTF-8 BOM</span>
              </button>

              {/* Markdown */}
              <button
                type="button"
                onClick={() => setSelectedFormat('markdown')}
                className={`p-3.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  selectedFormat === 'markdown'
                    ? 'border-blue-600 bg-blue-50 text-blue-950 font-bold shadow-xs'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <div className={`p-2 rounded-lg ${selectedFormat === 'markdown' ? 'bg-blue-200/70 text-blue-900' : 'bg-gray-100 text-gray-600'}`}>
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-xs">Markdown (.md)</span>
                <span className="text-[10px] text-gray-500 font-normal">Hồ sơ tài liệu</span>
              </button>

              {/* BibTeX */}
              <button
                type="button"
                onClick={() => setSelectedFormat('bibtex')}
                className={`p-3.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  selectedFormat === 'bibtex'
                    ? 'border-purple-600 bg-purple-50 text-purple-950 font-bold shadow-xs'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <div className={`p-2 rounded-lg ${selectedFormat === 'bibtex' ? 'bg-purple-200/70 text-purple-900' : 'bg-gray-100 text-gray-600'}`}>
                  <BookMarked className="w-5 h-5" />
                </div>
                <span className="text-xs">BibTeX (.bib)</span>
                <span className="text-[10px] text-gray-500 font-normal">Trích dẫn Zotero</span>
              </button>
            </div>
          </div>

          {/* Preview Box */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-gray-500" />
                {isEn ? 'Preview Content' : 'Xem trước nội dung tệp'}
                <span className="text-[11px] font-normal text-gray-500 normal-case">
                  ({activeRecords.length} {isEn ? 'records' : 'bản ghi'})
                </span>
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyClipboard}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? (isEn ? 'Copied!' : 'Đã sao chép!') : (isEn ? 'Copy' : 'Sao chép')}
                </button>
              </div>
            </div>
            <pre className="p-4 bg-gray-900 text-gray-100 rounded-xl text-xs font-mono max-h-48 overflow-y-auto whitespace-pre-wrap leading-relaxed border border-gray-800 selection:bg-amber-500 selection:text-black">
              {previewContent}
            </pre>
          </div>

          {/* Programmatic API Access Note */}
          <div className="p-3.5 bg-amber-50/70 border border-amber-300/80 rounded-xl text-xs space-y-1.5 text-amber-950">
            <div className="font-semibold flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5 text-[#741515]" />
              {isEn ? 'Direct Programmatic Download (cURL / Python / R):' : 'Đường dẫn tải tự động qua API (không cần vào web):'}
            </div>
            <div className="bg-white/80 p-2 rounded-md font-mono text-[11px] text-gray-800 border border-amber-200 flex items-center justify-between">
              <code>curl -O &quot;{window.location.origin}/api/disan/export?format={selectedFormat}&quot;</code>
              <a 
                href={`/api/disan/export?format=${selectedFormat}`} 
                target="_blank" 
                rel="noreferrer"
                className="text-red-700 hover:underline inline-flex items-center gap-1 shrink-0 ml-2 font-sans text-xs"
              >
                {isEn ? 'Open URL' : 'Mở link'}
              </a>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50">
          <div className="text-xs text-gray-500">
            {downloadSuccess && (
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <Check className="w-4 h-4" />
                {isEn ? `Saved ${downloadSuccess}` : `Đã tải về tệp ${downloadSuccess}`}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs sm:text-sm font-medium rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {isEn ? 'Close' : 'Đóng'}
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-bold rounded-xl bg-gradient-to-r from-[#741515] to-[#8c1c1c] text-white hover:from-[#5e1010] hover:to-[#741515] shadow-md transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-amber-300" />
              {isEn ? `Download .${selectedFormat}` : `Tải tệp .${selectedFormat}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
