import { useMemo } from 'react';

function Particles() {
  // useMemo prevents re-generating random positions on every render
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      left: Math.random() * 100,
      bottom: Math.random() * 100,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 10,
    })),
  []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            bottom: `${p.bottom}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

const ORBS = [
  { id: 1, size: 600, top: '10%', left: '-10%', color: 'rgba(201,168,76,0.12)', duration: '18s', tx: '40px', ty: '-30px' },
  { id: 2, size: 500, top: '55%', right: '-8%', color: 'rgba(255,255,255,0.08)', duration: '22s', tx: '-30px', ty: '20px' },
  { id: 3, size: 400, top: '30%', left: '40%', color: 'rgba(201,168,76,0.1)', duration: '14s', tx: '20px', ty: '-40px' },
  { id: 4, size: 350, bottom: '5%', left: '20%', color: 'rgba(255,255,255,0.07)', duration: '26s', tx: '-20px', ty: '15px' },
];

function DotGrid() {
  return (
    <div
      className="absolute inset-0 opacity-[0.08]"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.5) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }}
    />
  );
}

function DiagonalAccent() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <defs>
        <linearGradient id="accent-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(201,168,76,0)" />
          <stop offset="40%" stopColor="rgba(201,168,76,0.12)" />
          <stop offset="60%" stopColor="rgba(245,217,139,0.08)" />
          <stop offset="100%" stopColor="rgba(201,168,76,0)" />
        </linearGradient>
      </defs>
      <line x1="0" y1="30%" x2="100%" y2="70%" stroke="url(#accent-line-grad)" strokeWidth="1.5" />
      <line x1="0" y1="32%" x2="100%" y2="72%" stroke="rgba(201,168,76,0.05)" strokeWidth="0.8" />
    </svg>
  );
}

export default function AnimatedBackground() {
  return (
    <div className="animated-mesh fixed inset-0 z-0 pointer-events-none" aria-hidden="true" role="presentation">
      {ORBS.map((orb) => (
        <div
          key={orb.id}
          className="orb absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            animation: `orbFloat ${orb.duration} ease-in-out infinite alternate`,
            transformOrigin: 'center',
          }}
        />
      ))}
      <DotGrid />
      <DiagonalAccent />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10,10,10,0.8) 100%)' }}
      />
      <Particles />
    </div>
  );
}