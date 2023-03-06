
const baseUrl = process.env.NEXT_PUBLIC_BASE_YAPI || 'http://192.168.1.189:17000/api/v1';
const devUrl = process.env.NEXT_BASE_URL||'http://192.168.1.189:27000/api/v1'


console.log('===33',process.env.NEXT_PUBLIC_BASE_YAPI)
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
    home_meta: devUrl + '/TotalIndicators',
    line_trend: devUrl + '/BaseLineTrend',
    static_gas: devUrl + '/BaseFeeTrend',
    static_gas_24:baseUrl + '/GasDataTrend',
    rank_pool: baseUrl + '/OrePoolRank',
    rank_provider: baseUrl + '/MinerRank',
    tipset_chain: baseUrl + '/LatestBlocks',
    tipset_chain_list: baseUrl + '/TipSetTree',
    tipset_message_opt: baseUrl + '/GetMessagesMethods',
    tipset_message: baseUrl + '/GetAllMessages',
    tipset_address: baseUrl + '/GetRichAccounts',
    tipset_transfer: baseUrl + '/GetLargeTransfers',
    tipset_Dsn: baseUrl + '/GetMarketDeals',
    tipset_pool: devUrl + '/MessagesPool',
    detail_owne: baseUrl + '/AccountInfoByID',
    detail_message: devUrl + '/MessageDetails',
    detail_miner_list:devUrl,
}