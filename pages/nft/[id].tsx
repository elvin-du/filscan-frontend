import { nfts_market, overview, nft_tabs, getNftsColumns, fns_overview } from '@/contants/contract';
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
import { getImgUrl } from '@/utils/utils';

interface ActiveItem { 
    label: string,
    value: string,
    url: string,
    total:string
}


export default () => { 
    const router = useRouter();
     const { id } = router.query;
    const { t } = useTranslation();
    const tr = (label: string, value?: Record<string, any>) => {
        if (value) {
        return t(label, { ...value, ns: "contract" });
        }
        return t(label, { ns: "contract" });
    };
    const filscanStore: any = useContext(FilscanState);


    const [active, setActive] = useState<ActiveItem>({
        label: 'transfer', value: 'transfer',url:'FnsTransfers',total:'transfer_total' 
    });
    const [ marketData,setMarket ] = useState({});
    const [overviewData, setOverview] = useState<any>({});

    const [data, setData] = useState<any>({});
    const [loading,setLoading] = useState(false)
    const [current, setCurrent] = useState(1)

    const columns = useMemo(() => { 
        return getNftsColumns( active.value)?.map((t:any) => { 
            return {...t,align:'left', title:tr(t.title)}
        })||[]
       
    },[active,filscanStore?.filscan?.lang])



    const handleChange = (item:any) => { 
        setActive(item);
        setCurrent(1);
        load(item,1)
    }   

    useEffect(() => {
        if (id) { 
        postAxios(apiUrl.contract_FnsSummary, {provider:id}).then(
        (res: any) => {
        setOverview(res?.result || {})
        }
         );
        load(active)
        }
    },[id])


    const load = (active: ActiveItem, index?: number) => {
        setLoading(true)
        const showIndex = index || current;
        const payload = {
            provider: id,
            index: showIndex - 1,
            limit: pageLimit
        };
        postAxios(`${apiUrl.contract_detailList}/${active.url}`, payload).then(
            (res: any) => {
                setLoading(false)
                setData(res?.result || {})
            }
        )
    }
    

    return <div className={styles.contractFt}>
        <div className={styles.contractFt_header}>
            <span className={styles.contractFt_header_title}>
                {overviewData?.token_name && <Image
                    width={40}
                    height={40}
                    className={styles.contractFt_header_title_img}
                    src={overviewData?.token_name} alt='' />} 
                {overviewData?.token_name?.toLocaleUpperCase()}
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
            <Card title={nfts_market?.title }  ns='contract'>
                <Main ns='contract' content={nfts_market?.content} data={overviewData}/>
            </Card> 
        </div>
        <Tabs
            data={nft_tabs}
            ns='contract'
            defaultValue={active.value}
            border
            onChange={handleChange} />
        <Table
            wrapClassName={styles.contractFt_table}
            ns='contract'
            columns={columns}
            total={data?.total || 0}
            total_msg={ active.total }
            loading={ loading}
            dataSource={data?.items||[] }
            current={current}
            onPage={(cur: number) => {
            setCurrent(cur);
            load(active, cur);
          }}
        /> 
    </div>
}