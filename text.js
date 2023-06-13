const { start } = require("repl");

 function zeroCalc(value) {
  const num = String(value);
     const [main, other] = num.split('.');
     let str = ''
     if (other.length === 0) { 
        return num;
     }
    const startIndex = other.indexOf('0');
     const endIndex = other.lastIndexOf('0');
     const showUnit = endIndex - startIndex + 1;
     const other_a = other.slice(0, startIndex);
     const other_b = other.slice(endIndex + 1);
     if (other_a) { 
         str= `${main}.${other_a}{${showUnit}}`
     }
     if (other_b) { 
         str= `${str}${other_b}`
     }
        
 }
 


 function getCode(Str) {
     let calcNum = {};
     let isZero = 0;
     console.log(Str.split(''))
     const strArr = Str.split('');
     const isFlag = 0;
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
     let showObj = {
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
            


function formatNumber(num) {  
    return num.toFixed(6).toLocaleString(undefined, {minimumFractionDigits:6});  
}

let num = 1234567.8912345;  
let numStr = formatNumber(num); // 输出 "1,234,567.891234"  
console.log(numStr)