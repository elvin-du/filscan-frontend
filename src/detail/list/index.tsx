/** @format */
import styles from "./style.module.scss";
import Tabs from "@/packages/tabs";
import Table from "@/packages/table";
import { miner_list } from "@/contants/detail";
import { useTranslation } from "react-i18next";
import FilscanState from "@/store/content";
import { postAxios } from "@/store/server";
import { apiUrl } from "@/contants/apiUrl";
import { pageLimit } from "@/contants/varible";
import { useState, useEffect, useMemo, useContext } from "react";
import { Select } from "antd";

interface Props {
  account_id: string | undefined | string[],
  ootions?:Array<any>
}

export default ({ account_id,ootions}:Props) => {
  const filscanStore: any = useContext(FilscanState);
  const { t } = useTranslation();
  const tr = (label: string, value?: Record<string, any>) => {
    if (value) {
      return t(label, { ...value, ns: "detail" });
    }
    return t(label, { ns: "detail" });
  };
  const [options, setOptions] = useState([]);
  const [data, setData] = useState({
    total: 0,
    dataSource: [],
  });
  const [active, setActive] = useState({
    label: "message_list",
    value: "MessagesByAccountID",
    headerList:true
  });
  const [current, setCurrent] = useState(1);

  useEffect(() => {
     if (options) {
       const newOptios: any = options.map((v: any) => {
         return { ...v, label: tr(v.key) };
       });
       setOptions(newOptios);
     }
  }, [filscanStore?.filscan?.lang]);

  const columns = useMemo(() => {
    return miner_list.columns(active.value).map((v) => {
      const newObj = {
        ...v,
        title: tr(v.title),
      };
      return newObj;
    });
  }, [filscanStore?.filscan?.lang, active]);

  const handleChange = (type: string, item: any) => {
    if (type === "active") {
        setActive(item);
        setData({
            total: 0,
            dataSource: [],
        })
     setCurrent(1)
      load(1, item.value);
    }
  };

    useEffect(() => {
        if (account_id) { 
          postAxios(apiUrl.detail_list_method, {account_id}).then((res:any) => { 
             const opt: any = [ ];
            const newObj = res?.result?.method_name_list || {};
            opt.push({ label: `${tr("message_list_all")}` , value: 'all', key:'all' });
            Object.keys(newObj).forEach((key: string) => {
              opt.push({ label: `${tr(key)} (${newObj[key]})` , value: key, key:key });
          });
            setOptions(opt);
           })
            load();
        }
  }, [account_id]);

  const load = (cur?: number, value?: string,method?:string) => {
    const index = cur || current;
    const showValue = value || active.value;
    const linkUrl: string = apiUrl.detail_miner_list + "/" + showValue;
    const obj = active.headerList ? {
      method_name: method || ''
    } : {};
    postAxios(linkUrl, {
      account_id: account_id,
      filters: {
        index:index-1,
        limit: pageLimit,
       ...obj
      },
    }).then((res: any) => {
      const result = res?.result || {};
      const result_key: string = miner_list.resultObj(showValue);
      const data = result[result_key] || [];
        setData({
            dataSource: data,
            total:result.total_count
        });
    });
  };
    
  return (
    <div className={styles.message_list}>
      <Tabs
        data={ootions||miner_list.title}
        ns='detail'
        defaultValue={active.value}
        onChange={(value) => handleChange("active", value)}
      />
      <div className={styles.message_list_header}>
        <div>{tr(`${active.label}_total`, { value: data.total })}</div>
        {active.headerList &&   <Select
          options={options}
          defaultValue={"all"}
          className='custom_select'
           onChange={(value) => { 
             setCurrent(1);
             const showValue = value === 'all'?'':value
            load(1,undefined,showValue)
          }}
        />}
       
      </div>
      <Table
        dataSource={data.dataSource || []}
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
