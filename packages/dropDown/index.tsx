import { getSvgIcon } from '@/svgUtils';
import { CheckOutlined } from '@ant-design/icons';
import { useMemo } from 'react';
import style from './index.module.scss'


interface Props { 
    content: Array<any>,
    value?:any
}

export default (props:Props) => { 
    const { content, value } = props;
    
    const showValue = useMemo(() => {
        if (value) { 
            return value
        }
        return content[0]
     },[value,content])


    return <div className={style.dropdown}>
        <div className={style.dropdown_value}>
            {showValue.label}
            {getSvgIcon('down')}
        </div>
        <div  className={style.dropdown_content}>
             <ul className={style.dropdown_content_main}>
            {content.map((v:any,index) => { 
                return <li className={style.dropdown_content_item} key={index}>
                    { showValue.value === v.value && <CheckOutlined  className={style.dropdown_content_item_icon} rev={undefined} /> }

                    {v.label}
                </li>
        })}
        </ul>
        </div>
       
    </div>
}