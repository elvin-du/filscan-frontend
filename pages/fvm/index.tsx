
import style from './index.module.scss';
import { fvmList} from '@/contants/fvm'
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Image from 'next/image'
import axios from 'axios';


const apiUrl = 'https://filscan-v2.oss-cn-hongkong.aliyuncs.com/fvm_manage' //'http://192.168.1.127/filscan_manage';
//https://filscan-v2.oss-cn-hongkong.aliyuncs.com/fvm_manage/
export default () => {
    const { t } = useTranslation();
    const tr = (label: string, value?: Record<string, any>) => {
        if (value) {
            return t(label, { ...value, ns: "fvm" });
        }
        return t(label, { ns: "fvm" });
    };
    const [fvmListOpt, setFvmList] = useState([])
    const [totalNum, setTotalNum] = useState(0);
    const [content,setContent]= useState([])
    
    useEffect(() => { 
        axios.get(apiUrl+'/main.json').then(res => { 
            let num = 0;
            const numList: any = [];
            if (res.data.length > 0) { 
                loadActive(res.data[0].label)
            }
            res.data.map((v:any) => {
                num= num+v.num
                const obj = { ...v }
                numList.push(obj)
            })
            setTotalNum(num)
            setFvmList(numList)
        })
    },[])

    const loadActive =(active:string)=>{ 
        axios.get(`${apiUrl}/config/${active}.json`).then(res => { 
            setContent(res?.data||[])
        })
    }

    
    const [active, setActive] = useState('Defi');

    return <div className={style.fvm}>
        <div className={style.fvm_left}>
            <h3 className={style.fvm_left_title}>
                <span>{tr(fvmList.title)}</span>
                <span>{ totalNum}</span>
            </h3>
               {fvmListOpt.map((v:any) => { 
                   return <li key={v.label} className={`${style.fvm_left_li} ${active === v.label ? style.fvm_active : ''}`} onClick={() => {
                       setActive(v.label)
                       loadActive(v.label)
                }}>
                    <span> {tr(v.label)}</span>
                    <span>{ v.num}</span>
                </li>
            })}
            </div>
        <div className={style.fvm_content}>
            <div className={style.fvm_content_main}>
                {content?.map((item:any,index:number) => { 
                return <div key={index} className={style.fvm_content_item}>
                    <div className={style.fvm_content_item_text}>
                        <Image className={style.fvm_content_item_img} src={`${apiUrl}/images/${item.logo}`} alt='' width='54' height='54' />
                        <div className={style.fvm_content_item_text_content}>
                        <span className={style.fvm_content_item_text_name}>{item?.name||''}</span>
                        <span className={style.fvm_content_item_text_des}>{item?.detail||''}</span>
                        </div>
                    </div>
                    { item?.links &&  <div className={style.fvm_content_item_link}>
                        {item?.links.map((v:any,index:number) => { 
                            return <span  key={index} onClick={() => { 
                                if (v.href) { 
                                    window.open(v.href);
                                }
                            }}>
                                <Image className={style.fvm_content_item_link_icon}  src={`${apiUrl}/images/${v.icon}`}  alt="" width='20' height='20' />
                            </span>
                        })}
                    </div>}
                   
                </div>
            })}
            </div>
            
            </div>
    </div>
}