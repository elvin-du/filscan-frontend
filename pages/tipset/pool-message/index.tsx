/** @format */

import { useEffect, useState, useMemo, useContext } from "react";
import { apiUrl } from "@/contants/apiUrl";
import { useTranslation } from "react-i18next";
import { pool_list, pool_columns } from "@/contants/tipset";
import { Select, Tooltip } from "antd";
import FilscanState from "@/store/content";
import { postAxios } from "@/store/server";
import { pageLimit } from "@/contants/varible";
import styles from "../index.module.scss";
import Table from "@/packages/table";

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
  const [loading, setLoading] = useState("");
  const [data, setData] = useState<any>({
    total: 0,
    dataSouce: [],
  });

  const columns = useMemo(() => {
    return pool_columns.map((v) => {
      const newObj = {
        ...v,
        title: tr(v.title),
      };
      return newObj;
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
        opt.push({ label: tr(v), value: v, key: v });
      });
      setOptions(opt);
    });
    load();
  }, []);

  const load = (cur?: number) => {
    const index = cur || current;
    postAxios(apiUrl.tipset_pool, {
      filters: {
        index,
        limit: pageLimit,
      },
    }).then((res: any) => {
      setData({
        total: res?.result.total_count,
        dataSouce: (res?.result.messages_pool_list || [])?.map((item: any) => {
          return {
            ...item?.message_basic,
            gas_fee_cap: item?.gas_limit || "",
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
        dataSouce={data.dataSouce}
        total={data.total}
        columns={columns}
        current={current}
        onPage={(cur) => {
          setCurrent(cur);
          load(cur);
        }}
      />
    </div>
  );
};
