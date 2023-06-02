/** @format */
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { message_list, message_overview_detail,message_overview_trade } from "@/contants/detail";
import { apiUrl } from "@/contants/apiUrl";
import { postAxios } from "@/store/server";
import Table from '@/packages/table';
import { useEffect, useMemo, useState } from "react";
import {LoadingOutlined } from '@ant-design/icons'
import Card from "@/packages/card";
import Content from "@/packages/content";
import styles from "../index.module.scss";
import Tabs from '@/packages/tabs/';


export default () => {
  const router = useRouter();
  const { cid } = router.query;
  const { t } = useTranslation();
  const tr = (label: string): string => {
    return t(label, { ns: "detail" });
  };

  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [TransferData,setTransfer]= useState<any>(undefined);
  const [active,setActive] = useState('detail');
  const [trade_loading, setTradeLoad] = useState(false);
  const [show_cid, setCid] = useState('');
  const [trade,setTrade] = useState([]);
  useEffect(() => { 
    if (cid) {
      postAxios(apiUrl.detail_message, { message_cid: cid }).then(
        (res: any) => {
          setLoading(false)
          if (res?.result?.MessageDetails?.eth_message && res?.result?.MessageDetails?.message_basic?.cid) { 
            loadTrans(res?.result?.MessageDetails?.message_basic?.cid)
            setCid(res?.result?.MessageDetails?.message_basic?.cid)
          }
          setData(res?.result?.MessageDetails || {});
        
        }
      );
    }
  }, [cid]);


  const loadTrans = (id:string) => { 
       postAxios(apiUrl.contract_transferInMessage, { cid: id }).then(
         (res: any) => {
           setTransfer(res.result.items||[])
        }
      );
  }

  const load = (type: string) => { 
    if (type === 'trade' && show_cid) { 
      setTradeLoad(true)
        postAxios(apiUrl.detail_message_event, { cid: show_cid }).then(
         (res: any) => {
           setTrade(res.result.items||[])
        }
      );
    }

  }

  const handleChange = (item:any) => { 
    setActive(item.value);
    load(item.value);
  }
  

  const showData = useMemo(() => { 

    if (active === 'trade') {
      return message_overview_trade
    } else if (active === 'event_log') { 
        return message_overview_detail
    }
    return message_overview_detail
  },[active])

  return (
    <div className={styles.message}>
      {loading ? <div style={{margin:'20% 45%'}}>
         <LoadingOutlined style={{ fontSize: 36 }} rev={undefined} /> 
      </div> : <>
          <Card title={message_overview_detail.title} ns='detail'>
            <div>
              <Tabs className={styles.message_tab} data={message_list.tabs} defaultValue={active} ns='detail' border onChange={(item) => { handleChange(item) }} />
              {active === 'trade' ? <Table
                dataSource={[...data]}
                columns={showData}
                loading={trade_loading}
       /> : <Content content={message_overview_detail.content} data={{...data,message_ERC20Trans:TransferData}} ns={"detail"} />}
           
            </div>
                      
          </Card>
          {/* {TransferData&& TransferData.length > 0 && <Card ns='detail' className={styles.message_card} ><Content warpClassName={ styles.message_ERC20Trans} content={message_ERC20Trans.content} data={TransferData} ns={"detail"}/></Card>} */}
          {/* {data && data.consume_list && <Card className={styles.message_card}  ns='detail'>
            <Content warpClassName={ styles.message_ERC20Trans} content={message_tranf.content} data={data.consume_list} ns={"detail"}/>
          </Card>} */}
          
      {/* <Card title={message_other.title} ns='detail'>
        <Content content={message_other.content} data={data} ns={"detail"} />
      </Card> */}
      </>}
   
    </div>
  );
};
