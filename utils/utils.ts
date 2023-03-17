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

export const unitConversion = (item: string | number, len: number,num:number = 0): string => {
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
   
  let c = num || Math.floor(Math.log(showItem) / Math.log(k))
      if (c < 0) {
        showItem = 0
      } else {
        showItem = (showItem / Math.pow(k, c)).toFixed(len) + ' ' + sizes[c]
      }

      return positive ? `${showItem}` : `-${showItem}`
}
    
export function formatFilNum(num: number|string, atto = false, pure = false) {
  if (atto) {
    num = parseE(new BigNumber(num).dividedBy(Math.pow(10, 18)).toString())
  }
  let dot = String(num).split('.')[1]
  let zero = 1
  let res = num
  let unit = ''
  if (dot) {
    for (let v of dot) {
      if (Number(v) !== 0) {
        break
      } else {
        zero++
      }
    }
    if (zero <= 5) {
      unit = ' FIL'
      //return num + " FIL";
    } else if (zero > 5 && zero <= 13) {
      res = new BigNumber(Number(num)).multipliedBy(Math.pow(10, 9)).toString()
      unit = ' nanoFIL'
      //   return (
      //     new BigNumber(Number(num)).multipliedBy(Math.pow(10, 9)).toString() +
      //     " nanoFIL"
      //   );
    } else {
      res = new BigNumber(Number(num)).multipliedBy(Math.pow(10, 18)).toString()
      unit = ' attoFIL'
      //   return (
      //     new BigNumber(Number(num)).multipliedBy(Math.pow(10, 18)).toString() +
      //     " attoFIL"
      //   );
    }
  } else {
    unit = ' FIL'
    //return num + " FIL";
  }
  return res + (pure ? '' : unit)
}

export function formatFil(num: string | number, unit = 'FIL') { 
  if (unit === "FIL") {
    return new BigNumber(num).dividedBy(Math.pow(10, 18)).toString()
  } else if (unit === 'nanoFil') { 
    return new BigNumber(num).dividedBy(Math.pow(10, 9)).toString()
  }
  return num
}

export function formatNumber(v: number|string, len = 5) {
      return Number(v).toLocaleString('en', { maximumFractionDigits: len })
}

 export function formatDateTime(time:number, str:string ='YYYY-MM-DD HH:mm:ss') {
      return dayjs(time * 1000).format(str)
 }
    

export function isIndent(str: string,unit:number=8) { 
    return str.length < 20? str: str.slice(0,unit)+'...'+ str.slice(-unit)
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
 