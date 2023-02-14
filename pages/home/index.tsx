/** @format */

import { home_meta, apiUrl } from "@/contants/home";
import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";
import { useState } from "react";
import { postAxios } from "@/store/server";
import Image from "next/image";

function Home(props: { TotalIndicators: Record<string, string | number> }) {
  const { t } = useTranslation();
  const { title, list } = home_meta;
  const [show, setShow] = useState(false);
  const { TotalIndicators } = props;
  const tr = (label: string) => {
    return t(label, { ns: "home" });
  };
  return (
    <div
      className={`default-card ${
        show ? styles.mata_card_max : styles.mata_card_min
      }`}>
      <div className='default-card-title'>
        {title.icon && (
          <Image src={title.icon} alt='' width={19} className='image-icon' />
        )}
        {tr(title.label)}
        <span className='right-content'>
          {title.rightIcon && (
            <span
              className='right-item'
              onClick={() => {
                setShow(!show);
              }}>
              {tr(show ? title.rightIcon + "_false" : title.rightIcon)}
            </span>
          )}
        </span>
      </div>
      <ul className={`default-card-content ${styles.ul_list}`}>
        {list.map((item) => {
          const { render, label } = item;
          return (
            <div className={styles.list_item} key={label}>
              <div>{tr(label)}</div>
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

export async function getServerSideProps(context: any) {
  const res: any = await postAxios(
    apiUrl.home_meta, //区块高度
    {
      method: "post",
      body: {},
    }
  );

  return {
    props: {
      TotalIndicators: res?.result?.total_indicators || {},
    },
  };
}

export default Home;
