/** @format */
import Header from "./Header";
import styles from "./index.module.scss";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";
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

  const handleChange = (type: string, value: any) => {
    if (type === "active") {
      setActive(value);
    }
  };

  const load = () => {
    const linkUrl: any = `rank_${active}`;
    postAxios(apiUrl[linkUrl]).then((res: any) => {
      const result = res?.result || {};
      const data = result[resultObj(active)] || [];
      setData(data);
    });
  };

  return (
    <div className={styles.rank}>
      <Header active={active} onChange={handleChange} />
      <Table className='custom-table' columns={columns} dataSource={data} />
    </div>
  );
}

export default Rank;
