

const message_list = {
    title: 'message_list',
    total_list:'total_list',

}

const message_list_columns=[
                {
                    dataIndex: 'cid',
                    title:'message_list_cid'
                },
                {
                    dataIndex: 'height',
                    title: 'message_list_height',
                    
                },
                {
                    dataIndex: 'block_time',
                    title: 'message_list_block_time',
                    
                },
                {
                      dataIndex: 'from',
                    title: 'message_list_from',
                },
                 {
                    dataIndex: 'to',
                    title:'message_list_to'
                },
                {
                    dataIndex: 'value',
                    title: 'message_list_value',
                    
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

export {message_list,message_list_columns,address_list,address_list_columns}