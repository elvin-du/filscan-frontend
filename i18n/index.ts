import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
//import LanguageDetector from 'i18next-browser-languagedetector'
import en from './en/translation.json'
import zh from './zh/translation.json'
import navEn from './en/nav.json';
import navZh from './zh/nav.json'


i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { nav: navEn },
      zh: { nav: navZh },
    },
    fallbackLng: 'zh',
    debug: true,
    react: {
      useSuspense: false,
    },
    detection: {
      order: ['querystring', 'navigator', 'localStorage'],
      lookupQuerystring: 'lang',
    },
  })

export default i18n