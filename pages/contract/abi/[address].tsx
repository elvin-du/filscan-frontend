import { apiUrl } from "@/contants/apiUrl";
import { postAxios } from "@/store/server";
import { Button } from "antd";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import Copy from '@/components/copy';
import ReactJson from 'react18-json-view'
import 'react18-json-view/src/style.css'
import style from './index.module.scss'


export default () => { 
const router = useRouter();

  const [address,format]:any = useMemo(() => { 
      const address_a = router.query?.address || '';
      const format_a = router.query?.format ||''
    return [address_a,format_a]
  }, [router.query])
    
    const [data,setData]= useState('')
    useEffect(() => { 

        if (address) { 
            postAxios(apiUrl.contract_verify_des, {
            input_address:address
            }).then(
                (res: any) => {
                setData(res?.result?.compiled_file?.ABI || '');
            }
        );
        }

    },[address])

    return <>
        <Button className="active_btn flex-center">
            Copy
            <Copy text={format === 'json' ? data: '"'+ data + '"'} />
        </Button>
        <div className={ style.detail_wrap}>
          {format === 'json' && data && <ReactJson collapseStringsAfterLength={ 1000000} collapseObjectsAfterLength={ 100000} enableClipboard={ false} src={JSON.parse(data)}/>}
            {format === 'text' && data && <div  className={ style.detail_wrap_text}>{'"'+ data + '"'}</div>}

        </div>
       
    </>
}