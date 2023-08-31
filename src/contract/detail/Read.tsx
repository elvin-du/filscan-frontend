import Wallet from "@/components/wallet"
import { getValueDivide } from "@/utils/utils";
import { EnterOutlined } from "@ant-design/icons"
import { Button, Input,message } from "antd"
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
        return v?.stateMutability !== 'view' && v.name && v.type !== 'event'
      })
    }

  }, [verifyData,type])

  const contract:any = useMemo(() => {
    if (verifyData) {
      return new web3.eth.Contract(JSON.parse(verifyData.ABI), verifyData.contract_address);

    }

  }, [verifyData])

  const handleQuery = async (name: string, payloadKey: { name: string, type: string }[]) => {
    if (wallet.account) {
      const network = await getNetWork();
      if (!network) {
        const add_net = await addNetwork();
        if (add_net) {
          handleChange(name, payloadKey)
        }
      } else {
        handleChange(name, payloadKey)
      }
    } else {
      message.warning('please connect wallet')
    }

  }

  const handleChange = async (abiName: string, payloadKey: {name:string,type:string}[]) => {
    const show_payload:any[] = [];
    payloadKey.forEach((payload) => {
      if (payload.type.includes('[]')) {
        const value = showValue[payload.name].split(',');
        show_payload.push(value)
      } else {
        show_payload.push(showValue[payload.name])
      }
    })

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
        const payloadKey: {name:string,type:string}[]=[]
        return <div className={style.abi_content_item} key={index} >
          <Show title={`${index + 1}. ${abi?.name}`}>
            <>
              {abi?.inputs?.length > 0 &&
                        <>
                          {abi.inputs.map((item_input: any, index: number) => {
                            payloadKey.push({
                              name: `${abi?.name}/${item_input.name}`,
                              type:item_input?.type
                            })
                            const placeholder = item_input?.type.includes('[]') ?`${item_input?.name} (${ item_input?.type}) Please use ',' to separate`:`${item_input?.name} (${ item_input?.type})`
                            return <div className={style.abi_content_item_content} key={index}>
                              <span className={ style.abi_content_item_content_name}>
                                {item_input?.name} ({ item_input?.type})
                              </span>
                              <Input className={style.abi_content_item_content_input}
                                placeholder={placeholder}
                                value={showValue[`${abi?.name}/${item_input.name}`] && String(showValue[`${abi?.name}/${item_input.name}`])}
                                onChange={(e: any) => {
                                  const value =item_input?.type?.startsWith('uint')? Number(e.target.value): e.target.value;
                                  setShowValue({...showValue,[`${abi?.name}/${item_input.name}`]:value})
                                }} />
                            </div>
                          })}
                        </>}
              <Button className={`custom_border_btn ${style.abi_content_item_btn}`} style={{marginTop:abi?.inputs?.length>0 ? '10px':''}} onClick={() => handleQuery(`${abi?.name}`, payloadKey)}>{type === 'view'?"Query":'Write'}</Button>
              {abi?.outputs?.length > 0 && type === 'view' && <div>
                {abi.outputs.map((item_output:any,outIndex:number) => {
                  return <div className={style.abi_content_item_content} style={{ paddingTop: abi?.inputs?.length > 0 ? '0px' : '' }} key={ outIndex}>
                    {abi?.inputs?.length > 0 && <EnterOutlined className={style.abi_content_item_content_icon} rev={undefined} />}
                    <span className={ style.abi_content_item_content_name}>
                      {item_output?.name}
                      <span className={ style.abi_content_item_content_name_des}> ({ item_output?.type})</span>
                    </span>

                  </div>
                })}
                {result[abi.name] && <div className={style.abi_content_item_response} >
                  <div className={style.abi_content_item_response_title}>[{result[abi.name].showLabel}] method Response</div>
                  <div className={style.abi_content_item_response_value}>{ result[abi.name].value}</div>
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