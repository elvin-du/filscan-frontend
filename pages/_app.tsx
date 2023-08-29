/** @format */
import 'antd/dist/reset.css';
import "../styles/globals.scss";
import "../styles/common.scss";
import "../styles/custom.scss";
import '../styles/media.scss';
import type { AppProps } from "next/app";
import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/footer";
import ErrorBoundary from '@/components/Bounday'
import { useTranslation } from "next-i18next";
import FilscanState from "@/store/content";
import HeaderMobile from '@/mobile/header'
import dayjs from "dayjs";
import type { Locale } from 'antd/es/locale';
import en from 'antd/locale/en_US';
import zh from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import Links from '@/components/links'
import Loading from '@/components/loading'
import "../i18n";
import { isMobile } from "@/utils/utils";
import { useRouter, withRouter } from "next/router";
import { ConfigProvider } from "antd";
import Script from 'next/script';
import { NextSeo } from 'next-seo';
import WalletState from '@/store/wallet';
import { meta } from '@/contants/varible';
// import Watermark from '@/components/watermark';

function App({ Component, pageProps }: AppProps) {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [loading,setLoading]= useState(true)
  const [wallet, setWallet] = useState({
    wallet: '',
    account:''
  })

  const [filscan, setFilscan] = useState({
    theme: "light",
    lang:  "zh",
  });
  const [locale, setLocal] = useState<Locale>(zh);

  useEffect(() => {
    setLoading(false);
    const filscan_local = localStorage.getItem('filscan');
    const wallet_local = localStorage.getItem('wallet');
    const Obj = JSON.parse(filscan_local || '{}');
    const wallet_store = JSON.parse(wallet_local || '{}');
    if (!wallet?.account) {
      setWallet(wallet_store)
    }
    if (filscan_local && Obj.theme !== filscan.theme) {
      document.documentElement.setAttribute("theme", Obj.theme);
      setFilscan({ ...Obj });
    }

    if (router.locale && router.locale !== filscan.lang) {
      const obj = {...filscan,lang: router.locale}
      setFilscan({ ...obj });
      i18n.changeLanguage(obj.lang);
    } else {
      const lang = navigator.language.startsWith('zh') ? 'zh' : 'en';
      if (lang !== filscan.lang) {
        setFilscan({
          ...filscan,
          lang:navigator.language.startsWith('zh') ? 'zh':'en'
        })
        i18n.changeLanguage(lang); // 更改i18n语言
      }
    }
  },[])

  useEffect(() => {
    if (router.asPath.includes('#')) {
      const a = router.asPath;
      window?.location?.replace(a.replaceAll('/#', ''))
    }
  },[router.asPath])

  const handleChange = (item:any) => {
    if (item.lang === 'zh') {
      dayjs.locale('zh-cn')
      setLocal(zh)
    } else {
      dayjs.locale('en')
      setLocal(en)

    }
    document.documentElement.setAttribute("theme", item.theme);
    setFilscan(item)
  }

  if (loading) {
    return null
  }

  return (
    <>
      <NextSeo
        title={meta[filscan.lang ].title}
        description={ meta[filscan.lang].title}
      />

      <ErrorBoundary fallback={<Loading />}>
        <FilscanState.Provider value={{
          filscan, setFilscan: handleChange
        }}>
          <WalletState.Provider value={{
            wallet, setWallet: (walletItem:any) => {
              setWallet(walletItem)
            }
          }}>
            <ConfigProvider locale={locale} >
              { isMobile () ? <HeaderMobile />: <Header value={{ filscan, setFilscan }} />}
              <div className='body-container'>
                <div className='main-container'>
                  <Links />
                  <Component {...pageProps} />
                </div>
                <Footer />
              </div>
            </ConfigProvider>

          </WalletState.Provider>

        </FilscanState.Provider>
      </ErrorBoundary>
    </>
  );
}

export default withRouter(App);

