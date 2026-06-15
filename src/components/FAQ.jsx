// FAQ section — interactive accordion built on top of GlassCard
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useI18n } from '../context/i18nContext';
import GlassCard from './ui/GlassCard';
import SectionWrapper from './ui/SectionWrapper';

function FAQItem({ item, index, isOpen, onToggle }) {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <GlassCard reveal revealDelay={index} className="overflow-hidden">
      <button
        id={buttonId}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 group"
      >
        <span className="font-display text-base sm:text-lg text-white group-hover:text-gold-300 transition-colors duration-200">
          {item.question}
        </span>
        <span
          className={`flex-shrink-0 w-8 h-8 rounded-full border border-gold-500/25 flex items-center justify-center text-gold-400 transition-all duration-300 ${
            isOpen ? 'rotate-45 bg-gold-500/10 border-gold-500/40' : ''
          }`}
        >
          <Plus size={16} />
        </span>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="grid overflow-hidden transition-all duration-300 ease-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr', opacity: isOpen ? 1 : 0 }}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 pt-4 text-sm text-white/55 leading-relaxed border-t border-white/[0.06]">
            {item.answer}
          </p>
        </div>
      </div>
    </GlassCard>
  );
}

export default function FAQ() {
  const { t } = useI18n();
  const { faq } = t;
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <SectionWrapper id="faq">
      <div className="text-center mb-16 flex flex-col items-center gap-4">
        <p className="section-label">{faq.eyebrow}</p>
        <h2 className="section-title">{faq.title}</h2>
        <div className="flex items-center gap-3 mt-1">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500/50" />
          <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500/50" />
        </div>
        <p className="text-white/45 text-base max-w-xl leading-relaxed">{faq.subtitle}</p>
      </div>

      <div className="max-w-2xl mx-auto flex flex-col gap-4">
        {faq.items.map((item, index) => (
          <FAQItem
            key={item.question}
            item={item}
            index={index}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}