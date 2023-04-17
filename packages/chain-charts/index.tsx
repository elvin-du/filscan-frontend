/** @format */

import { basic_height } from "@/contants/tipset";
import { Popover, Tooltip } from "antd";
import Link from "next/link";
import { useCallback, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";
interface Props {
  data: Array<any>;
  jumpSafeHeight: number;
  maxHeight:number
}
export default (props: Props) => {
   const { t } = useTranslation();
  const tr = (label: string, value?: Record<string, any>) => {
    if (value) {
      return t(label, { ...value, ns: "tipset" });
    }
    return t(label, { ns: "tipset" });
  };
  
  const { data,jumpSafeHeight,maxHeight } = props;
  const tipset_list = useRef<HTMLDivElement>(null);

  const ruleWidth = useMemo(() => {
    if (tipset_list && tipset_list.current) { 
       return tipset_list.current.clientWidth
    }
    return 0
   
   },[tipset_list?.current])

const mask:any = useMemo(() => {
  if (!jumpSafeHeight) {
        return []
      }
  const str: string = String(jumpSafeHeight);
  const unit = Math.pow(10, str.length - 2) * Number(str[0])
  const len = Math.floor(jumpSafeHeight / unit)
      let res = []
      for (let i = 0; i < len; i++) {
        res.push((i + 1) * unit)
      }
      res.unshift(0) //add Genesis
      return res
}, [jumpSafeHeight])
    
  
  
  const handleMove = (e:any) => { 
    const hoverLeft = e.movementX / e.target.getBoundingClientRect().width;
          const { x, y } = e.target.getBoundingClientRect()
    //console.log('---3',e)
    //console.log('===33',e,e.movementX,e.movementY)
     // console.log('---3',ruleWidth,e.target.getBoundingClientRect().width,hoverLeft)
    

  }
    
  const renderContent = (item: any) => { 
    return <div className={styles.chain_chart_container_card_miner_tip} >
      {basic_height.map((row:any) => { 
        const { dataIndex,title, render } = row;
        const text = render? render(item[dataIndex],item):item[dataIndex]
        return <li key={ dataIndex} className={styles.chain_chart_container_card_miner_tip_item}>
          <span>{tr(title)} :</span>
          <span>{ text}</span>
        </li>
      })}
    </div>
  }

    
  return (
    <div className={styles.chain_chart}>
      <div className={styles.chain_chart_container}>
        {data?.reverse().map((item, index) => {
         //left: `${(100 / data.length ) * (index)}%` ,
         return (
            <div key={index} className={styles.chain_chart_container_card}  style={{ width:`${100 /( data.length -1)}%`,  borderWidth:jumpSafeHeight === item.height ? '1px':'0px' }}>
                {item.block_basic.map((resultObj:any) => { 
                  return <div key={resultObj?.miner_id} className={styles.chain_chart_container_card_miner}>
                    <Popover trigger='hover' overlayClassName='custom-popover-wrap' content={renderContent(resultObj)} placement='right'>
                      <Link href={`/tipset/chain?cid=${resultObj.cid}`} >{resultObj?.miner_id || ''}</Link>
                    </Popover>
                   </div>
                })}
             <div className={styles.chain_chart_container_card_height} >
               <Link href={`/tipset/chain?height=${item.height}`} style={{background:jumpSafeHeight === item.height ? `var(--link-color)`:``}}>{item.height}</Link>
               { index !== data.length -1 && <span className={`${styles.chain_chart_container_card_height_icon} iconfont`} />} 
             </div>
             </div>
        );
      })}
      </div>
      <div className={styles.jumpSafeHeight}>
        <span className={styles.jumpSafeHeight_height}>{maxHeight}</span>
      </div>
      <div className={styles.tipset_list} ref={tipset_list} onMouseMove={handleMove}>
        {data.length > 0 && mask.map((item: number,index:number) => {
          return (
            <span key={ index} className={styles.tipset_list_dot} style={{ left: `${(item * 100) / jumpSafeHeight}%` }} >
              <span className={styles.tipset_list_dot_value}>
                {item}
                </span>
              </span>
        );
        })}
    </div>
    </div>
  
  );
};
