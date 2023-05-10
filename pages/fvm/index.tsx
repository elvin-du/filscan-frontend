
import style from './index.module.scss';
import { fvmList} from '@/contants/fvm'
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Item from 'antd/es/list/Item';

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
            <div className={style.fvm_content}></div>
    </div>
}