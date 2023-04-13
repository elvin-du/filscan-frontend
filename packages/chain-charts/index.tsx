/** @format */

import { basic_height } from "@/contants/tipset";
import { Popover, Tooltip } from "antd";
import { useCallback, useMemo, useRef } from "react";
import styles from "./index.module.scss";
interface Props {
  data: Array<any>;
  jumpSafeHeight:number
}
export default (props: Props) => {
  const { data,jumpSafeHeight } = props;
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
    
  
  
  const handleMove = useCallback((e:any) => { 
        const hoverLeft = e.offsetX / e.target.getBoundingClientRect().width
      console.log('---3', e,e.offsetX,e.target.getBoundingClientRect().width,hoverLeft)
    

  }, [])
    
  const renderContent = (item:any) => { 
    return <div>
      {basic_height.map(row => { 
        return <li></li>
      })}
    </div>
  }

    
  return (
    <div className={styles.chain_chart}>
      <div className={styles.chain_chart_container}>
        {data.map((item, index) => {
         //left: `${(100 / data.length ) * (index)}%` ,
         return (
            <div key={index} className={styles.chain_chart_container_card}  style={{ width:`${100 /( data.length -1)}%` }}>
                {item.block_basic.map((resultObj:any) => { 
                  return <div key={resultObj?.miner_id} className={styles.chain_chart_container_card_miner}>
                    <Popover content={renderContent(resultObj)} placement='right'>
                          {resultObj?.miner_id || ''}
                    </Popover>
                   </div>
                })}
               <div className={styles.chain_chart_container_card_height}>
               {item.height}
               { index !== data.length -1 && <span className={`${styles.chain_chart_container_card_height_icon} iconfont`} />} 
             </div>
             </div>
        );
      })}
      </div>
      <div className={styles.jumpSafeHeight}>
        <span className={styles.jumpSafeHeight_height}>{ jumpSafeHeight}</span>
      </div>
      <div className={styles.tipset_list} ref={tipset_list} onMouseMove={handleMove}>
        {data.length > 0 && mask.map((item: number,index:number) => {
          return (
            <span key={ index} className={styles.tipset_list_dot} style={{ left: `${(item * 100) / jumpSafeHeight}%` }} >
                <span className={styles.tipset_list_dot_value}> {item}</span>
              </span>
        );
        })}
    </div>
    </div>
  
  );
};
