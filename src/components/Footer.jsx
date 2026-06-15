import { Phone, MapPin, Clock, Heart, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { useI18n } from '../context/i18nContext';

const WHATSAPP_NUMBER = '51936797870';

function FooterHeading({ children }) {
  return (
    <h4 className="text-xs font-mono tracking-[0.3em] uppercase text-gold-500/80 mb-5">
      {children}
    </h4>
  );
}

function FooterLink({ href, children, external = false, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="text-sm text-white/40 hover:text-gold-400 transition-colors duration-200 leading-relaxed flex items-start gap-1.5"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const { t } = useI18n();
  const { footer } = t;
  const currentYear = new Date().getFullYear();

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    t.whatsapp.defaultMessage
  )}`;

  const handleNavClick = (href) => {
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative z-10 border-t border-white/[0.06] mt-12">
      <div className="h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <div>
              <p className="font-display text-3xl font-semibold gold-text leading-none">Touchê</p>
              <p className="text-[9px] font-mono tracking-[0.4em] uppercase text-white/25 mt-1 pl-0.5">Costura & Arreglos</p>
            </div>
            <p className="text-sm text-white/35 leading-relaxed max-w-xs italic font-light">
              "{footer.tagline}"
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://www.instagram.com/starjomi/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Touchê"
                className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-white/35 hover:text-gold-400 hover:border-gold-500/30 transition-all duration-200"
              >
                <Instagram size={15} strokeWidth={1.5} />
              </a>
              <a
                href="https://www.facebook.com/JomiGarciaC"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de Touchê"
                className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-white/35 hover:text-gold-400 hover:border-gold-500/30 transition-all duration-200"
              >
                <Facebook size={15} strokeWidth={1.5} />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp de Touchê"
                className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-white/35 hover:text-gold-400 hover:border-gold-500/30 transition-all duration-200"
              >
                <MessageCircle size={15} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <FooterHeading>Enlaces</FooterHeading>
            <nav className="flex flex-col gap-3">
              <FooterLink href="#services" onClick={(e) => { e.preventDefault(); handleNavClick('#services'); }}>
                {footer.links.services}
              </FooterLink>
              <FooterLink href="#reviews" onClick={(e) => { e.preventDefault(); handleNavClick('#reviews'); }}>
                {footer.links.reviews}
              </FooterLink>
              <FooterLink href="#location" onClick={(e) => { e.preventDefault(); handleNavClick('#location'); }}>
                {footer.links.location}
              </FooterLink>
              <FooterLink href={whatsappUrl} external>
                {footer.whatsapp}
              </FooterLink>
            </nav>
          </div>

          {/* Contacto */}
          <div>
            <FooterHeading>{footer.contact}</FooterHeading>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <Phone size={14} className="text-gold-500/60 mt-0.5 flex-shrink-0" />
                <a href={`tel:${WHATSAPP_NUMBER}`} className="text-sm text-white/40 hover:text-gold-400 transition-colors">
                  {footer.phone}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-gold-500/60 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-white/40 leading-relaxed">{footer.address}</p>
              </div>
            </div>
          </div>

          {/* Horarios */}
          <div>
            <FooterHeading>{t.location.schedule.title}</FooterHeading>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <Clock size={14} className="text-gold-500/60 mt-0.5 flex-shrink-0" />
                <div className="flex flex-col gap-1.5">
                  <p className="text-sm text-white/40 leading-relaxed">
                    {t.location.schedule.weekdays}<br />
                    <span className="text-gold-400/70 font-mono text-xs">{t.location.schedule.weekdaysHours}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20 font-mono text-center sm:text-left">
            © {currentYear} Touchê · {footer.owner} · {footer.rights}
          </p>
          <p className="text-xs text-white/15 font-mono flex items-center gap-1.5">
            Hecho con <Heart size={10} className="text-gold-500/40 fill-gold-500/30" /> en Lima, Perú
          </p>
        </div>
      </div>
    </footer>
  );
}