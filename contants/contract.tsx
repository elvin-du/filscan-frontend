import { getSvgIcon } from "@/svgUtils"
import { formatDateTime, formatFilNum, isIndent } from "@/utils/utils"
import { spawn } from "child_process"
import { get_account_type } from "./varible"
import { fvmUrl } from '@/contants/apiUrl';
import Link from "next/link";
import Image from "next/image";

export const verify: any = {
    content: {
        list: [
            { label: 'content_des1', },
            { label: 'content_des2', },
           { label: 'content_des3'},
        ],
        buttons: [
            {
                label: 'source_code',
                 className: 'custom_border_btn'
            },
             {
                 label: 'compile_output',
                  className: 'custom_border_btn'
            }
        ],

    },
    main: {
        header: {
            title: 'verify_title',
            des: 'verify_des',
        },
        content: {
            des: 'content_des',
            list: [
                {
                    type: 'Input',
                    dataIndex: 'contract_address',
                    title: 'address',
                    placeholder: 'address_placeholder',
                   
                },
                {
                    type: 'Select',
                    title: 'verify_address',
                    dataIndex: 'compile_version',
                    placeholder: 'verify_select_placeholder',
                },
                {
                    type: 'Select',
                    title: 'license_type',
                    dataIndex: 'license',
                    placeholder: 'verify_select_placeholder',
                    options: [
                        {
                            label: 'No License(None)',
                            value: 'No license(None)'
                        },
                        {
                            label: 'MIT License(MIT)',
                            value: 'MIT license(MIT)'
                        }
                    ]
                }
            ],
            // other:[
            //     {
            //         type: 'checkbox',
            //         title: 'checkbox_service',
            //         title_hidden: true,
            //         style: {textAlign:'center'},
            //         dataIndex:'checkbox_service',
            //     }
            // ]

           
        },
         buttons: [
                {
                 text: 'next',
                className: 'active_btn',
                disableList:['contract_address','compile_version']
                },
                {
                    text: 'reset',
                    className: 'custom_cancel_btn'
                }
            ]
    },
  
    contract: {
        header: {
            title: 'verify_title',
            des:'step1_verify_des'
        },
        content: {
            list: [
                {
                    type: 'Input',
                    disabled:true,
                    dataIndex: 'contract_address',
                    title: 'address_verify',
                    style: {
                        flex:1
                    }
               
                },
                {
                    type: 'Input',
                    disabled:true,
                    dataIndex: 'compile_version',
                    title: 'compile_version',
                     style: {
                        width:'30%'
                    }
                },
                {
                    type: 'Select',
                    title: 'Optimizations',
                    dataIndex: 'optimize',
                    defaultValue:'true',
                    style: {
                    width: '10%',
                    },
                    options: [
                        {
                            label: 'Yes',
                            value: 'true'
                        },
                        {
                            label: 'No',
                            value: 'false'
                        }
                    ]
                },
              {
                    type: 'Input',
                    title: 'run_optimizer',
                    dataIndex: 'optimize_runs',
                    defaultValue: 200,
                    style: {
                    width: '15%',
                    },
                  
              },
             
            ],
            other: [
                 {
                    type: 'textArea',
                    title: 'arguments',
                    style: {textAlign:'left'},
                    dataIndex:'arguments',
                }
            ]
        },
        buttons: [
                {
                 text: 'confirm',
                className: 'active_btn',
                },
                {
                    text: 'reset',
                    className: 'custom_cancel_btn'
               },
                 {
                    text: 'back',
                    className: 'custom_border_btn'
                }
            ]
        
        


    },
    output: {
        title: 'byte_code',
        params: [
            { label: 'compiler', title: 'compiler' },
            {label:'optimize',title:'optimize'},
            {label:'optimize_runs',title:'optimize_runs'},

        ],
        others: [
            {
                title: 'contract_name',
                dataIndex:'contract_name'
            },
             {
                title: 'local_byte_code',
                dataIndex:'local_byte_code'
            }
        ]
    }


  
}


export const ft_overview = {
    title: {
        label:'overview',
    },
    content: [
    {
        title: 'total_supply',
            dataIndex: 'total_supply',
            render: (text:string) => { 
                console.log('===3', text)
                return text ?Number(text).toLocaleString():text||'--'
            }
    },
      {
        title: 'owners',
        dataIndex: 'owners',
    },
        {
        title: 'transfers',
        dataIndex: 'transfers',
    }
]
}
export const ft_market = {
    title: {
        label:'market',
    },
    content:[
     {
        title: 'latest_price',
        dataIndex: 'latest_price',
        render:(text:string)=>text+' FIL'
    },
      {
        title: 'market_value',
          dataIndex: 'market_cap',
         render:(text:string)=>text+' FIL'
    },
        {
        title: 'token_contract',
        dataIndex: 'contract_id',
    }

]
}

//    message_list_total:'共 {{value}} 条消息',


export const ft_tabs:any= [
    { label: 'transfer', value: 'transfer',url:'ERC20Transfer',total:'transfer_total' },
    { label: 'owner', value: 'owner', url: 'ERC20Owner' ,total:'owner_total'},
    // {
    //     label: (tr:any) => {
    //         return <span className="flex-center">
    //             { getSvgIcon('successIcon') }
    //              { tr('domain')}
    //             </span>
    //     }, value: 'domain', links: 'FnsDomainDetail'
    // },
    
    { label: 'dex', value: 'dex',url:'',total:'dex_total' },
]

export const token = {
  title: 'token_list',
  columns: [
      {
          dataIndex: 'rank', title: 'rank', render: (text:any,record:any,index:any) => { 
              return index+1
      }},
      {
          dataIndex: 'token_name', title: 'token_name', render: (text: string,record:any) => { 
              const ImgUrl =fvmUrl + `/images/${text?.toLocaleUpperCase()}.jpeg`
              return <Link href={`/token/${record.contract_id}`} className='flex-center'>
                  <Image src={ImgUrl} alt='' height={38} width={38} ></Image>
                  <span>{text.toLocaleUpperCase()}</span>
              </Link>
      }},
    {
          dataIndex: 'total_supply', title: 'total_supply', render: (text: string | number) => { 
          return text? Number(text)?.toLocaleString() : '--'
      } },
    { dataIndex: 'vol_24', title: 'vol_24',render:(text:string)=>text+'FIL' },
    { dataIndex: 'latest_price', title: 'latest_price',render:(text:string)=>text+'FIL'  },
    { dataIndex: 'market_cap', title: 'market_value',render:(text:string)=>text+'FIL'  },
    {dataIndex:'owners',title:'owners',},

  ]
}

const transfer_columns = [
    {
        dataIndex: 'cid', title: 'message_cid',
          render: (text: string) => text? <Link href={`/message/${text}` }className='link'>{ text?isIndent(text,6):''}</Link>:'--'
    },
    {dataIndex:'method',title:'method',},
    {dataIndex:'time',title:'time', render: (text: string|number)=> formatDateTime(text,'YYYY-MM-DD HH:mm')},
    {dataIndex:'from',title:'from', render: (text: string,record:any) => get_account_type(record.from_type,text)},
    {dataIndex:'to',title:'to', render: (text: string,record:any) => get_account_type(record.from_type,text)},
    {dataIndex:'amount',title:'amount',render: (text: string,record:any) =>text? Number(text).toLocaleString() :text ||'--'},
]

const owner_columns = [
      { dataIndex: 'rank', title: 'rank', },
    {dataIndex:'owner',title:'owner',},
    {dataIndex:'time',title:'time', render: (text: string|number)=> formatDateTime(text,'YYYY-MM-DD HH:mm')},
    {dataIndex:'amount',title:'amount',},
    { dataIndex: 'percentage', title: 'percentage', },
    {dataIndex:'value',title:'Value',},
]

const Dex_columns = [
    { dataIndex: 'rank', title: 'rank', },
    {dataIndex:'owner',title:'owner',},
    {dataIndex:'time',title:'Action',},
    {dataIndex:'out',title:'Token_Amount_out',},
    { dataIndex: 'in', title: 'Token_Amount_in', },
    { dataIndex: 'value', title: 'swapped_Rate', },
        { dataIndex: 'Txn_Value', title: 'Txn_Value', },
    {dataIndex:'value',title:'platform',},
]



export const getContractColumns = (active: string) => { 
    if (active === 'transfer') {
        return transfer_columns
    } else if (active === 'owner') {
        return owner_columns
    } else if (active === 'dex') { 
        return Dex_columns
    }
  
}




export const detail = {
    title: {
        label:'detail_title',
    },
    tabs: [
      
        { label: 'in_transaction',value:'transaction' },
    
    ]
}

