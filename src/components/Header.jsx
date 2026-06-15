import { useState, useEffect } from 'react';
import { Menu, X, LogIn, LogOut, Loader2, AlertCircle } from 'lucide-react';
import { useI18n } from '../context/i18nContext';
import { useAuth } from '../context/AuthContext';

function LangToggle() {
  const { language, toggleLanguage, t } = useI18n();
  return (
    <button
      onClick={toggleLanguage}
      aria-label={`Switch to ${language === 'es' ? 'English' : 'Español'}`}
      className="relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-gold-500/30 text-xs font-mono tracking-widest text-gold-400 hover:text-gold-300 hover:border-gold-400/60 transition-all duration-300 hover:bg-gold-500/5"
    >
      <span className="text-white/40">{language.toUpperCase()}</span>
      <span className="text-white/20">·</span>
      <span>{t.nav.langToggle}</span>
    </button>
  );
}

function AuthButton({ isMobile = false }) {
  const { user, loading, authError, signInWithGoogle, signOut } = useAuth();
  const { t } = useI18n();
  const [busy, setBusy] = useState(false);

  const handleAction = async () => {
    setBusy(true);
    try {
      if (user) await signOut();
      else await signInWithGoogle();
    } finally {
      setBusy(false);
    }
  };

  const baseClasses = isMobile
    ? 'flex items-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200'
    : 'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300';

  if (loading) {
    return (
      <div className={`${baseClasses} text-white/40`}>
        <Loader2 size={15} className="animate-spin" />
      </div>
    );
  }

  if (user) {
    return (
      <button
        onClick={handleAction}
        disabled={busy}
        className={`${baseClasses} border border-white/10 text-white/60 hover:text-white hover:border-white/20 hover:bg-white/5`}
      >
        {busy ? <Loader2 size={15} className="animate-spin" /> : <LogOut size={15} />}
        {isMobile && <span>{t.nav.signOut}</span>}
      </button>
    );
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={handleAction}
        disabled={busy}
        className={`${baseClasses} btn-gold text-xs tracking-wide`}
      >
        {busy ? <Loader2 size={14} className="animate-spin" /> : <LogIn size={14} />}
        <span>{t.nav.signIn}</span>
      </button>
      {authError && (
        <p className="flex items-center gap-1 text-[10px] text-red-400 max-w-[200px] text-right leading-snug">
          <AlertCircle size={10} className="flex-shrink-0" />
          {authError}
        </p>
      )}
    </div>
  );
}

export default function Header() {
  const { t } = useI18n();
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navLinks = [
    { label: t.nav.philosophy, href: '#philosophy' },
    { label: t.nav.services,   href: '#services'   },
    { label: t.nav.reviews,    href: '#reviews'    },
    { label: t.nav.faq,        href: '#faq'        },
    { label: t.nav.location,   href: '#location'   },
  ];

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? 'bg-dark/90 backdrop-blur-lg border-b border-white/[0.06] py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex flex-col leading-none group"
              aria-label="Touchê — inicio"
            >
              <span className="font-display text-2xl font-semibold tracking-tight gold-text group-hover:opacity-90 transition-opacity duration-300">
                Touchê
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-4 lg:gap-8" aria-label="Primary navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="relative text-[13px] lg:text-sm font-body text-white/60 hover:text-white transition-colors duration-200 py-1 whitespace-nowrap after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-gold-500 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <LangToggle />
              <AuthButton />
              {user?.photoURL && (
                <img
                  src={user.photoURL}
                  alt={user.displayName ?? 'User avatar'}
                  className="w-8 h-8 rounded-full border border-gold-500/40 object-cover"
                />
              )}
            </div>

            <div className="flex md:hidden items-center gap-3">
              <LangToggle />
              <button
                onClick={() => setMenuOpen((o) => !o)}
                aria-expanded={menuOpen}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                className="p-2 rounded-lg border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-colors duration-200"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${menuOpen ? 'visible' : 'invisible'}`}
        aria-hidden={!menuOpen}
      >
        <div
          className={`absolute inset-0 bg-dark/80 backdrop-blur-sm transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMenuOpen(false)}
        />
        <div className={`absolute top-0 right-0 h-full w-72 bg-dark-100/95 backdrop-blur-xl border-l border-white/[0.08] flex flex-col pt-24 pb-10 px-6 transition-transform duration-300 ease-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <nav className="flex flex-col gap-1 mb-8" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="flex items-center px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200 font-body text-base border border-transparent hover:border-white/[0.08]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="border-t border-white/[0.06] pt-6">
            {user && (
              <div className="flex items-center gap-3 px-4 py-3 mb-4 glass-card">
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt={user.displayName ?? ''}
                    className="w-9 h-9 rounded-full border border-gold-500/40 object-cover flex-shrink-0"
                  />
                )}
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">{user.displayName}</p>
                  <p className="text-xs text-white/40 truncate">{user.email}</p>
                </div>
              </div>
            )}
            <AuthButton isMobile />
          </div>
        </div>
      </div>
    </>
  );
}