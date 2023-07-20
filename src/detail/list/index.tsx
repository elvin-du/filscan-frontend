/** @format */
import styles from "./style.module.scss";
import Tabs from "@/packages/tabs";
import Table from "@/packages/newTable";
import { miner_list } from "@/contants/detail";
import { useTranslation } from "react-i18next";
import FilscanState from "@/store/content";
import { postAxios } from "@/store/server";
import { apiUrl } from "@/contants/apiUrl";
import { pageLimit } from "@/contants/varible";
import { useState, useEffect, useMemo, useContext } from "react";
import { Select } from "antd";
import Deatil from '@/src/contract/detail'
import Log from '@/src/contract/log'
interface Props {
  account_id: string | undefined | string[],
  ootions?: Array<any>
  verifyData?: Record<string, any>
  actor_id?: string,
  erc20?:string
}

export default ({ account_id,actor_id,erc20,ootions,verifyData}:Props) => {
  const filscanStore: any = useContext(FilscanState);
  const { t } = useTranslation();
  const tr = (label: string, value?: Record<string, any>) => {
    if (value) {
      return t(label, { ...value, ns: "detail" });
    }
    return t(label, { ns: "detail" });
  };
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [methodValue,setMethod]= useState('')
  const [data, setData] = useState([]);
     const [fromList, setFrom] = useState({})
     const [toList, setTo] = useState({})
  const [total, setTotal] = useState(0);
  // const [data, setData] = useState({
  //   total: 0,
  //   dataSource: [],
  // });
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
    return miner_list.columns(active.value,fromList,toList).map((v) => {
      const newObj = {
        ...v,
        title: tr(v.title),
      };
      return newObj;
    });
  }, [filscanStore?.filscan?.lang, active,fromList,toList]);

  const handleChange = (type: string, item: any) => {
    if (type === "active") {
      setActive(item);
      setTotal(0);
      setMethod('')
      setFrom({})
      setTo({})
      setData([])
      setCurrent(1)
      if (item.value === 'event_log') {
        return 
      }
      if (!item.value.startsWith('verify')) { 
        load(1, item.value);
      }
     
    }
  };

    useEffect(() => {
      if (account_id) {    
            setActive({
            label: "message_list",
            value: "MessagesByAccountID",
            headerList:true
          })
          postAxios(apiUrl.detail_list_method, {account_id}).then((res:any) => { 
            const opt: any = [];
            const newObj = res?.result?.method_name_list || {};
            opt.push({ label: `${tr("message_list_all")}` , value: 'all', key:'all' });
            Object.keys(newObj).forEach((key: string) => {
              opt.push({ label: `${tr(key)}` , value: key, key:key });
          });
            setOptions(opt);
           })
            load(1,'MessagesByAccountID');
        }
  }, [account_id,actor_id]);

  const load = (cur?: number, value?: string, method?: string, payload?: any) => {

    setLoading(true)
    const index = cur || current;
    const showValue = value || active.value;
    const linkUrl: string = apiUrl.detail_miner_list + "/" + showValue;
    const obj = active.headerList ? {
      method_name: method || methodValue
    } : {};
    postAxios(linkUrl, {
      account_id: account_id,
      address:erc20,
      filters: {
        index: index - 1,
        page:index - 1,
        limit: pageLimit,
       ...obj
      },
      ...payload
    }).then((res: any) => {
      const result = res?.result || {};
       setLoading(false)
      const result_key: string = miner_list.resultObj(showValue);
      const data = result[result_key] || [];
      setTotal(result?.total_count|| result?.total)
      setData(data);
        if (data.length > 0) { 
                    const formItems = data.map((v: any) => v.from);
                    const toItems = data.map((v: any) =>v.to)
                    loadFnsUrl(formItems, 'form');
                    loadFnsUrl(toItems,'to')
                 }
    });
  };


      const loadFnsUrl = (items:Array<any>,type:string) => { 
        postAxios(`${apiUrl.contract_fnsUrl}`, {addresses:items}).then(
            (res: any) => {
                if (type === 'form') {
                    setFrom(res?.result)
                } else { 
                    setTo(res?.result)
                }
            }
        )
      }
  
  
  const renderChildren = () => { 
    if (active.value === 'event_log') { 
      return <Log actor_id={actor_id}/>
    }
    if (active.value.startsWith('verify')) { 
      return <Deatil verifyData={verifyData} id={active.value.split('_')[1]}/>
    }
    return  <>
            <div className={styles.message_list_header}>{tr(`${active.label}_total`, { value: total })}</div>
            <Table
            dataSource={[...data]}
            total={total}
            columns={columns}
            current={current}
            loading={loading}
          // rowKey={(record: any) => `${active.value}_${new Date().getTime()}`}
            onPage={(cur) => {
              setCurrent(cur);
              load(cur);
            }}
            />
            <span className={styles.message_list_main_looksAll} onClick={() => { 
              window.open(`http://v1.filscan.io/tipset/address-detail?address=${account_id}`)
            }}>{ tr('look_all')}</span>
        </>
  }
  

  return (
    <div className={styles.message_list}>
      <div className={styles.message_list_tabs}>
        <Tabs
          border
        data={ootions||miner_list.title}
        ns='detail'
        defaultValue={active.value}
        onChange={(value) => handleChange("active", value)}
      />
        {active.headerList &&  <Select
          options={options}
          showSearch={ true}
          defaultValue={"all"}
          className='custom_select'
           onChange={(value) => { 
             setCurrent(1);
             const showValue = value === 'all' ? '' : value
             setMethod(showValue)
            load(1,undefined,showValue)
          }}
        />}
      </div>
      <div className={`${styles.message_list_main} ${total > pageLimit ? '' : styles.message_list_mainTotal}`}>
        { renderChildren()}
      </div>
      
    </div>
  );
};
