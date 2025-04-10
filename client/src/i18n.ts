import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Initialize i18next instance
const initI18n = i18n
  // load translations using http (default public/locales)
  .use(Backend)
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next
  .use(initReactI18next)
  // init i18next
  .init({
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    // IMPORTANT: Translation files are located in public/locales/[language]/translation.json
    // When adding new translations, update files there, not in src folder
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    ns: ['translation'],
    defaultNS: 'translation',
    react: {
      useSuspense: false, // Prevents issues during initial render
      bindI18n: 'languageChanged loaded',
    },
    // This ensures translations are loaded before the app renders
    initImmediate: false
  });

// This ensures we log when the translations are loaded
initI18n.then(() => {
  console.log('i18next initialized successfully!');
}).catch(error => {
  console.error('Failed to initialize i18next:', error);
});

export default i18n;