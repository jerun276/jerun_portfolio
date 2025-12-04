'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FoundationSection from '@/components/FoundationSection';
import EarlyDiscoveriesSection from '@/components/EarlyDiscoveriesSection';
import AscentSection from '@/components/AscentSection';
import CurrentFrontierSection from '@/components/CurrentFrontierSection';
import ConnectSection from '@/components/ConnectSection';
import LoadingScreen from '@/components/LoadingScreen';
import { usePreloadManager, defaultPreloadItems } from '@/hooks/usePreloadManager';

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const { isLoading, progress } = usePreloadManager(defaultPreloadItems);

  // Manage body class for loading state
  useEffect(() => {
    if (isLoading) {
      document.body.classList.add('loading');
    } else {
      document.body.classList.remove('loading');
    }

    return () => {
      document.body.classList.remove('loading');
    };
  }, [isLoading]);

  const handleLoadComplete = () => {
    setShowContent(true);
  };

  if (isLoading || !showContent) {
    return (
      <LoadingScreen 
        onLoadComplete={handleLoadComplete}
        progress={progress}
      />
    );
  }

  return (
    <div className="relative content-reveal">
      {/* Fixed Navbar */}
      <Navbar />
      
      {/* Main Content Sections */}
      <main>
        <div id="home">
          <HeroSection />
        </div>
        <div id="foundation">
          <FoundationSection />
        </div>
        <div id="early-discoveries">
          <EarlyDiscoveriesSection />
        </div>
        <div id="ascent">
          <AscentSection />
        </div>
        <div id="current-frontier">
          <CurrentFrontierSection />
        </div>
        <div id="connect">
          <ConnectSection />
        </div>
      </main>
    </div>
  );
}
