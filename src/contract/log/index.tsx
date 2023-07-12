import { apiUrl } from "@/contants/apiUrl";
import { pageLimit } from "@/contants/varible";
import { postAxios } from "@/store/server";
import { useEffect, useState } from "react";
import Main from '@/packages/main';
import styles from './index.module.scss'
import { contract_log } from "@/contants/contract";
import { Pagination } from "antd";

export default ({ actor_id }: { actor_id?: string }) => { 
    const [data,setData] = useState([])
    const [current, setCurrent] = useState(1);
    const [total,setTotal] = useState(0)
    useEffect(() => { 
        if (actor_id) { 
            load()
        }
           

    }, [actor_id])

    const load = (index?: number) => {
        
             postAxios(apiUrl.contract_verify_logs, {
                 actor_id: actor_id,
                 page: index||current,
                 limit:5
            }).then(
                (res: any) => {
                    setData(res.result.event_list)
                    setTotal(res.result.total_count)

            }
            );
    }
    
    const handleChange = (cur:number) => { 
        setCurrent(cur);
        load(cur)
    }


    return <div className={ styles.contract_event_log}>
        {data.map((ItemData,index:number) => {  
          return <Main key={index} warpClassName={styles.contract_event_log_wrap } content={contract_log} data={ItemData} ns={"contract"} />
        })}
        <Pagination showQuickJumper className={`custom_Pagination ${styles.contract_event_log_pg}`} current={current} total={total} onChange={ handleChange} />
    </div>
}