/** @format */

import { useEffect, useState, useMemo, useContext } from "react";
import { apiUrl } from "@/contants/apiUrl";
import { useTranslation } from "react-i18next";
import { address_list, address_list_columns } from "@/contants/tipset";
import { Select, Table } from "antd";
import FilscanState from "@/store/content";
import { postAxios } from "@/store/server";
import styles from "../index.module.scss";

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

  const options = useMemo(() => {
    return address_list.options.map((v) => {
      return { ...v, label: tr(v.label) };
    });
  }, [filscanStore?.filscan?.lang]);

  const columns = useMemo(() => {
    return address_list_columns.map((item) => {
      return { ...item, title: tr(item.title) };
    });
  }, [filscanStore?.filscan?.lang]);

  const load = () => {
    postAxios(apiUrl.tipset_address).then((res: any) => {
      setData({
        total: res?.result.total_count,
        dataSource: res?.result.get_rich_account_list || [],
      });
    });
  };

  return (
    <div className={styles.message_list}>
      <h3>{tr(address_list.title)}</h3>
      <div className={styles.message_list_header}>
        <div>{tr(address_list.total_list, { value: data.total })}</div>
        <Select
          options={options}
          defaultValue={"0"}
          className='custom_select'
        />
      </div>
      <Table
        className='custom-table custom-border-table'
        dataSource={data.dataSource}
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
