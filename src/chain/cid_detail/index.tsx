import { apiUrl } from "@/contants/apiUrl";
import { chain_cid } from "@/contants/tipset";
import styles from "./style.module.scss";
import Card from "@/packages/custom_card";
import { Select } from "antd";
import Content from "@/packages/main";
import { postAxios } from "@/store/server";
import { useContext, useEffect, useMemo, useState } from "react";
import Table from "@/packages/newTable";
import { useTranslation } from "react-i18next";
import FilscanState from "@/store/content";
import { pageLimit } from "@/contants/varible";
import { isMobile } from "@/utils/utils";


export default ({ cid,onChange }: { cid: string | undefined | string[],onChange:(record:any)=>void }) => { 
  const filscanStore: any = useContext(FilscanState);
  const { t } = useTranslation();
  const tr = (label: string, value?: Record<string, any>) => {
    if (value) {
      return t(label, { ...value, ns: "tipset" });
    }
    return t(label, { ns: "tipset" });
  };
    const [total,setTotal]= useState(0)
    const [data, setData] = useState([])
    const [current,setCurrent] = useState(1)
  const [detail, setDetail] = useState([])
  const [loading,setLoading]= useState(false)
    const [options, setOptions] = useState([]);


  useEffect(() => {
    if (cid) {
      postAxios(apiUrl.tipset_BlockDetails, { block_cid: cid }).then(
        (res: any) => {
         if(onChange) onChange(res?.result?.block_details)
          setDetail(res?.result?.block_details);
        }
      );
      postAxios(apiUrl.tipset_block_message_opt,{cid}).then((res: any) => {
      const opt: any = [ ];
        const newObj = res?.result?.method_name_list || {};
         opt.push({ label: `${tr("message_list_all")}` , value: 'all', key:'all' });
        Object.keys(newObj).forEach((key: string) => {
           opt.push({ label: `${tr(key)} (${newObj[key]})` , value: key, key:key });
      });
        setOptions(opt);
      });
     loadMessage()
    }
  }, [cid]);


  const loadMessage = (cur?: number,method?:string) => { 
    const showIndex = cur || current;
    const showMethod = method === 'all' ? undefined : method;
    setLoading(true)
    postAxios(apiUrl.tipset_Block_meaages, { filters: { index: showIndex - 1, limit: pageLimit, method_name: showMethod }, block_cid: cid }).then((res: any) => { 
      setLoading(false)
      setData(res?.result?.message_list || [],)
      setTotal(res?.result?.total_count)

    })
  }

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

  console.log('====33',isMobile())

  // if (isMobile()) { 
  //   return <div>222</div>  
  // }

  

    return <div >
      <Card title={chain_cid.title} bgColor className={ styles.cid_detail} ns='tipset'>
        <Content content={chain_cid.list} warpClassName={styles.cid_detail_content }  data={detail} ns={"tipset"} />
        </Card>
      <div className={ styles.cid_detail_list }>
        <div className={styles.message_list_header}>
          <div>{tr(chain_cid.total, { value: total })}</div>
          <Select
          options={options}
          defaultValue={"all"}
            className='custom_select'
            onChange={(value) => { 
              setCurrent(1);
              loadMessage(1, value);
            }}
        />
      </div>
      <Table
        dataSource={data}
          total={total}
          rowKey={ (record:any)=>`${record.cid}_${record.block_time}`}
          columns={columns}
          current={current}
          loading={ loading}
        onPage={(cur) => {
          setCurrent(cur);
          loadMessage(cur)
        }}
      />
        </div>
        </div>
}