/** @format */
import { rank_header, header_right, select_rank } from "@/contants/rank";
import Tabs from "@/packages/tabs";
import { useTranslation } from "react-i18next";
import { Select } from "antd";
import styles from "./index.module.scss";

interface Props {
  onChange: (type: string, item: any) => void;
  active: string;
}

export default (props: Props) => {
  const { t } = useTranslation();
  const tr = (label: string) => {
    return t(label, { ns: "rank" });
  };
  const { onChange, active } = props;

  const handleChange = (type: string, item: any) => {
    onChange(type, item);
  };

  const { TimeList } = header_right[active] || {};
  const options = select_rank.map((v) => {
    return { ...v, label: tr(v.label) };
  });
  return (
    <div className={`${styles.rank_header}`}>
      <Tabs
        data={rank_header}
        ns='rank'
        defaultValue={active}
        onChange={(value) => handleChange("active", value)}
      />
      {TimeList && (
        <div className={styles.rank_header_right}>
          <Tabs
            data={TimeList}
            ns='rank'
            border={true}
            onChange={(value) => handleChange("time", value)}
          />
          <Select
            className='custom_select w-120'
            options={options}
            defaultValue={"all"}
          />
        </div>
      )}
    </div>
  );
};
