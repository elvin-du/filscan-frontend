/** @format */
import Header from "./Header";
import styles from "./index.module.scss";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState, useContext } from "react";
import { apiUrl } from "@/contants/apiUrl";
import { postAxios } from "@/store/server";
import { getColumns, header_right } from "@/contants/rank";
import { pageLimit } from "@/contants/varible";
import Table from "@/packages/newTable";
import Tips from '@/packages/tips';
import { RightOutlined } from "@ant-design/icons";
import FilscanState from "@/store/content";
import Link from "next/link";
import { useRouter } from "next/router";
import { Skeleton, Spin } from "antd";




function Rank(params: any) {
  const filscanStore: any = useContext(FilscanState);
  const { type } = params;
  const asPath = useRouter()?.asPath;
  const pathActive = asPath.split('=')[1];
  const router = useRouter();

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
    const newColu: any = [];
    getColumns(active, progress)?.forEach((item) => {
       if (item.title_tip) {
         newColu.push({ ...item,key:`${active}_${item.dataIndex}`, align: 'left', title: () => <div>{tr(item.title)} <Tips context={tr(item.title_tip)} /></div> });
       } else { 
         newColu.push({ ...item, key:`${active}_${item.dataIndex}`,  align:'left',title: tr(item.title) });
       }
     
     });
    return newColu
  }, [ active,progress, filscanStore?.filscan?.lang]);
  
  useEffect(() => {
    load();
  }, []);

  const handleChange = (typeFlag: string, item: any) => {
    if (typeFlag === "active") {
       setData([])
      const others ={
        interval: '24h',
        sector_size:'all'
      }
      setActive(item.value);
      setCurrent(1)
      setTotal(0)
      setOther(others)
      setOrder(undefined)
      load(item.value, 1, others, {});
      if (!type) { 
         router.push({
          pathname: '/rank',
          query: { active: item.value },
        })
      }
    } else { 
      setOther({ ...other, [typeFlag]: item })
      load(undefined,undefined,{ ...other, [typeFlag]: item });
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
      const show = !orders || orders && Object.keys(orders).length === 0 || orders.sort === 'desc';
      if (page === 1 && show) {
        setProgress(showValue === 'growth'? data[0]?.power_ratio:data[0]?.quality_adj_power||0)
      }
      setData(data);
    });
  };

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    const index = pagination?.current || current;
    let obj;
    if (pagination?.current) { 
      setCurrent(pagination?.current)
    }
    
    if (sorter && sorter.order) { 
      //排序
      obj = {
        field: sorter.field,
        sort:sorter.order === "ascend" ?'asc':'desc'
      }
      setOrder(obj)
   
    }
    load(undefined, index, undefined,obj)
  }

  return (
    <div className={`${styles.rank} ${type ? "" : styles.rank_html}`}>
      <div className={styles.rank_contain}>   
        <Header active={active} time={time} onChange={handleChange} other={other} />
      
          <Spin spinning={loading}>
          <Table
                    key={ active}
                    className='rank_table'
                    columns={columns}
                    total={type ? 0:total}
                    loading={ loading}
                    dataSource={[...data] }
                    current={current}
                    rowKey={(record: any) => `${record.rank}_${active}`}
                    onChange={handleTableChange}
                    // onPage={(cur: number) => {
                    //   setCurrent(cur);
                    //   load(active, cur);
                    // }}
                  />
          </Spin>
        
        
      </div>
      {type &&  <div className={styles.rank_footer}>
        <Link href={`/rank?active=${active}`}>{tr('more')}</Link>
        <RightOutlined rev={undefined}  />

      </div>}
     
    </div>
  );
}

export default Rank;
