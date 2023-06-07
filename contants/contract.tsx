import { getSvgIcon } from "@/svgUtils"
import { formatFilNum } from "@/utils/utils"
import { spawn } from "child_process"
import { get_account_type } from "./varible"

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
                 className: 'custom_ok_btn'
            },
            //  {
            //      label: 'compile_output',
            //       className: 'custom_border_btn'
            // }
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
                className: 'custom_ok_btn',
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
                className: 'custom_ok_btn',
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
        title: 'value',
        dataIndex: 'value',
    },
      {
        title: 'market_value',
        dataIndex: 'contract_adress',
    },
        {
        title: 'token_contract',
        dataIndex: 'contract_adress',
    }

]
}

export const ft_tabs:any= [
    { label: 'transfer', value: 'transfer',url:'FnsTransfers' },
    { label: 'owner', value: 'owner', url: 'FnsOwners' },
    {
        label: (tr:any) => {
            return <span className="flex-center">
                { getSvgIcon('successIcon') }
                 { tr('domain')}
                </span>
        }, value: 'domain', links: 'FnsDomainDetail'
    },
    
    { label: 'dex', value: 'dex',url:'' },
]


const transfer_columns = [
    {dataIndex: 'cid', title: 'message_cid', },
    {dataIndex:'method',title:'method',},
    {dataIndex:'time',title:'time',},
    {dataIndex:'from',title:'from',},
    {dataIndex:'to',title:'to',},
    {dataIndex:'item',title:'amount',},
]

const owner_columns = [
      { dataIndex: 'rank', title: 'rank', },
    {dataIndex:'owner',title:'owner',},
    {dataIndex:'time',title:'time',},
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

const domain_columns = [

]


export const getContractColumns = (type: string, active: string) => { 
    if (active === 'transfer') {
        return transfer_columns
    } else if (active === 'owner') {
        return owner_columns
    } else if (active === 'dex') { 
        return Dex_columns
    }
    // if (type === 'ft' && active === 'transfer') { 
    //     return transfer_columns
    // }
}




export const detail = {
    title: {
        label:'detail_title',
    },
    tabs: [
      
        { label: 'in_transaction',value:'transaction' },
    
    ]
}

