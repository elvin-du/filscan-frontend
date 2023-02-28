/** @format */

import { useEffect, useState } from "react";
import { apiUrl } from "@/contants/apiUrl";
import { useTranslation } from "react-i18next";
import { message_list, message_list_columns } from "@/contants/tipset";
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
  const [data, setData] = useState({
    total: 0,
    dataSouce: [],
  });
  useEffect(() => {
    postAxios(apiUrl.tipset_message_opt).then((res: any) => {
      const opt: any = [{ label: tr("message_list_all"), value: "all" }];
      res?.result?.method_name_list.forEach((v: string) => {
        opt.push({ label: tr(v), value: v });
      });
      setOptions(opt);
    });
    load();
  }, []);

  const load = () => {
    postAxios(apiUrl.tipset_message).then((res: any) => {
      setData({
        total: res?.result.total_count,
        dataSouce: res?.result.get_all_message_list || [],
      });
    });
  };

  const columns = message_list_columns.map((item) => {
    item.title = tr(item.title);
    return item;
  });
  return (
    <div className={styles.message_list}>
      <h3>{tr(message_list.title)}</h3>
      <div className={styles.message_list_header}>
        <div>{tr(message_list.total_list, { value: data.total })}</div>
        <Select
          options={options}
          defaultValue={"all"}
          className='custom_select'
        />
      </div>
      <Table
        className='custom-table custom-border-table'
        dataSource={data.dataSouce}
        columns={columns}
      />
    </div>
  );
};
