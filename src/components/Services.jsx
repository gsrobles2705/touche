import { Scissors, Heart, Sparkles } from 'lucide-react';
import { useI18n } from '../context/i18nContext';
import GlassCard from './ui/GlassCard';
import SectionWrapper from './ui/SectionWrapper';

const ICON_MAP = {
  scissors: Scissors,
  heart: Heart,
  sparkles: Sparkles,
};

function ServiceCard({ service, index }) {
  const Icon = ICON_MAP[service.icon] ?? Scissors;

  return (
    <GlassCard
      hover
      reveal
      revealDelay={index}
      className="service-card group p-6 flex flex-col gap-4 transition-all duration-500 overflow-hidden"
    >
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center group-hover:bg-gold-500/20 group-hover:border-gold-500/40 transition-all">
          <Icon size={24} className="text-gold-400 group-hover:text-gold-300" strokeWidth={1.5} />
        </div>
        <h3 className="font-display text-xl font-semibold text-white">{service.name}</h3>
      </div>

      {/* Hidden description revealed on hover */}
      <div className="service-description overflow-hidden transition-all duration-500 ease-out max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 group-hover:mt-2">
        <p className="text-sm text-white/60 leading-relaxed text-center">{service.description}</p>
        <div className="pt-3 text-center">
          <span className="text-[10px] font-mono tracking-widest text-gold-500/70 uppercase border-t border-white/10 pt-2 inline-block">
            {service.tagline}
          </span>
        </div>
      </div>
    </GlassCard>
  );
}

export default function Services() {
  const { t } = useI18n();
  const services = t.services.items;

  return (
    <SectionWrapper id="services">
      <div className="text-center mb-16 flex flex-col items-center gap-4">
        <p className="section-label">{t.services.eyebrow}</p>
        <h2 className="section-title">{t.services.title}</h2>
        <div className="flex items-center gap-3 mt-1">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500/50" />
          <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500/50" />
        </div>
        <p className="text-white/45 text-base max-w-xl leading-relaxed">
          {t.services.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
}