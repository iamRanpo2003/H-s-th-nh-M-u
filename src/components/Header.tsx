import React from 'react';
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
  Languages
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
  onReadCurrentPage
}) => {
  const { isSpeaking, stop } = useAudioReader();
  const t = translations[currentLang];

  const navItems: { key: TabKey; label: string; icon: React.ReactNode; badge?: string }[] = [
    { key: 'home', label: t.header.navHome, icon: <BookOpen className="w-4 h-4" />, badge: `${totalRecords}` },
    { key: 'rituals', label: t.header.navRituals, icon: <Sparkles className="w-4 h-4" /> },
    { key: 'distinction', label: t.header.navDistinction, icon: <ShieldAlert className="w-4 h-4" /> },
    { key: 'legal', label: t.header.navLegal, icon: <Scale className="w-4 h-4" /> },
    { key: 'advisor', label: t.header.navAdvisor, icon: <Bot className="w-4 h-4" /> },
    { key: 'sources', label: t.header.navSources, icon: <BookCheck className="w-4 h-4" /> },
    { key: 'about', label: t.header.navAbout, icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#881c1c] text-amber-50 shadow-md border-b-2 border-amber-600/60">
      {/* Top Banner Ribbon */}
      <div className="bg-[#6b1414] py-1 px-4 text-xs text-amber-200/90 border-b border-amber-700/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-semibold text-amber-300">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              {t.topRibbon.unescoTitle}
            </span>
            <span className="hidden sm:inline text-amber-400/60">•</span>
            <span className="hidden sm:inline text-amber-100/80">{t.topRibbon.unescoYear}</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-amber-200">
            <span className="hidden md:inline">{t.topRibbon.nonProfit}</span>
            <span className="hidden md:inline text-amber-400/60">•</span>
            <span className="text-amber-300 font-medium">{t.topRibbon.institution}</span>

            {/* Language Switcher Buttons in Ribbon */}
            <div className="flex items-center rounded-lg bg-black/30 p-0.5 border border-amber-500/40 ml-2">
              <button
                type="button"
                onClick={() => onLanguageChange('vi')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
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
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-col xl:flex-row xl:items-center justify-between gap-3">
        {/* Brand / Logo Area */}
        <div 
          onClick={() => onTabChange('home')}
          className="flex items-center gap-3 cursor-pointer group select-none flex-shrink-0"
        >
          {/* Traditional Cultural Lotus & Sun Seal Emblem */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 p-0.5 shadow-md flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full bg-[#7a1717] rounded-[10px] flex items-center justify-center border border-amber-300/40">
              <svg className="w-6 h-6 text-amber-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C11.5 4 10 7 7 8C4 9 2 11.5 2 12C2 12.5 4 15 7 16C10 17 11.5 20 12 22C12.5 20 14 17 17 16C20 15 22 12.5 22 12C22 11.5 20 9 17 8C14 7 12.5 4 12 2Z" opacity="0.25"/>
                <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 4V7M12 17V20M4 12H7M17 12H20M6.34 6.34L8.46 8.46M15.54 15.54L17.66 17.66M6.34 17.66L8.46 15.54M15.54 8.46L17.66 6.34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <div>
            <h1 className="text-base sm:text-lg font-bold font-serif-culture tracking-wide text-amber-100 group-hover:text-white transition-colors">
              {t.header.title}
            </h1>
            <p className="text-[10px] sm:text-xs text-amber-200/80 font-normal">
              {t.header.subtitle}
            </p>
          </div>
        </div>

        {/* Navigation Tabs and Accessibility Tools */}
        <div className="flex items-center flex-wrap gap-1.5 justify-between xl:justify-end">
          <nav aria-label="Chuyên mục chính" className="flex items-center flex-wrap gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => onTabChange(item.key)}
                  className={`relative px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 flex items-center gap-1.5 whitespace-nowrap ${
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

          {/* Quick Voice Reader Action Button */}
          <button
            type="button"
            onClick={isSpeaking ? stop : onReadCurrentPage}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm ${
              isSpeaking
                ? 'bg-emerald-400 text-emerald-950 animate-pulse'
                : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/50'
            }`}
            title="Đọc nội dung trang thành tiếng (Dành cho người cao tuổi & khiếm thị)"
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span>{t.header.audioReading}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                <span>{t.header.audioReaderBtn}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
