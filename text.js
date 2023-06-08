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
 
