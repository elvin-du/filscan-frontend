/** @format */

import { home_meta } from "@/contants/home";
import { apiUrl } from "@/contants/apiUrl";
import { postAxios } from "@/store/server";
import { useTranslation } from "next-i18next";
import { Tooltip } from "antd";
import styles from "./index.module.scss";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { getSvgIcon } from "@/svgUtils";
import Tooltips from "@/packages/tooltip";

function Meta() {
  const { t } = useTranslation();
  const { title, list } = home_meta;
  const [show, setShow] = useState(false);

  const [TotalIndicators, setTotalIndicators] =
    useState<Record<string, string | number>>();

  const tr = (label: string) => {
    return t(label, { ns: "home" });
  };

  useEffect(() => {
    postAxios(apiUrl.home_meta).then((res: any) => {
      setTotalIndicators(res?.result?.total_indicators || {});
    });
  }, []);

  return (
    <div
      className={`${styles.home_meta} default-card ${
        show ? styles.mata_card_max : styles.mata_card_min
      }`}>
      <div className='default-card-title'>
        {title?.icon && (
          <Image src={title?.icon} alt='' width={19} className='image-icon' />
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
        {list.map((item) => {
          const { render, label, tip } = item;
          let showText: string = "";
          if (TotalIndicators) {
            showText = render
              ? render(TotalIndicators[label])
              : TotalIndicators[label];
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
