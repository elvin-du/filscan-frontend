/** @format */
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { message_event_log, message_list, message_overview_detail,message_overview_log,message_overview_trade } from "@/contants/detail";
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
  const [TransferData, setTransfer] = useState<any>(undefined);
  const [active, setActive] = useState('detail');
  const [contentLoading, setContentLoad] = useState(false);
  const [show_cid, setCid] = useState('');
  const [trade, setTrade] = useState([]);
  const [event, setEvent] = useState([])
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


  const loadTrans = (id: string) => {
    postAxios(apiUrl.contract_transferInMessage, { cid: id }).then(
      (res: any) => {
        setTransfer(res.result.items || [])
      }
    );
  }

  const load = (type: string) => {
    if (type === 'event_log' && show_cid) {
      setContentLoad(true)
      postAxios(apiUrl.detail_message_event, { cid: show_cid }).then(
        (res: any) => {
          setContentLoad(false)
          setEvent(res?.result?.logs || [])
        }
      );
    } else if (type === 'trade' && show_cid) { 
      setContentLoad(true)
      postAxios(apiUrl.detail_message_trans, { cid: show_cid }).then(
        (res: any) => {
          setContentLoad(false)
          setTrade(res?.result?.internal_transfers || [])
        }
      );
    }

  }

  const handleChange = (item: any) => {
    setActive(item.value);
    load(item.value);
  }
  
  



  const renderItem = () => { 
    if (contentLoading) { 
      return <div className={styles.message_content_loading}>
        <LoadingOutlined style={{ fontSize: 16 }} rev={undefined} /> 
      </div>
    }
    if (active === 'event_log') {
      return <div className={styles.message_event_log}>
        {event.map((itemData,index) => { 
          return <Content key={ index} content={message_event_log} data={itemData} ns={"detail"} />
        })}
      </div>
       
    } else if (active === 'trade') { 
      return <Table
                dataSource={[...trade]}
        columns={message_overview_trade.map(v => { return {...v,title:tr(v.title)}})}
              loading={contentLoading} 
      />
    }
    return <Content content={message_overview_detail.content} data={{...data,message_ERC20Trans:TransferData}} ns={"detail"} />
  }


  return (
    <div className={styles.message}>
      {loading ? <div style={{margin:'20% 45%'}}>
         <LoadingOutlined style={{ fontSize: 36 }} rev={undefined} /> 
      </div> : <>
          <Card title={message_overview_detail.title} ns='detail'>
            <div>
              <Tabs className={styles.message_tab} data={message_list.tabs} defaultValue={active} ns='detail' border onChange={(item) => { handleChange(item) }} />
              {renderItem()}
            </div>     
          </Card>
      </>}
   
    </div>
  );
};
