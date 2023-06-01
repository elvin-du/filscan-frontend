import { apiUrl } from "@/contants/apiUrl";
import { postAxios } from "@/store/server";
import { useRouter } from "next/router"
import { useEffect } from "react";

export default () => { 
  const router = useRouter();

    const { id } = router.query;    
    useEffect(() => { 
        if (id) { 

                 postAxios(apiUrl.contract_transferInMessage, { cid: id }).then(
        (res: any) => {
            console.log('=====345',res)
        }
      );
        }
     
    },[id])
    return <div>
            111
    </div>
}