/** @format */

import "../styles/globals.scss";
import "../styles/common.scss";
import type { AppProps } from "next/app";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/footer";
import { appWithTranslation } from "next-i18next";
import FilscanState from "@/store/content";
import "antd/dist/reset.css";
import type { Locale } from "antd/es/locale";
import enUS from "antd/locale/en_US";
import zhCN from "antd/locale/zh_CN";
import "../i18n";

function App({ Component, pageProps }: AppProps) {
  //const [locale, setLocal] = useState(zhCN);
  const [filscan, setFilscan] = useState({
    theme: "light",
    lang: "zh-CN",
  });

  return (
    <FilscanState.Provider value={{ filscan, setFilscan }}>
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
