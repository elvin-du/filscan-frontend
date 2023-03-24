import { apiUrl } from "@/contants/apiUrl";
import { chain_cid } from "@/contants/tipset";
import styles from "./style.module.scss";
import Card from "@/packages/card";
import { Select } from "antd";
import Content from "@/packages/content";
import { postAxios } from "@/store/server";
import { useContext, useEffect, useMemo, useState } from "react";
import Table from "@/packages/table";
import { useTranslation } from "react-i18next";
import FilscanState from "@/store/content";


export default ({ cid }: { cid: string | undefined | string[] }) => { 
  const filscanStore: any = useContext(FilscanState);
  const { t } = useTranslation();
  const tr = (label: string, value?: Record<string, any>) => {
    if (value) {
      return t(label, { ...value, ns: "tipset" });
    }
    return t(label, { ns: "tipset" });
  };
    
    const [data, setData] = useState({
        total: 0,
        dataSouce:[]
    })
    const [current,setCurrent] = useState(1)
  const [detail, setDetail] = useState([])
    const [options, setOptions] = useState([]);


  useEffect(() => {
    if (cid) {
      postAxios(apiUrl.tipset_BlockDetails, { block_cid: cid }).then(
        (res: any) => {
          setDetail(res?.result?.block_details);
        }
      );
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
    }
  }, [cid]);

   useEffect(() => {
    if (options) {
      const newOptios: any = options.map((v: any) => {
        return { ...v, label: tr(v.key) };
      });
      setOptions(newOptios);
    }
  }, [filscanStore?.filscan?.lang]);

  const columns = useMemo(() => {
    return chain_cid.columns.map((v) => {
      const newObj = {
        ...v,
        title: tr(v.title),
      };
      return newObj;
    });
  }, [filscanStore?.filscan?.lang]);

  



    return <div>
        <Card title={chain_cid.title} ns='tipset'>
        <Content content={chain_cid.list} data={detail} ns={"tipset"} />
        </Card>
        <div>
        <div className={styles.message_list_header}>
          <div>{tr(chain_cid.total, { value: data.total })}</div>
           <Select
          options={options}
          defaultValue={"all"}
          className='custom_select'
        />
      </div>
      <Table
        dataSouce={data.dataSouce || []}
        total={data.total}
        columns={columns}
        current={current}
        onPage={(cur) => {
          setCurrent(cur);
         // load(cur);
        }}
      />
        </div>
        </div>
}