/** @format */
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { message_overview, message_other, message_tranf, message_ERC20Trans } from "@/contants/detail";
import { apiUrl } from "@/contants/apiUrl";
import { postAxios } from "@/store/server";
import Table from '@/packages/table';
import { useEffect, useState } from "react";
import {LoadingOutlined } from '@ant-design/icons'
import Card from "@/packages/card";
import Content from "@/packages/content";
import styles from "../index.module.scss";



export default () => {
  const router = useRouter();
  const { cid } = router.query;
  const { t } = useTranslation();
  const tr = (label: string): string => {
    return t(label, { ns: "detail" });
  };

  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [TransferData,setTransfer]= useState<any>([]);
  
  useEffect(() => {
    if (cid) {
      postAxios(apiUrl.contract_transferInMessage, { cid: cid }).then(
        (res: any) => {
          setTransfer(res.result.items)
        }
      );
      postAxios(apiUrl.detail_message, { message_cid: cid }).then(
        (res: any) => {
         setLoading(false)
          setData(res?.result?.MessageDetails);
        
        }
      );
    }
  }, [cid]);
  
  return (
    <div className={styles.message}>
      {loading ? <div style={{margin:'20% 45%'}}>
         <LoadingOutlined style={{ fontSize: 36 }} rev={undefined} /> 
      </div>: <>
           <Card title={message_overview.title} ns='detail'>
        <Content content={message_overview.content} data={data} ns={"detail"} />
          </Card>
          {TransferData && <Card ns='detail'><Content warpClassName={ styles.message_ERC20Trans} content={message_ERC20Trans.content} data={TransferData} ns={"detail"}/></Card>}
      {data&&data.consume_list && <Card title={message_tranf.title} ns='detail'>
       <Table
        dataSource={[...data?.consume_list]}
        columns={message_tranf.columns(tr)}     
      />
          </Card>}
          
      <Card title={message_other.title} ns='detail'>
        <Content content={message_other.content} data={data} ns={"detail"} />
      </Card>
      </>}
   
    </div>
  );
};
