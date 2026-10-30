import React from 'react';
import { TabKey } from '../types/heritage';
import { 
  Sparkles, 
  BookOpen, 
  Scale, 
  ShieldAlert, 
  Bot, 
  Info,
  Flame
} from 'lucide-react';

interface HeaderProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  totalRecords: number;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, totalRecords }) => {
  const navItems: { key: TabKey; label: string; icon: React.ReactNode; badge?: string }[] = [
    { key: 'home', label: 'Tổng quan & Hồ sơ', icon: <BookOpen className="w-4 h-4" />, badge: `${totalRecords}` },
    { key: 'rituals', label: 'Nghi thức chuẩn mực', icon: <Sparkles className="w-4 h-4" /> },
    { key: 'distinction', label: 'Phân biệt biến tướng', icon: <ShieldAlert className="w-4 h-4" /> },
    { key: 'legal', label: 'Khung pháp lý', icon: <Scale className="w-4 h-4" /> },
    { key: 'advisor', label: 'Trợ lý Tra cứu AI', icon: <Bot className="w-4 h-4" /> },
    { key: 'about', label: 'Giới thiệu & Bản quyền', icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#881c1c] text-amber-50 shadow-md border-b-2 border-amber-600/60">
      {/* Top Banner Ribbon */}
      <div className="bg-[#6b1414] py-1.5 px-4 text-xs text-amber-200/90 border-b border-amber-700/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-semibold text-amber-300">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              DI SẢN VĂN HÓA PHI VẬT THỂ ĐẠI DIỆN CỦA NHÂN LOẠI
            </span>
            <span className="hidden sm:inline text-amber-400/60">•</span>
            <span className="hidden sm:inline text-amber-100/80">UNESCO Ghi danh năm 2016</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-amber-200">
            <span>Dự án Xã hội Phi lợi nhuận</span>
            <span className="text-amber-400/60">•</span>
            <span className="text-amber-300 font-medium">FPT Polytechnic & IMTA TECH</span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col xl:flex-row xl:items-center justify-between gap-3">
        {/* Brand / Logo Area */}
        <div 
          onClick={() => onTabChange('home')}
          className="flex items-center gap-3 cursor-pointer group select-none flex-shrink-0"
        >
          {/* Traditional Cultural Lotus & Sun Seal Emblem */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 p-0.5 shadow-md flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full bg-[#7a1717] rounded-[10px] flex items-center justify-center border border-amber-300/40">
              <svg className="w-6 h-6 text-amber-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C11.5 4 10 7 7 8C4 9 2 11.5 2 12C2 12.5 4 15 7 16C10 17 11.5 20 12 22C12.5 20 14 17 17 16C20 15 22 12.5 22 12C22 11.5 20 9 17 8C14 7 12.5 4 12 2Z" opacity="0.25"/>
                <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 4V7M12 17V20M4 12H7M17 12H20M6.34 6.34L8.46 8.46M15.54 15.54L17.66 17.66M6.34 17.66L8.46 15.54M15.54 8.46L17.66 6.34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <div>
            <h1 className="text-lg sm:text-xl font-bold font-serif-culture tracking-wide text-amber-100 group-hover:text-white transition-colors">
              HỒ SƠ TÍN NGƯỠNG THỜ MẪU
            </h1>
            <p className="text-[11px] sm:text-xs text-amber-200/80 font-normal">
              Bảo tồn Di sản UNESCO • Chuẩn hóa Nghi lễ • Ngăn ngừa Biến tướng
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav aria-label="Chuyên mục chính" className="flex items-center flex-wrap gap-1 sm:gap-1.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onTabChange(item.key)}
                className={`relative px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-400 text-red-950 font-bold shadow-md shadow-amber-950/20'
                    : 'text-amber-100 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-red-900 text-amber-200' : 'bg-black/30 text-amber-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
