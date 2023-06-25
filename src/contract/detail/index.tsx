import { apiUrl } from "@/contants/apiUrl"
import { postAxios } from "@/store/server"
import { useEffect, useState } from "react"
import Card from '@/packages/custom_card'
import Main from '@/packages/main'
import { contract_detail } from "@/contants/contract"
import style from './index.module.scss'
import { useTranslation } from "react-i18next"
import { getSvgIcon } from "@/svgUtils"
import Copy from '@/components/copy'
import { Select } from "antd"
import dynamic from "next/dynamic"

const Editor = dynamic(() => import('@/components/ace'), { ssr: false });


export default ({ id ,verifyData}: { id?: string | string[] ,verifyData?:Record<string,any> }) => { 
    const { t } = useTranslation();
    const tr = (label: string, value?: Record<string, any>) => {
        if (value) {
        return t(label, { ...value, ns: "contract" });
        }
        return t(label, { ns: "contract" });
    };
    const [data, setData] = useState<any>({})
    
    useEffect(() => { 
        setData(verifyData)
        // if (id && !verifyData) { 
        //     postAxios(apiUrl.contract_verify_des, {
        //     input_address:id
        //     }).then(
        //         (res: any) => {
        //             setData({ ...res?.result?.compiled_file || {},source_file:res?.result?.source_file || []});
        //     }
        // );
        // }
    }, [verifyData])

    const handleClick = (value: any) => {  
        if (id) { 
            window.open(`${window.location.origin}/contract/abi/${id}?format=${value}`)
        }
        
        
    }

    return <div className={ style.contract_wrap}>
        <Card title={contract_detail.overview.title} ns='contract' className={style.contract_wrap_card }>
            <Main content={contract_detail.overview.list} data={data} ns='contract' splitFlex={true}
                splitClassName={style.contract_wrap_overview }
                warpClassName={style.contract_wrap_overview_content} />
        </Card>
        <Card title={`${tr(contract_detail.code.title)} (${data?.language})`} ns='contract' className={style.contract_wrap_card}>
            {data?.source_file?.map((itemData: any,index:number) => { 
                return <div className={style.contract_wrap_textMain} key={index }>
                <div className={style.contract_wrap_textMain_title}>
                    <span className={style.contract_wrap_textMain_title_name}>
                    { getSvgIcon('fileIcon')}
                    {tr(itemData.file_name)}
                    </span>
               
                    <span className={style.contract_wrap_textMain_title_right}>
                             { contract_detail.code.copy && <Copy text={itemData[contract_detail.code.content]} /> }
                            { contract_detail.code.link && <Copy text={window?.location?.href} icon='linkIcon'/> }
                    </span> 
                </div>
                    <div className={style.contract_wrap_textMain_codeContent}>
                        <Editor value={itemData[contract_detail.code.content]} otherProps={{readOnly:true}}
/>
                </div>
            </div>

                })
        }           
        </Card>
        {contract_detail.other.map((contentItem:any) => { 
            return <Card  ns='contract'
                className={style.contract_wrap_card}
                header={ 
                    <div className={style.contract_wrap_textMain_title}>
                        <span className={style.contract_wrap_textMain_title_nameText}>{tr(contentItem.title)}</span>
                        <span className={style.contract_wrap_textMain_title_right}>
                            { contentItem.options &&    <Select className="custom_select"
                                options={contentItem.options.list}
                                onChange={ handleClick}
                                placeholder={tr(contentItem.options.placeholder)} />}
                         
                            {contentItem.copy && <Copy text={data[contentItem.text]} /> }

                        </span>
                       
                    </div>
                }
            >
            <div className={style.contract_wrap_textMain}>
                <div className={style.contract_wrap_textMain_content}>{ data[contentItem.text]}</div>
            </div>
        </Card>
        }) }
        
    </div>
}