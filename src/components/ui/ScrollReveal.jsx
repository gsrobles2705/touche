// Reusable scroll-triggered "fade up" reveal wrapper powered by Framer Motion.
// Wrap any section/component with <ScrollReveal> to animate it in as the
// user scrolls it into view.
import { motion } from 'framer-motion';

/**
 * @param {object}          props
 * @param {React.ReactNode} props.children
 * @param {string}          [props.className]
 * @param {number}          [props.delay]    - Animation delay in seconds
 * @param {number}          [props.duration] - Animation duration in seconds
 * @param {keyof typeof motion} [props.as]    - Underlying tag (default 'div')
 */
export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  as = 'div',
  ...rest
}) {
  const MotionTag = motion[as] ?? motion.div;

  return (
    <MotionTag
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}