/** @format */

import { useEffect, useState, useMemo } from "react";
import { apiUrl } from "@/contants/apiUrl";
import { useTranslation } from "react-i18next";
import { pool_list, pool_columns } from "@/contants/tipset";
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

  const columns = useMemo(() => {
    return pool_columns.map((v) => {
      return { ...v, title: tr(v.title) };
    });
  }, []);

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
    postAxios(apiUrl.tipset_pool).then((res: any) => {
      setData({
        total: res?.result.total_count,
        dataSouce: (res?.result.messages_pool_list || [])?.map((item: any) => {
          return {
            ...item?.message_basic,
            gas_fee_cap: item?.gas_fee_cap || "",
            gas_premium: item?.gas_premium || "",
          };
        }),
      });
    });
  };

  return (
    <div className={styles.message_list}>
      <h3>{tr(pool_list.title)}</h3>
      <div className={styles.message_list_header}>
        <div>{tr(pool_list.total_list, { value: data.total })}</div>
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
