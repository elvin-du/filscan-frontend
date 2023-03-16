/** @format */

import { useEffect, useState, useContext, useMemo } from "react";
import { apiUrl } from "@/contants/apiUrl";
import { useTranslation } from "react-i18next";
import { message_list, message_list_columns } from "@/contants/tipset";
import { Select, Table } from "antd";
import { pageLimit } from "@/contants/varible";
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
  const [options, setOptions] = useState([]);
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState({
    total: 0,
    dataSouce: [],
  });

  const columns = useMemo(() => {
    return message_list_columns.map((v) => {
      return { ...v, title: tr(v.title) };
    });
  }, [filscanStore?.filscan?.lang]);

  useEffect(() => {
    if (options) {
      const newOptios: any = options.map((v: any) => {
        return { ...v, label: tr(v.key) };
      });
      setOptions(newOptios);
    }
  }, [filscanStore?.filscan?.lang]);

  useEffect(() => {
    postAxios(apiUrl.tipset_message_opt).then((res: any) => {
      const opt: any = [
        {
          label: tr("message_list_all"),
          key: "message_list_all",
          value: "all",
        },
      ];
      res?.result?.method_name_list.forEach((v: string) => {
        opt.push({ label: tr(v), key: v, value: v });
      });
      setOptions(opt);
    });
    load();
  }, []);

  const load = () => {
    postAxios(apiUrl.tipset_message,{
      filters: {
        index: current,
        limit:pageLimit
      }
    }).then((res: any) => {
      setData({
        total: res?.result.total_count,
        dataSouce: res?.result.get_all_message_list || [],
      });
    });
  };

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
