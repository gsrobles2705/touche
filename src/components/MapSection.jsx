import { MapPin, Clock, ExternalLink, Navigation } from 'lucide-react';
import { useI18n } from '../context/i18nContext';
import GlassCard from './ui/GlassCard';
import SectionWrapper from './ui/SectionWrapper';

const MAPS_EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.1751220190376!2d-76.99261162388208!3d-12.168477844181005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105b83432cba917%3A0x9c4644ac8372957a!2sC.%20Pierre%20Sim%C3%B3n%20Laplace%2C%20Santiago%20de%20Surco!5e0!3m2!1ses-419!2spe!4v1781484432777!5m2!1ses-419!2spe" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"';

const MAPS_DIRECTIONS_URL = 'https://www.google.com/maps/dir/?api=1&destination=Calle+Pierre+Simón+Laplace+MZ+H+lote+5,+Surco';

const MAPS_PLACE_URL = 'https://www.google.com/maps/search/?api=1&query=Calle+Pierre+Simón+Laplace+MZ+H+lote+5,+Surco';

function ScheduleRow({ day, hours, closed = false }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-white/[0.05] last:border-0">
      <span className="text-sm text-white/55 font-body">{day}</span>
      <span className={`text-sm font-mono ${closed ? 'text-white/25' : 'text-gold-400'}`}>
        {hours}
      </span>
    </div>
  );
}

function MapEmbed() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/[0.08] shadow-xl aspect-[4/3] md:aspect-[16/9] lg:aspect-[4/3]">
      <div
        className="absolute inset-0 z-10 pointer-events-none rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(10,10,10,0.2) 0%, transparent 60%)',
        }}
      />
      <iframe
        src={MAPS_EMBED_URL}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Ubicación de Touchê"
        className="w-full h-full"
      />
    </div>
  );
}

export default function MapSection() {
  const { t } = useI18n();
  const { location } = t;

  return (
    <SectionWrapper id="location">
      <div className="text-center mb-16 flex flex-col items-center gap-4">
        <p className="section-label">{location.eyebrow}</p>
        <h2 className="section-title">{location.title}</h2>
        <div className="flex items-center gap-3 mt-1">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500/50" />
          <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500/50" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        <div className="lg:col-span-2 flex flex-col gap-5">
          <GlassCard reveal className="p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center">
                <MapPin size={17} className="text-gold-400" />
              </div>
              <div>
                <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-gold-500/70 mb-0.5">
                  {location.eyebrow}
                </p>
                <p className="text-sm font-medium text-white leading-snug">{location.address}</p>
              </div>
            </div>
            <p className="text-xs text-white/40 pl-12 font-mono">{location.city}</p>
          </GlassCard>

          <GlassCard reveal revealDelay={1} className="p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center">
                <Clock size={17} className="text-gold-400" />
              </div>
              <p className="text-sm font-semibold text-white">{location.schedule.title}</p>
            </div>
            <div className="flex flex-col">
              <ScheduleRow day={location.schedule.weekdays} hours={location.schedule.weekdaysHours} />
              <ScheduleRow day={location.schedule.saturday} hours={location.schedule.saturdayHours} />
              <ScheduleRow day={location.schedule.sunday} hours={location.schedule.sundayHours} />
            </div>
          </GlassCard>

          <GlassCard reveal revealDelay={2} className="p-5 flex flex-col gap-3">
            <a
              href={MAPS_PLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold flex items-center justify-center gap-2 w-full text-sm py-3"
            >
              <ExternalLink size={15} />
              {location.openMaps}
            </a>
            <a
              href={MAPS_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost flex items-center justify-center gap-2 w-full text-sm py-3"
            >
              <Navigation size={15} />
              {location.getDirections}
            </a>
          </GlassCard>
        </div>

        <div className="lg:col-span-3">
          <GlassCard reveal revealDelay={1} className="p-3">
            <MapEmbed />
            <div className="flex items-center gap-2 px-3 pt-3 pb-1">
              <MapPin size={12} className="text-gold-500/60 flex-shrink-0" />
              <p className="text-xs text-white/35 font-mono truncate">
                {location.address} · {location.city}
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </SectionWrapper>
  );
}