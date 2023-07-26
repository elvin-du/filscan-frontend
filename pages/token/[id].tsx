import { ft_market, overview, ft_tabs, getContractColumns } from '@/contants/contract';
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
     const { id,activeTab } = router.query;
    const { t } = useTranslation();
    const tr = (label: string, value?: Record<string, any>) => {
        if (value) {
        return t(label, { ...value, ns: "contract" });
        }
        return t(label, { ns: "contract" });
    };
    const filscanStore: any = useContext(FilscanState);


    const [active, setActive] = useState<ActiveItem>({
        label: 'transfer', value: 'transfer',url:'ERC20Transfer',total:'transfer_total' 
    });
    const [ marketData,setMarket ] = useState({});
    const [overviewData, setOverview] = useState<any>({});
    const [fromList, setFrom] = useState({})
    const [toList, setTo] = useState({})
    const [data, setData] = useState<any>({});
    const [loading,setLoading] = useState(false)
    const [current, setCurrent] = useState(1)
    const columns = useMemo(() => { 
        return getContractColumns( active.value,fromList,toList)?.map((t:any) => { 
            return {...t,align:'left', title:tr(t.title)}
        })||[]
       
    },[active,filscanStore?.filscan?.lang,fromList,toList])



    const handleChange = (item: any) => { 
        router.push({
        pathname: `/token/${id}`,
        query: {activeTab: item.value },
        })
        setActive(item);
        setCurrent(1);
        load(item,1)
    }   

    useEffect(() => {
        if (id) { 
        postAxios(apiUrl.contract_ERC20Summary, {contract_id:id}).then(
        (res: any) => {
        setOverview(res?.result || {})
        }
         );
        postAxios(apiUrl.contract_ERC20Market,{contract_id:id}).then(
            (res: any) => {
                setMarket({...res?.result,tokenName:res?.result.token_name} || {})
        }
        );
            let defaultItem = active;
             if (activeTab !== active.value && typeof activeTab === 'string') {
                 defaultItem = ft_tabs.find((v: any) => v.value === activeTab)
                 setActive(defaultItem)
             }
        load(defaultItem)
        }
    },[id,activeTab])


    const load = (active: ActiveItem, index?: number) => {
        setLoading(true)
        const payload = {
            contract_id: id,
            page: index||current,
            limit: pageLimit
        };
        postAxios(`${apiUrl.contract_detailList}/${active.url}`, payload).then(
            (res: any) => {
                setLoading(false)
                setData(res?.result || {})
                     if (res.result.items.length > 0) { 
                    let formItems = [];
                    let toItems = []
                    if (active.value === 'transfer') {
                        formItems = res.result.items.map((v: any) => v.from);
                        toItems = res.result.items.map((v: any) => v.to);
                    } else if (active.value=== 'owner') { 
                      formItems = res.result.items.map((v: any) => v.owner);
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
                {overviewData?.token_name && <Image
                    width={40}
                    height={40}
                    className={styles.contractFt_header_title_img}
                    src={getImgUrl(overviewData?.token_name)} alt='' />} 
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
            <Card title={overview?.title} ns='contract'>
                 <Main ns='contract' content={overview?.content} data={overviewData }/> 
            </Card>
            <Card title={ft_market?.title }  ns='contract'>
                <Main ns='contract' content={ft_market?.content} data={{...overviewData,...marketData}}/>
            </Card> 
        </div>
        <Tabs
            data={ft_tabs}
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