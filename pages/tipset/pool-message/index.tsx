/** @format */

import { useEffect, useState, useMemo, useContext } from "react";
import { apiUrl } from "@/contants/apiUrl";
import { useTranslation } from "react-i18next";
import { pool_list, pool_columns } from "@/contants/tipset";
import { Select } from "antd";
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
  const [data, setData] = useState<any>({
    total: 0,
    dataSource: [],
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
    } else { 
      setOptions([])
    }
  }, [filscanStore?.filscan?.lang]);

  useEffect(() => {
    postAxios(apiUrl.tipset_message_opt).then((res: any) => {
      const opt: any = [ ];
      const newObj = res?.result?.method_name_list || {};
      Object.keys(newObj).forEach((key: string) => {
        if (key.length === 0) { 
        opt.push({ label: `${tr("message_list_all")} (${newObj[key]})` , value: 'all', key:'message_list_all' });
        }
        else{ 
        opt.push({ label: `${tr(key)} (${newObj[key]})` , value: key, key:key });
        }
        
      });
      setOptions(opt);
    });
    load();
  }, []);

  const load = (cur?: number,method?:string) => {
    const index = cur || current ;
    postAxios(apiUrl.tipset_pool, {
      filters: {
        index:index-1,
        limit: pageLimit,
        method_name:method
      },
    }).then((res: any) => {
      setData({
        total: res?.result.total_count,
        dataSource: (res?.result.messages_pool_list || [])?.map((item: any) => {
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
          onChange={(value) => { 
            setCurrent(0);
            load(1,value)
          }}
        />
      </div>
      <Table
        dataSource={data.dataSource}
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
