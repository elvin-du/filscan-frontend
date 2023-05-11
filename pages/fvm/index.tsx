
import style from './index.module.scss';
import { fvmList} from '@/contants/fvm'
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import test from '@/assets/images/test.png'
import twitter from '@/assets/images/twitter.png';
import Image from 'next/image'


const appList =[
    {
        "name":"Filet",
        "logo":test,
        "des":"Defi",
        "links":[
            {
                "href":"",
                "icon":twitter
            },
              {
                "href":"",
                "icon":twitter
            },
        ]
    },
]


export default () => { 
    const { t } = useTranslation();
  const tr = (label: string, value?: Record<string, any>) => {
    if (value) {
      return t(label, { ...value, ns: "fvm" });
    }
    return t(label, { ns: "fvm" });
  };
    
    const [active, setActive] = useState('Defi');

    return <div className={style.fvm}>
        <div className={style.fvm_left}>
            <h3 className={style.fvm_left_title}>  {tr(fvmList.title)}</h3>
               {fvmList.list.map((v:any) => { 
                return <li key={v.value} className={`${style.fvm_left_li} ${active === v.value ? style.fvm_active : ''}`} onClick={()=>{setActive(v.value)}}>
                    <span> {tr(v.label)}</span>
                    <span>{ v.num}</span>
                </li>
            })}
            </div>
        <div className={style.fvm_content}>
            <div className={style.fvm_content_main}>
                {appList.map((item:any,index:number) => { 
                return <div key={index} className={style.fvm_content_item}>
                    <div className={style.fvm_content_item_text}>
                        <Image className={style.fvm_content_item_img} src={item.logo} alt='' />
                        <div className={style.fvm_content_item_text_content}>
                        <span className={style.fvm_content_item_text_name}>{item.name}</span>
                        <span className={style.fvm_content_item_text_des}>{item.des}</span>
                        </div>
                    </div>
                    { item?.links &&  <div className={style.fvm_content_item_link}>
                        {item?.links.map((v:any,index:number) => { 
                            return <span  key={index} onClick={() => { 
                                if (v.href) { 
                                    window.open(v.href);
                                }
                            }}>
                                <Image className={style.fvm_content_item_link_icon}  src={v.icon} alt="" />
                            </span>
                        })}
                    </div>}
                   
                </div>
            })}
            </div>
            
            </div>
    </div>
}