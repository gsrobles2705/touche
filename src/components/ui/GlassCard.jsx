// Reusable glassmorphism card — used across Services, Reviews, etc.
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * @param {object}  props
 * @param {string}  props.className   - Extra Tailwind classes
 * @param {boolean} props.hover       - Whether to apply hover lift effect
 * @param {boolean} props.reveal      - Whether to animate on scroll reveal
 * @param {number}  props.revealDelay - Delay multiplier for staggered reveals (0–5)
 * @param {React.ReactNode} props.children
 */
export default function GlassCard({
  children,
  className = '',
  hover = false,
  reveal = false,
  revealDelay = 0,
  ...rest
}) {
  const { ref, isVisible } = useScrollReveal();

  const baseClasses =
    'bg-white/[0.04] backdrop-blur-md border border-white/[0.08] rounded-2xl';

  const hoverClasses = hover
    ? 'transition-all duration-500 cursor-default hover:bg-white/[0.08] hover:border-gold-500/25 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(201,168,76,0.12)]'
    : '';

  const revealClasses = reveal
    ? `transition-all duration-700 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      }`
    : '';

  const delayStyle = reveal
    ? { transitionDelay: `${revealDelay * 120}ms` }
    : {};

  return (
    <div
      ref={reveal ? ref : undefined}
      className={`${baseClasses} ${hoverClasses} ${revealClasses} ${className}`}
      style={delayStyle}
      {...rest}
    >
      {children}
    </div>
  );
}