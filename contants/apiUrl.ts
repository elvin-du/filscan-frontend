
const baseUrl = process.env.NEXT_BASE_URL || 'http://192.168.1.189:17000/api/v1';


export interface API { 
    home_meta: string;
    line_trend: string;
    static_gas: string;
    rank_pool: string;
    rank_provider:string
}

export const apiUrl:API|any= {
    home_meta: baseUrl+'/TotalIndicators',
    line_trend: baseUrl + '/BaseLineTrend',
    static_gas: baseUrl + '/BaseFeeTrend',
    rank_pool: baseUrl + '/OrePoolRank',
    rank_provider:baseUrl + '/MinerRank'
}