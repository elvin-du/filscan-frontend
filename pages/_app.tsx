/** @format */
import 'antd/dist/reset.css';
import "../styles/globals.scss";
import "../styles/common.scss";
import "../styles/custom.scss";
import '../styles/media.scss';
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
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
     if (filscan_local && Obj.theme !==  filscan.theme) { 
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
        title={filscan.lang === 'zh' ? 'Filscan--Filecoin 浏览器' : 'Filscan--Filecoin Explorer'}
        description={ filscan.lang === 'zh'? `Filecoin官方区块浏览器,Filecoin官方浏览器, Filscan,Filecoin,最新区块,Filecoin Explorer,FIL,IPFS，FIL,Filecoin区块链查询浏览器,FIL浏览器,Filecoin浏览器,Filecoin区块查询,区块链搜索引擎,区块高度,区块链交易'`:`Filscan is a blockchain explorer that serves as a fundamental tool for the Filecoin ecosystem, providing real-time on-chain data. It enables users to query information about Filecoin's blockchain, transactions, FIL tokens, wallets, etc., and synchronizes real-time information from all nodes.`}
    />
 
    <ErrorBoundary fallback={<Loading />}> 
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-VZ0MMF5MLC"/>
      <Script id="google-analytics">
        {`
         window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-VZ0MMF5MLC');
        `}
      </Script>
    <FilscanState.Provider value={{
      filscan, setFilscan: handleChange
        }}>
         <WalletState.Provider value={{
            wallet, setWallet: (walletItem:any) => {
             setWallet(walletItem)
             }
        }}>
        <ConfigProvider locale={locale} >
        { isMobile () ?  <HeaderMobile />: <Header value={{ filscan, setFilscan }} />}
        <div className='main-container'>
          <Links />
                <Component {...pageProps} />
      </div>
          <Footer />
      </ConfigProvider>

          </WalletState.Provider>
    
      </FilscanState.Provider>
      </ErrorBoundary> 
       </>
      );
}



export default withRouter(App);


