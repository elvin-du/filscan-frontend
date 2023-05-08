/** @format */

import { useEffect, useState, useContext, useMemo } from "react";
import { apiUrl } from "@/contants/apiUrl";
import { useTranslation } from "react-i18next";
import { message_list, message_list_columns } from "@/contants/tipset";
import { Select } from "antd";
import { pageLimit } from "@/contants/varible";
import FilscanState from "@/store/content";
import { postAxios } from "@/store/server";
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
  const [loading,setLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [selectValue,setSelect] = useState('all')
  const [data, setData] = useState({
    total: 0,
    dataSource: [],
  });

  const columns = useMemo(() => {
    return message_list_columns.map((v) => {
      return { ...v, align:'center', title: tr(v.title) };
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
      const opt: any = [ ];
      const newObj = res?.result?.method_name_list || {};
      let optNum = 0;

         Object.keys(newObj).forEach((key: string) => {
           optNum = optNum + Number(newObj[key])
        opt.push({ label: `${tr(key)} (${newObj[key]})` , value: key, key:key });
        
         });
       opt.unshift({ label: `${tr("message_list_all")} (${optNum})` , value: 'all', key:'message_list_all' });
      setOptions(opt);
    });
    load();
  }, []);

  const load = (cur?: number, method?: string) => {
        setLoading(true)
      const showIndex = cur || current;
    postAxios(apiUrl.tipset_message,{
      filters: {
        index:showIndex-1,
        limit: pageLimit,
        method_name:method&&method === 'all' ? '' : method 
      }
    }).then((res: any) => {
      setLoading(false)
      setData({
        total: res?.result.total_count,
        dataSource: res?.result.message_list || [],
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
          value={ selectValue}
          className='custom_select'
           onChange={(value) => { 
             setCurrent(1);
             load(1, value);
             setSelect(value)
          }}
        />
      </div>
      <Table
        columns={columns}
          loading={loading}
          total={data.total}
          dataSource={[...data.dataSource] }
          current={current}
          rowKey={(record: any) => `${record.cid}_${record.value}`}
          onPage={(cur: number) => {
            setCurrent(cur);
            load(cur);
          }}
        
      />
    </div>
  );
};
