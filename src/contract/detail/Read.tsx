import Wallet from "@/components/wallet"
import { getValueDivide } from "@/utils/utils";
import { EnterOutlined } from "@ant-design/icons"
import { Button, Input } from "antd"
import { useMemo, useState } from "react"
import Web3 from 'web3';
import style from './index.module.scss'
import Show from './show'

const web3 = new Web3(window.ethereum);

export default ({ id, verifyData,type }: { id?: string | string[], verifyData?: Record<string, any>,type:string }) => {

    const [showValue, setShowValue] = useState<Record<string, any>>({})
    const [result, setResult] = useState < Record<string, any>>({})
    const abiData = useMemo(() => { 
        if (verifyData) { 
            return JSON.parse(verifyData.ABI).filter((v: any) => { 
                if (type === 'view') { 
                   return v?.stateMutability === 'view' && v.name
                }
                return v?.stateMutability !== 'view' && v.name
            })
        }
       
    }, [verifyData,type])

    const contract:any = useMemo(() => {
          if (verifyData) { 
            return new web3.eth.Contract(JSON.parse(verifyData.ABI), verifyData.contract_address);

        }
           
    }, [verifyData])
    
    
    
    const handleQuery = async (name: string) => { 
        const [abiName, inputName] = name.split('/');
        let res:any;
        if (type === 'view') {
            res = await contract.methods[abiName](showValue[name]).call();
        } else { 
             res = await contract.methods[abiName](showValue[name]).send();
        }
        console.log('---',res)
        setResult({
            ...result, [abiName]: {
                showLabel: name,
                value:Number(res)
        }})
    }


    return <div className={style.abi_content}>
        <Wallet />
        {
        abiData.map((abi: any, index: number) => { 
            return <div className={style.abi_content_item} key={index} >
                
                <Show title={`${index + 1}. ${abi?.name}`}>
                    <>
                        {abi?.inputs?.length > 0 &&
                        <div>
                        {abi.inputs.map((item_input: any,index:number) => { 
                        return <div className={ style.abi_content_item_content}>
                            <span className={ style.abi_content_item_content_name}>
                                {item_input?.name} ({ item_input?.type})
                            </span>
                            <Input className={style.abi_content_item_content_input}
                                placeholder={`${item_input?.name} (${ item_input?.type})`}
                                value={showValue[`${abi?.name}/${item_input.name}`] }
                                onChange={(e: any) => {
                                const value = e.target.value;
                                setShowValue({...showValue,[`${abi?.name}/${item_input.name}`]:value})
                            }} />
                            {index === abi.inputs.length -1  &&  <Button className="custom_border_btn" onClick={()=>handleQuery(`${abi?.name}/${item_input.name}`)}>Query</Button> }                           
                        </div>
                        })}      
                         </div>}
                         {abi?.outputs?.length > 0 && <div>
                            {abi.outputs.map((item_output:any) => { 
                                return <div className={style.abi_content_item_content} style={{paddingTop:abi?.inputs?.length > 0? '0px':''}}>
                                    {abi?.inputs?.length > 0 && <EnterOutlined className={style.abi_content_item_content_icon} rev={undefined} />}
                                     <span className={ style.abi_content_item_content_name}>
                                    {item_output?.name}
                                     <span className={ style.abi_content_item_content_name_des}> ({ item_output?.type})</span>
                                    </span>
                                
                            </div>
                            })}
                              {result[abi.name] && <div  className={style.abi_content_item_content}> 
                                <div  className={style.abi_content_item_content_response_title}>[{result[abi.name].showLabel}] method Response</div>
                                <div  className={style.abi_content_item_content_response_value}>{ result[abi.name].value}</div>
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