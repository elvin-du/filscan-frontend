/** @format */

import { home_meta } from "@/contants/home";
import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";
export default () => {
  const { t, i18n } = useTranslation();
  const { title, list } = home_meta;

  const tr = (label: string) => {
    return t(label, { ns: "home" });
  };
  console.log("---3", list);
  return (
    <div className='default-card'>
      <h5>{tr(title.label)}</h5>
      <div className={styles.ul_list}>
        {list.map((item) => {
          return (
            <div className={styles.list_item} key={item.label}>
              {tr(item.label)}
            </div>
          );
        })}
      </div>
    </div>
  );
};
