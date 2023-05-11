import Link from "next/link";
import { isIndent } from "@/utils/utils";
import { postAxios } from "@/store/server";
import { apiUrl } from "./apiUrl";
import router from "next/router";


//base charts colors
export const colors = ["#F7C739", "#5AD8A6", "#5B8FF9", "#9270CA"];
   const lightStyle = {
        lineStyle: "rgba(0,0,0,0.15)",
        splitLine: "rgba(0,0,0,0.15)",
        textStyle: "#333333",
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


export const get_account_type =  (type?: string, value: string ='',bool?:boolean) => { 
  return <div className="link" onClick={() => {account_link(value,type)}}>{bool? value:isIndent(value,6)}</div>
}


export const account_link = async(value: string,type?: string, ) => { 
  let show_type = type;
  if (!type || type === "") { 
    if ( !value.startsWith('f0') && !value.startsWith('t0') ) {
      show_type = 'account'
   } else { 
    const result:any = await postAxios(apiUrl.searchInfo, { input: value, })
    show_type = result?.result?.result_type;
  }
  } 
    switch (show_type) { 
    case 'miner' && 'storageminer':
        return router.push(`/miner/${value}`)
     default:
      return router.push(`/address/${value}`)
   
  }
     
}
