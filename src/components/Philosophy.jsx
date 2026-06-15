// Philosophy & Process section — sits right below the Hero.
// Communicates the brand's care philosophy and a simple 3-step process.
import { Ruler, Scissors, CheckCircle2 } from 'lucide-react';
import { useI18n } from '../context/i18nContext';
import GlassCard from './ui/GlassCard';
import SectionWrapper from './ui/SectionWrapper';

const ICON_MAP = {
  ruler: Ruler,
  scissors: Scissors,
  check: CheckCircle2,
};

function ProcessStep({ step, index, isLast }) {
  const Icon = ICON_MAP[step.icon] ?? Ruler;

  return (
    <div className="relative flex flex-col items-center text-center gap-4 flex-1">
      {/* Connector line between steps (desktop only) */}
      {!isLast && (
        <span
          className="hidden md:block absolute top-7 left-[calc(50%+2.75rem)] right-[calc(-50%+2.75rem)] h-px bg-gradient-to-r from-gold-500/25 to-transparent"
          aria-hidden="true"
        />
      )}

      <div className="relative z-10 w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center">
        <Icon size={26} className="text-gold-400" strokeWidth={1.5} />
        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-dark border border-gold-500/30 flex items-center justify-center text-[11px] font-mono text-gold-400">
          {index + 1}
        </span>
      </div>

      <h3 className="font-display text-lg font-semibold text-white">{step.name}</h3>
      <p className="text-sm text-white/50 leading-relaxed max-w-[230px]">{step.description}</p>
    </div>
  );
}

export default function Philosophy() {
  const { t } = useI18n();
  const { philosophy } = t;

  return (
    <SectionWrapper id="philosophy">
      {/* Filosofía */}
      <div className="text-center mb-16 flex flex-col items-center gap-6 max-w-3xl mx-auto">
        <p className="section-label">{philosophy.eyebrow}</p>
        <h2 className="section-title">{philosophy.title}</h2>
        <div className="flex items-center gap-3 mt-1">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500/50" />
          <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500/50" />
        </div>
        <p className="font-display italic text-xl sm:text-2xl text-white/70 leading-relaxed">
          “{philosophy.text}”
        </p>
      </div>

      {/* El Proceso */}
      <GlassCard reveal className="p-8 sm:p-10">
        <h3 className="text-center text-xs font-mono tracking-[0.3em] uppercase text-gold-500/80 mb-10">
          {philosophy.process.title}
        </h3>
        <div className="flex flex-col md:flex-row items-stretch justify-between gap-12 md:gap-4">
          {philosophy.process.steps.map((step, index) => (
            <ProcessStep
              key={step.id}
              step={step}
              index={index}
              isLast={index === philosophy.process.steps.length - 1}
            />
          ))}
        </div>
      </GlassCard>
    </SectionWrapper>
  );
}