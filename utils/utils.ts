import BigNumber from "bignumber.js";
import dayjs from "dayjs";
import { table_opt } from '@/types';
import { fvmUrl } from "@/contants/apiUrl";
import en from "@/i18n/en/nav";


export const unitConversion = (item: string | number, len?: number,num = 0): string => {
    let showItem: string | number = Number(item)
       let sizes = [
        'Bytes',
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
          let unit = sizes[num];
        if ( unit === 'Bytes') { 
          unit = 'Byte'
        }
        return '0'+ ' ' +unit
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
        let units = sizes[c];
        if (!showItem&& units === 'Bytes') { 
          units = 'Byte'
        }
        showItem =(showItem / Math.pow(k, c)).toFixed(len) + ' ' + units
      }
      return positive ? `${showItem}` : `-${showItem}`
}
    
export function formatFilNum(showNum: number | string, atto = false, pure = false, len: number | undefined = 4, toLocal: boolean = true): string {
  let num = showNum;
  if (atto || showNum < 0 ) { 
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
  
  if (zero <= 5 && Number(num1) || num2.length > 6) {
      res = new BigNumber(Number(num)).dividedBy(Math.pow(10, 18)).toFixed(len);
      unit = ' FIL'
      //return num + " FIL";
    } else if (zero <= 13 && Number(num) > Math.pow(10, 7) ) {
      res = new BigNumber(Number(num)).dividedBy(Math.pow(10, 9)).toFixed(len)
      unit = ' nanoFIL'
    } else {
      res = num
      unit = ' attoFIL'
    }
  
  return  toLocal ? Number(res).toLocaleString()+(pure ? '' : unit) :res + (pure ? '' : unit)
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

    

export function getImgUrl(name: string | undefined) { 
  const showname = name?.replaceAll(' ', '');
  return fvmUrl + `/images/${showname?.toLocaleUpperCase()}.png`
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
        return window.innerWidth < 1100
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



 /*  @author zgli
 * @param precision 默认的最大精度
 *  添加对数字格式化，如果小数点后面有值，
 *  则按照精度处理，没有则去掉多余 0
 *  */
export function f_Scientific(cellValue:string|number, precision:number) {
    /* 添加对数字格式化，如果小数点后面有值，则按照精度处理，没有则去掉0*/
    cellValue = Number(cellValue).toFixed(precision);
    var array = cellValue.toString().split(".");
    var index=-1;
    if(array.length>1){
        for(var i = 0;i<array[1].length && i<precision;i++) {
            if (array[1].charAt(i) != "0") {
                index=i+1;
            }
        }
    }
    if(index!=-1){
        cellValue = Number(cellValue).toFixed(index);
    }else{
        cellValue = parseInt(cellValue);
    }
    return cellValue;
};




export function calcAmount(amount: number, len = 4) { 
  if (amount < Math.pow(10, 6)) { 
    return amount
  }
  
  let num1 = new BigNumber(amount).dividedBy(Math.pow(10, 6)); //M
  let unit = 0;

  const sizes = [
    'M',
    "G",
    'T',
    "P",
    "E",
    'Z',
    "Y"
  ];
  
  if (Number(num1) > Math.pow(10, 4)) { 
    unit = 1;
    num1 = new BigNumber(amount).dividedBy(Math.pow(10, 9)); //G
  }
  if (Number(num1) > Math.pow(10, 4)) { 
    unit = 2;
    num1 = new BigNumber(amount).dividedBy(Math.pow(10, 12)); // T
  }
  if (Number(num1) > Math.pow(10, 4)) { 
    unit = 3;
    num1 = new BigNumber(amount).dividedBy(Math.pow(10, 15)); // P
  }
  if (Number(num1) > Math.pow(10, 4)) { 
    unit = 4;
    num1 = new BigNumber(amount).dividedBy(Math.pow(10, 18)); //E
  }
    if (Number(num1) > Math.pow(10, 4)) { 
    unit = 5;
    num1 = new BigNumber(amount).dividedBy(Math.pow(10, 21)); //Z
    }
   if (Number(num1) > Math.pow(10, 4)) { 
    unit = 6;
    num1 = new BigNumber(amount).dividedBy(Math.pow(10, 24)); //Y
  }

  return Number(num1).toFixed(len) + sizes[unit]
}


 export function zeroCalc(value:number|string) {
  const num = String(value);
     const [main, other] = num.split('.');
   let str = '';
   
   if (!other || other?.length === 0) { 
        return num;
   }
   const getOther = getCode(other);
   if (typeof getOther === 'boolean') { 
     return Number(value).toFixed(4)
   }

   const startIndex = getOther.start + 1;
   const endIndex = getOther.end
  
   const showUnit = endIndex - startIndex;
     const other_a = other.slice(0, startIndex);
   const other_b = other.slice(endIndex +1);
   if (other_a) {
     str = `${main}.${other_a}{${showUnit}}`
   } else { 
     str = `${main}.{${showUnit}}`
   }
     if (other_b) { 
         str= `${str}${other_b}`
     }
     return str;   
 }


  function getCode(Str:string) {
     let calcNum:any = {};
     let isZero:number|string = 0;
    const strArr = Str.split('');
     if (strArr.length < 4) { 
         return true
     }

     for (let index = 0; index < strArr.length; index++) { 
        const i = Number(strArr[index])
        if (index < 4 && Number(i) > 0) { 
             return true
         }
         if (i === 0 && !isZero) {
             isZero = `${index}`;
             calcNum[isZero] = {
                 start: index
             }
         } else if (i !== 0 && isZero) { 
             calcNum[isZero] = {
                  ...calcNum[isZero],
                 end: index
             }
             isZero = 0;
         }
     }
    if (Object.keys(calcNum).length > 0) {
      let showObj: any = {
        num: 0,
      };
      Object.keys(calcNum).forEach(v => {
        const obj = calcNum[v]
        const num = obj.end - obj.start;
        if (showObj.num < num) {
          showObj.num = num;
          showObj.key = v;

        }
      })
      return calcNum[showObj.key]
    } 
    return true
    
 }