/** @format */
import Router,{useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { message_event_log, message_list, message_overview_detail,message_overview_trade } from "@/contants/detail";
import { apiUrl } from "@/contants/apiUrl";
import { postAxios } from "@/store/server";
import Table from '@/packages/table';
import { useEffect, useMemo, useState } from "react";
import {LoadingOutlined } from '@ant-design/icons'
import Card from "@/packages/card";
import Main from '@/packages/main'
import styles from "./index.module.scss";
import Tabs from '@/packages/tabs/';
import NoData from '@/packages/noData';
import { Skeleton } from "antd";

export default ({ cid }: {cid:string|string[]}) => {
  const { t } = useTranslation();
  const tr = (label: string): string => {
    return t(label, { ns: "detail" });
  };

  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [TransferData, setTransfer] = useState<any>(undefined);
  const [TransferNFTData, setTransferNft] = useState<any>(undefined);
  const [active, setActive] = useState('detail');
  const [contentLoading, setContentLoad] = useState(false);
  const [show_cid, setCid] = useState('');
  const [trade, setTrade] = useState([]);
  const [event, setEvent] = useState([]);
  const [isF4, setIsF4] = useState(false);
  const [swap, setSwap] = useState();

  useEffect(() => {
    if (cid) {
      postAxios(apiUrl.detail_message, { message_cid: cid }).then(
        (res: any) => {
          setLoading(false)
          if (res?.result?.MessageDetails?.eth_message && res?.result?.MessageDetails?.message_basic?.cid) {
            loadTrans(res?.result?.MessageDetails?.message_basic?.cid)
            setCid(res?.result?.MessageDetails?.message_basic?.cid)
            setIsF4(res?.result?.MessageDetails?.message_basic?.to.startsWith('f4'))
          }
          // if (!res?.result?.MessageDetails) {
          //   //return Router.push('/404')
          // }
          setData(res?.result?.MessageDetails || {});

        }
      );
    }
  }, [cid]);

  const loadTrans = (id: string) => {
    postAxios(apiUrl.contract_transferInMessage, { cid: id }).then(
      (res: any) => {
        setTransfer(res?.result?.items || [])
      }
    );
    postAxios(apiUrl.contract_transferInMessageNft, { cid: id }).then(
      (res: any) => {
        setTransferNft(res?.result?.items || [])
      }
    );

    postAxios(apiUrl.contract_swap, { cid: id }).then(
      (res: any) => {
        setSwap(res?.result?.swap_info )
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
      return <div>
        <Skeleton active />
        <Skeleton active />
      </div>
      // return <div className={styles.message_content_loading}>

      //  {/* // <LoadingOutlined style={{ fontSize: 16 }} rev={undefined} />  */}
      // </div>
    }
    if (active === 'event_log') {
      if (!contentLoading &&event.length === 0) {
        return <NoData />
      }
      return <div className={styles.message_event_log}>
        {event.map((itemData,index) => {
          return <Main key={index} warpClassName={styles.message_event_log_wrap } content={message_event_log} data={itemData} ns={"detail"} />
        })}

      </div>

    } else if (active === 'trade') {
      if (!contentLoading && trade.length === 0) {
        return <NoData />
      }
      return <Card ns='detail'>
        <Table
          className="custom-table"
          dataSource={[...trade]}
          columns={message_overview_trade.map(v => { return {...v,title:tr(v.title)}})}
          loading={contentLoading}
        />
      </Card>

    }
    const pending = data?.message_basic?.exit_code.startsWith('Pend')
    return <div className={styles.message_content}>
      {message_overview_detail.content.map((itemContent: any, index: number) => {
        if (pending && index === 1) {
          return null
        }
        return <Main key={index} content={itemContent} data={{...data,message_ERC20Trans:TransferData,swap_info:swap,nftTrans:TransferNFTData}} ns={"detail"} />
      })}
    </div>
  }

  if (!loading && !data || !loading && Object.keys(data).length === 0) {
    return <NoData />
  }

  return (
    <div className={styles.message}>
      {loading ? <div style={{ margin: '5% 0%' }}>
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
      </div>
        : <>
          <h3 className={styles.message_title}>{tr(message_overview_detail?.title?.label)}</h3>
          { isF4 && <Tabs className={styles.message_tab} data={message_list.tabs} defaultValue={active} ns='detail' border onChange={(item) => { handleChange(item) }} /> }

          {renderItem()}

        </>}

    </div>
  );
};
