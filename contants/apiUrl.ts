
const baseUrl = process.env.NEXT_PUBLIC_BASE_YAPI || 'http://192.168.1.189:17000/api/v1';
const devUrl = process.env.NEXT_BASE_URL||'http://192.168.1.189:27000/api/v1'

export interface API { 
    home_meta: string;
    line_trend: string;
    static_gas: string;
    rank_pool: string;
    rank_provider: string;
    tipset_chain: string;
    tipset_message_opt: string;
    tipset_message: string;
    tipset_chain_list:string
}

export const apiUrl: API | any = {
    searchInfo:devUrl+'/SearchInfo',
    home_meta: devUrl + '/TotalIndicators',
    line_trend: devUrl + '/BaseLineTrend',
    static_gas: devUrl + '/BaseFeeTrend',
    static_gas_24:baseUrl + '/GasDataTrend',
    rank_pool: devUrl + '/OwnerRank',
    rank_provider: devUrl + '/MinerRank',
    rank_growth: devUrl + "/MinerPowerRank",
    rank_rewards:devUrl+'/MinerRewardRank',
    tipset_chain: devUrl + '/LatestBlocks',
    tipset_chain_height: devUrl + '/FinalHeight', 
    tipset_chain_list: baseUrl + '/TipSetTree',
    tipset_BlockDetails:devUrl+'/BlockDetails',
    tipset_message_opt: devUrl + '/AllMethods',
    tipset_message: devUrl + '/LatestMessages',
    tipset_address: baseUrl + '/GetRichAccounts',
    tipset_transfer: baseUrl + '/GetLargeTransfers',
    tipset_Dsn: baseUrl + '/GetMarketDeals',
    tipset_pool: devUrl + '/MessagesPool',
    detail_account: devUrl + '/AccountInfoByID',
    detail_message: devUrl + '/MessageDetails',
    detail_miner_list: devUrl,
    detail_list_method:devUrl + '/AllMethodByAccountID',
    account_change: devUrl + '/BalanceTrendByAccountID',
    account_trend: devUrl + '/PowerTrendByAccountID',
    detail_Indicators:devUrl+'/IndicatorsByAccountID'
    
}