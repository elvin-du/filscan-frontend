import { Button, Form, Input, notification, Select } from "antd"
import Header from './header';
import { verify } from '@/contants/contract'
import { useMemo, useState } from "react";
import styles from "./index.module.scss";
import { useTranslation } from "react-i18next";
import Router, { useRouter} from "next/router";
import Update from './Update'


const defaultFile={
    name: 'file_name',
}

export default () => {
    const query = useRouter().query;
    const [files, setFiles] = useState([defaultFile]);
    const [data, setData] = useState<any>({});
    const [error,setError]= useState('')
    const { contractAddress} = query;
    const { t } = useTranslation();
    const tr = (label: string) => {
        return t(label, { ns: "contract" });
    };
    
   
    const showData = useMemo(() => {
        if (contractAddress) { 
             return verify.contract
        }
        return verify.main
    }, [query.contractAddress])


    const handleChange = (type: string, value: any) => { 
        if (type === 'address') { 
            if (!value.startsWith('0x') || value.startsWith('f4') || value.startsWith('t4')) { 
                //setError
                setError(type)
            }
        }
        const newDate:any = { ...data };
        newDate[type] = value;
        setData(newDate)
    }

    const handleUpdate = (file: any, index: number) => {
        
        const newFiles = [...files];
        newFiles[index] = file;
        setFiles(newFiles)
     }
    

    const renderItem = (data: any) => {
        let content = null;
        const { dataIndex } = data
        console.log('====3',error)
        switch (data.type) {
            case 'Input':
                content = <Input
                    style={{ borderColor:dataIndex === error ? 'red' : ''}}
                    onChange={(e: any) => handleChange(data.dataIndex, e.target.value)} className={`custom_input ${styles.verify_input}`} placeholder={tr(data?.placeholder)} />
                break;
            case 'Select':
                content = <Select onChange={(e:any)=> handleChange(data.dataIndex,e)} className={`custom_select ${styles.verify_select}`} options={data.options} />
                break;
            case "Update":
                content = <Update />
                break;
        }

        return <div style={{ width: '100%', ...data.style || {}}}  className={styles.verify_list_item}>
            <span  className={styles.verify_list_item_title}>{ tr(data.title)}</span>
            { content}
        </div>
    }

    return <div className={styles.verify}>
        <Header data={showData.header} />
        { !contractAddress ?  <div className={styles.verify_content_des}>
        { tr(showData.content.des)}
         </div> : <div className={styles.verify_conten_des}>
                <div className={styles.verify_conten_des_btns}>
                {verify.content.buttons.map((btnItem:any) => { 
                    return <Button className={btnItem.className} key={btnItem.label} >{ tr(btnItem.label)}</Button>  
                })}
                </div>
                <div className={styles.verify_conten_des_list}>
                    {verify.content.list.map((listItem:any,index:number) => { 
                            return <li  key={ index}>{ tr(listItem.label)}</li>
                        })
                    }
                </div>
                
        </div>}

        <div className={`${styles.verify_list} ${ contractAddress ? '':styles.verify_content}`}>
                {showData?.content?.list?.map((item:any) => { 
                    return renderItem(item)
                })}  
            <div className={ styles.verify_list_updates}>
            {contractAddress && files.map((file,index) => { 
                return <Update file={file} key={index} onChange={(fileValue:any)=>handleUpdate(fileValue,index)}/> 
            })}
            </div>
            
        <div className={styles.verify_btns}>
            {showData?.buttons?.map((btn:any) => { 
                return <Button className={btn.className} onClick={() => { 
                    if (data.address) {
                        Router.push(`/contract/verify?contractAddress=${data.address}`)
                    } else { 
                        notification.error({
                        className:'custom-notification',
                        message: 'Error',
                        duration:100,
                            description:'please enter your contract address'
                        })
                    }
                } }>{ tr(btn.text)}</Button>
        })}
        </div>
        </div>
    </div>
}