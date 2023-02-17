/** @format */
import { rank_header, header_right, select_rank } from "@/contants/rank";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Tabs from "@/packages/tabs";
import Select from "@/packages/selects";
import styles from "./index.module.scss";

export default () => {
  const { t } = useTranslation();
  const tr = (label: string) => {
    return t(label, { ns: "rank" });
  };
  const [active, setActive] = useState("");
  const handleChange = (item: any) => {
    setActive(item.value);
  };
  const { TimeList } = header_right[active] || {};
  return (
    <div className={`${styles.rank_header}`}>
      <Tabs data={rank_header} ns='rank' onChange={handleChange} />
      {TimeList && (
        <div className={styles.rank_header_right}>
          <Tabs
            data={TimeList}
            ns='rank'
            border={true}
            onChange={handleChange}
          />
          <Select options={select_rank} border value={"all"} ns='rank' />
        </div>
      )}
    </div>
  );
};
