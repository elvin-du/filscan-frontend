import { getSvgIcon } from "@/svgUtils"
import { formatDateTime } from "@/utils/utils"
import Link from "next/link"
import Copy from '@/components/copy'

export const domain_card = {
    title: 'domain_title',
    content: [
        {
            dataIndex: '', title: (tr:any) => { 
                return <span className="font_16 font_weight">
                    { tr('domain_title')}
            </span> 
            },
            render: (text: any) => null
        },
        { dataIndex: 'resolved_address', title: 'resolved_address' },
        { dataIndex: 'expired_at', title: 'expired_at' ,render:(text:any)=>formatDateTime(text)},
        {
            dataIndex: 'registrant', title: 'registrant', render: (text:string) => { 
                return <span className="flex-center">
                    <Link className="link" href={`/address/${text}`}>{text} </Link>
                    <Copy text={text} />
                    <span className="flex-center" >  
                        <Link href={`/name/${text}`}>
                            <span style={{textDecoration: 'underline'}}>Lookup Names </span> </Link>
                        { getSvgIcon('search')}
                    </span>
                </span>
        } },
         {dataIndex:'controller',title:'controller',render: (text:string) => { 
                return <span className="flex-center">
                    <Link className="link" href={`/address/${text}`}>{text} </Link>
                    <Copy text={text} />
            </span>
        }}
    ]
} 


export const domain_name_catd = {
     content: [
        {
            dataIndex: '', title: (tr:any) => { 
                return <span className="font_16 font_weight">
                    { tr('domain_title')}
            </span> 
            },
            render: (text: any) => null
        },
        { dataIndex: 'resolvedAddress', title: 'resolved_address' },
         {
            dataIndex: 'registrant', title: 'registrant', render: (text:string) => { 
                return  <Link className="link" href={`/address/${text}`}>{text} </Link>
        } },
    ]
}