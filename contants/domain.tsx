import { getSvgIcon } from "@/svgUtils"
import { formatDateTime } from "@/utils/utils"
import Link from "next/link"
import { text } from "stream/consumers"
import { get_account_type } from "./varible"

export const domain_card = {
    title: 'domain_title',
    content: [
        {
            ataIndex: '', title: (tr:any) => { 
                return <span className="font_16 font_weight">
                    { tr('domain_title')}
            </span> 
        },render:(text:any)=>''},
        { dataIndex: 'resolved_address', title: 'resolved_address' },
        { dataIndex: 'expired_at', title: 'expired_at' ,render:(text:any)=>formatDateTime(text)},
        {
            dataIndex: 'registrant', title: 'registrant', render: (text:string) => { 
                return <span className="table_li">

                    <Link className="link" href={`/address/${text}`}>{text} </Link>
                    <span>{ getSvgIcon('copy')}</span>    
            </span>
        } },
         {dataIndex:'controller',title:'controller'}
    ]
} 