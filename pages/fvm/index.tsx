import { fvmUrl } from '@/contants/apiUrl';
import style from './index.module.scss';
import { fvmList} from '@/contants/fvm'
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Banner from '@/components/banner'
import axios from 'axios';


export default () => {
    const { t } = useTranslation();
    const tr = (label: string, value?: Record<string, any>) => {
        if (value) {
            return t(label, { ...value, ns: "fvm" });
        }
        return t(label, { ns: "fvm" });
    };
    const [fvmListOpt, setFvmList] = useState<any>([])
    const [totalNum, setTotalNum] = useState(0);
    const [content, setContent] = useState([]);
    const [active, setActive] = useState('hot');
    const [banner,setBanner] = useState([])
    
    useEffect(() => { 
        loadActive('hot');
        axios.get(fvmUrl+'/main.json').then(res => { 
            let num = 0;
            const numList: any = [];
            // if (res.data.length > 0) { 
               
            // }
            res.data?.forEach((v:any) => {
                num= num+v.num
                const obj = { ...v }
                numList.push(obj)
            })
            setTotalNum(num)
            const newObj = { label: 'all', value: 'all', num };
            setFvmList([{label:'hot',value:'hot'},newObj,...numList])
        })
    },[])

    const loadActive = (active: string) => { 
        setBanner([])
        axios.get(`${fvmUrl}/config/${active}.json`).then(res => { 
            if (active === 'hot') {
                setContent(res?.data?.list || []);
            } else { 
                setContent(res?.data || []);
            }
            
            setBanner(res?.data?.banner ||[])
        })
    }

    

    return <div className={style.fvm}>
        <div className={style.fvm_left}>
               {fvmListOpt.map((v:any) => { 
                   return <li key={v.label} className={`${style.fvm_left_li} ${active === v.label ? style.fvm_active : ''}`} onClick={() => {
                       setActive(v.label)
                       loadActive(v.label)
                }}>
                       <span> {tr(v.label)}</span>
                       { v.num && <span>{v.num }</span>}
                </li>
            })}
            </div>
        <div className={style.fvm_content}>
            {banner?.length > 0 && <Banner  banner={ banner}/>}
            <div className={style.fvm_content_main}>
                {Array.isArray(content)&&content?.map((item:any,index:number) => { 
                return <div key={index} className={style.fvm_content_item}>
                    <div className={style.fvm_content_item_text}>
                        <Image className={style.fvm_content_item_img} src={`${fvmUrl}/images/${item.logo}`} alt='' width='54' height='54' />
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
                                <Image className={style.fvm_content_item_link_icon}  src={`${fvmUrl}/images/${v.icon}`}  alt="" width='20' height='20' />
                            </span>
                        })}
                    </div>}
                   
                </div>
            })}
            </div>
            
            </div>
    </div>
}