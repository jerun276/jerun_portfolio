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

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleLoadComplete = () => {
    setShowContent(true);
  };

  if (isLoading || !showContent) {
    return (
      <LoadingScreen
        onLoadComplete={handleLoadComplete}
        progress={isLoading ? 80 : 100}
      />
    );
  }

  return (
    <div className="relative content-reveal">
      <Navbar />
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
