import { useEffect } from "react";

export default function Umeng() { 

    const stripe_load = () => {
    let aScript = document.createElement('script');
    aScript.type = 'text/javascript';
    aScript.innerHTML = `${document.write(unescape("%3Cspan style='display:none' id='cnzz_stat_icon_1281261396'%3E%3C/span%3E%3Cscript src='https://v1.cnzz.com/z_stat.php%3Fid%3D1281261396' type='text/javascript'%3E%3C/script%3E"))};}`

    document.head.appendChild(aScript);
    aScript.onload = () => {

    };
};

  useEffect(() => {
      if (typeof window !== "undefined") {
       stripe_load()
    }
  },[])
  return null
}
