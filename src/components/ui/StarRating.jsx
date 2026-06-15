// Reusable star rating display and input component
import { useState } from 'react';
import { Star } from 'lucide-react';

/**
 * @param {object}   props
 * @param {number}   props.value      - Current rating (1–5)
 * @param {function} props.onChange   - Called with new rating; omit for read-only
 * @param {number}   props.size       - Icon size in px (default 16)
 */
export default function StarRating({ value = 0, onChange, size = 16 }) {
  const [hovered, setHovered] = useState(0);
  const isInteractive = typeof onChange === 'function';
  const displayValue = isInteractive ? (hovered || value) : value;

  return (
    <div
      className="flex gap-0.5"
      role={isInteractive ? 'radiogroup' : 'img'}
      aria-label={`Rating: ${value} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!isInteractive}
          onClick={() => isInteractive && onChange(star)}
          onMouseEnter={() => isInteractive && setHovered(star)}
          onMouseLeave={() => isInteractive && setHovered(0)}
          className={`transition-colors duration-150 ${
            isInteractive
              ? 'cursor-pointer hover:scale-110 active:scale-95'
              : 'cursor-default pointer-events-none'
          }`}
          aria-label={`${star} star${star !== 1 ? 's' : ''}`}
        >
          <Star
            size={size}
            className={
              star <= displayValue
                ? 'text-gold-400 fill-gold-400'
                : 'text-white/20 fill-transparent'
            }
          />
        </button>
      ))}
    </div>
  );
}