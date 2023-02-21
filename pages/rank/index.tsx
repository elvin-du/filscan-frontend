/** @format */
import Header from "./Header";
import styles from "./index.module.scss";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useCallback, useState } from "react";
import { apiUrl, API } from "@/contants/apiUrl";
import { postAxios } from "@/store/server";
import { resultObj, getColumns } from "@/contants/rank";
import { Table } from "antd";

function Rank(params: any) {
  const { t } = useTranslation();
  const tr = (label: string) => {
    return t(label, { ns: "rank" });
  };
  const [active, setActive] = useState("pool");
  const [data, setData] = useState([]);

  const columns = useMemo(() => {
    return getColumns(active).map((item) => {
      item.title = tr(item.title);
      return item;
    });
  }, [active]);
  useEffect(() => {
    load();
  }, []);

  const handleChange = (type: string, item: any) => {
    if (type === "active") {
      setActive(item.value);
      load(item.value);
    }
  };

  const load = (value?: string) => {
    const showValue = value || active;
    const linkUrl: any = `rank_${showValue}`;
    postAxios(apiUrl[linkUrl]).then((res: any) => {
      const result = res?.result || {};
      const data = result[resultObj(showValue)] || [];
      setData(data);
    });
  };

  return (
    <div className={styles.rank}>
      <Header active={active} onChange={handleChange} />
      <Table
        className='custom-table'
        //rowKey={(record) => record?.owner + record.block_count}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
}

export default Rank;
