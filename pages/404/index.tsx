/** @format */

import { useEffect, useState } from "react";
import { postAxios } from "@/store/server";
import { apiUrl } from "@/contants/apiUrl";
import Router, { useRouter } from "next/router"
import Loading  from '@/components/loading'
import style from './index.module.scss'
import Image from 'next/image'
import noImg from '@/assets/images/404.png'
import { Button } from "antd";

export default () => {
  const router = useRouter();
  let searchValue = router.asPath?.split('=')[1]
    const [show404,setShow_404] = useState(false)
    
  useEffect(() => { 
<<<<<<< Updated upstream
     searchValue = router.asPath?.split('=')[1]
    if (searchValue) {
      handleSearch(searchValue)
    } else { 
        setShow_404(true)
    }  
    },[router])
=======
    searchValue = router.asPath?.split('=')[1];
    console.log('====333',searchValue)
    if (searchValue) {
      handleSearch(searchValue)
    } else { 
     setShow_404(true)
    }
    },[])
>>>>>>> Stashed changes


  const handleSearch = (searchValue:string) => { 
    const showInput = searchValue.trim();
    if (searchValue) { 
<<<<<<< Updated upstream
        postAxios(apiUrl.searchInfo, {
=======
      postAxios(apiUrl.searchInfo, {
>>>>>>> Stashed changes
      input:showInput,
      }).then((res: any) => {
      setShow_404(true)
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
    
    if (searchValue || !show404) { 
        return <Loading />
    }

    return <div className={ style.wrap_404}>
        <Image className={style.wrap_404_img} src={noImg} alt='' />
        <Button className="active_btn" onClick={() => { 
              Router.push(`/home`);
        }}>Back Home</Button>
    </div>  
     
};


