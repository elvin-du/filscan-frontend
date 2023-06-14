import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
//import LanguageDetector from 'i18next-browser-languagedetector'
import navEn from './en/nav.js';
import navZh from './zh/nav.js';
import homeZh from './zh/home.js';
import homeEh from './en/home.js';
import statisticZh from './zh/statistic.js';
import statisticEn from './en/statistic.js';
import rankZh from './zh/rank.js'
import rankEn from './en/rank.js';
import tipsetZh from './zh/tipset.js';
import tipsetEn from './en/tipset';
import detailZh from './zh/detail';
import detailEn from './en/detail';
import navJa from './ja/nav';
import homeJa from './ja/home';
import statisticJa from './ja/statistic';
import fvm from './zh/fvm.js';
import fvmEn from './en/fvm';
import contractZh from './zh/contract.js';
import contractEn from './en/contract.js';
import domainZh from './zh/domain.js';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { nav: navEn,home:homeEh,static:statisticEn,rank:rankEn,tipset:tipsetEn,detail:detailEn,fvm:fvmEn,contract:contractEn},
      zh: { nav: navZh, home: homeZh, static: statisticZh, rank: rankZh, tipset: tipsetZh, detail: detailZh,fvm:fvm,contract:contractZh,domain:domainZh},
      ja: {nav: navJa, home: homeJa,static: statisticJa}
    },
    fallbackLng:'en',
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