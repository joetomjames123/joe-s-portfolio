import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Navigation } from './components/Navigation/Navigation';
import { HeroSection } from './components/Hero/HeroSection';
import { AboutSection } from './components/About/AboutSection';
import { ExperienceSection } from './components/Experience/ExperienceSection';
import { SkillsSection } from './components/Skills/SkillsSection';
import { ProjectsSection } from './components/Projects/ProjectsSection';
import { CertificatesSection } from './components/Certificates/CertificatesSection';
import { VisualJournalSection } from './components/Gallery/VisualJournalSection';
import { CreativeCornerSection } from './components/CreativeCorner/CreativeCornerSection';
import { ContactSection } from './components/Contact/ContactSection';
import { Footer } from './components/Footer';
import { ThemeCustomizer } from './components/Theme/ThemeCustomizer';
import { CustomCursor } from './components/Cursor/CustomCursor';
import { CinematicIntro } from './components/Intro/CinematicIntro';
import { CosmicMeteorShower } from './components/Cosmic/CosmicMeteorShower';

export const App: React.FC = () => {
  const [replayIntroCount, setReplayIntroCount] = useState<number>(0);

  const handleReplayIntro = () => {
    setReplayIntroCount((prev) => prev + 1);
  };

  return (
    <ThemeProvider>
      {/* Butter-smooth cinematic welcome animation overlay */}
      <CinematicIntro triggerReplay={replayIntroCount} />

      <div 
        className="relative min-h-screen font-sans transition-colors duration-500"
        style={{
          backgroundColor: 'var(--bg-primary)',
          color: 'var(--text-primary)'
        }}
      >
        {/* Whole-website Cosmic 3D Starfield with smooth Zoom-In / Zoom-Out on scroll */}
        <CosmicMeteorShower />

        {/* Custom Contextual Cursor */}
        <CustomCursor />

        {/* Global Navigation */}
        <Navigation />

        {/* Main Content Sections */}
        <main>
          {/* Hero Section with Interactive 3D Planet and Celestial Orbits */}
          <HeroSection onReplayIntro={handleReplayIntro} />

          {/* About Section with Blank Luxury Frame & Timeline */}
          <AboutSection />

          {/* Experience Section with FlyRank AI & Certificate Viewer */}
          <ExperienceSection />

          {/* Interactive Skills with Marquee & Filter Tabs */}
          <SkillsSection />

          {/* Projects Showcase with Expandable Cards & Case Studies */}
          <ProjectsSection />

          {/* Verified Certificate Gallery with Lightbox & 9 Real Uploads */}
          <CertificatesSection />

          {/* Visual Journal with Clean Photo & Video Slots */}
          <VisualJournalSection />

          {/* Creative Corner & Explorations */}
          <CreativeCornerSection />

          {/* Contact Section with Form Validation */}
          <ContactSection />
        </main>

        {/* Footer with Colophon & Quick Links */}
        <Footer />

        {/* Floating Theme Customization System */}
        <ThemeCustomizer />
      </div>
    </ThemeProvider>
  );
};

export default App;

