import { Button, message, Upload, UploadFile, UploadProps } from "antd"
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import styles from "./index.module.scss";
import { getSvgIcon } from "@/svgUtils";

const Editor = dynamic(() => import('@/components/ace'), { ssr: false });

const maxCount = 50;

export default ({ onchange ,fileData,congfile}: {fileData:any,congfile:any,onchange:(file:any,type:string)=>void}) => {
    const [aceFiles, setAceFiles] = useState<any>(fileData);
    const [confiles, setConfies]= useState<any>(congfile)
    const { t } = useTranslation();

    const tr = (label: string) => {
        return t(label, { ns: "contract" });
    };

    
    const handleFile = (file: any, filesList: any) => {
        //1.将文件读取为二进制数据
        const ace: any = { ...aceFiles }
        filesList.forEach((data: any,index:number) => { 
            if (Object.keys(ace).length + index + 1 > maxCount) { 
                return
            }
            if (data.size / 1024 / 1024 > 10) { 
             message.warning('file size more than 10M')
                return false
            }
            let reader = new FileReader();
        reader.readAsText(data, "UTF-8");
          reader.onload = (e:any) => {
            //获取数据
              //const ace:any = {};
              const value = e.currentTarget.result;
              ace[data.uid] = {
                  name: data.name,
                  uid:data.uid,
                  value
              }
              setAceFiles(ace)
               if (onchange) { 
                    onchange(ace,'file')
                }
          };
         //4.2 //读取中断事件
         reader.onabort = () => {
            console.log('读取中断了');
         };
        })
    }

    const handleConfigFile = (data:any) => { 
        let reader = new FileReader();
        const configAce:any = {...confiles}
        reader.readAsText(data, "UTF-8");
          reader.onload = (e:any) => {
            //获取数据
              //const ace:any = {};
              const value = e.currentTarget.result;
              configAce[data.uid] = {
                  name: data.name,
                  uid:data.uid,
                  value
              }
              setConfies(configAce)
               if (onchange) { 
                    onchange(configAce,'config')
                }
          };
         //4.2 //读取中断事件
         reader.onabort = () => {
            console.log('读取中断了');
         };
    }

   
    useEffect(() => {
        setAceFiles(fileData);
      
    }, [fileData])


    
    const handleRemove = (uid: string, type: string) => { 
        if (type === 'config') { 
            let configFiles = { ...confiles }
            delete configFiles[uid]
            setConfies(configFiles)
             if (onchange) { 
            onchange(configFiles,'config')
        }

        }
        const newAce = { ...aceFiles }
        delete newAce[uid]
        setAceFiles(newAce)
        if (onchange) { 
            onchange(newAce,'file')
        }
    }
            
    

    return <>
        <div className={styles.upload}>
            <Upload accept=".sol"
                maxCount={maxCount}
                beforeUpload={handleFile}
                multiple={true}
                fileList={[]}
                 customRequest={(file:any) => { 
                    file.onProgress({ percent: 100 })
                    file.onSuccess({status:200})
                }}
                >
                <Button className="active_btn" >
                    <span className={styles.upload_addIcon}>+</span>
                    {tr('file_name')}
                </Button>    
            </Upload>
            {aceFiles&&Object.keys(aceFiles)?.map((acekey: string,index:number) => { 
            const aceItem = aceFiles[acekey]
            return <div key={index} className={styles.ace_update_editor}>
                <div className={styles.ace_update_editor_title}>
                    <span className={styles.ace_update_editor_title_name}>
                        { getSvgIcon('fileIcon')}
                        {aceItem.name}</span>
                     <span onClick={()=>handleRemove(acekey,'files')}>
                        { getSvgIcon('deleteIcon')}
                </span>
                </div>
                    <Editor key={ acekey} value={ aceItem.value}/>
            </div>
            
        }) }
        </div>

        {Object.keys(aceFiles).length > 1 &&
            <div className={styles.upload}>
            <Upload accept=".json"
                    maxCount={1}
                    fileList={ []}
                beforeUpload={handleConfigFile}
                multiple={false}
                >
                <Button className="active_btn" >
                    <span className={styles.upload_addIcon}>+</span>
                    {tr('config_file_name')}
                </Button>    
        </Upload>
           {confiles&&Object.keys(confiles)?.map((acekey: string,index:number) => { 
            const aceItem = confiles[acekey]
            return <div key={index} className={styles.ace_update_editor}>
                <div className={styles.ace_update_editor_title}>
                    <span className={styles.ace_update_editor_title_name}>
                        { getSvgIcon('fileIcon')}
                        {aceItem.name}</span>
                     <span onClick={()=>handleRemove(acekey,'config')}>
                        { getSvgIcon('deleteIcon')}
                </span>
                </div>
                    <Editor key={ acekey} value={ aceItem.value}/>
            </div>
            
        }) }
            </div>
        }
    </> 
}