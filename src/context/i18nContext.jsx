// Internationalisation context — manages language state and provides translations
import { createContext, useContext, useState, useCallback } from 'react';
import es from '../locales/es';
import en from '../locales/en';

const DICTIONARIES = { es, en };
const DEFAULT_LANGUAGE = 'es';

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);

  const t = DICTIONARIES[language];

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'es' ? 'en' : 'es'));
  }, []);

  const switchLanguage = useCallback((lang) => {
    if (DICTIONARIES[lang]) setLanguage(lang);
  }, []);

  return (
    <I18nContext.Provider value={{ language, t, toggleLanguage, switchLanguage }}>
      {children}
    </I18nContext.Provider>
  );
}

// Convenience hook — throws if used outside provider
export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>');
  return ctx;
}