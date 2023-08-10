/** @format */

import Content from "@/packages/main";
import Card from "@/packages/custom_card";
import { account_change, general_overview ,default_content} from "@/contants/detail";
import AccountChange from '@/components/accountChange'
import { useEffect, useMemo, useState } from "react";
import { postAxios } from "@/store/server";
import { apiUrl } from "@/contants/apiUrl";
import { useRouter } from "next/router";
import Tabs from "@/packages/tabs";
//import List from "@/src/detail/list";
import styles from "../index.module.scss";
import { useTranslation } from "react-i18next";
import { getSvgIcon } from "@/svgUtils";
import { formatNumber, getImgUrl, isIndent, isMobile } from "@/utils/utils";
import ImageWithFallback from '@/packages/image'
import Link from "next/link";
import { getErc20 } from "@/utils/main";
import dynamic from "next/dynamic";
const List = dynamic(() => import('@/src/detail/list'), { ssr: false });


export default  () => {
  const router = useRouter();
  const { address ,activeTab} = router.query;
  const [data, setData] = useState<any>({})
  const [type, setType] = useState('')
  const [interval, setInterval] = useState('24h');
  const [verifyData, setVerifyData] = useState<any>({})
  const [tokenList, setTokenAddress] = useState<any>([]);
  const [erc20,setErc20]= useState<string>('')
  const [domain, setDomain] = useState<any>({})
   const { t } = useTranslation();
   const tr = (label: string, value?: Record<string, any>) => {
    if (value) {
      return t(label, { ...value, ns: "detail" });
    }
    return t(label, { ns: "detail" });
   };
  
  useEffect(() => { 
    //账户概览
    if (address) { 
      setTokenAddress([])
      setDomain({})
      setVerifyData({})
      setType('')
      setData({})
       postAxios(apiUrl.detail_account, { account_id: address }).then(
         (res: any) => {
           const data = res?.result?.account_info || {};
           const mainType = res?.result?.account_type || '';
           const keys = Object.keys(data);
          //  let content: any = []
           let mainKey = '';
           if (keys.length > 0) { 
             mainKey = keys[0];
            //  if (mainKey) { 
            //    content= general_overview_type(mainType,tr)
            //  }

           }
           setType(mainType)
           let baseResult: any = {};
           if (res?.result?.account_info[`account_${mainType}`]) {
             baseResult= res?.result?.account_info[`account_${mainType}`]
           } else { 
              baseResult= res?.result?.account_info
           }
           if (baseResult?.account_basic?.account_id ) { 
              // 已被验证合约
             loadVerify(baseResult?.account_basic?.account_id)

           }
           loadFnsDomain()
           if (typeof address === 'string') { 
             // 增加代币列表
             let showErc20 =''
             if (address.startsWith('0x')) {
               showErc20 = address
             } else if (baseResult?.account_basic?.eth_address?.startsWith('0x')) {
               showErc20 = baseResult?.account_basic?.eth_address
             } else { 
                showErc20 = baseResult.account_basic?.account_id
             }
             loadERC20TokenList(showErc20);
             if (getErc20(mainType) && showErc20) {
                setErc20(showErc20)
              }
           }
           setData(baseResult);
         
        }
      );
    }
    

  }, [address])

  //合约
  const loadVerify = (id:string) => { 
            postAxios(apiUrl.contract_verify_des, {
            input_address:id
            }).then(
              (res: any) => {
                if (res?.result?.compiled_file) { 
                   setVerifyData({ ...res?.result?.compiled_file || {},source_file:res?.result?.source_file || []});
                }
                 
            }
            );
  }

  const loadERC20TokenList = (id:string) => { 
        postAxios(apiUrl.contract_ERC20TokenList, {
            address:id
            }).then(
              (res: any) => {
                if (res?.result?.items) { 
                  const obj:any = {
                    label: `$${formatNumber(res.result.total_value,4)} (${res.result.total} Tokens)`,
                    value: `$${res.result.total_value} (${res.result.total})`
                  }
                  const items:any = [];
                  res?.result?.items.forEach((t: any) => { 
                    if (t.amount) { 
                      const obj = {
                      ...t,
                      key:t.contract_id,
                      value:t.contract_id,
                      label: <div className={styles.general_erc20List}>
                          <ImageWithFallback src={getImgUrl(t.token_name)} alt='' className={styles.general_erc20List_logo} width={45} height={45} />
                          <div className={styles.general_erc20List_content}>
                               <div className={styles.general_erc20List_name}>
                              <span>{t.token_name}</span>
                              <span> {"$"+ formatNumber(t.value,4) }</span>
                              </div>
                              <div>
                              <span>{formatNumber(t.amount, 4)}</span>
                            </div>
                          </div>
                         
                      </div>
                    }
                    items.push(obj)
                    }
               
                  })
                  setTokenAddress([obj,...items])
                }
                 
            }
        );
    
    
    
    //erc20 trans
     
  }

 

  const loadFnsDomain = () => {
    postAxios(`${apiUrl.contract_fnsUrl}`, {addresses:[address]}).then(
      (res: any) => {
         setDomain(res.result)
         }
        )
    }


  const options = useMemo(() => {
    let defaultOpt: any = [...general_overview.message_list];
     if (erc20) { 
       defaultOpt = [...defaultOpt, {
         label: 'erc20_transfer',
         show_active:'erc20',
         value:'ERC20AddrTransfers'
       }, ]
    }
    if (verifyData && Object.keys(verifyData).length > 0) { 
      if (verifyData.source_file && Object.keys(verifyData.source_file).length > 0) {
        // 已被验证合约
        defaultOpt = [...defaultOpt, {
          label: () => <span className="flex-center">
            <span className="success_color"> {getSvgIcon('successIcon')} </span>
            {tr('contract_verify')}
          </span>
          ,show_active:'verify', value: `verify_${data?.account_basic?.account_id}`
        }]

      } else { 
        //未验证合约
        defaultOpt = [...defaultOpt, {
          label: () => <span className="flex-center">
            {/* <span className="success_color"> {getSvgIcon('successIcon')} </span> */}
            {tr('contract_verify')}
          </span>
          , show_active:'verify',value: `verify_${data?.account_basic?.account_id}`
        }]
      }
      defaultOpt = [...defaultOpt, {
        label: 'event_log',
        value: 'event_log',
        show_active:'event_log'
      }]
    }
   

    return defaultOpt

  }, [verifyData,erc20])
  
  return <div className={styles.general}>
    <Card
      header={ 
        <div className={styles.general_title}>
        {typeof address === 'string' ? tr(type === 'evm' ? 'showContract' : 'showAddress', { value: isMobile()? isIndent(address,8):address }) : ''}
          {typeof address === 'string' && domain?.domains && domain?.domains[address] && <Link className="link" href={`/domain/${domain?.domains[address]}?provider=${domain.provider}`}>({ domain?.domains[address]})</Link> }
        </div>
      }
      ns='detail'>
      <Content content={default_content} itemSplit  data={{...data,tokenList:tokenList}} ns={"detail"} />
    </Card>
     <Card title={account_change.title.label} bgColor ns='detail' className={styles.general_accountChange} headerRight={
          <Tabs
            data={general_overview.options}
            ns='detail'
            className="tabs-right"
            defaultValue={interval}
            border={true}
            onChange={(value: any) => { 
              setInterval(value.value)
            }}
          />}>
        <AccountChange address={address} type={type} list={general_overview.list} interval={interval}/>
    </Card> 
    <List
      account_id={address}
      // activeTab={ activeTab}
      actor_id={data?.account_basic?.evm_contract?.actor_id}
      erc20={ erc20}
      ootions={options}
      verifyData={verifyData} />
  </div>
};

