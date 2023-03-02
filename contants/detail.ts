

const detail_owner = {
    title: {
        label: 'owner_title',
        tip:'owner_title_tip'
    },
    content: [
        {label: 'account', dataIndex: 'account_address', type: ['account_ore_pool','account_ore'] },
        {label:'owner_address',dataIndex:'owner_address',type:['account_ore_pool']},
        {label:'owned_miners',dataIndex:'owned_miners',type:['account_ore_pool']}
    ]
}
const detail_owner_overview = {
    
     title: {
        label: 'owner_overview_title',
    },

    list: {
        title: 'balance',
        content:[
        {label: 'available_balance', dataIndex: 'available_balance', type: ['account_ore_pool','account_ore',],showValue:'53298.8501988961943544' },
        {label:'init_pledge',dataIndex:'init_pledge', type: ['account_ore_pool','account_ore',],showValue:'1320853.8586000049537222'},
        { label: 'pre_deposits', dataIndex: 'pre_deposits', type: ['account_ore_pool', 'account_ore',],showValue:'0' },
        {label:'locked_balance',dataIndex:'locked_balance',type: ['account_ore_pool','account_ore',],showValue:'249105.345078382241285'}
     ]
    },
    power_list: {
        header: [
        { label: 'quality_adjust_power', dataIndex: 'quality_adjust_power', type: ['account_ore_pool', 'account_ore',] },
        { label: 'quality_power_rank', dataIndex: 'quality_power_rank', type: ['account_ore_pool', 'account_ore',] },
        ],
        content:[
        { label: 'raw_power_percentage', dataIndex: 'raw_power_percentage', type: ['account_ore_pool', 'account_ore',] },
        { label: 'raw_power', dataIndex: 'raw_power', type: ['account_ore_pool', 'account_ore',] },
         { label: 'total_block_count', dataIndex: 'total_block_count', type: ['account_ore_pool', 'account_ore',] },
        {label:'total_reward',dataIndex:'total_reward',type: ['account_ore_pool','account_ore',]},
    ]
    } 

  
 }

export { detail_owner,detail_owner_overview}