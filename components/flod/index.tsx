import { get_account_type } from "@/contants/varible"
import { useState } from "react"
import style from './index.module.scss'

export default ({ data,tr }: {data:Array<any>,tr?:any}) => { 
    const [flod,setFlod] = useState(false)
    return <div className={ style.fold_content}>
        <div className={ style.fold_content_switch}>Flod</div>
        <div className="array_item_column"> {data.map((item: any, index) => { 
                    return <li key={index} className='array_item_column_li'>
                    <div className="flex_align_center ">
                        <span className="font_weight">{tr('from_ath')}</span><span>{get_account_type(item.from_type, item.from)}</span>
                    </div>
                    <div className="flex_align_center">
                        <span className="font_weight">{tr('to_ath')}</span> <span>{get_account_type(item.to_type, item.to)}</span>
                    </div>
                    <div className="flex_align_center">
                    <span className="font_weight">For</span>  
                    <span>{Number(item?.amount).toFixed(4) || '--'}</span>
                        <span>{item?.token_name}</span>
                        
                    </div>
                    
                    </li>
                    })}
                </div>
    </div>
}