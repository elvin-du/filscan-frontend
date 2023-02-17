import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
//import LanguageDetector from 'i18next-browser-languagedetector'
import navEn from './en/nav.js';
import navZh from './zh/nav.js';
import homeZh from './zh/home.js';
import homeEh from './en/home.js';
import statisticZh from './zh/statistic.js';
import rankZh from './zh/rank.js'


i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { nav: navEn,home:homeEh,},
      zh: { nav: navZh ,home:homeZh,static:statisticZh,rank:rankZh},
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