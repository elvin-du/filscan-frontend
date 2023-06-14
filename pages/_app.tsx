/** @format */
import 'antd/dist/reset.css';
import "../styles/globals.scss";
import "../styles/common.scss";
import "../styles/custom.scss";
import '../styles/media.scss'
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/footer";
import { useTranslation } from "next-i18next";
import FilscanState from "@/store/content";
import HeaderMobile from '@/mobile/header'
import dayjs from "dayjs";
import type { Locale } from 'antd/es/locale';
import en from 'antd/locale/en_US';
import zh from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import Links from '@/components/links'
import "../i18n";
import { isMobile } from "@/utils/utils";
import { useRouter, withRouter } from "next/router";
import { ConfigProvider } from "antd";
import dynamic from 'next/dynamic';




function App({ Component, pageProps }: AppProps) {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  

  useEffect(() => { 
    if (router.asPath.includes('#')) { 
      const a = router.asPath;
      window?.location?.replace(a.replaceAll('/#',''))
    }
  },[router.asPath])

  useEffect(() => { 
   dayjs.locale('en') 
  }, [])


  
  const [filscan, setFilscan] = useState({
    theme: "light",
    lang:  "en",
  });
  const [locale, setLocal] = useState<Locale>(zh);




  useEffect(() => { 
    const filscan_local = localStorage.getItem('filscan');
    let new_filscan = {...filscan}
    if (filscan_local) { 
      const Obj = JSON.parse(filscan_local);
      if (Obj) { 
        setFilscan({ ...Obj })
        i18n.changeLanguage(Obj.lang);
        handleChange(Obj)
       document.documentElement.setAttribute("theme", Obj.theme);
      }
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

  if (isMobile()) { 
    return  <FilscanState.Provider value={{
      filscan, setFilscan: handleChange
    }}>
      <ConfigProvider locale={locale}>
        <HeaderMobile />
       
      <div className='main-container'>
          <Component {...pageProps} />
      </div>
       </ConfigProvider>
     
      <Footer />
    </FilscanState.Provider>
  }


  return (
    <FilscanState.Provider value={{
      filscan, setFilscan: handleChange
    }}>
      <ConfigProvider locale={locale} >
        {/* <UmengHeader /> */}
     <Header value={{ filscan, setFilscan }} />
        <div className='main-container'>
           <Links />
        <Component {...pageProps} />
      </div>
      <Footer />
      </ConfigProvider>
     
    </FilscanState.Provider>
  );
}

export default withRouter(App);



function aScript(aScript: any) {
  throw new Error('Function not implemented.');
}

