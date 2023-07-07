import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import navEn from './en/nav.js';
import navZh from './zh/nav.js';
import navHa from './ha/nav.js';

import homeZh from './zh/home.js';
import homeEh from './en/home.js';
import homeHa from './ha/home.js';

import statisticZh from './zh/statistic.js';
import statisticEn from './en/statistic.js';
import statisticHa from './ha/statistic.js';

import rankZh from './zh/rank.js'
import rankEn from './en/rank.js';
import rankHa from './ha/rank.js';

import tipsetZh from './zh/tipset.js';
import tipsetEn from './en/tipset';
import tipsetHa from './ha/tipset.js';

import detailZh from './zh/detail';
import detailEn from './en/detail';
import detailHa from './ha/detail';


import navJa from './ja/nav';
import homeJa from './ja/home';
import statisticJa from './ja/statistic';

import fvm from './zh/fvm.js';
import fvmEn from './en/fvm';
import fvmHa from './ha/fvm';

import contractZh from './zh/contract.js';
import contractEn from './en/contract.js';
import contractHa from './ha/contract.js';

import domainZh from './zh/domain.js';
import domainEn from './en/domain.js';
import domainHa from './ha/domain.js';


i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { nav: navEn, home: homeEh, static: statisticEn, rank: rankEn, tipset: tipsetEn, detail: detailEn, fvm: fvmEn, contract: contractEn, domain: domainEn },
      ha: { nav: navHa,home:homeHa,static:statisticHa,rank:rankHa,tipset:tipsetHa,detail:detailHa,fvm:fvmHa,contract:contractHa,domain:domainHa},
      zh: { nav: navZh, home: homeZh, static: statisticZh, rank: rankZh, tipset: tipsetZh, detail: detailZh,fvm:fvm,contract:contractZh,domain:domainZh},
      ja: {nav: navJa, home: homeJa,static: statisticJa}
    },
   fallbackLng: 'en',
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