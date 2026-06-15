// Consistent section padding, max-width centering and scroll-reveal wrapper
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * @param {string} id          - Section id for anchor links
 * @param {string} className   - Extra classes on the outer <section>
 * @param {string} innerClass  - Extra classes on the inner container
 */
export default function SectionWrapper({
  id,
  children,
  className = '',
  innerClass = '',
}) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.08 });

  return (
    <section
      id={id}
      ref={ref}
      className={`relative py-28 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div
        className={`
          max-w-6xl mx-auto
          transition-all duration-700 ease-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          ${innerClass}
        `}
      >
        {children}
      </div>
    </section>
  );
}