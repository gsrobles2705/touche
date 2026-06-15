import { useMemo, useEffect, useState } from 'react';
import { useI18n } from '../context/i18nContext';
import { useAuth } from '../context/AuthContext';
import { useTypewriter } from '../hooks/useTypewriter';
import { ArrowDown, Scissors } from 'lucide-react';

export default function Hero({ appReady = true }) {
  const { t } = useI18n();
  const { user } = useAuth();
  const [isShortHeight, setIsShortHeight] = useState(false);

  useEffect(() => {
    const checkHeight = () => setIsShortHeight(window.innerHeight < 820);
    checkHeight();
    window.addEventListener('resize', checkHeight);
    return () => window.removeEventListener('resize', checkHeight);
  }, []);

  // Derive greeting directly — no intermediate empty-string state
  const greetingText = useMemo(() => {
    if (user?.displayName) {
      const firstName = user.displayName.split(' ')[0];
      return t.hero.greetingLoggedIn.replace('{name}', firstName);
    }
    return t.hero.greetingLoggedOut;
  }, [user, t]);

  const { displayed, isDone } = useTypewriter(greetingText, 50, 200, appReady);

  const handleScrollToServices = () => {
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/51936797870?text=${encodeURIComponent(
    t.whatsapp.defaultMessage
  )}`;

  const reveal = (delayClass = '') =>
    appReady ? `fade-in-up ${delayClass}`.trim() : 'opacity-0';

  return (
    <section
      id="home"
      className={`relative flex flex-col h-[100svh] pt-[100px] md:pt-[90px] px-4 sm:px-6 lg:px-8 overflow-hidden ${
        isShortHeight ? 'justify-start' : 'justify-center'
      }`}
      aria-label="Hero section"
    >
      <div className={`flex-1 flex items-center justify-center ${!isShortHeight ? 'my-auto' : ''}`}>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className={`inline-flex items-center gap-2.5 mb-6 ${reveal()}`}>
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold-500/60" />
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-gold-500">
              {t.hero.eyebrow}
            </span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold-500/60" />
          </div>

          <h1 className={`font-display font-semibold leading-[1.1] text-white mb-6 min-h-[6rem] text-4xl sm:text-5xl lg:text-6xl ${reveal('fade-in-up-delay-1')}`}>
            {displayed}
            {appReady && !isDone && <span className="typewriter-cursor"></span>}
          </h1>

          <p className={`hero-description max-w-2xl mx-auto text-base sm:text-lg text-white/60 leading-relaxed mb-10 ${reveal('fade-in-up-delay-2')}`}>
            {t.hero.subtitle}
          </p>

          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${reveal('fade-in-up-delay-3')}`}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold flex items-center gap-2 px-8 py-4 text-base font-semibold"
            >
              <Scissors size={18} />
              {t.hero.ctaBook}
            </a>
            <button onClick={handleScrollToServices} className="btn-ghost px-8 py-4 text-base">
              {t.hero.ctaServices}
            </button>
          </div>

          <div className={`mt-12 flex items-center justify-center gap-2 ${reveal('fade-in-up-delay-4')}`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-xs font-mono tracking-widest text-white/40 uppercase">
              {t.hero.badge}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-8 pb-6">
        <button
          onClick={handleScrollToServices}
          aria-label="Scroll to services"
          className="flex flex-col items-center gap-1.5 text-white/25 hover:text-white/50 transition-colors duration-300 group mx-auto"
        >
          <span className="text-[9px] font-mono tracking-[0.3em] uppercase">scroll</span>
          <ArrowDown size={16} className="animate-bounce group-hover:text-gold-500 transition-colors" />
        </button>
      </div>
    </section>
  );
}