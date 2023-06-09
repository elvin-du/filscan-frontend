import { token } from "@/contants/contract";
import { useTranslation } from "react-i18next";
import Table from '@/packages/newTable';
import { useContext, useEffect, useMemo, useState } from "react";
import { postAxios } from "@/store/server";
import { apiUrl } from "@/contants/apiUrl";
import style from './index.module.scss';
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
    const [data,setData]= useState([]);
    useEffect(() => {
        load()
    }, []);


    const load = () => { 
        setLoading(true)
        postAxios(apiUrl.contract_ERC20List).then(
            (res: any) => {
                setLoading(false)
            //console.log('====3',res)
                setData(res?.result?.items || []);
        }
      );
    }
    
    const columns = useMemo(() => { 
        return token.columns.map(v => { 
            return {...v,align:'center', title:tr(v.title)}
        })
    },[filscanStore?.filscan?.lang])
    
    return <div className={ style.token}>
        <div className={ style.token_header}>{tr(token.title)}</div>  
        <Table
            className={ style.token_table}
             columns={columns}
            loading={loading}
          dataSource={data }
     
        /> 
    </div>
}