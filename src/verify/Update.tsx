import { Button, message, Upload, UploadFile, UploadProps } from "antd"
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import styles from "./index.module.scss";

const Editor = dynamic(() => import('./Ace'), { ssr: false });

const maxCount = 50;

export default ({ onchange ,fileData}: {fileData:any,onchange:(file:any)=>void}) => {
    const [aceFiles, setAceFiles] = useState<any>(fileData);
    const [files,setFiles]= useState<UploadFile[]>([])
    const { t } = useTranslation();

    const tr = (label: string) => {
        return t(label, { ns: "contract" });
    };

    
    const handleFile = (file: any, filesList: any) => { 
        
        //1.将文件读取为二进制数据
        const ace: any = { ...aceFiles }
        filesList.forEach((data: any,index:number) => { 
            if (files.length + index + 1 > maxCount) { 
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
                    onchange(ace)
                }
          };
         //4.2 //读取中断事件
         reader.onabort = () => {
            console.log('读取中断了');
         };
        })


       
       
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
    let newFileLists:any = [...info.fileList];
       const newFileList:any = [];
        newFileLists.forEach((file: any) => {
         
      if (file.response) {
        file.url = file.response.url;
      }
    if (file.size / 1024 / 1024 <= 10) { 
                 newFileList.push(file) 
        }
            
               
                
    });
        setFiles(newFileList);
        
    };
    
    const handleRemove = (uid:string) => { 
        const newAce = { ...aceFiles }
        delete newAce[uid]
        setAceFiles(newAce)
        if (onchange) { 
            onchange(newAce)
        }
        const newFileList: any = []
        files.forEach((v) => { 
            if (v.uid !== uid) {
                newFileList.push(v)
            }
        });
          setFiles(newFileList);
    }
            
    

    return <>
        <div className={ styles.upload}>
            <Upload accept=".sol"
                maxCount={maxCount}
               beforeUpload={handleFile}
                fileList={ files}
                onChange={handleChange}
                multiple={ true}
                customRequest={(file:any) => { 
                    file.onProgress({ percent: 100 })
                    file.onSuccess({status:200})
                }}
                onRemove={handleMove}>
             <Button className="active_btn" icon={<span className="add_icon" />}>{tr('file_name')}</Button>    
        </Upload>
        </div>
       
       
        {aceFiles&&Object.keys(aceFiles)?.map((acekey: string,index:number) => { 
            const aceItem = aceFiles[acekey]
            return <div key={index} className={styles.ace_update_editor}>
                <div className={styles.ace_update_editor_title}>
                    <span >{aceItem.name}</span>
                     <span onClick={()=>handleRemove(acekey)}>
                    X
                </span>
                </div>
               
                    <Editor key={ acekey} value={ aceItem.value}/>
            </div>
            
        }) }
        
    </> 
}