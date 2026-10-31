/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { DiSanItem, TabKey, Language } from './types/heritage';
import { AudioReaderProvider, useAudioReader } from './context/AudioReaderContext';
import { Header } from './components/Header';
import { FooterSourceBlock } from './components/FooterSourceBlock';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { HomeTab } from './components/HomeTab';
import { RitualsTab } from './components/RitualsTab';
import { DistinctionTab } from './components/DistinctionTab';
import { LegalTab } from './components/LegalTab';
import { AiAdvisorTab } from './components/AiAdvisorTab';
import { SourcesTab } from './components/SourcesTab';
import { AboutTab } from './components/AboutTab';
import initialDisanData from '../disan.json';

function AppContent() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [records, setRecords] = useState<DiSanItem[]>(initialDisanData as DiSanItem[]);
  const { currentLang, setCurrentLang, speak, stop, isSpeaking } = useAudioReader();

  // Load records from backend if available
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/disan');
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            setRecords(json.data);
          }
        }
      } catch (err) {
        console.warn('Using bundled initial disan.json fallback:', err);
      }
    }
    loadData();
  }, []);

  const handleAddRecord = async (newRecord: DiSanItem) => {
    const updated = [newRecord, ...records];
    setRecords(updated);
    try {
      await fetch('/api/disan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: updated }),
      });
    } catch (err) {
      console.error('Failed to sync to server:', err);
    }
  };

  // Generate page summary to read aloud for elderly and visually impaired users
  const handleReadCurrentPage = useCallback(() => {
    if (isSpeaking) {
      stop();
      return;
    }

    let summaryText = '';
    let summaryTitle = '';

    if (currentLang === 'en') {
      switch (activeTab) {
        case 'home':
          summaryTitle = 'Portal Overview and Heritage Records';
          summaryText = `Welcome to the Mother Goddess Worship Heritage Portal. This system safeguards the practices related to the Viet beliefs in the Mother Goddesses of Three Realms, inscribed by UNESCO in 2016. There are currently ${records.length} authentic records cataloged, honoring the Three Realms Mother Goddesses: First Mother of Heaven in Red, Second Mother of Highlands in Green, Third Mother of Waters in White, and Fourth Mother of Earth in Yellow.`;
          break;
        case 'rituals':
          summaryTitle = 'Standard Ceremonial Rituals';
          summaryText = 'Standard ceremonial rituals comprise worship sanctuaries, canonical Four Palaces color attire, traditional Chau van music with moon lutes and bamboo clappers, and the eight canonical steps of spirit possession from preparation to final thanks.';
          break;
        case 'distinction':
          summaryTitle = 'Distinguishing Authenticity from Commercialized Deviation';
          summaryText = 'Guidance to identify five danger signs of spiritual exploitation: Intimidation regarding destiny, demanding exorbitant millions of dong, scattering polymer money creating chaos, vulgar dance gestures, and superstitious fortune telling. Spiritual practice must remain pure, moral, and non-commercial.';
          break;
        case 'legal':
          summaryTitle = 'State Legal Framework';
          summaryText = 'The Socialist Republic of Vietnam protects freedom of belief under the 2016 Law on Belief and Religion. Article 5 strictly prohibits abusing religious activities for financial profit or superstition. Decree 38 of 2021 provides administrative fines and confiscation of illegal gains.';
          break;
        case 'advisor':
          summaryTitle = 'AI Heritage & Legal Assistant';
          summaryText = 'The smart assistant is powered by Gemini 3.8 Flash, grounded entirely in verified archival records from disan.json and state legal statutes to provide objective guidance without speculation.';
          break;
        case 'sources':
          summaryTitle = 'Authoritative Verification Sources';
          summaryText = 'Repository of eight verified scientific, academic, and state legal documents including UNESCO Nomination File 01064, Cultural Heritage Department decisions, and research by the late Professor Ngo Duc Thinh.';
          break;
        case 'about':
          summaryTitle = 'About the Project and Internship Declaration';
          summaryText = 'Internship project by student Nguyen Viet Hai, student ID PH63500, Group 01, Internship Batch 15 FPT Polytechnic and IMTA TECH. A non-profit social initiative dedicated to cultural preservation.';
          break;
      }
    } else {
      switch (activeTab) {
        case 'home':
          summaryTitle = 'Tổng quan Cổng thông tin Di sản';
          summaryText = `Kính chào Quý vị. Cổng thông tin Di sản Thực hành Tín ngưỡng thờ Mẫu Tam phủ tôn vinh Mẫu – người Mẹ bao dung của vũ trụ và đất trời, được UNESCO ghi danh năm 2016. Hệ thống hiện lưu trữ ${records.length} hồ sơ di sản chính thống, chuẩn hóa Tam Tòa Thánh Mẫu: Mẫu Đệ Nhất Thượng Thiên áo đỏ, Mẫu Đệ Nhị Thượng Ngàn áo xanh, Mẫu Đệ Tam Thoải Phủ áo trắng, và Mẫu Đệ Tứ Địa Phủ áo vàng.`;
          break;
        case 'rituals':
          summaryTitle = 'Nghi thức Thực hành Chuẩn mực';
          summaryText = 'Nghi thức chuẩn mực bao gồm quy chuẩn không gian thờ tự, y phục Tứ phủ ngũ sắc tôn nghiêm, dàn nhạc chầu văn cổ truyền với đàn nguyệt, phách tre, trống bản và trình tự 8 bước một buổi hầu đồng từ Chuẩn bị, Phát tấu, Tráng bóng Tam Tòa Thánh Mẫu đến Tạ lễ Hoàn đàn.';
          break;
        case 'distinction':
          summaryTitle = 'Phân biệt Chuẩn mực và Biến tướng Trục lợi';
          summaryText = 'Cảnh báo 5 dấu hiệu đỏ nhận diện hành vi trục lợi tâm linh: Dọa dẫm căn quả bắt làm lễ cắt âm tiền triệu, hét giá khóa hầu hàng chục triệu, rải tiền mệnh giá lớn gây giẫm đạp, múa máy dung tục, và buôn thần bán thánh lừa đảo. Đi lễ cốt ở tâm thành, không dùng tiền bạc để đo lòng thành kính.';
          break;
        case 'legal':
          summaryTitle = 'Khung Pháp lý Nhà nước';
          summaryText = 'Hệ thống pháp luật Nhà nước Việt Nam: Luật Tín ngưỡng, tôn giáo 2016 quy định tại Điều 5 nghiêm cấm lợi dụng tín ngưỡng để trục lợi và hoạt động mê tín dị đoan. Nghị định 38 năm 2021 quy định phạt tiền và buộc nộp lại toàn bộ số lợi bất hợp pháp.';
          break;
        case 'advisor':
          summaryTitle = 'Trợ lý Tra cứu Thông minh AI';
          summaryText = 'Trợ lý thông minh vận hành bằng mô hình Gemini 3.8 Flash, tra cứu nghiêm ngặt và đối chiếu hoàn toàn dựa trên dữ liệu tệp disan.json và quy chuẩn pháp lý. Tuyệt đối không tự suy đoán ngoài tư liệu lưu trữ.';
          break;
        case 'sources':
          summaryTitle = 'Trang Nguồn tư liệu Chính thống';
          summaryText = 'Danh mục 8 nguồn tư liệu kiểm chứng học thuật và pháp lý bao gồm Hồ sơ UNESCO số 01064, Cục Di sản Văn hóa, Văn bản Luật Quốc gia, Nghị định 38 của Chính phủ và các công trình của Cố Giáo sư Ngô Đức Thịnh.';
          break;
        case 'about':
          summaryTitle = 'Giới thiệu Dự án và Bản quyền Thực tập';
          summaryText = 'Sản phẩm thực tập của Nguyễn Viết Hải, mã sinh viên PH63500, Nhóm 01, Chương trình Thực tập sinh Đợt 15 FPT Polytechnic và IMTA TECH, dự án xã hội phi lợi nhuận phục vụ bảo tồn văn hóa cộng đồng.';
          break;
      }
    }

    speak(summaryText, summaryTitle, currentLang);
  }, [activeTab, currentLang, records.length, speak, isSpeaking, stop]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbf7] text-[#1f2937]">
      {/* Top Header & Navigation */}
      <Header 
        activeTab={activeTab} 
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
        totalRecords={records.length}
        currentLang={currentLang}
        onLanguageChange={(lang) => {
          setCurrentLang(lang);
          stop();
        }}
        onReadCurrentPage={handleReadCurrentPage}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-16">
        {activeTab === 'home' && (
          <HomeTab 
            records={records} 
            currentLang={currentLang}
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddRecord={handleAddRecord}
          />
        )}

        {activeTab === 'rituals' && <RitualsTab />}

        {activeTab === 'distinction' && <DistinctionTab />}

        {activeTab === 'legal' && <LegalTab />}

        {activeTab === 'advisor' && <AiAdvisorTab />}

        {activeTab === 'sources' && <SourcesTab />}

        {activeTab === 'about' && <AboutTab />}
      </main>

      {/* Persistent Audio Player Bar for Elderly & Visually Impaired Visitors */}
      <AudioPlayerBar onReadCurrentPage={handleReadCurrentPage} />

      {/* MANDATORY PERSISTENT SOURCE BLOCK - ALWAYS AT BOTTOM, NEVER HIDDEN */}
      <FooterSourceBlock />
    </div>
  );
}

export default function App() {
  return (
    <AudioReaderProvider>
      <AppContent />
    </AudioReaderProvider>
  );
}
