import { Button, Upload } from "antd"
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import('./Ace'), { ssr: false });

export default (props: any) => {
    const [file, setFile] = useState<any>({});
    const { t } = useTranslation();
    const tr = (label: string) => {
        return t(label, { ns: "contract" });
    };
    
    useEffect(() => { 
        setFile(props.file)
    },[props.file])
    const handleFile = (data: any) => { 
        //1.将文件读取为二进制数据
         let reader = new FileReader();
       // reader.readAsBinaryString(data);
        //2.将文件读取为文本数据
        reader.readAsText(data, "UTF-8");
          reader.onload = (e:any) => {
            //获取数据
              const value = e.currentTarget.result;
              file.value = value;
              file.name = data.name;    
              if (props.onChange) { 
                  props.onChange(file)
              }
          };
         //4.2 //读取中断事件
         reader.onabort = () => {
            console.log('读取中断了');
         };
    }
   
    
    return <div>
        <Upload beforeUpload={handleFile}>
        <Button className="custom_ok_btn" icon={<span className="add_icon" />}>{tr(file.name)}</Button>    
        </Upload>
        { file.value && <Editor value={file.value}/>}
    </div> 
}