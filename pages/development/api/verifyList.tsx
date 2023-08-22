import { apiUrl } from "@/contants/apiUrl";
import { postAxios } from "@/store/server";
import { useEffect, useState } from "react"

export default () => { 
    const [data,setData] = useState('')

    useEffect(() => { 
          postAxios(apiUrl.contract_verify_list).then(
              (res: any) => {
                  setData(res.result)
            }
         );
    },[])
    return <div className="default">
        { JSON.stringify(data)}
    </div>
}