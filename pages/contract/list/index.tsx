import { apiUrl } from "@/contants/apiUrl";
import { pageLimit } from "@/contants/varible";
import { postAxios } from "@/store/server";
import { useEffect, useState } from "react"

export default () => { 
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
    

    return <div>
        合约列表
    </div>
}