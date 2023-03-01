/** @format */

import { useEffect, useState } from "react";
import { apiUrl } from "@/contants/apiUrl";
import { useTranslation } from "react-i18next";
import { transfer_list, transfer_columns } from "@/contants/tipset";
import { Table } from "antd";

import { postAxios } from "@/store/server";
import styles from "./index.module.scss";

export default () => {
  const { t } = useTranslation();
  const tr = (label: string, value?: any) => {
    if (value) {
      return t(label, value, { ns: "tipset" });
    }
    return t(label, { ns: "tipset" });
  };
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState({
    total: 0,
    dataSouce: [],
  });
  useEffect(() => {
    load();
  }, []);

  const load = () => {
    postAxios(apiUrl.tipset_transfer).then((res: any) => {
      setData({
        total: res?.result.total_count,
        dataSouce: res?.result.large_transfer_list || [],
      });
    });
  };

  const columns = transfer_columns.map((item) => {
    item.title = tr(item.title);
    return item;
  });
  return (
    <div className={styles.message_list}>
      <h3>{tr(transfer_list.title)}</h3>
      <div className={styles.message_list_header}>
        <div>{tr(transfer_list.total_list, { value: data.total })}</div>
      </div>
      <Table
        className='custom-table custom-border-table'
        dataSource={data.dataSouce}
        columns={columns}
        pagination={{
          position: ["bottomCenter"],
          current: current,
          showQuickJumper: true,
          total: data.total,
          onChange: (cur) => {
            setCurrent(cur);
          },
        }}
      />
    </div>
  );
};
