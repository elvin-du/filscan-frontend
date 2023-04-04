/** @format */

import { useEffect, useState, useMemo, useContext } from "react";
import { apiUrl } from "@/contants/apiUrl";
import { useTranslation } from "react-i18next";
import { transfer_list, transfer_columns } from "@/contants/tipset";
import Table from "@/packages/table";
import FilscanState from "@/store/content";
import { postAxios } from "@/store/server";
import styles from "../index.module.scss";
import { pageLimit } from "@/contants/varible";

export default () => {
  const filscanStore: any = useContext(FilscanState);
  const { t } = useTranslation();
  const tr = (label: string, value?: Record<string, any>) => {
    if (value) {
      return t(label, { ...value, ns: "tipset" });
    }
    return t(label, { ns: "tipset" });
  };
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState({
    total: 0,
    dataSource: [],
  });
  useEffect(() => {
    load();
  }, []);

  const load = () => {
    postAxios(apiUrl.tipset_transfer, {
      filters: {
        index: current - 1,
        limit:pageLimit
      }
    }).then((res: any) => {
      setData({
        total: res?.result.total_count,
        dataSource: res?.result.large_transfer_list || [],
      });
    });
  };

  const columns = useMemo(() => {
    return transfer_columns.map((item) => {
      return { ...item, title: tr(item.title) };
    });
  }, [filscanStore.filscan.lang]);

  return (
    <div className={styles.message_list}>
      <h3>{tr(transfer_list.title)}</h3>
      <div className={styles.message_list_header}>
        <div>{tr(transfer_list.total_list, { value: data.total })}</div>
      </div>
       <Table
          columns={columns}
          total={data.total}
          dataSource={data.dataSource}
          current={current}
          //rowKey={(record: any) => `${record.rank}_${active}`}
         // onChange={handleTableChange}
          onPage={(cur: number) => {
            setCurrent(cur);
            //load(active, cur);
          }}
      />
    </div>
  );
};
