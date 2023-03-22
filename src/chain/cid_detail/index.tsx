import { apiUrl } from "@/contants/apiUrl";
import { chain_cid } from "@/contants/tipset";
import styles from "./style.module.scss";
import Card from "@/packages/card";
import Content from "@/packages/content";
import { postAxios } from "@/store/server";
import { useEffect, useState } from "react";
import Table from "@/packages/table";
import { useTranslation } from "react-i18next";


export default ({ cid }: { cid: string | undefined | string[] }) => { 
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

  useEffect(() => {
    if (cid) {
      postAxios(apiUrl.tipset_BlockDetails, { block_cid: cid }).then(
        (res: any) => {
          setDetail(res?.result?.block_details);
        }
      );
    }
  }, [cid]);




    return <div>
        <Card title={chain_cid.title} ns='tipset'>
        <Content content={chain_cid.list} data={detail} ns={"tipset"} />
        </Card>
        <div>
        <div className={styles.message_list_header}>
        <div>{tr(chain_cid.total, { value: data.total })}</div>
      </div>
      <Table
        dataSouce={data.dataSouce || []}
        total={data.total}
        columns={chain_cid.columns}
        current={current}
        onPage={(cur) => {
          setCurrent(cur);
         // load(cur);
        }}
      />
        </div>
        </div>
}