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
import "../i18n";

function App({ Component, pageProps }: AppProps) {
  const [filscan, setFilscan] = useState({
    theme: "light",
    lang: "zh-CN",
  });

  return (
    <FilscanState.Provider value={{ filscan, setFilscan }}>
      <Header />
      <div className='main-container'>
        <Component {...pageProps} />
      </div>
      <Footer />
    </FilscanState.Provider>
  );
}

export default appWithTranslation(App);
