import BigNumber from "bignumber.js";
import dayjs from "dayjs";
import { table_opt } from '@/types';

function parseE(str:string) {
  if (!/[eE][+-]\d+$/.test(str)) {
    return str
  }
  str = String(str).toLowerCase()
  let [n, p] = str.split('e')
  let sign = p[0]
  let len = Number(p.slice(1))
  let r = ''
  if (sign === '+') {
    r = '1'
    for (let i = 0; i < len; i++) {
      r += '0'
    }
    n = n.replace('.', '')
    r = n + r.slice(n.length)
  } else {
    r = '0.'
    for (let i = 0; i < len; i++) {
      r += '0'
    }
    n = n.replace(/^0/, '')
    n = n.replace('.', '')
    r = r.slice(0, r.length - 1) + n
  }
  return r
}


export const unitConversion = (item: string | number, len?: number,num:number = 0): string => {
    let showItem: string | number = Number(item)
       let sizes = [
        'bytes',
        'KiB',
        'MiB',
        'GiB',
        'TiB',
        'PiB',
        'EiB',
        'ZiB',
        'YiB'
      ]
      let positive = true
      if (showItem == 0) {
        return '0'+ ' ' +sizes[num]
      }
      if (showItem < 0) {
        positive = false
        showItem = Math.abs(showItem)
      }
      let k = 1024
   
  let c = num|| Math.floor(Math.log(showItem) / Math.log(k))
      if (c < 0) {
        showItem = 0
      } else {
        showItem = (showItem / Math.pow(k, c)).toFixed(len) + ' ' + sizes[c]
      }
      return positive ? `${showItem}` : `-${showItem}`
}
    
export function formatFilNum(num: number|string, atto = false, pure = false,len: number=4,toLocal:boolean = true): string {
  if (atto) { 
    return num + (pure ? '' : ' attoFIL')
  }
  let dot = new BigNumber(Number(num)).dividedBy(Math.pow(10, 18)).toFixed().split('.')[1];
  const num1 = new BigNumber(Number(num)).dividedBy(Math.pow(10, 18)).toFixed().split('.')[0];
  const num2 =new BigNumber(Number(num)).dividedBy(Math.pow(10, 9)).toFixed(len).split('.')[0]
  let zero = 1
  let res = num
  let unit = ' attoFIL'
  if (atto) {
     unit=' attoFIL'
    num = num
  }
  if (dot) {
    for (let v of dot) {
      if (Number(v) !== 0) {
        break
      } else {
        zero++
      }
    }
  }
    if (zero <= 5 && Number(num1) || num2.length > 4) {
      res = new BigNumber(Number(num)).dividedBy(Math.pow(10, 18)).toFixed(len);
      unit = ' FIL'
      //return num + " FIL";
    } else if (zero <= 13 ) {
      res = new BigNumber(Number(num)).dividedBy(Math.pow(10, 9)).toFixed(len)
      unit = ' nanoFIL'
    } else {
      res = num
      unit = ' attoFIL'
    }
  
  return  toLocal ? Number(res).toLocaleString('en-IN')+(pure ? '' : unit) :res + (pure ? '' : unit)
}

export function formatFil(num: string | number, unit?: string, len:number = 0) { 
  if (unit === "FIL") {
    const showNum = new BigNumber(num).dividedBy(Math.pow(10, 18));
    return Number(Number(showNum)?.toFixed(len))
  } else if (unit === 'nanoFiL') {
    const showNum = new BigNumber(num).dividedBy(Math.pow(10, 9));
    return Number(Number(Number(showNum)?.toFixed(len)))
  }
  return Number(num)
}

export function attoFormatFil(num: string | number, len?: number) { 
  const showLen = len || len === 0;
    let showNum: string | BigNumber = new BigNumber(num).dividedBy(Math.pow(10, 18));
    const showLenNum = showLen ? showNum.toFixed(len)  : showNum;
    if (!Number(showLenNum)) {
      showNum = new BigNumber(num).dividedBy(Math.pow(10, 9));
      return  len  ? showNum.toFixed(len):showNum  + ' nanoFil'
    }
  return showNum + ' FIL';
}

export function formatNumber(v: number|string, len = 5) {
      return Number(v).toLocaleString('en', { maximumFractionDigits: len })
}

export function formatDateTime(time: number | string, str: string = 'YYYY-MM-DD HH:mm:ss') {
  if (!time) return '--'
      return typeof time === 'number'? dayjs(time * 1000).format(str):dayjs(time).format(str)
 }


    
export function formatTime(from:number, to?:number, ago = true) {
        let startTime = from; // 开始时间
      let endTime = to || new Date().getTime(); // 结束时间
  let usedTime = endTime - startTime; // 相差的毫秒数
  //timeDifference(usedTime)
        // let days = Math.floor(usedTime / (24 * 3600 * 1000)); // 计算出天数
        // let leavel = usedTime % (24 * 3600 * 1000); // 计算天数后剩余的时间
        // let hours = Math.floor(leavel / (3600 * 1000)); // 计算剩余的小时数
        // let leavel2 = leavel % (3600 * 1000); // 计算剩余小时后剩余的毫秒数
        //  let minutes = Math.floor(leavel2 / (60 * 1000)); // 计算剩余的分钟数
       // let second = runTime % 60
  
  
          //计算出相差天数
        let days = Math.floor(usedTime / (24 * 3600 * 1000));
        //计算出小时数
      let leave1 = usedTime % (24 * 3600 * 1000);
        //计算天数后剩余的毫秒数
        let hours = Math.floor(leave1 / (3600 * 1000));
        //计算相差分钟数
        let leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
        let minutes = Math.floor(leave2 / (60 * 1000)); // 分
        //计算相差秒数
        let leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
       let seconds = Math.round(leave3 / 1000); // 秒
        //let second = runTime % 60
        return {
          days,hours,minutes,seconds
        };
}

    



export function isIndent(str: string, unit: number = 12) { 
    return str&&unit&&str.length > unit*2 ? str?.slice(0,unit)+'...'+ str?.slice(-unit):str
}

export function getShowData(item:table_opt, data: { [key: string]: any }): any {
  const [first, second] = item.type || [];
  let showData: any = data;
  if (first) {
    if (second) {
      showData = data && data[first] && data[first][second];
    } else {
      showData = data && data[first];
    }
  }
  return showData;
}
 
export function isMobile() {
      if (process.browser) {
        return window.innerWidth < 768
      }
    }

export function numFormat(num: number | string) {
  if (!num) { 
    return num
  }
  let res=num.toString().replace(/\d+/, function(n){ // 先提取整数部分
       return n.replace(/(\d)(?=(\d{3})+$)/g,function($1){
          return $1+",";
        });
  })
  return res;
}

