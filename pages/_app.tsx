/** @format */

import "../styles/globals.scss";
//import "../styles/var.scss";
import type { AppProps } from "next/app";
import Head from "@/components/Header";
import { appWithTranslation } from "next-i18next";
import "../i18n";
import "antd/dist/reset.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head />
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(App);
