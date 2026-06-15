import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useI18n } from '../context/i18nContext';

export default function InstallBanner({ onVisibilityChange }) {
  const { isInstallable, isInstalled, promptInstall } = usePWAInstall();
  const [dismissed, setDismissed] = useState(false);
  const { t } = useI18n();

  const isVisible = isInstallable && !isInstalled && !dismissed;

  // Notificar al padre (App.jsx) cuando la visibilidad cambie
  useEffect(() => {
    onVisibilityChange?.(isVisible);
  }, [isVisible, onVisibilityChange]);

  if (!isVisible) return null;

  return (
    <div className="
      fixed z-50 fade-in-up
      top-20 left-4 right-4
      lg:top-auto lg:bottom-6 lg:left-1/2 lg:right-auto lg:-translate-x-1/2
      lg:w-auto lg:max-w-md
    ">
      <div className="bg-black/90 backdrop-blur-sm border border-gold-500/30 rounded-2xl flex items-center gap-4 px-5 py-4 shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
        <div className="w-10 h-10 rounded-xl bg-gold-500/20 border border-gold-500/30 flex items-center justify-center flex-shrink-0">
          <Download size={18} className="text-gold-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white">{t.pwa.installTitle}</p>
          <p className="text-xs text-white/70 leading-snug">{t.pwa.installDescription}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button onClick={promptInstall} className="btn-gold text-xs px-4 py-2">
            {t.pwa.install}
          </button>
          <button
            onClick={() => setDismissed(true)}
            aria-label={t.pwa.dismiss}
            className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors duration-200"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}