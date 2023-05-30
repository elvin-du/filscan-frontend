import { Button, Checkbox, Form, Input, notification, Select } from "antd"
import Header from './header';
import { verify } from '@/contants/contract'
import { useEffect, useMemo, useState } from "react";
import styles from "./index.module.scss";
import { useTranslation } from "react-i18next";
import Router, { useRouter} from "next/router";
import Update from './Update'
import { postAxios } from "@/store/server";
import { apiUrl } from "@/contants/apiUrl";

const { TextArea } = Input;

const defaultValue = {
   optimize_runs: 200,
    optimize: 'true',
        arguments:'',
}

export default () => {
    const query = useRouter().query;
    const [data, setData] = useState<any>({...defaultValue});
    const [error, setError] = useState('')
    const [files, setFiles] = useState<any>({})
    const { contractAddress, version } = query;
    const [opt, setOptions] = useState<any>({})
    const { t } = useTranslation();
    const tr = (label: string) => {
        return t(label, { ns: "contract" });
    };

    useEffect(() => { 
        postAxios(apiUrl.contract_solidity).then((res:any) => { 
            setOptions({
                compile_version: res?.result?.version_list?.map((t: any) => ({ label: t, value: t })) || []
            })
        })
    },[])
    

    useEffect(() => {
          if (contractAddress && version) { 
            const newData = { ...data }
            newData.contract_address = contractAddress;
            newData.compile_version = version
            setData(newData)
        }
     },[contractAddress,version])
   
    const showData = useMemo(() => {
        if (contractAddress && version) {         
            return verify.contract
        }
        return verify.main
    }, [query.contractAddress,query.version])


    const handleChange = (type: string, value: any) => { 
        const newDate:any = { ...data };
        if (type === 'contract_address') {
            if (value.startsWith('0x') || value.startsWith('f') || value.startsWith('t')) {
                //setError
                setError('')
            } else {
                setError(type)
            }
        } else if (type === 'optimize') { 
            if (value === 'false') {
                newDate.optimize_runs = undefined
            } else { 
                 newDate.optimize_runs = 200
            }
        }
        newDate[type] = value;
        setData(newDate)
    }

    
    const handleClick = (type: string) => { 
        if (type === 'confirm') {
            const obj = { ...data };
            const filesList = Object.keys(files) || [];
            if (filesList.length === 0) { 
                 return  notification.warning({
                    className: 'custom-notification',
                    message: 'Warning',
                    duration: 100,
                    description: 'please select file'
                })
            }
            const source_file: any = [];
            filesList.forEach((v) => {
                const show_file = files[v];
                const item = {
                    file_name: show_file.name,
                    source_code: show_file.value
                };
                source_file.push(item)

            })
            obj.optimize = data.optimize === 'true';
            obj.source_file = source_file;
            postAxios(apiUrl.contract_verify, { ...obj }).then((res:any) => {
                if (res && res.result) { 
                     notification.success({
                    className: 'custom-notification',
                    message: 'success',
                    duration: 100,
                    description: 'Success'
                })
                }
                
            })

        } else if (type === 'next') {
            if (data.contract_address && data.compile_version) {
                Router.push(`/contract/verify?contractAddress=${data.contract_address}&version=${data.compile_version}`)
            } else {
                notification.error({
                    className: 'custom-notification',
                    message: 'Error',
                    duration: 100,
                    description: 'please enter your contract address'
                })
            }
        } else if (type === 'reset') {
            setFiles({})
            setData({
                contract_address: contractAddress || '',
                compile_version: version || '',
                ...defaultValue
            })
        } else if (type === 'back') { 
            setData({
                ...defaultValue})
            Router.push(`/contract/verify`)
        } 
    }

    
    const renderItem = (item: any) => {
        let content = null;
        const { dataIndex, title,title_hidden,disabled=false, placeholder = '', defaultValue, options = [], style = {} } = item;
       
        switch (item.type) {
            case 'Input':
                content = <Input
                    disabled={ disabled}
                    value={data[dataIndex]}
                    defaultValue={ defaultValue }
                    style={{ borderColor:dataIndex === error ? 'red' : ''}}
                    onChange={(e: any) => handleChange(dataIndex, e.target.value)} className={`custom_input ${styles.verify_input}`} placeholder={tr(placeholder)} />
                break;
            case 'Select':
                 content = <Select
                    placeholder={ tr(placeholder)}
                    value={data[dataIndex]}
                    defaultValue={ defaultValue }
                    onChange={(e: any) => handleChange(dataIndex, e)} className={`custom_select ${styles.verify_select}`} options={opt[dataIndex]||options } />
                break;
            case 'checkbox':
                content = <Checkbox onChange={(e: any) => handleChange(dataIndex, e)} >{tr(title)}</Checkbox>
                break;
            case 'textArea':
                content = <TextArea autoSize={{ minRows: 4, maxRows: 6}} onChange={(e: any) => handleChange(dataIndex, e.target.value)} >{tr(title)}</TextArea>
                break;
        }

        return <div style={{ width: '100%', ...style }}  className={styles.verify_list_item}>
            <span style={{display:title_hidden ? 'none':'block'}} className={styles.verify_list_item_title}>{ tr(title)}</span>
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
                {contractAddress && <Update fileData={files} onchange={(files:any) => {setFiles(files) } }/>}
            </div>
            {showData?.content?.other && showData?.content?.other.map((other:any) => { 
                return renderItem(other)
            })}
            
        <div className={styles.verify_btns}>
                {showData?.buttons?.map((btn: any) => { 
                    let isDisabled = false;
                    if (btn.disableList) { 
                        isDisabled = btn.disableList.filter((v:string)=>data[v]).length !==  btn.disableList.length||!!error
                    }
                return <Button disabled={isDisabled} className={btn.className} onClick={() => { handleClick(btn.text)} }>{ tr(btn.text)}</Button>
        })}
        </div>
        </div>
    </div>
}