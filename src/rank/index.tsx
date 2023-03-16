/** @format */
import Header from "./Header";
import styles from "./index.module.scss";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useCallback, useState } from "react";
import { apiUrl, API } from "@/contants/apiUrl";
import { postAxios } from "@/store/server";
import { getColumns, header_right } from "@/contants/rank";
import { pageLimit } from "@/contants/varible";
import Table from "@/packages/table";
import Tips from '@/packages/tips'



function Rank(params: any) {
  const { t } = useTranslation();
  const tr = (label: string) => {
    return t(label, { ns: "rank" });
  };
  const [active, setActive] = useState("pool");
  const [data, setData] = useState<Array<any>>([]);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);
  const [other, setOther] = useState({
    interval: '24h',
    sector_size:'0'
  })
  const columns = useMemo(() => {
    return getColumns(active).map((item) => {
      if (item.title_tip) { 
        return { ...item, title: () => <span className="flex items-center">{tr(item.title)} <Tips context={ tr(item.title_tip)}/></span> };
      }
      return { ...item, title: tr(item.title) };
    });
  }, [active]);
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
      load(item.value,1,others);
    } else { 
      setOther({...other,[type]:item})
    }
  };

  const load = (value?: string, cur?: number,others?:any) => {
    const showValue = value || active;
    const linkUrl: any = `rank_${showValue}`;
    const page = cur || current;
    const newOth = others || other;
    let config:any = {
      page,
      limit: pageLimit,
    }
    if (header_right[showValue]) { 
      config = {
        ...config,
        ...newOth,
        sector_size:newOth.sector_size === 'all'? null :newOth.sector_size
      }
    }
    
    postAxios(apiUrl[linkUrl], config).then((res: any) => {
      const result = res?.result || {};
      setTotal(result.total);
      const data = result.items || [];
      setData(data);
    });
  };

  return (
    <div className={styles.rank}>
      <div className={styles.rank_contain}>
        <Header active={active} onChange={handleChange} other={ other} />
        <Table
          columns={columns}
          total={total}
          dataSouce={[...data] }
          current={current}
          rowKey={(record:any)=>`${record.rank}_${active}`}
          onPage={(cur: number) => {
            setCurrent(cur);
            load(active, cur);
          }}
        />
      </div>
    </div>
  );
}

export default Rank;
