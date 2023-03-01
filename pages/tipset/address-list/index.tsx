/** @format */

import { useEffect, useState } from "react";
import { apiUrl } from "@/contants/apiUrl";
import { useTranslation } from "react-i18next";
import { address_list, address_list_columns } from "@/contants/tipset";
import { Select, Table } from "antd";

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
  const [options, setOptions] = useState([]);
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState({
    total: 0,
    dataSouce: [],
  });
  useEffect(() => {
    const opt: any = address_list.options.map((v) => {
      return { ...v, label: tr(v.label) };
    });
    setOptions(opt);
    load();
  }, []);

  const load = () => {
    postAxios(apiUrl.tipset_address).then((res: any) => {
      setData({
        total: res?.result.total_count,
        dataSouce: res?.result.get_rich_account_list || [],
      });
    });
  };

  const columns = address_list_columns.map((item) => {
    item.title = tr(item.title);
    return item;
  });
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
