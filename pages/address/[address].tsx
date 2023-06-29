/** @format */

import Content from "@/packages/content";
import Card from "@/packages/card";
import { account_change, general_overview, general_overview_type } from "@/contants/detail";
import AccountChange from '@/components/accountChange'
import { useEffect, useMemo, useState } from "react";
import { postAxios } from "@/store/server";
import { apiUrl } from "@/contants/apiUrl";
import { useRouter } from "next/router";
import Tabs from "@/packages/tabs";
import List from "@/src/detail/list";
import styles from "../index.module.scss";
import { useTranslation } from "react-i18next";
import { getSvgIcon } from "@/svgUtils";
import { formatNumber, getImgUrl } from "@/utils/utils";
import Image from 'next/image'

export default  () => {
  const router = useRouter();
  const { address } = router.query;
  const [data, setData] = useState<any>({})
  const [content, setContent] = useState([])
  const [type, setType] = useState('')
  const [interval, setInterval] = useState('24h');
  const [verifyData, setVerifyData] = useState<any>({})
  const [tokenList,setTokenAddress]= useState<any>([])
   const { t } = useTranslation();
  const tr = (label: string): string => {
    return t(label, { ns: "detail" });

    //f02014853
  };
  useEffect(() => { 
    //账户概览
    if (address) { 
       postAxios(apiUrl.detail_account, { account_id: address }).then(
         (res: any) => {
           const data = res?.result?.account_info || {};
           const mainType = res?.result?.account_type || '';
           const keys = Object.keys(data);
           let content: any = []
           let mainKey = '';
           if (keys.length > 0) { 
             mainKey = keys[0];
             if (mainKey) { 
               content= general_overview_type(mainType,tr)
             }

           }
           setType(mainType)
           let baseResult:any = {};
           if (res?.result?.account_info[`account_${mainType}`]) {
             baseResult= res?.result?.account_info[`account_${mainType}`]
           } else { 
              baseResult= res?.result?.account_info
           }
             if (baseResult?.account_basic?.account_id ) { 
              // 已被验证合约
                loadVerify(baseResult?.account_basic?.account_id)
        }
           if (baseResult.account_basic?.eth_address) { 
              // 增加代币列表
           
             loadERC20TokenList(baseResult.account_basic?.eth_address)
           }
            setContent(content)
           setData(baseResult);
         
        }
      );
    }
    

  }, [address])

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
                  const items = res?.result?.items.map((t:any) => { 
                    return {
                      ...t,
                      key:t.contract_id,
                      value:t.contract_id,
                      label: <div className={styles.general_erc20List}>
                          <Image src={getImgUrl(t.token_name)} alt='' width={45} height={45} />
                          <div className={styles.general_erc20List_content}>
                               <div className={styles.general_erc20List_name}>
                              <span>{t.token_name}</span>
                              <span> {"$"+ formatNumber(t.value,4) }</span>
                              </div>
                              <div>
                              <span>{formatNumber(t.amount, 4)}</span>
                              <span>{ formatNumber(t.amount,4)}</span>
                            </div>
                          </div>
                         
                        </div>}
                  })
                  setTokenAddress([obj,...items])
                }
                 
            }
        );
  }




  const options = useMemo(() => {
    let defaultOpt:any = [...general_overview.message_list];
    if (verifyData && Object.keys(verifyData).length > 0) { 
      // 已被验证合约
      defaultOpt= [...defaultOpt, {
        label: () => <span className="flex-center">
          <span className="success_color"> { getSvgIcon('successIcon')} </span>
          
          {tr('contract_verify')}
        </span>
        , value:`verify_${data?.account_basic?.account_id}`
      }]
    }
    return defaultOpt

  }, [verifyData])
  
  
  return <div className={styles.general}>
       <Card title={general_overview.title} ns='detail'>
      <Content content={content} data={{...data,tokenList:tokenList}} ns={"detail"} />
    </Card>
     <Card title={account_change.title} ns='detail' className="h-full" header={
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
    <List account_id={address} ootions={options} verifyData={verifyData} />
  </div>
};
