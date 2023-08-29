import { nfts_market, getNftsColumns, fns_overview, nft_tabs } from '@/contants/contract';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect, useMemo, useState } from 'react';
import Image from 'next/image'
import styles from './index.module.scss';
import Card from '@/packages/card'
import Main from '@/packages/main';
import Tabs from '@/packages/tabs';
import Table from '@/packages/newTable';
import { useRouter } from 'next/router';
import { postAxios } from '@/store/server';
import { apiUrl } from '@/contants/apiUrl';
import { pageLimit } from '@/contants/varible';
import FilscanState from '@/store/content';
import { getSvgIcon } from '@/svgUtils';

interface ActiveItem {
    label: string,
    value: string,
    url: string,
    total:string
}

//        label: 'transfer', value: 'transfer',url:'FnsTransfers',total:'transfer_total'

export default () => {
  const router = useRouter();
  const { id ,active} = router.query;
  const { t } = useTranslation();
  const tr = (label: string, value?: Record<string, any>) => {
    if (value) {
      return t(label, { ...value, ns: "contract" });
    }
    return t(label, { ns: "contract" });
  };
  const filscanStore: any = useContext(FilscanState);

  const [activeValue, setActive] = useState<string>('transfer');
  // const [ marketData,setMarket ] = useState({});
  const [overviewData, setOverview] = useState<any>({});

  const [data, setData] = useState<any>({});
  const [loading,setLoading] = useState(false)
  const [current, setCurrent] = useState(1)
  const [fromList, setFrom] = useState({})
  const [toList, setTo] = useState({})

  const columns = useMemo(() => {
    return getNftsColumns(activeValue,fromList,toList)?.map((t:any) => {
      return {...t,align:'left', title:tr(t.title)}
    })||[]

  },[activeValue,filscanStore?.filscan?.lang,toList,fromList])

  const handleChange = (item: any) => {
    router.push(
      {
        pathname: `/nft/${id}`,
        query: {active: item.value },
      },undefined,{ shallow: true })
    setActive(item.value);
    setFrom({});
    setTo({})
    setCurrent(1);
    load(item.value,1)
  }

  useEffect(() => {
    if (id) {
      let active_default:string = activeValue;
      setFrom({});
      setTo({})
      setCurrent(1);
      postAxios(apiUrl.contract_FnsSummary, {contract:id}).then(
        (res: any) => {
          setOverview(res?.result || {})
          if (activeValue && activeValue!== active&& typeof active === 'string') {
            setActive(active);
            active_default=active
          } else if (!active) {
            active_default='transfer'
            setActive('transfer')
          }
          load(active_default,1,res?.result.token_name)
        }
      );
    }
  }, [id,active])

  const activeItem = useMemo(() => {
    const item = nft_tabs.find((v: any) => v.value === activeValue);

    return item
  },[activeValue])

  const load = (active_value: string, index?: number,token_name?:string) => {
    setLoading(true)
    const show_token = token_name || overviewData?.token_name
    const showIndex = index || current;
    const payload = {
      contract:id,
      provider: id,
      index: showIndex - 1,
      limit: pageLimit
    };
    const active_Item = nft_tabs.find((v: any) => v.value === active_value);
    postAxios(`${apiUrl.contract_detailList}/${active_Item.url}`, payload).then(
      (res: any) => {
        setLoading(false)
        setData(res?.result || {});
        if (res?.result?.items?.length > 0 && show_token === 'FNS DAO') {
          let formItems = [];
          let toItems = []
          if (active_value === 'transfer') {
            formItems = res.result.items.map((v: any) => v.from);
            toItems = res.result.items.map((v: any) => v.to);
          } else if (active_value === 'owner') {
            formItems = res.result.items.map((v: any) => v.controller);
          }
          loadFnsUrl(formItems, 'form');
          loadFnsUrl(toItems,'to')
        }
      }
    )
  }

  const loadFnsUrl = (items: Array<any>, type: string) => {
    if (items.length > 0) {
      postAxios(`${apiUrl.contract_fnsUrl}`, {addresses:items}).then(
        (res: any) => {
          if (type === 'form') {
            setFrom(res?.result)
          } else {
            setTo(res?.result)
          }
        }
      )
    }

  }

  return <div className={styles.contractFt}>
    <div className={styles.contractFt_header}>
      <span className={styles.contractFt_header_title}>
        {overviewData?.logo && <Image
          width={40}
          height={40}
          className={styles.contractFt_header_title_img}
          src={overviewData?.logo} alt='' />}
        {overviewData?.token_name||''}
      </span>
      <span className={styles.contractFt_header_link}>
        {overviewData?.twitter_link && <span className={styles.contractFt_header_link_icon} onClick={() => {
          window.open(overviewData.twitter_link)
        }}>{ getSvgIcon('twitter')}</span>}
        {overviewData?.main_site && <span className={styles.contractFt_header_link_icon} onClick={() => {
          window.open(overviewData.main_site) }}>{ getSvgIcon('network')}</span> }

      </span>

    </div>
    <div className={styles.contractFt_over}>
      <Card title={fns_overview?.title} ns='contract'>
        <Main ns='contract' content={fns_overview?.content} data={overviewData }/>
      </Card>
      <Card title={nfts_market?.title } ns='contract'>
        <Main ns='contract' content={nfts_market?.content} data={overviewData}/>
      </Card>
    </div>
    <Tabs
      data={nft_tabs}
      ns='contract'
      defaultValue={activeValue}
      border
      onChange={handleChange} />
    <Table
      wrapClassName={styles.contractFt_table}
      ns='contract'
      columns={columns}
      total={data?.total || 0}
      total_msg={ activeItem?.total }
      loading={ loading}
      dataSource={data?.items||[] }
      current={current}
      onPage={(cur: number) => {
        setCurrent(cur);
        load(activeValue, cur);
      }}
    />
  </div>
}