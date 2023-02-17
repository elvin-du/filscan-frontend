
const baseUrl = process.env.NEXT_BASE_URL||'http://192.168.1.189:17000/api/v1';

export const apiUrl = {
    home_meta: baseUrl+'/TotalIndicators',
    line_trend: baseUrl + '/BaseLineTrend',
    static_gas:baseUrl+'/BaseFeeTrend'
}