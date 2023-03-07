/** @format */
import Header from "./Header";
import styles from "./index.module.scss";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useCallback, useState } from "react";
import { apiUrl, API } from "@/contants/apiUrl";
import { postAxios } from "@/store/server";
import { getColumns } from "@/contants/rank";
//import { Table } from "antd";
import { pageLimit } from "@/contants/varible";
import Table from "@/packages/table";

function Rank(params: any) {
  const { t } = useTranslation();
  const tr = (label: string) => {
    return t(label, { ns: "rank" });
  };
  const [active, setActive] = useState("pool");
  const [data, setData] = useState<Array<any>>([]);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);
  const columns = useMemo(() => {
    return getColumns(active).map((item) => {
      return { ...item, title: tr(item.title) };
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

  const load = (value?: string, cur?: number) => {
    const showValue = value || active;
    const linkUrl: any = `rank_${showValue}`;
    const page = cur || current;
    postAxios(apiUrl[linkUrl], {
      page,
      limit: pageLimit,
    }).then((res: any) => {
      const result = res?.result || {};
      setTotal(result.total);
      const data = result.items || [];
      setData(data);
    });
  };

  return (
    <div className={styles.rank}>
      <div className={styles.rank_contain}>
        <Header active={active} onChange={handleChange} />
        <Table
          columns={columns}
          total={total}
          dataSouce={data || []}
          current={current}
          onPage={(cur: number) => {
            setCurrent(cur);
            load(active, cur);
          }}
        />
      </div>
    </div>
  );
}

export default Rank;
