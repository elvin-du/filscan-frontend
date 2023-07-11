/** @format */

import { Html, Head, NextScript,Main } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <title>Filscan--Filecoin Explorer</title>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" /> 
        <meta name='description' content="Filscan is a blockchain explorer that serves as a fundamental tool for the Filecoin ecosystem, providing real-time on-chain data. It enables users to query information about Filecoin's blockchain, transactions, FIL tokens, wallets, etc., and synchronizes real-time information from all nodes." />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0, minimum-scale=1,user-scalable=no'
        />
         <meta
          name='keywords'
          content="Filscan is a blockchain explorer that serves as a fundamental tool for the Filecoin ecosystem, providing real-time on-chain data. It enables users to query information about Filecoin's blockchain, transactions, FIL tokens, wallets, etc., and synchronizes real-time information from all nodes"
        />
        <meta
          name='keywords'
          content='Filecoin官方区块浏览器,Filecoin官方浏览器, Filscan,Filecoin,最新区块,Filecoin Explorer,FIL,IPFS，FIL,Filecoin区块链查询浏览器,FIL浏览器,Filecoin浏览器,Filecoin区块查询,区块链搜索引擎,区块高度,区块链交易'
        />
          <meta
          name='keywords'
          content='Filecoin,fvm,search, blockchain, crypto, currency'
        />
          <meta
          name='description'
          content='Filecoin,fvm, search, blockchain, crypto, currency'
        />
        {/* <meta
          name='description'
          content='Filscan区块浏览器是Filecoin生态基础工具，提供实时链上相关数据。集查询Filecoin区块、交易、FIL代币、钱包等信息的网站，实时同步更新Filecoin所有节点信息。'
        /> */}
        <link rel='icon' href='https://filscan-v2.oss-cn-hongkong.aliyuncs.com/client/logo.ico' /> 
        <Script src='https://hm.baidu.com/hm.js?db68ddd1d28effdabb6dfc9f07258667'  strategy="lazyOnload"></Script>
      </Head> 
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
