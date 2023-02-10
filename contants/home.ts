



export const home_meta = {
    title: {
        label: 'meta_title',
    },
    list:[
    {label:'latest_height' },//最新区块高度
    {label:'latest_block_time' },//最新区块时间
    { label: 'total_blocks' }, //全网出块数量
    { label: 'total_rewards' }, //全网出块奖励，单位Fil	
    { label: 'total_quality_power' }, //全网有效算力
    { label: 'base_fee' }, //当前基础费率
    { label: 'miner_initial_pledge' }, //当前扇区质押量
    { label: 'power_increase_24h' }, //近24h增长算力
    { label: 'rewards_increase_24h' }, //近24h出块奖励	
    { label: 'fil_per_tera_24h' }, //近24h产出效率，单位Fil/T	
    { label: 'gas_in_32g' }, //32GiB扇区Gas消耗，单位Fil/T	
    { label: 'add_power_in_32g' }, //32GiB扇区新增算力成本，单位Fil/T
     { label: 'gas_in_64g' }, //64GiB扇区Gas消耗，单位Fil/T	
    { label: 'add_power_in_64g' }, //64GiB扇区新增算力成本，单位Fil/T	
    { label: 'win_count_reward' }, //每赢票奖励，单位Fil		
    { label: 'avg_block_count' }, //平均每高度区块数量	
    { label: 'avg_message_count' }, //平均每高度消息数	
    { label: 'active_miners' }, //活跃节点数
    { label: 'burnt' }, //销毁量	
    { label: 'circulating_percent' }, //流通率	
]
}