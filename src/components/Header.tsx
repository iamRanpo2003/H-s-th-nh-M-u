import React, { useState } from 'react';
import { TabKey, Language } from '../types/heritage';
import { translations } from '../i18n/translations';
import { useAudioReader } from '../context/AudioReaderContext';
import {
  Sparkles,
  BookOpen,
  Scale,
  ShieldAlert,
  Bot,
  Info,
  Flame,
  BookCheck,
  Volume2,
  VolumeX,
  Menu,
  X,
} from 'lucide-react';

interface HeaderProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  totalRecords: number;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onReadCurrentPage: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  totalRecords,
  currentLang,
  onLanguageChange,
  onReadCurrentPage,
}) => {
  const { isSpeaking, stop, setIsAccessibilityCenterOpen } = useAudioReader();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[currentLang];

  const navItems: { key: TabKey; label: string; icon: React.ReactNode; badge?: string }[] = [
    { key: 'home', label: t.header.navHome, icon: <BookOpen className="w-4 h-4 shrink-0" />, badge: `${totalRecords}` },
    { key: 'rituals', label: t.header.navRituals, icon: <Sparkles className="w-4 h-4 shrink-0" /> },
    { key: 'distinction', label: t.header.navDistinction, icon: <ShieldAlert className="w-4 h-4 shrink-0" /> },
    { key: 'legal', label: t.header.navLegal, icon: <Scale className="w-4 h-4 shrink-0" /> },
    { key: 'advisor', label: t.header.navAdvisor, icon: <Bot className="w-4 h-4 shrink-0" /> },
    { key: 'sources', label: t.header.navSources, icon: <BookCheck className="w-4 h-4 shrink-0" /> },
    { key: 'about', label: t.header.navAbout, icon: <Info className="w-4 h-4 shrink-0" /> },
  ];

  const activeNavItem = navItems.find((item) => item.key === activeTab) || navItems[0];

  const handleNavClick = (tab: TabKey) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="md:sticky md:top-0 z-40 bg-[#881c1c] text-amber-50 shadow-md border-b-2 border-amber-600/60">
      {/* Top Banner Ribbon */}
      <div className="bg-[#6b1414] py-1.5 px-3 sm:px-4 text-xs text-amber-200/90 border-b border-amber-700/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-flex items-center gap-1.5 font-semibold text-amber-300 leading-snug">
              <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate max-w-[180px] sm:max-w-none">{t.topRibbon.unescoTitle}</span>
            </span>
            <span className="hidden sm:inline text-amber-400/60">•</span>
            <span className="hidden sm:inline text-amber-100/80">{t.topRibbon.unescoYear}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-amber-200">
            <span className="hidden md:inline">{t.topRibbon.nonProfit}</span>
            <span className="hidden md:inline text-amber-400/60">•</span>
            <span className="hidden sm:inline text-amber-300 font-medium">{t.topRibbon.institution}</span>

            {/* Language Switcher Buttons in Ribbon */}
            <div className="flex items-center rounded-lg bg-black/30 p-0.5 border border-amber-500/40">
              <button
                type="button"
                onClick={() => onLanguageChange('vi')}
                className={`px-2.5 min-h-[44px] rounded-md text-xs font-bold transition-all ${
                  currentLang === 'vi'
                    ? 'bg-amber-400 text-red-950 shadow-xs'
                    : 'text-amber-200 hover:text-white'
                }`}
                aria-label="Chuyển sang Tiếng Việt"
              >
                🇻🇳 VI
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 min-h-[44px] rounded-md text-xs font-bold transition-all ${
                  currentLang === 'en'
                    ? 'bg-amber-400 text-red-950 shadow-xs'
                    : 'text-amber-200 hover:text-white'
                }`}
                aria-label="Switch to English"
              >
                🇬🇧 EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex flex-col xl:flex-row xl:items-center justify-between gap-2.5">
        {/* Brand / Logo Area + Mobile Menu Toggle */}
        <div className="flex items-center justify-between gap-2 min-w-0">
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none text-left min-h-[44px] min-w-0 flex-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 p-0.5 shadow-md flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-[#7a1717] rounded-[10px] flex items-center justify-center border border-amber-300/40">
                <svg className="w-6 h-6 text-amber-300" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 2C11.5 4 10 7 7 8C4 9 2 11.5 2 12C2 12.5 4 15 7 16C10 17 11.5 20 12 22C12.5 20 14 17 17 16C20 15 22 12.5 22 12C22 11.5 20 9 17 8C14 7 12.5 4 12 2Z"
                    opacity="0.25"
                  />
                  <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path
                    d="M12 4V7M12 17V20M4 12H7M17 12H20M6.34 6.34L8.46 8.46M15.54 15.54L17.66 17.66M6.34 17.66L8.46 15.54M15.54 8.46L17.66 6.34"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-bold font-serif-culture tracking-wide text-amber-100 group-hover:text-white transition-colors truncate">
                {t.header.title}
              </h1>
              <p className="text-xs text-amber-200/85 font-normal truncate">
                {t.header.subtitle}
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="main-primary-nav"
            className="md:hidden inline-flex items-center gap-1.5 px-3 min-h-[44px] rounded-xl bg-black/30 border border-amber-400/50 text-amber-100 font-bold text-sm shrink-0"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            <span>{mobileMenuOpen ? (currentLang === 'en' ? 'Close' : 'Đóng') : (currentLang === 'en' ? 'Menu' : 'Danh mục')}</span>
          </button>
        </div>

        {/* Navigation Tabs and Accessibility Tools */}
        <div
          id="main-primary-nav"
          className={`${
            mobileMenuOpen ? 'flex' : 'hidden'
          } md:flex flex-col sm:flex-row sm:items-center flex-wrap gap-2 justify-between xl:justify-end min-w-0 pt-1 md:pt-0 border-t border-amber-700/40 md:border-t-0`}
        >
          <nav aria-label="Chuyên mục chính" className="flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-1.5 min-w-0 w-full sm:w-auto">
            {navItems.map((item) => {
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handleNavClick(item.key)}
                  className={`relative px-3 min-h-[44px] rounded-xl text-sm font-medium transition-all duration-150 flex items-center justify-between sm:justify-start gap-1.5 w-full sm:w-auto ${
                    isActive
                      ? 'bg-amber-400 text-red-950 font-bold shadow-md shadow-amber-950/20'
                      : 'text-amber-100 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {item.icon}
                    <span className="whitespace-nowrap">{item.label}</span>
                  </span>
                  {item.badge && (
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-xs font-bold ${
                        isActive ? 'bg-red-900 text-amber-200' : 'bg-black/30 text-amber-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Accessibility Voice Mode Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1 sm:pt-0">
            <button
              type="button"
              onClick={() => setIsAccessibilityCenterOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 min-h-[44px] rounded-xl text-sm font-bold bg-amber-400 hover:bg-amber-300 text-red-950 shadow-sm transition-transform active:scale-95"
              title="Mở Bảng Chế độ đọc cho Người cao tuổi & Khiếm thị (Phím tắt Alt + V)"
            >
              <Volume2 className="w-4 h-4 fill-current text-red-900 shrink-0" />
              <span className="hidden sm:inline">Chế độ Đọc</span>
              <span className="sm:hidden">Đọc tiếng</span>
            </button>

            <button
              type="button"
              onClick={isSpeaking ? stop : onReadCurrentPage}
              className={`inline-flex items-center gap-1.5 px-3 min-h-[44px] rounded-xl text-sm font-bold transition-all shadow-sm ${
                isSpeaking
                  ? 'bg-emerald-400 text-emerald-950 animate-pulse'
                  : 'bg-black/30 hover:bg-black/50 text-amber-200 border border-amber-400/50'
              }`}
              title="Đọc nhanh trang hiện tại / Dừng đọc"
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-4 h-4 shrink-0" />
                  <span>{t.header.audioReading}</span>
                </>
              ) : (
                <span>Đọc trang</span>
              )}
            </button>
          </div>
        </div>

        {/* Compact mobile active-page bar when menu is collapsed */}
        {!mobileMenuOpen && (
          <div className="md:hidden flex items-center justify-between gap-2 pt-1 border-t border-amber-700/40">
            <span className="text-xs font-semibold text-amber-200 truncate flex items-center gap-1.5">
              {activeNavItem.icon}
              <span className="truncate">{activeNavItem.label}</span>
            </span>
            <button
              type="button"
              onClick={isSpeaking ? stop : onReadCurrentPage}
              className="inline-flex items-center gap-1.5 px-3 min-h-[44px] rounded-lg bg-black/30 border border-amber-400/50 text-amber-200 text-xs font-bold shrink-0"
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
              <span>{isSpeaking ? t.header.audioReading : 'Đọc trang'}</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
