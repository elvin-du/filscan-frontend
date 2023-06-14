/** @format */

import { useEffect } from "react";
import { postAxios } from "@/store/server";
import { apiUrl } from "@/contants/apiUrl";
import Router, { useRouter } from "next/router"
import { getSvgIcon } from "@/svgUtils";
import { LoadingOutlined } from "@ant-design/icons";
import style from './index.module.scss'

export default () => {
    const router  = useRouter()
    const searchValue:any = router.asPath?.split('=')[1];
    
    useEffect(() => { 
        handleSearch(searchValue)
    },[searchValue])



  const handleSearch = (searchValue:string) => { 
    const showInput = searchValue.trim();
    if (searchValue) { 
         postAxios(apiUrl.searchInfo, {
      input:showInput,
    }).then((res:any) => { 
      const type = res?.result?.result_type;
      if (type) {
        if (type === 'owner') {
          //owner 
          Router.push(`/owner/${showInput}`);
        } else if (type === 'address') {
          Router.push(`/address/${showInput}`)
        } else if (type === 'height') {
          Router.push(`/tipset/chain?height=${showInput}`)
        } else if (type === 'message_details') {
          Router.push(`/message/${showInput}`)
        } else if (type === 'miner') {
          Router.push(`/miner/${showInput}`)
        } else if (type === 'block_details') { 
          Router.push(`/tipset/chain?cid=${showInput}`)
        } else {
          Router.push(`/address/${showInput}`)
        }
      } else { 
        //404
         Router.push(`/noResult/${showInput}`)
      }
    
    })
    }
   
  }
    return <div className={ style.wrap_404}>
        <LoadingOutlined style={{fontSize:22}} rev={undefined} />
  </div>    
};


