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
import Output from "./Output";

const { TextArea } = Input;

const defaultValue = {
   optimize_runs: 200,
    optimize: 'true',
    arguments:'',
}

export default () => {
    const query = useRouter().query;
    const [active,setActive]=useState('source_code')
    const [data, setData] = useState<any>({...defaultValue});
    const [error, setError] = useState('');
    const [outData, setOutData] = useState({})
    const [files, setFiles] = useState<any>({})
    const [congfile, setConfigFile] = useState<any>({})
    const { contractAddress, version } = query;
    const [opt, setOptions] = useState<any>({})
    const [disable, setDisable] = useState(true)
    const [loading,setLoading]= useState(false)
    const { t } = useTranslation();
    const tr = (label: string) => {
        return t(label, { ns: "contract" });
    };

    useEffect(() => { 
        postAxios(apiUrl.contract_solidity).then((res: any) => { 
                postAxios(apiUrl.contract_Licenses).then((res1:any) => { 
                    setOptions({
                             compile_version: res?.result?.version_list?.map((t: any) => ({ label: t, value: t })) || [],
                            license: res1?.result?.version_list?.map((t: any) => ({ label: t, value: t })) || []
                        })
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
            const configFiles = Object.keys(congfile) ||[]
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
            const config_files:any =[] 
              configFiles.forEach((v) => {
                const show_file = congfile[v];
                const item = {
                    file_name: show_file.name,
                    source_code: show_file.value
                };
                config_files.push(item)

            })
            obj.optimize = data.optimize === 'true';
            obj.source_file = source_file;
            obj.mate_data_file = config_files[0];
            obj.optimize_runs = data.optimize_runs ? Number(data.optimize_runs) : undefined
            setLoading(true)
            postAxios(apiUrl.contract_verify, { ...obj }).then((res: any) => {
                setLoading(false)
                if (res && res.result) { 
                    setOutData({ ...res?.result?.compiled_file || {}, is_verified: res.result.is_verified });
                    setActive('compile_output')
                    setDisable(false);
                    if (res.result.is_verified) {
                        notification.success({
                            className: 'custom-notification',
                            message: 'success',
                            duration: 100,
                            description: 'Success'
                        })
                    } else { 
                            notification.error({
                            className: 'custom-notification',
                            message: 'Error',
                            duration: 100,
                            description: 'Invalid Arguments'
                        })
                    }
               
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
            setConfigFile({})
            setData({
                contract_address: contractAddress || '',
                compile_version: version || '',
                ...defaultValue
            })
        } else if (type === 'back') { 
            setData({ ...defaultValue })
           // setActive('source_code')
            Router.push(`/contract/verify`)
        } 
    }

    
    const renderItem = (item: any,index:number) => {
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
                content = <TextArea  value={data[dataIndex]} autoSize={{ minRows: 4, maxRows: 6}} onChange={(e: any) => handleChange(dataIndex, e.target.value)} >{tr(title)}</TextArea>
                break;
        }

        return <div style={{ width: '100%', ...style }} key={ index}  className={styles.verify_list_item}>
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
                    return <Button
                        disabled={btnItem.label === 'source_code' ? false: disable }
                        onClick={() => {
                        setActive(btnItem.label)
                    }} className={`${btnItem.className} ${active === btnItem.label ? 'active_btn':''}`} key={btnItem.label} >{tr(btnItem.label)}</Button>  
                })}
                </div>
                <div className={styles.verify_conten_des_list}>
                    {verify.content.list.map((listItem:any,index:number) => { 
                            return <li key={ index}>{ tr(listItem.label)}</li>
                        })
                    }
                </div>
                
        </div>}

        {active === 'source_code'   &&
            <div className={`${styles.verify_list} ${contractAddress ? '' : styles.verify_content}`}>
                {showData?.content?.list?.map((item: any,index:number) => {
                    return renderItem(item,index)
                })}
                {contractAddress && <Update fileData={files} congfile={congfile} onchange={(files: any, type: string) => {
                    if (type === 'config') {
                        setConfigFile(files)
                    } else { 
                        setFiles(files);
                    }
                   
                } } />}
                
                {showData?.content?.other && showData?.content?.other.map((other: any,index:number) => {
                    return renderItem(other,index)
                })}
            
                <div className={styles.verify_btns}>
                    {showData?.buttons?.map((btn: any, index: number) => {
                        let isDisabled = false;
                        if (btn.disableList) {
                            isDisabled = btn.disableList.filter((v: string) => data[v]).length !== btn.disableList.length || !!error
                        }
                        let load = {}
                        if (btn.loading) { 
                            load = {
                                loading
                            }
                        }
                        return <Button
                            key={index}
                            {...load}
                            disabled={isDisabled}
                            className={btn.className}
                            onClick={() => { handleClick(btn.text) }}>{tr(btn.text)}</Button>
                    })}
                </div>
            </div>}
        {active === 'compile_output' && contractAddress && <Output data={outData} onChange={() => {
            Router.push(`/contract/verify`)
            setActive('source_code')
        }} />}
    </div>
}