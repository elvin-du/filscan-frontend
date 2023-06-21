import { getSvgIcon } from "@/svgUtils"
import {  formatDateTime, formatNumber, getImgUrl, isIndent } from "@/utils/utils"
import { get_account_type } from "./varible"
import Link from "next/link";
import Image from "next/image";
import Copy from '@/components/copy';

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
                 loading: true,
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
            {
                dataIndex: 'compiler', title: 'compiler'},
            {dataIndex:'optimize',title:'optimize'},
            {dataIndex:'optimize_runs',title:'optimize_runs'},

        ],
        others: [
            {
                title: 'contract_name',
                dataIndex: 'contract_name',
                style: {
                    height:'36px'
                }
            },
             {
                title: 'local_byte_code',
                dataIndex:'local_byte_code'
            }
        ]
    }


  
}


export const overview = {
    title: {
        label:'overview',
    },
    content: [
    {
        title: 'total_supply',
            dataIndex: 'total_supply',
            render: (text:string) => { 
                return text ?formatNumber(text,4):text||'--'
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

export const fns_overview = {
        title: {
        label:'overview',
    },
    content: [
    {
        title: 'Items',
            dataIndex: 'total_supply',
            render: (text:string) => { 
                return text ?formatNumber(text,4):text||'--'
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
        render:(text:string)=>text?'$'+ text:'--'
    },
      {
        title: 'market_value',
        dataIndex: 'market_cap',
        render:(text:string)=>text ?'$'+formatNumber(text,4):text||'--'
    },
        {
        title: 'token_contract',
        dataIndex: 'contract_id',
    }

]
}


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
    
    { label: 'dex', value: 'dex',url:'ERC20DexTrade',total:'dex_total' },
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
              return <Link href={`/token/${record.contract_id}`} >
                  <Image  className="fvm_img_url" src={getImgUrl(text)} alt='' height={38} width={38} ></Image>
                  <span className="margin-6"> { text.toLocaleUpperCase()}</span>
              </Link>
      }},
    {
          dataIndex: 'total_supply', title: 'total_supply', render: (text: string | number) => { 
          return text? formatNumber(text,4) : '--'
      } },
    { dataIndex: 'vol_24', title: 'vol_24',render:(text:string)=>text?'$' + text  : '--'},
    { dataIndex: 'latest_price', title: 'latest_price',render:(text:string)=>text? '$' + text : '--' },
    { dataIndex: 'market_cap', title: 'market_value',render:(text:string)=>text? '$' + formatNumber(text,4) : '--' },
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
    {dataIndex:'amount',title:'amount',render: (text: string,record:any) =>text? formatNumber(text,4) :text ||'--'},
]

const owner_columns = [
      { dataIndex: 'rank', title: 'rank', },
    {dataIndex:'owner',title:'owner',},
    {dataIndex:'amount',title:'amount',render: (text: string,record:any) =>text?  formatNumber(text,4)  :text ||'--'},
    { dataIndex: 'rate', title: 'percentage', render: (text: string,record:any) =>text? Number(text).toFixed(4) +'%' :text ||'--'},
    {dataIndex:'value',title:'Value',render:(text:any)=>text? text +' FIL' :''},
]

const Dex_columns = [
    { dataIndex: 'cid', title: 'message_cid', render: (text: string) => text? <Link href={`/message/${text}` }className='link'>{ text?isIndent(text,6):''}</Link>:'--' },
    { dataIndex: 'time', title: 'time', render: (text: string) => formatDateTime(text, 'YYYY-MM-DD HH:mm') },
    {
        dataIndex: 'action', title: 'Action', render: (text: string) => { 
            const color =text === 'buy' ? 'green':'red'
            return <span style={{color}}>{text?  text[0].toUpperCase() + text.substr(1) :text  }</span>
    }},

    {
        dataIndex: 'amount_out', title: 'Token_Amount_out', render: (text:number,record:any) => { 
        return formatNumber(text,4)+ ' '+ record?.amount_out_token_name
    }},
    { dataIndex: 'amount_in', title: 'Token_Amount_in',render: (text:number,record:any) => { 
        return formatNumber(text,4) +' '+ record?.amount_in_token_name
    } },
    { dataIndex: 'swap_rate', title: 'swapped_Rate',render:(text:string)=>text? text +' FIL' :'' },
    { dataIndex: 'value', title: 'Txn_Value', render:(text:string)=>text? formatNumber(text,4)  +' FIL' :'' },
    { dataIndex: 'dex', title: 'platform', render: (text: string) => <Image className="fvm_img_url" alt="" width={25} height={ 25} src={getImgUrl(text)} />},
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




export const nfts = {
  title: 'nfts_list',
  columns: [
      {
          dataIndex: 'rank', title: 'rank', render: (text:any,record:any,index:any) => { 
              return index+1
      }},
      {
          dataIndex: 'collection', title: 'Collection', render: (text: string,record:any) => { 
              return <Link href={`/nft/${record.provider}`} >
                  <Image  className="fvm_img_url" src={record.icon} alt='' height={38} width={38} ></Image>
                  <span className="margin-6"> { text.toLocaleUpperCase()}</span>
              </Link>
          }
      },
      
    // {
    //       dataIndex: 'trading_volume', title: 'trading_volume', render: (text: string | number) => { 
    //       return text? formatNumber(text,4) : '--'
    //       }
    //   },
    {dataIndex:'holders',title:'owners',},
    { dataIndex: 'transfers', title: 'transfers',render:(text:string)=>text?formatNumber(text,4) : '--'},

  ]
}

export const nfts_market={
    title: {
        label:'market',
    },
    content:[
        {
        title: 'token_contract',
            dataIndex: 'contract',
            render: (text: string) => { 
                if (text) { 
                  return   <span className="flex-center" >
                            <Link href={`/address/${text}`} className='link'>{text}</Link>
                            <Copy text={ text}/>
                        </span>
                }
                return '--'
            }
    }

]
}


const nft_transfer_columns = [
    {
        dataIndex: 'cid', title: 'message_cid',
        render: (text: string) => text? <Link href={`/message/${text}` }className='link'>{ text?isIndent(text,6):''}</Link>:'--'
    },
    {dataIndex:'method',title:'method',},
    {dataIndex:'time',title:'time', render: (text: string|number)=> formatDateTime(text,'YYYY-MM-DD HH:mm')},
    {dataIndex:'from',title:'from', render: (text: string,record:any) => get_account_type(record.from_type,text)},
    {dataIndex:'to',title:'to', render: (text: string,record:any) => get_account_type(record.from_type,text)},
    {dataIndex:'item',title:'item',render: (text: string,record:any) =>text || '--'},
]

const nft_owner_columns = [
      { dataIndex: 'rank', title: 'rank', },
    {dataIndex:'controller',title:'controller',},
    {dataIndex:'amount',title:'amount',render: (text: string,record:any) =>text?  formatNumber(text,4)  :text ||'--'},
    { dataIndex: 'percentage', title: 'percentage', render: (text: string,record:any) =>text? Number(text).toFixed(4) +'%' :text ||'--'},
]


export const nft_tabs:any= [
    { label: 'transfer', value: 'transfer',url:'FnsTransfers',total:'transfer_total' },
    { label: 'owner', value: 'owner', url: 'FnsControllers' ,total:'owner_total'},
    // {
    //     label: (tr:any) => {
    //         return <span className="flex-center">
    //             { getSvgIcon('successIcon') }
    //              { tr('domain')}
    //             </span>
    //     }, value: 'domain', links: 'FnsDomainDetail'
    // },
    
    // { label: 'dex', value: 'dex',url:'ERC20DexTrade',total:'dex_total' },
]

export const getNftsColumns = (active: string) => { 
    if (active === 'transfer') {
        return nft_transfer_columns
    } else if (active === 'owner') {
        return nft_owner_columns
    } else if (active === 'dex') { 
        return Dex_columns
    }
  
}


// contract list 

export const contract_list = {
    title: 'contract_list',
    columns: [
        {
            dataIndex: 'contract_address', title: 'contract_address', render: (text:any,record:any) => { 
                if (!text) return '--'
                return <Link className="link" href={`/address/${text}`} >{ text}</Link>
        } },
        { dataIndex: 'contract_name', title: 'contract_name' },
        { dataIndex: 'language', title: 'language' },
        { dataIndex: 'compiler', title: 'compile_version' },
        { dataIndex: 'optimize_runs', title: 'Optimizations' },
        { dataIndex: 'license', title: 'license' }
    ]
}

export const contract_detail = {
    overview: {
        title: (tr: any) => <span className="table_li">
            { getSvgIcon('successIcon')}
            { tr('verify_contract')}
        </span>   ,
        list: [
            [
            {
             dataIndex: 'contract_name', title: 'contract_name',     
            },
            {
                dataIndex:'optimize',title:'optimize',
            }
            ],
            [
            {
             dataIndex: 'compiler', title: 'compiler',     
            },
            {
             dataIndex:'license',title:'license',
            }
            ]
        ]
    },
    code: {
        title: 'source_code',
        content: 'source_code',
        copy: true,
        link:true
    },
    other: [
         
        {
            title: 'source_abi',
            copy:'true',
            options: {
                placeholder: 'source_abi_default',
                list: [
                { label: 'Json_Format', value: 'json' },
                {label:'Text_Format',value:'text'}
            ],
            },
            text:'ABI'
        },
           {
            title: 'source_code_create',
            copy:'true',
            text:'byte_code'
        },
    ]
}


