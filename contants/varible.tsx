import Link from "next/link";
import { isIndent, isMobile } from "@/utils/utils";
import { postAxios } from "@/store/server";
import { apiUrl } from "./apiUrl";
import router from "next/router";
import Copy from '@/components/copy'

//base charts colors
export const colors = ["#F7C739", "#5AD8A6", "#5B8FF9", "#9270CA"];
   const lightStyle = {
        lineStyle: "rgba(0,0,0,0.15)",
        splitLine: "rgba(0,0,0,0.15)",
        textStyle: "#000000",
        itemBorder: "#ffffff",
         toolbox:'rgba(0,0,0,0.4)'
      }
      const blackStyle = {
        lineStyle: "rgba(255,255,255,0.15)",
        splitLine: "rgba(255,255,255,0.15)",
        textStyle: "#ffffff",
        itemBorder: "#ffffff",
        toolbox:'rgba(0,0,0,0.4)'
      }




export const defaultOpt = (type: string, theme:string ='light',) => { 
    const color = getColor(theme)
    switch (type) { 
    case 'line':
    return {
    xAxis: {
      type: "category",
      axisLabel: {
        textStyle: {
          color: color.textStyle,
        },
      },
      axisLine: {
        lineStyle: {
          color: color.splitLine,
        },
      },
      lightStyle: {
        color: color.lineStyle,
      },
      axisTick: {
        show: false,
      },
      data: [],
      // boundaryGap: false
    },
    legend: {
      // data: this.tr("yAxisName"),
      lineStyle: {
        color: "#ffffff",
      },
      textStyle: {
        // fontSize: this.fontSize,
        color: color.textStyle,
      },
      formatter(v: any) {
        return v;
      },
      icon: "circle",
    },
   
  }
    }
}





export const getColor = (theme:string) => { 
    return theme === "light" ? lightStyle : blackStyle  
}


export const pageLimit = 20;





//不同账户 ,
export const get_account_type =  (type?: string, value: string ='',unit:number =6) => { 
  return <div className="flex_align_center">
    <div className="link" onClick={() => { account_link(value, type) }}>
    {isIndent(value, isMobile()?6:unit)}
    </div>
    { value && <Copy text={ value} />}
  </div> 
}


export const account_link = async(value: string,type?: string, ) => { 
  let show_type = type;
  if (!type || type === "") { 
      const result:any = await postAxios(apiUrl.searchInfo, { input: value, })
    show_type = result?.result?.result_type;
  } 
    switch (show_type) { 
    case 'miner' :
        return router.push(`/miner/${value}`)
      case 'storageminer':
        return router.push(`/miner/${value}`)
     default:
      return router.push(`/address/${value}`)
   
  }
     
}


export const meta:any = {
  'zh': {
        title: 'Filscan--Filecoin 浏览器',
        des:'Filecoin官方区块浏览器,Filecoin官方浏览器, Filscan,Filecoin,最新区块,Filecoin Explorer,FIL,IPFS，FIL,Filecoin区块链查询浏览器,FIL浏览器,Filecoin浏览器,Filecoin区块查询,区块链搜索引擎,区块高度,区块链交易'
      },
  'en': {
      title: 'Filscan--Filecoin Explorer',
      des:`Filscan is a blockchain explorer that serves as a fundamental tool for the Filecoin ecosystem, providing real-time on-chain data. It enables users to query information about Filecoin's blockchain, transactions, FIL tokens, wallets, etc., and synchronizes real-time information from all nodes.`
    },
  'kr': {
        title: '파일코인 익스플로러',
        des:'Filecoin 공식 브라우저 ,Filecoin 공식 블록 탐색기 ,Filecoin 블록 쿼리 ,FIL 브라우저 ,FVM ,IPFS, 블록 높이,블록체인 트랜잭션,블록체인 검색 엔진,최신 블록'
      }
}