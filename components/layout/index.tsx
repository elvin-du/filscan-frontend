/** @format */

import "../styles/globals.scss";
import "../styles/common.scss";
import "../styles/custom.scss";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/footer";
import { useTranslation } from "next-i18next";
import FilscanState from "@/store/content";
import HeaderMobile from '@/mobile/header'
import "antd/dist/reset.css";
import dayjs from "dayjs";

import "../i18n";
import { isMobile } from "@/utils/utils";
import { useRouter, withRouter } from "next/router";

function App({ Component, pageProps }: AppProps) {
  const { t, i18n } = useTranslation();
  useEffect(() => { 
   dayjs.locale('zh-cn') 
  }, [])
  
  const [filscan, setFilscan] = useState({
    theme: "light",
    lang: "zh",
  });

  useEffect(() => { 
    const filscan_local = localStorage.getItem('filscan');
    if (filscan_local) { 
      const Obj = JSON.parse(filscan_local);
      if (Obj) { 
        setFilscan({ ...Obj })
        i18n.changeLanguage(Obj.lang);
       document.documentElement.setAttribute("theme", Obj.theme);
      }
    }

  },[])
  

  const handleChange = (item:any) => { 
      if (item.lang === 'zh') {
         dayjs.locale('zh-cn') 
        } else { 
          dayjs.locale('en')
      }
        document.documentElement.setAttribute("theme", item.theme);
        setFilscan(item)
  }

  if (isMobile()) { 
    return  <FilscanState.Provider value={{
      filscan, setFilscan:handleChange}}>
      <HeaderMobile />
      <div className='main-container'>
        <Component {...pageProps} />
      </div>
      <Footer />
    </FilscanState.Provider>
  }


  return (
    <FilscanState.Provider value={{
      filscan, setFilscan:handleChange}}>
      <Header value={{ filscan, setFilscan }} />
      <div className='main-container'>
        <Component {...pageProps} />
      </div>
      <Footer />
    </FilscanState.Provider>
  );
}

export default withRouter(App);



