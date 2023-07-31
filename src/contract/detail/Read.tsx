import Wallet from "@/components/wallet"
import { getValueDivide } from "@/utils/utils";
import { EnterOutlined } from "@ant-design/icons"
import { Button, Input } from "antd"
import { useContext, useEffect, useMemo, useState } from "react"
import Web3 from 'web3';
import style from './index.module.scss'
import Show from './show'
import WalletStore, { addNetwork, getNetWork } from "@/store/wallet";


const web3 = new Web3(window.ethereum);

export default ({ id, verifyData,type }: { id?: string | string[], verifyData?: Record<string, any>,type:string }) => {
  const { wallet, setWallet } = useContext<any>(WalletStore);

    const [showValue, setShowValue] = useState<Record<string, any>>({})
    const [result, setResult] = useState<Record<string, any>>({})
    

    useEffect(() => { 
        setResult({});
        setShowValue({})
    },[id])

    const abiData = useMemo(() => { 
        if (verifyData) { 
            return JSON.parse(verifyData.ABI).filter((v: any) => { 
                if (type === 'view') { 
                   return v?.stateMutability === 'view' && v.name && v.type !== 'event'
                }
                return v?.stateMutability !== 'view' && v.name &&  v.type !== 'event'
            })
        }
       
    }, [verifyData,type])

    const contract:any = useMemo(() => {
          if (verifyData) { 
            return new web3.eth.Contract(JSON.parse(verifyData.ABI), verifyData.contract_address);

        }
           
    }, [verifyData])
        
    const handleQuery = async (name: string, payloadKey: string[]) => { 
        const network = await getNetWork();
        if (!network) {
            const add_net = await addNetwork();
            if (add_net) {
                handleChange(name, payloadKey)
            }
        } else { 
             handleChange(name, payloadKey)
        }
      
    }

    const handleChange = async (name: string, payloadKey: string[]) => { 
        const [abiName, inputName] = name.split('/');
        const show_payload = payloadKey.map(payload => showValue[payload])
        let res:any;
        if (type === 'view') {
            res = await contract.methods[abiName](...show_payload).call();
        } else { 
            const res1 = await contract.methods[abiName](...show_payload).send({
                 from: wallet.account,
            });
            res = !!res1
        }
        setResult({
            ...result, [abiName]: {
                showLabel: abiName,
                value:String(res)
        }})
    }

  

    return <div className={style.abi_content}>
        <div className={style.abi_content_wallet}>
            <Wallet />
            <span className={style.abi_content_reset} onClick={()=>setShowValue({})}>Reset</span> 
        </div>
        
        {
            abiData.map((abi: any, index: number) => { 
              const payloadKey:string[]=[]
            return <div className={style.abi_content_item} key={index} >
                <Show title={`${index + 1}. ${abi?.name}`}>
                    <>
                        {abi?.inputs?.length > 0 &&
                        <div>
                        {abi.inputs.map((item_input: any, index: number) => { 
                        payloadKey.push(`${abi?.name}/${item_input.name}`)
                        return <div className={ style.abi_content_item_content}>
                            <span className={ style.abi_content_item_content_name}>
                                {item_input?.name} ({ item_input?.type})
                            </span>
                            <Input className={style.abi_content_item_content_input}
                                placeholder={`${item_input?.name} (${ item_input?.type})`}
                                value={showValue[`${abi?.name}/${item_input.name}`] }
                                onChange={(e: any) => {
                                const value =item_input?.type?.startsWith('uint')? Number(e.target.value): e.target.value;
                                setShowValue({...showValue,[`${abi?.name}/${item_input.name}`]:value})
                            }} />
                            {index === abi.inputs.length - 1 && <Button className="custom_border_btn" onClick={() => handleQuery(`${abi?.name}/${item_input.name}`, payloadKey)}>{type === 'view'?"Query":'Write'}</Button> }                           
                        </div>
                        })}      
                         </div>}
                         {abi?.outputs?.length > 0 && type === 'view' && <div>
                            {abi.outputs.map((item_output:any) => { 
                                return <div className={style.abi_content_item_content} style={{paddingTop:abi?.inputs?.length > 0? '0px':''}}>
                                    {abi?.inputs?.length > 0 && <EnterOutlined className={style.abi_content_item_content_icon} rev={undefined} />}
                                     <span className={ style.abi_content_item_content_name}>
                                    {item_output?.name}
                                     <span className={ style.abi_content_item_content_name_des}> ({ item_output?.type})</span>
                                    </span>
                                
                            </div>
                            })}
                              {result[abi.name] && <div  className={style.abi_content_item_response} > 
                                <div  className={style.abi_content_item_response_title}>[{result[abi.name].showLabel}] method Response</div>
                                <div  className={style.abi_content_item_response_value}>{ result[abi.name].value}</div>
                            </div>}
                          
                           
                        </div>
                        }
                 </>     
                    
                </Show>
             
            </div>
        })
        }
    </div>
}