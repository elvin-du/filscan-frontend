/** @format */

import "../styles/globals.scss";
import "../styles/common.scss";
import "../styles/custom.scss";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/footer";
import { appWithTranslation } from "next-i18next";
import FilscanState from "@/store/content";
import "antd/dist/reset.css";
import dayjs from "dayjs";
import type { Locale } from "antd/es/locale";
import enUS from "antd/locale/en_US";
import zhCN from "antd/locale/zh_CN";
import dayjsZh from 'dayjs/locale/zh-cn';
import dayjsEn from 'dayjs/locale/de';

import "../i18n";

function App({ Component, pageProps }: AppProps) {
  //const [locale, setLocal] = useState(zhCN);
  useEffect(() => { 
   dayjs.locale('zh-cn') 
  },[])
  const [filscan, setFilscan] = useState({
    theme: "light",
    lang: "zh-CN",
  });
    console.log('---dayjs.locale()',dayjs.locale() )

  return (
    <FilscanState.Provider value={{
      filscan, setFilscan: (value: any) => { 
        console.log('===45',value)
        if (value.lang === 'zh') {
         dayjs.locale('zh-cn') 
        } else { 
          dayjs.locale('en')
        }
      
        setFilscan(value)
    } }}>
      <Header value={{ filscan, setFilscan }} />
      {/* <ConfigProvider locale={locale}> */}
      <div className='main-container'>
        <Component {...pageProps} />
      </div>
      {/* </ConfigProvider> */}

      <Footer />
    </FilscanState.Provider>
  );
}

export default appWithTranslation(App);
