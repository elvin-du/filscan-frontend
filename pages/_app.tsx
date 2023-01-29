/** @format */

import "../styles/globals.scss";
import "../styles/common.scss";
import type { AppProps } from "next/app";
import Head from "@/components/Header";
import { appWithTranslation } from "next-i18next";
import "../i18n";
import "antd/dist/reset.css";

function App({ Component, pageProps }: AppProps) {
  // next.js提供了一个标准的获取远程数据的接口:getInitialProps，通过getInitialProps我们可以获取到远程数据并赋值给页面的props。
  // getInitialProps即可以用在服务端也可以用在前端
  // static async getInitialProps({ Component, ctx }: any) {
  //     let pageProps = {};
  //     if (Component.getInitialProps) {
  //         pageProps = await Component.getInitialProps({ ctx });
  //     }
  //     return { pageProps };
  // }

  return (
    <>
      <Head />
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(App);
