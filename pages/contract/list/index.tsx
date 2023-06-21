import { apiUrl } from "@/contants/apiUrl";
import { contract_list } from "@/contants/contract";
import { pageLimit } from "@/contants/varible";
import { postAxios } from "@/store/server";
import { useEffect, useMemo, useState } from "react"
import Card from '@/packages/custom_card';
import Table from '@/packages/newTable'
import { useTranslation } from "react-i18next";

export default () => { 
    const { t } = useTranslation();
    const tr = (label: string, value?: Record<string, any>) => {
    if (value) {
    return t(label, { ...value, ns: "contract" });
    }
     return t(label, { ns: "contract" });
    };

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [cur, setCur] = useState(0);
  
    
    useEffect(() => {
            load()
    }, [])
    

    const load = (current?:number) => {
        const index = current || cur
         postAxios(apiUrl.contract_verify_list, {
            index,
            limit:pageLimit
            }).then(
                (res: any) => {
                    setLoading(false)
                    setData(res?.result?.items || []);
            }
         );
           postAxios(apiUrl.contract_verify_des, {
            input_address:'f02104792'
            }).then(
                (res: any) => {
                    setLoading(false)
                    setData(res?.result?.items || []);
            }
        );
    }

    const columns = useMemo(() => { 
        return contract_list.columns.map(v => {
            return {...v,title:tr(v.title)}
        })
    },[])
    

    return <Card title={contract_list.title } ns='contract'>
        <Table dataSource={data}
            loading={ loading}
            columns={contract_list.columns}
        />
    </Card>
}