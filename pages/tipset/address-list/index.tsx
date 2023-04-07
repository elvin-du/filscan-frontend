/** @format */

import { useEffect, useState, useMemo, useContext } from "react";
import { apiUrl } from "@/contants/apiUrl";
import { useTranslation } from "react-i18next";
import { address_list, address_list_columns } from "@/contants/tipset";
import { Select } from "antd";
import FilscanState from "@/store/content";
import { postAxios } from "@/store/server";
import styles from "../index.module.scss";
import { pageLimit } from "@/contants/varible";
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
  const [current, setCurrent] = useState(1);
  const [total,setTotal]= useState(0)
  const [data, setData] = useState([]);
  useEffect(() => {
    load();
  }, []);

  const options = useMemo(() => {
    return address_list.options.map((v) => {
      return { ...v, label: tr(v.label) };
    });
  }, [filscanStore?.filscan?.lang]);

  const columns = useMemo(() => {
    return address_list_columns(tr).map((item) => {
      return { ...item, title: tr(item.title) };
    });
  }, [filscanStore?.filscan?.lang]);

  const load = (cur?: number, field?: string) => {
    const index  = cur || current
    postAxios(apiUrl.tipset_address, {
      index: index - 1,
      limit:pageLimit,
      order: {
        field: field !== 'all' ? field:''
      }
      
    }).then((res: any) => {
      setTotal(res?.result.total_count,)
      const new_data =  res?.result?.get_rich_account_list?.map((v:any,num:number) => { 
          return {...v,rank:(index-1)*pageLimit + num+ 1}
        }) || []
      setData(new_data)
    });
  };
  return (
    <div className={styles.message_list}>
      <h3>{tr(address_list.title)}</h3>
      <div className={styles.message_list_header}>
        <div>{tr(address_list.total_list, { value: total })}</div>
        <Select
          options={options}
          defaultValue={"all"}
          className='custom_select'
          onChange={(value) => { 
            setCurrent(1);
            load(1,value)
          }}
        />
      </div>
       <Table
        dataSource={data}
        total={total}
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
