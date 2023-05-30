import { Button, Upload, UploadFile, UploadProps } from "antd"
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import styles from "./index.module.scss";

const Editor = dynamic(() => import('./Ace'), { ssr: false });

export default ({ onchange ,fileData}: {fileData:any,onchange:(file:any)=>void}) => {
    const [aceFiles, setAceFiles] = useState<any>(fileData);
    const [files,setFiles]= useState<UploadFile[]>([])
    const { t } = useTranslation();

    const tr = (label: string) => {
        return t(label, { ns: "contract" });
    };

    
    const handleFile = (data: any) => { 
        //1.将文件读取为二进制数据
         let reader = new FileReader();
        reader.readAsText(data, "UTF-8");
          reader.onload = (e:any) => {
            //获取数据
              const ace:any = {...aceFiles}
              const value = e.currentTarget.result;
              ace[data.uid] = {
                  name: data.name,
                  uid:data.uid,
                  value
              }
              setAceFiles(ace)
               if (onchange) { 
                    onchange(ace)
                }
          };
         //4.2 //读取中断事件
         reader.onabort = () => {
            console.log('读取中断了');
         };
    }
   
    useEffect(() => {
        setAceFiles(fileData);
        if (Object.keys(fileData).length === 0) { 
            setFiles([])
        }
    }, [fileData])

    const handleMove = (file: any) => { 
        const newAce:any = { ...aceFiles };
        if (newAce[file.uid]) { 
             delete newAce[file.uid]
        }
        setAceFiles(newAce)
        if (onchange) { 
            onchange(newAce)
        }
       
    }

    const handleChange: UploadProps['onChange'] = (info) => {
    let newFileList:any = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    newFileList = newFileList.slice(-2);

    // 2. Read from response and show file link
        newFileList = newFileList.map((file: any) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    setFiles(newFileList);
  };
                   

    return <>
        <div className={ styles.upload}>
            <Upload accept=".sol" beforeUpload={handleFile} onChange={handleChange} fileList={files} onRemove={handleMove}>
             <Button className="custom_ok_btn" icon={<span className="add_icon" />}>{tr('file_name')}</Button>    
        </Upload>
        </div>
       
       
        {aceFiles&&Object.keys(aceFiles)?.map((acekey: string) => { 
            const aceItem = aceFiles[acekey]
            return <div  className={styles.ace_update_editor}>
                <span  className={styles.ace_update_editor_title}>{aceItem.name }</span>
                    <Editor key={ acekey} value={ aceItem.value}/>
            </div>
            
        }) }
        
    </> 
}