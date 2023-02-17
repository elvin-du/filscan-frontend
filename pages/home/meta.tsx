/** @format */

import { home_meta } from "@/contants/home";
import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";
import { useState } from "react";
import Image from "next/image";
import Tips from "@/packages/tips";

function Meta(props: { TotalIndicators: Record<string, string | number> }) {
  const { t } = useTranslation();
  const { title, list } = home_meta;
  const [show, setShow] = useState(false);
  const { TotalIndicators } = props;
  const tr = (label: string) => {
    return t(label, { ns: "home" });
  };
  if (!TotalIndicators) {
    return null;
  }

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
          return (
            <div className={styles.list_item} key={label}>
              <div className={styles.list_item_title}>
                <span>{tr(label)}</span>
                {tip && <Tips context={tr(tip)} />}
              </div>
              <div className={styles.list_item_value}>
                {render && TotalIndicators[label]
                  ? render(TotalIndicators[label])
                  : TotalIndicators[label]}
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default Meta;
