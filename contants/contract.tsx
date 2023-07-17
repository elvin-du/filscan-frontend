import { getSvgIcon } from "@/svgUtils"
import {  formatDateTime, formatFilNum, formatNumber, getImgUrl, isIndent } from "@/utils/utils"
import { get_account_type } from "./varible"
import Link from "next/link";
import Image from "@/packages/image";
import Copy from '@/components/copy';
import { fvmUrl } from "./apiUrl";


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
                  <Image className="fvm_img_url" src={getImgUrl(text)} alt='' height={38} width={38} ></Image>
                  <span className="margin-6">{text}</span>
              </Link>
      }},
    {
          dataIndex: 'total_supply', title: 'total_supply', render: (text: string | number) => { 
          return text? formatNumber(text,4) : '--'
      } },
    { dataIndex: 'vol_24', title: 'vol_24',render:(text:string)=>text?'$' + formatNumber(text,4)  : '--'},
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
    {dataIndex:'value',title:'Value',render:(text:any)=>text? '$ ' + formatNumber(text,4) :''},
]

const Dex_columns = [
    { dataIndex: 'cid', title: 'message_cid', render: (text: string) => text? <Link href={`/message/${text}` }className='link'>{ text?isIndent(text,6):''}</Link>:'--' },
    { dataIndex: 'time', title: 'time', render: (text: string) => formatDateTime(text, 'YYYY-MM-DD HH:mm') },
    {
        dataIndex: 'action', title: 'Action', render: (text: string) => { 
            const color = text === 'buy' ?  'green': text === 'sell'?'red':''
            return <span style={{color}}>{text?  text[0].toUpperCase() + text.substr(1) :text  }</span>
    }},

    {
        dataIndex: 'amount_out', title: 'Token_Amount_out', render: (text:number,record:any) => { 
        return formatNumber(text,4)+ ' '+ record?.amount_out_token_name
    }},
    { dataIndex: 'amount_in', title: 'Token_Amount_in',render: (text:number,record:any) => { 
        return formatNumber(text,4) +' '+ record?.amount_in_token_name
    } },
    { dataIndex: 'swap_rate', title: 'swapped_Rate',render:(text:string,record:any)=>text? text + ' ' + record.swap_token_name :'' },
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
    columns: (active: any,lang:any) => { 
        return  [
      {
          dataIndex: 'rank', title: 'rank', render: (text:any,record:any,index:any) => { 
              return index+1
      }},
      {
          dataIndex: 'collection', title: 'Collection', render: (text: string, record: any) => { 
              const activeLink: any = active[text.toLocaleUpperCase().replaceAll(' ', '')];    
              const showLang = lang === 'zh' ? 'zh' : 'en';// 存在韩语
              return <div className="flex_align_center" key={text+lang}>
                   <Link href={`/nft/${record.provider}`} >
                  <Image  className="fvm_img_url" src={record.icon} alt='' height={38} width={38} ></Image>
                  <span className="margin-6"> {text.toLocaleUpperCase()}</span>
                 
                  </Link>
                  {activeLink && <div className="margin-30" style={{ cursor: 'pointer' } } onClick={() => { 
                      if (activeLink.link) { 
                          window.open(activeLink.link)
                      }
                  }}>
                   <Image alt='' src={`${fvmUrl}/active/image/${activeLink.img}_${showLang}.svg`} height={38} width={233}></Image>
                      
                  </div>}
                 
                  
              </div>
             
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


const nft_transfer_columns = (fromList: any, toList: any) => { 
    return [
    {
        dataIndex: 'cid', title: 'message_cid',
        render: (text: string) => text? <Link href={`/message/${text}` }className='link'>{ text?isIndent(text,6):''}</Link>:'--'
    },
    {dataIndex:'method',title:'method',},
    {dataIndex:'time',title:'time', render: (text: string|number)=> formatDateTime(text,'YYYY-MM-DD HH:mm')},
    {
            dataIndex: "from", title: "from", render: (text: string, record: any) => { 
              if (!text) return '--';
              return <span className="table_li">
                {get_account_type(record.from_type, text)}
                  {fromList?.domains && fromList?.domains[text] && <Link href={`/domain/${fromList.domains[text]}?provider=${fromList.provider}`}>({fromList.domains[text]})</Link>
                  }
              </span>
     }},
          { dataIndex: "to", title: "to" ,     render: (text: string, record: any) => { 
              if (!text) return '--';
            return <div className="table_li">
              <div>
                  {get_account_type(record.to_type, text)}
                </div>
                
                {toList?.domains && toList?.domains[text] &&<Link href={`/domain/${toList.domains[text]}?provider=${toList.provider}`}>({toList.domains[text]})</Link>
                        
                    }
              </div>
          }},
    {dataIndex:'item',title:'item',render: (text: string,record:any) =>text || '--'},
]
} 

const nft_owner_columns = (fromList: any, toList: any) => { 
    return [
      { dataIndex: 'rank', title: 'rank', },
    {dataIndex:'controller',title:'controller',render: (text: string, record: any) => { 
              if (!text) return '--';
              return <span className="table_li">
                  { text}
                {fromList?.domains && fromList?.domains[text] && <Link href={ `/domain/${fromList.domains[text]}?provider=${fromList.provider}`}>({ fromList.domains[text]})</Link>}
              </span>
     }},
    {dataIndex:'amount',title:'amount',render: (text: string,record:any) =>text?  formatNumber(text,4)  :text ||'--'},
    { dataIndex: 'percentage', title: 'percentage', render: (text: string,record:any) =>text? Number(Number(text)*100) .toFixed(4) +'%' :text ||'--'},
]

} 


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

export const getNftsColumns = (active: string,fromList?:any,toList?:any) => { 
    if (active === 'transfer') {
        return nft_transfer_columns(fromList,toList);
    } else if (active === 'owner') {
        return nft_owner_columns(fromList,toList);
    } else if (active === 'dex') { 
        return Dex_columns
    }
  
}


// contract list 

export const contract_list = {
    title: 'contract_list',
    total:'contract_list_total',
    columns: [
        {
            dataIndex: 'contract_address', title: 'contract_address', render: (text:any,record:any) => { 
                if (!text) return '--'
                return <Link className="link" href={`/address/${text}`} >{ text}</Link>
        } },
        { dataIndex: 'contract_name', title: 'contract_name',render: (text:any,record:any) => { 
                if (!text) return '--'
                return <Link  href={`/address/${record.contract_address}`} >{ text}</Link>
        } },
        { dataIndex: 'language', title: 'language' },
        { dataIndex: 'compiler', title: 'compile_version' },
        { dataIndex: 'optimize_runs', title: 'Optimizations' },
        { dataIndex: 'license', title: 'license',render:(text:any)=> text || 'No License(None)' }
    ]
}

export const contract_rank = {
    title: 'contract_rank',
    title_des:'contract_rank_des',
    options: [
        { label: 'transaction_count', value: 'transfer_count' },
        {label:'actor_balance',value:'actor_balance'},
        {label:'gas_cost',value:'gas_cost'},
        {label:'user_count',value:'user_count'}
    ],
      total_msg:'contract_rank_total',
        columns: [
            {
                dataIndex: 'rank', title: 'rank',
                width:'5%',
            
            },
          {
              dataIndex: 'contract_address',
              width: '15%',
            title: 'contract_address', render: (text:any,record:any) => { 
                if (!text) return '--'
                return <Link className="link" href={`/address/${text}`} >{ isIndent(text,8)}</Link>
            }
        },
        {
            dataIndex: 'contract_name', title: 'contract_name'},
      
        { dataIndex: 'transfer_count',width: '15%', title: 'transaction_count',sorter:true},
        { dataIndex: 'user_count',width: '15%', title: 'user_count',sorter:true },
        { dataIndex: 'actor_balance',width: '15%', title: 'actor_balance',render:(text:number)=>formatFilNum(text),sorter:true },
        { dataIndex: 'gas_cost',width: '15%', title: 'gas_cost' ,render:(text:number)=>formatFilNum(text),sorter:true},
    ]
}

export const contract_detail = {
    overview: {
        title: (tr: any) => <span className="table_li">
            <span className="success_color">
             { getSvgIcon('successIcon')}
            </span>
            { tr('verify_contract')}
        </span>   ,
        list: [
            [
            {
             dataIndex: 'contract_name', title: 'contract_name',     
            },
            {
                dataIndex: 'optimize', title: 'optimize', render: (text: boolean, record: any) => { 
                    return text ? text+` width (${record.optimize_runs}) runs`: String(text)
                }
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
    abi:{
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
        byte_code: {
                noVerify:'byte_code_no_verify',
                title: 'source_code_create',
                copy:'true',
                text:'byte_code'
            },
}



export const contract_log = [
    {
        dataIndex: 'epoch',
        label:'epoch'
    },
     {
        dataIndex: 'cid',
         label: 'cid',
         render: (text: string) => <Link href={`/message/${text}`} className='link'>{ text}</Link>
    },
     {
        dataIndex: 'event_name',
        label:'event_name'
    },
    {
        dataIndex: 'topics',
        label: 'topics',
        render: (text:any,record:any) => { 
      if (Array.isArray(text)) { 
        return text.map((item:string,index:number) => { 
          return <li key={item} className='array_item' >
            <span className="array_item_icon">{ index}</span>
            { item}
          </li>
        })
      }
      return text||'--'
     
  }
    }, {
        dataIndex: 'data',
        label: 'coompoent_data',
        render: (text:string) => {
      return <div className="bg-render">
        { text}
    </div>
   }
    }, {
        dataIndex: 'log_index',
        label:'log_index',
        render:(text:number)=> text
    },
     {
        dataIndex: 'removed',
         label: 'removed',
        render:(text:boolean)=> String(text)
    },
    
]
