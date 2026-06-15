import { useState, useEffect, useCallback } from 'react';
import {
  collection,
  addDoc,
  query,
  orderBy,
  where,
  getDocs,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { LogIn, Quote, Loader2, PenLine, X, Send } from 'lucide-react';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../context/i18nContext';
import GlassCard from './ui/GlassCard';
import SectionWrapper from './ui/SectionWrapper';
import StarRating from './ui/StarRating';

const SEED_REVIEWS = [
  {
    id: 'seed-1',
    authorName: 'María Fernanda R.',
    rating: 5,
    text: 'Johanny es una artista. Llevé un vestido de noche con el cierre roto y lo devolvió perfecto. ¡Ni se nota! Precios muy justos.',
    avatarUrl: null,
    createdAt: null,
  },
  {
    id: 'seed-2',
    authorName: 'Claudia T.',
    rating: 5,
    text: 'Me hizo un vestido de gala a medida para mi graduación. La calidad es increíble, quedó como de revista. 100% recomendada.',
    avatarUrl: null,
    createdAt: null,
  },
  {
    id: 'seed-3',
    authorName: 'Luciana M.',
    rating: 5,
    text: 'Llevé varios pantalones para acortar y quedaron perfectos. Atención muy cálida y entrega puntual. Definitivamente mi modista de cabecera.',
    avatarUrl: null,
    createdAt: null,
  },
];

function ReviewCard({ review, index }) {
  const { t } = useI18n();

  const initials = review.authorName
    ? review.authorName
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '?';

  return (
    <GlassCard
      reveal
      revealDelay={index}
      className="p-7 flex flex-col gap-5 relative overflow-hidden"
    >
      <Quote
        size={48}
        className="absolute top-4 right-5 text-gold-500/6 rotate-180"
        strokeWidth={1}
        aria-hidden="true"
      />
      <StarRating value={review.rating} size={14} />
      <p className="text-white/65 text-sm leading-relaxed flex-1 italic">
        "{review.text}"
      </p>
      <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06]">
        {review.avatarUrl ? (
          <img
            src={review.avatarUrl}
            alt={review.authorName}
            className="w-9 h-9 rounded-full object-cover border border-gold-500/30 flex-shrink-0"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-gold-500/15 border border-gold-500/20 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-semibold text-gold-400">{initials}</span>
          </div>
        )}
        <div className="min-w-0">
          <p className="text-sm font-medium text-white truncate">{review.authorName}</p>
          <p className="text-[10px] font-mono text-gold-500/60 tracking-widest uppercase">
            {t.reviews.verifiedCustomer}
          </p>
        </div>
      </div>
    </GlassCard>
  );
}

function ReviewForm({ onClose, onSuccess }) {
  const { t } = useI18n();
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!text.trim() || rating === 0) return;
    setSubmitting(true);
    setError(null);

    try {
      // Verificar si el usuario ya dejó una reseña
      const existing = await getDocs(
        query(collection(db, 'reviews'), where('uid', '==', user.uid))
      );
      if (!existing.empty) {
        setError(t.reviews.alreadyReviewed);
        setSubmitting(false);
        return;
      }

      await addDoc(collection(db, 'reviews'), {
        authorName: user.displayName ?? 'Anonymous',
        avatarUrl: user.photoURL ?? null,
        uid: user.uid,
        rating,
        text: text.trim(),
        createdAt: serverTimestamp(),
      });
      onSuccess();
      onClose();
    } catch (err) {
      console.error('Error submitting review:', err);
      setError(t.reviews.submitError);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <GlassCard className="p-7 flex flex-col gap-5 border-gold-500/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <PenLine size={16} className="text-gold-400" />
          <span className="text-sm font-semibold text-white">
            {t.reviews.leaveReview}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors duration-200"
          aria-label="Close form"
        >
          <X size={16} />
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-mono tracking-widest text-white/40 uppercase">
          {t.reviews.ratingLabel}
        </p>
        <StarRating value={rating} onChange={setRating} size={24} />
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t.reviews.reviewPlaceholder}
        rows={4}
        maxLength={400}
        className="
          w-full bg-white/5 border border-white/10 rounded-xl
          px-4 py-3 text-sm text-white placeholder:text-white/25
          focus:outline-none focus:border-gold-500/40 focus:bg-white/8
          resize-none transition-all duration-200 leading-relaxed
        "
      />

      <p className="text-[11px] text-white/25 text-right -mt-3">
        {text.length}/400
      </p>

      {error && (
        <p className="text-xs text-red-400 bg-red-500/10 px-3 py-2 rounded-lg border border-red-500/20">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <button onClick={onClose} className="flex-1 btn-ghost py-2.5 text-sm">
          {t.reviews.cancel}
        </button>
        <button
          onClick={handleSubmit}
          disabled={submitting || !text.trim()}
          className="
            flex-1 btn-gold py-2.5 text-sm
            flex items-center justify-center gap-2
            disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
          "
        >
          {submitting ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Send size={14} />
          )}
          {t.reviews.submitReview}
        </button>
      </div>
    </GlassCard>
  );
}

function LoginPromptCard() {
  const { t } = useI18n();
  const { signInWithGoogle } = useAuth();

  return (
    <GlassCard className="p-7 flex flex-col items-center gap-4 text-center border-gold-500/15">
      <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center">
        <LogIn size={20} className="text-gold-400" />
      </div>
      <p className="text-white/60 text-sm max-w-xs leading-relaxed">
        {t.reviews.loginPrompt}
      </p>
      <button
        onClick={signInWithGoogle}
        className="btn-gold text-xs flex items-center gap-2 px-6 py-2.5"
      >
        {t.reviews.loginCta}
      </button>
    </GlassCard>
  );
}

export default function Reviews() {
  const { t } = useI18n();
  const { user } = useAuth();

  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [firestoreError, setFirestoreError] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetched = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setReviews(fetched);
        setFirestoreError(false);
        setLoadingReviews(false);
      },
      (err) => {
        console.error('Firestore listener error:', err);
        setFirestoreError(true);
        setLoadingReviews(false);
      }
    );

    return unsubscribe;
  }, []);

  const handleSuccess = useCallback(() => {
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 4000);
  }, []);

  const displayedReviews = reviews.length > 0 ? reviews : SEED_REVIEWS;

  return (
    <SectionWrapper id="reviews" className="bg-white/[0.01]">
      <div className="text-center mb-16 flex flex-col items-center gap-4">
        <p className="section-label">{t.reviews.eyebrow}</p>
        <h2 className="section-title">{t.reviews.title}</h2>
        <div className="flex items-center gap-3 mt-1">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500/50" />
          <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500/50" />
        </div>
        <p className="text-white/45 text-base max-w-xl leading-relaxed">
          {t.reviews.subtitle}
        </p>
      </div>

      {successMsg && (
        <div
          className="mb-8 mx-auto max-w-sm flex items-center gap-3 px-5 py-3.5 rounded-xl bg-green-500/10 border border-green-500/25 text-green-400 text-sm font-medium"
          role="status"
          aria-live="polite"
        >
          <span>✓</span>
          {t.reviews.thankYou}
        </div>
      )}

      {/* Firestore error notice — shown above seed reviews */}
      {firestoreError && (
        <p className="text-center text-xs text-white/25 font-mono mb-6" role="alert">
          {t.reviews.loadError}
        </p>
      )}

      {loadingReviews ? (
        <div className="flex justify-center py-16">
          <div className="flex flex-col items-center gap-3 text-white/30">
            <Loader2 size={28} className="animate-spin text-gold-500/50" />
            <p className="text-sm font-mono tracking-widest uppercase text-xs">
              {t.reviews.loadingReviews}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {displayedReviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>
      )}

      <div className="max-w-lg mx-auto">
        {user ? (
          showForm ? (
            <ReviewForm onClose={() => setShowForm(false)} onSuccess={handleSuccess} />
          ) : (
            <div className="text-center">
              <button
                onClick={() => setShowForm(true)}
                className="btn-gold flex items-center gap-2 mx-auto"
              >
                <PenLine size={15} />
                {t.reviews.leaveReview}
              </button>
            </div>
          )
        ) : (
          <LoginPromptCard />
        )}
      </div>
    </SectionWrapper>
  );
}