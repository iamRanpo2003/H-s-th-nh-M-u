/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DiSanItem, TabKey } from './types/heritage';
import { Header } from './components/Header';
import { FooterSourceBlock } from './components/FooterSourceBlock';
import { HomeTab } from './components/HomeTab';
import { RitualsTab } from './components/RitualsTab';
import { DistinctionTab } from './components/DistinctionTab';
import { LegalTab } from './components/LegalTab';
import { AiAdvisorTab } from './components/AiAdvisorTab';
import { AboutTab } from './components/AboutTab';
import initialDisanData from '../disan.json';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [records, setRecords] = useState<DiSanItem[]>(initialDisanData as DiSanItem[]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch updated records from backend if available
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
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-12">
        {activeTab === 'home' && (
          <HomeTab 
            records={records} 
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

        {activeTab === 'about' && <AboutTab />}
      </main>

      {/* MANDATORY PERSISTENT SOURCE BLOCK - ALWAYS AT BOTTOM, NEVER HIDDEN */}
      <FooterSourceBlock />
    </div>
  );
}
