import SectionWrapper from './ui/SectionWrapper';
import GlassCard from './ui/GlassCard';
import { useI18n } from '../context/i18nContext';

const beforeAfterPairs = [
  { id: 1, before: 'https://placehold.co/600x800/111/C9A84C?text=Antes', after: 'https://placehold.co/600x800/111/C9A84C?text=Después' },
  { id: 2, before: 'https://placehold.co/600x800/111/C9A84C?text=Antes', after: 'https://placehold.co/600x800/111/C9A84C?text=Después' },
  { id: 3, before: 'https://placehold.co/600x800/111/C9A84C?text=Antes', after: 'https://placehold.co/600x800/111/C9A84C?text=Después' },
  { id: 4, before: 'https://placehold.co/600x800/111/C9A84C?text=Antes', after: 'https://placehold.co/600x800/111/C9A84C?text=Después' },
  { id: 5, before: 'https://placehold.co/600x800/111/C9A84C?text=Antes', after: 'https://placehold.co/600x800/111/C9A84C?text=Después' },
  { id: 6, before: 'https://placehold.co/600x800/111/C9A84C?text=Antes', after: 'https://placehold.co/600x800/111/C9A84C?text=Después' },
];

function GalleryItem({ item, index }) {
  return (
    <GlassCard
      reveal
      revealDelay={index}
      hover
      className="overflow-hidden group"
    >
      <div className="grid grid-cols-2 gap-0">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={item.before}
            alt="Antes del arreglo"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-mono text-gold-400">
            ANTES
          </div>
        </div>
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={item.after}
            alt="Después del arreglo"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-mono text-gold-400">
            DESPUÉS
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

export default function Gallery() {
  const { t } = useI18n();

  return (
    <SectionWrapper id="gallery">
      <div className="text-center mb-16 flex flex-col items-center gap-4">
        <p className="section-label">Antes & Después</p>
        <h2 className="section-title">Nuestro trabajo</h2>
        <div className="flex items-center gap-3 mt-1">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500/50" />
          <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500/50" />
        </div>
        <p className="text-white/45 text-base max-w-xl leading-relaxed">
          Transformaciones reales que hablan por sí mismas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {beforeAfterPairs.map((item, idx) => (
          <GalleryItem key={item.id} item={item} index={idx} />
        ))}
      </div>
    </SectionWrapper>
  );
}