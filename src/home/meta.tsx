/** @format */

import { home_meta } from "@/contants/home";
import { apiUrl } from "@/contants/apiUrl";
import { postAxios } from "@/store/server";
import { useTranslation } from "next-i18next";
import { Tooltip } from "antd";
import styles from "./index.module.scss";
import { useState, useEffect, useMemo } from "react";
import { useInterval } from 'ahooks';
import Image from "next/image";
import { getSvgIcon } from "@/svgUtils";
import Tooltips from "@/packages/tooltip";
import TimerHtml from '@/components/TimerHtml'

function Meta() {
  const { t } = useTranslation();
  const { title, list } = home_meta;
  const [show, setShow] = useState(false);
  const [last, setLast] = useState <any>();
  const [TotalIndicators, setTotalIndicators] =
    useState<Record<string, string | number>>();

  const tr = (label: string) => {
    return t(label, { ns: "home" });
  };

  

  useEffect(() => {
    loadInterval()
    postAxios(apiUrl.home_meta).then((res: any) => {
      setTotalIndicators(res?.result?.total_indicators || {});
    });

  }, []);

  useInterval(() => { loadInterval() }, 15000)



  const loadInterval = () => { 
    postAxios(apiUrl.tipset_chain_FinalHeight).then((res: any) => {
      const data = res?.result || {};
      setLast({
        latest_height: data.height,
        latest_block_time: data.block_time
      })
    });
  }

  

  return (
    <div
      className={`${styles.home_meta} default-card ${
        show ? styles.mata_card_max : styles.mata_card_min
      }`}>
      <div className='default-card-title font_18'>
        {title?.icon && (
          <span className='image-icon-svg'>{getSvgIcon('mate')}</span>
        
          // <Image src={title?.icon} alt='' width={19}  />
        )}
        {tr(title.label)}
        {title.rightIcon && (
          <span
            className='right-item'
            onClick={() => {
              setShow(!show);
            }}>
            {tr(show ? title.rightIcon + "_false" : title.rightIcon)}
          </span>
        )}
      </div>
      <ul className={`default-card-content ${styles.ul_list}`}>
        {list.map((item:any) => {
          const { render, label, tip } = item;
          let showText: string|any = "";
          if (TotalIndicators) {
              if (label === 'latest_block_time') { 
            const TEXT = last && last[label] || TotalIndicators[label];
            // 时间显示
                return <div className={styles.list_item} key={label}>
              <div className={styles.list_item_title}>
                <span>{tr(label)}</span>
                {tip && (
                  <Tooltip
                    overlayClassName='custom-tooltip-wrap'
                    title={tr(tip)}>
                    {getSvgIcon("tip")}
                  </Tooltip>
                )}
              </div>
              <TimerHtml text={TEXT} tr={tr}   className={styles.list_item_value_meta}/>  
              </div>

          }
            showText = render
              ? render(last&&last[label]||TotalIndicators[label],tr)
              : last&&last[label]||TotalIndicators[label];
          }

          return (
            <div className={styles.list_item} key={label}>
              <div className={styles.list_item_title}>
                <span>{tr(label)}</span>
                {tip && (
                  <Tooltip
                    overlayClassName='custom-tooltip-wrap'
                    title={tr(tip)}>
                    {getSvgIcon("tip")}
                  </Tooltip>
                )}
              </div>
              <div className={styles.list_item_value}>
                 <Tooltips
                  text={showText}
                  id={label}
                  className={styles.list_item_value_meta}
                />
               
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default Meta;
