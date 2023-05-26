
const baseUrl =  'http://192.168.1.189:17000/api/v1';
const mianUrl = process.env.APP_BASE_URL;

console.log('=====3',process.env.APP_BASE_URL)
export interface API { 
    home_meta: string;
    line_trend: string;
    static_gas: string;
    rank_pool: string;
    rank_provider: string;
    tipset_chain: string;
    tipset_message_opt: string;
    tipset_message: string;
}

export const apiUrl: API | any = {
    searchInfo:mianUrl+'/SearchInfo',
    home_meta: mianUrl + '/TotalIndicators',
    line_trend: mianUrl + '/BaseLineTrend',
    static_gas: mianUrl + '/BaseFeeTrend',
    static_gas_24: mianUrl + '/GasDataTrend',
    static_fil_chart:mianUrl +'/FilCompose',
    static_block_trend: mianUrl + '/BlockRewardTrend',
    static_active_miner: mianUrl + '/ActiveMinerTrend',
    static_message_trend:mianUrl+'/MessageCountTrend',
    rank_pool: mianUrl + '/OwnerRank',
    rank_provider: mianUrl + '/MinerRank',
    rank_growth: mianUrl + "/MinerPowerRank",
    rank_rewards:mianUrl+'/MinerRewardRank',
    tipset_chain: mianUrl + '/LatestBlocks',
    tipset_chain_FinalHeight: mianUrl + '/FinalHeight', 
    tipset_BlockDetails: mianUrl + '/BlockDetails',
    tipset_Block_meaages: mianUrl + '/MessagesByBlock',
    tipset_message_opt: mianUrl + '/AllMethods',
    tipset_message_pool_opt:mianUrl +'/AllMethodsByMessagePool',
    tipset_block_message_opt:mianUrl +'/AllMethodsByBlock',
    tipset_message: mianUrl + '/LatestMessages',
    tipset_address: mianUrl + '/RichAccountRank',
    tipset_transfer: mianUrl + '/LargeTransfers',
    tipset_Dsn: mianUrl + '/SearchMarketDeals',
    tipset_pool: mianUrl + '/MessagesPool',
    detail_account: mianUrl + '/AccountInfoByID',
    detail_owner:mianUrl +'/AccountOwnerByID',
    detail_message: mianUrl + '/MessageDetails',
    detail_miner_list: mianUrl,
    detail_list_method: mianUrl + '/AllMethodByAccountID',
    detail_deal:mianUrl +'/DealDetails',
    account_change: mianUrl + '/BalanceTrendByAccountID',
    account_trend: mianUrl + '/PowerTrendByAccountID',
    detail_Indicators: mianUrl + '/IndicatorsByAccountID',
}