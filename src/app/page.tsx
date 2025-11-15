import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FoundationSection from '@/components/FoundationSection';
import EarlyDiscoveriesSection from '@/components/EarlyDiscoveriesSection';
import AscentSection from '@/components/AscentSection';
import CurrentFrontierSection from '@/components/CurrentFrontierSection';
import ConnectSection from '@/components/ConnectSection';

export default function Home() {
  return (
    <div className="relative">
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
