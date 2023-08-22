/** @format */
import { rank_header, header_right, select_rank } from "@/contants/rank";
import Tabs from "@/packages/tabs";
import { useTranslation } from "react-i18next";
import { Select } from "antd";
import styles from "./index.module.scss";

import { formatDateTime } from "@/utils/utils";
import Router ,{  useRouter } from "next/router";
interface Props {
  onChange: (type: string, item: any) => void;
  active: string;
  time?:string
  other:Record<string,string>
}

export default (props: Props) => {
  const { t } = useTranslation();
  const tr = (label: string) => {
    return t(label, { ns: "rank" });
  };
  const { onChange, active,other ,time} = props;

  const handleChange = (type: string, item: any) => {
    
    onChange(type, item);
  };

  const { TimeList } = header_right[active] || {};
  const options = select_rank.map((v) => {
    return { ...v, label: tr(v.label) };
  });
  return (
    <div className={`${styles.rank_header}`}>
      <div className={`${styles.rank_header_Item}`}>
        <Tabs
          className={`${styles.rank_header_Item_tabs}`}
        data={rank_header}
        ns='rank'
        defaultValue={active}
        onChange={(value) => handleChange("active", value)}
      />
       {time && <span className={styles.rank_header_time}>{ tr('rank_time')}: {formatDateTime(time,"YYYY-MM-DD HH:mm")}</span>} 
      </div>
    
      {TimeList && (
        <div className={styles.rank_header_right}>
          <Tabs
            data={TimeList}
            ns='rank'
            defaultValue={other.interval}
            border={true}
            onChange={(value) => handleChange("interval", value.value)}
          />
          <Select
            className='custom_select w-120'
            options={options}
            value={other.sector_size}
            onChange={(value) => {handleChange("sector_size", value) }}
          />
        </div>
      )}
    </div>
  );
};
