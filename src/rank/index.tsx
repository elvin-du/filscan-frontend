/** @format */
import Header from "./Header";
import styles from "./index.module.scss";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState, useContext } from "react";
import { apiUrl, API } from "@/contants/apiUrl";
import { postAxios } from "@/store/server";
import { getColumns, header_right } from "@/contants/rank";
import { pageLimit } from "@/contants/varible";
import Table from "@/packages/table";
import Tips from '@/packages/tips';
import { RightOutlined } from "@ant-design/icons";
import FilscanState from "@/store/content";
import Link from "next/link";
import { useRouter } from "next/router";




function Rank(params: any) {
  const filscanStore: any = useContext(FilscanState);
  const { type } = params;
  const asPath = useRouter()?.asPath;
  const pathActive = asPath.split('=')[1];

  const { t } = useTranslation();
  const tr = (label: string) => {
    return t(label, { ns: "rank" });
  };
  const [active, setActive] = useState(pathActive||"provider");
  const [data, setData] = useState<Array<any>>([]);
  const [time,setTime] = useState()
  const [current, setCurrent] = useState(1);
  const [loading,setLoading]= useState(false);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState<any>()
  const [progress, setProgress] = useState()
  const [other, setOther] = useState({
    interval: '24h',
    sector_size:'all'
  })
  const columns = useMemo(() => {
    return getColumns(active,progress).map((item) => {
      if (item.title_tip) { 
        return { ...item, align:'center',title: () => <div className="flex-center">{tr(item.title)} <Tips context={ tr(item.title_tip)}/></div> };
      }
      return { ...item,  align:'center',title: tr(item.title) };
    });
  }, [active,progress,filscanStore?.filscan?.lang]);
  useEffect(() => {
    load();
  }, []);

  const handleChange = (type: string, item: any) => {
    if (type === "active") {
      const others ={
        interval: '24h',
        sector_size:'all'
      }
      setData([])
      setActive(item.value);
      setCurrent(1)
      setTotal(0)
      setOther(others)
      setOrder(undefined)
      load(item.value, 1, others, {});
    } else { 
      setOther({ ...other, [type]: item })
      load(undefined,undefined,{ ...other, [type]: item });
    }
  };

  const load = (value?: string, cur?: number, others?: any, orderF?: any) => {
    setLoading(true)
    const showValue = value || active;
    const linkUrl: any = `rank_${showValue}`;
    const page = cur || current;
    const newOth = others || other;
    const orders = orderF || order;
    let config:any = {
      index:page - 1 ,
      limit: pageLimit,
      order:orders&& Object.keys(orders).length >0 ? {
        ...orders,
      }:undefined
       
    }
    if (header_right[showValue]) { 
      config = {
        ...config,
        ...newOth,
        sector_size: newOth.sector_size === 'all' ? null : newOth.sector_size,

      }
    }    
    postAxios(apiUrl[linkUrl], config).then((res: any) => {
      setLoading(false)
      const result = res?.result || {};
      setTotal(result.total);
      setTime(result.updated_at)
      const data = result.items || [];
      const show = !order || order && Object.keys(order).length === 0;
      if (page === 1 && show) { 
        setProgress(showValue === 'growth'? data[0]?.power_ratio:data[0]?.quality_adj_power||0)
      }
      setData(data);
    });
  };

  const handleTableChange = (pagination:any, filters:any, sorter:any) => { 
    if (sorter && sorter.order) { 
      //排序
      setOrder({
        field: sorter.field,
        sort:sorter.order === "ascend" ?'asc':'desc'
      })
      setCurrent(1)
      load(undefined, 1, undefined,{
         field: sorter.field,
        sort:sorter.order === "ascend" ?'asc':'desc'
      })
    }
  }

  return (
    <div className={`${styles.rank} ${type ? "" : styles.rank_html}`}>
      <div className={styles.rank_contain}>
       
        
        <Header active={active} time={ time} onChange={handleChange} other={other} />

        <Table
          className='rank_table'
          columns={columns}
          total={type ? 0:total}
          loading={ loading}
          dataSource={[...data] }
          current={current}
          rowKey={(record: any) => `${record.rank}_${active}`}
          onChange={handleTableChange}
          onPage={(cur: number) => {
            setCurrent(cur);
            load(active, cur);
          }}
        />
      </div>
      {type &&  <div className={styles.rank_footer}>
        <Link href={`/rank?active=${active}`}>{tr('more')}</Link>
        <RightOutlined />

      </div>}
     
    </div>
  );
}

export default Rank;
