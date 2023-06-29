import { apiUrl } from "@/contants/apiUrl";
import { contract_rank } from "@/contants/contract";
import { pageLimit } from "@/contants/varible";
import { postAxios } from "@/store/server";
import { useContext, useEffect, useMemo, useState } from "react"
import Card from '@/packages/custom_card';
import Table from '@/packages/newTable'
import Tabs from "@/packages/tabs";
import { useTranslation } from "react-i18next";
import style from '../index.module.scss'
import FilscanState from "@/store/content";

export default () => { 
      const filscanStore: any = useContext(FilscanState);
    const { t } = useTranslation();
    const tr = (label: string, value?: Record<string, any>) => {
    if (value) {
    return t(label, { ...value, ns: "contract" });
    }
     return t(label, { ns: "contract" });
    };

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>({});
    const [cur, setCur] = useState(1);
    const [active,setActive]= useState('transfer_count');
  
    
    useEffect(() => {
            load()
    }, [])
    

    const load = (current?:number,activekey?:string) => {
        const index = current || cur;
        const sort = activekey || active
         postAxios(apiUrl.contract_rank, {
            page:index-1,
             limit: pageLimit,
            sort
            }).then(
                (res: any) => {
                    setLoading(false)
                    setData(res?.result || []);
            }
         );
       
    }

    const columns = useMemo(() => { 
        return contract_rank.columns.map(v => {
            return {...v, title:tr(v.title)}
        })
    },[filscanStore?.filscan?.lang])
    
    return <Card title={contract_rank.title} ns='contract' headerRight={
        <Tabs
            defaultValue={active}
            className={style.contract_rank_tabs}
            data={contract_rank.options}
            border
            ns='contract'
            onChange={(item: any) => { 
                setActive(item.value)
                setCur(1),
                load(0,item.value)
        }}/>
    }>
        <Table
            ns='contract'
            total_msg={ contract_rank.total_msg}
            dataSource={data?.evm_contract_list || []}
            loading={ loading}
            columns={columns}
            current={ cur}
            total={data?.total}
             rowKey={(record: any,) => { 
                return `${record.actor_id}_${record.actor_address}`
                }}
             onPage={(cur: number) => {
            setCur(cur);
            load( cur);
          }}
        />
    </Card>
}