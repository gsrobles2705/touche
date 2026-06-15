import { useState } from 'react';
import AnimatedBackground from './components/ui/AnimatedBackground';
import ScrollReveal from './components/ui/ScrollReveal';
import ErrorBoundary from './components/ErrorBoundary';
import SplashScreen from './components/SplashScreen';
import Header from './components/Header';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Services from './components/Services';
import FAQ from './components/FAQ';
import Reviews from './components/Reviews';
import MapSection from './components/MapSection';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import InstallBanner from './components/InstallBanner';

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(false);

  return (
    <>
      <SplashScreen onComplete={() => setAppReady(true)} />

      <div className="relative min-h-screen bg-dark text-white selection:bg-gold-500 selection:text-dark overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-10 flex flex-col">
          <Header />
          <main className={`flex-1 ${bannerVisible ? 'pb-20' : ''}`}>
            <Hero appReady={appReady} />

            <ScrollReveal>
              <Philosophy />
            </ScrollReveal>

            <ScrollReveal>
              <Services />
            </ScrollReveal>

            <ScrollReveal>
              <FAQ />
            </ScrollReveal>

            {/* Reviews has Firestore dependency — isolate failures */}
            <ScrollReveal>
              <ErrorBoundary>
                <Reviews />
              </ErrorBoundary>
            </ScrollReveal>

            <ScrollReveal>
              <MapSection />
            </ScrollReveal>
          </main>

          <ScrollReveal>
            <Footer />
          </ScrollReveal>
        </div>

        <WhatsAppButton bottomOffset={bannerVisible ? 'bottom-24' : 'bottom-6'} />
        <InstallBanner onVisibilityChange={setBannerVisible} />
      </div>
    </>
  );
}