

const message_list = {
    title: 'message_list',
    total_list:'total_list',

}

const message_list_columns=[
                {
                    dataIndex: 'cid',
                    title:'cid'
                },
                {
                    dataIndex: 'height',
                    title: 'height',
                    
                },
                {
                    dataIndex: 'block_time',
                    title: 'block_time',
                    
                },
                {
                      dataIndex: 'from',
                    title: 'from',
                },
                 {
                    dataIndex: 'to',
                    title:'to'
                },
                {
                    dataIndex: 'value',
                    title: 'value',
                    
                },
                {
                    dataIndex: 'exit_code',
                    title: 'message_list_exit_code',
                    
                },
                {
                      dataIndex: 'method_name',
                    title: 'message_list_method_name',
                }
 ]

const address_list = {
    title: 'address_list',
    total_list: 'total_list',
    options: [
        { value: '0',  label: 'address_all' },
        { value: '1',label: 'account' },
        { value: '2',  label: 'owner' },
        { value: '3',  label: 'miner' },
        // { value:"system", index: "4", label:"系统账户" },
        // { value:"init", index: "5", label:"初始化账户" },
        // { value:"cron", index: "6", label:"定时任务" },
        // { value:"power", index: "7", label:"存储算力" },
        // { value:"market", index: "8", label:"市场账户" },
        { value: '9',  label: 'payment' },
        { value: '10', label: 'multisig' }
        // { value:"reward", index: "11", label:"奖励账户" },
      ]
}
const address_list_columns=[
                {
                    dataIndex: 'rank',
                    title: 'rank',
                    render:(_text:string,record:Record<string,any>,index:number)=>index+1
                },
                {
                    dataIndex: 'account_address',
                    title: 'account_address',
                    
                },
                {
                    dataIndex: 'tag',
                    title: 'tag',
                    render:()=>'--'
                },
                {
                    dataIndex: 'balance',
                    title: 'balance_percentage',
                    rowKey:'balance_percentage',
                    render: (text:string,record:any) => { 
                        return text
                    }
                },
                 {
                    dataIndex: 'account_type',
                    title:'account_type'
                },
                {
                    dataIndex: 'latest_transfer_time',
                    title: 'latest_transfer_time',
                    
                },
               
]
 
const transfer_list = {
    title: 'transfer_list',
    total_list: 'total_list',
}

const transfer_columns = [
     {
        dataIndex: 'height',
        title: 'height',
                    
    },
     {
        dataIndex: 'cid',
        title: 'cid',
                    
    },
      {
        dataIndex: 'block_time',
        title: 'block_time',
                    
    },
       {
        dataIndex: 'from',
        title: 'from',
                    
    },
        {
        dataIndex: 'to',
        title: 'to',
                    
    },
         {
        dataIndex: 'value',
        title: 'value',
                    
    },
          {
        dataIndex: 'method_name',
        title: 'method_name',
                    
    },

]

const dsn_list = {
    title: 'dsn_list',
    total_list: 'total_list',
    placeholder:'dsn_placeholder'
}

const dsn_columns = [
    {
        dataIndex: 'deal_id',
        title:'deal_id'
    },
     {
        dataIndex: 'piece_cid',
        title:'piece_cid'
    },
      {
        dataIndex: 'piece_size',
        title:'piece_size'
    },
       {
        dataIndex: 'client_address',
        title:'client_address'
    }, {
        dataIndex: 'provider_id',
        title:'provider_id'
    },
    {
        dataIndex: 'service_start_time',
        title:'service_start_time'
    },

      {
        dataIndex: 'end_time',
        title:'end_time'
    },
       {
        dataIndex: 'start_height',
        title:'start_height'
    }, {
        dataIndex: 'end_height',
        title:'end_height'
    },
     {
        dataIndex: 'storage_price_per_height',
        title:'storage_price_per_height'
    },
      {
        dataIndex: 'verified_deal',
        title:'verified_deal'
    },
      
    
]

export {message_list,message_list_columns,address_list,address_list_columns,transfer_list,transfer_columns,dsn_list,dsn_columns}