/** @format */
import "../styles/globals.scss";
import "../styles/common.scss";
import "../styles/custom.scss";
import '../styles/media.scss'
import 'antd/dist/reset.css';
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

function App({ Component, pageProps }: AppProps) {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  
  useEffect(() => { 
   dayjs.locale('zh-cn') 
  }, [])
  
  const [filscan, setFilscan] = useState({
    theme: "light",
    lang: "zh",
  });
  const [locale, setLocal] = useState<Locale>(zh);
  
  // useEffect(() => { 
  //   // if (process.browser) {
  //   //   const m = detectZoom();
  //   //      document.body.style!.cssText = `zoom: ${Number(m)/100}` 

  //   //     // var aScript = document.createElement('script');
  //   //     // aScript.type = 'text/javascript';
  //   //     // aScript.src = " https://js.stripe.com/v3/";

  //   //     // document.head.appendChild(aScript);
  //   //     // aScript.onload = () => {

  //   //     // };
  //   // }
  // },[])


  useEffect(() => { 

    const filscan_local = localStorage.getItem('filscan');
    if (filscan_local) { 
      const Obj = JSON.parse(filscan_local);
      if (Obj) { 
        setFilscan({ ...Obj })
        i18n.changeLanguage(Obj.lang);
        handleChange(Obj)
       document.documentElement.setAttribute("theme", Obj.theme);
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
      <ConfigProvider  locale={locale} >
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



