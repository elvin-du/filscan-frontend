/** @format */
import { rank_header, header_right, select_rank } from "@/contants/rank";
import Tabs from "@/packages/tabs";
import Select from "@/packages/selects";
import styles from "./index.module.scss";

interface Props {
  onChange: (type: string, item: any) => void;
  active: string;
}

export default (props: Props) => {
  const { onChange, active } = props;

  const handleChange = (type: string, item: any) => {
    onChange(type, item);
  };

  const { TimeList } = header_right[active] || {};
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
          <Select options={select_rank} border value={"all"} ns='rank' />
        </div>
      )}
    </div>
  );
};
