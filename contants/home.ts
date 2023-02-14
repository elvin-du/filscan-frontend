

import { unitConversion,formatFilNum,formatNumber } from '@/utils/utils'
import meta from '@/assets/images/home/meta.png';
import trend1 from '@/assets/images/home/chartbackup@2x.png';
import { Home_meta } from '@/types/home_types';


export const apiUrl = {
    home_meta: 'http://192.168.1.189:17000/api/v1/TotalIndicators',
    line_trend:'http://192.168.1.189:17000/api/v1/BaseLineTrend'
}

export const home_meta:Home_meta = {
    title: {
        label: 'meta_title',
        icon: meta,
        rightIcon: 'mata_show'
    },
    list:[
        {
            label: 'latest_height',
            render:(v:number|string) =>{
            return Number(v).toLocaleString()
            }
        },//最新区块高度
        {label:'latest_block_time' },//最新区块时间
        {
            label: 'total_blocks',
            render: (v: number | string) => formatNumber(v, 2)
        }, //全网出块数量
        {
            label: 'total_rewards',
            render: (v: number | string) => Number(v).toLocaleString() + ' FIL'
        }, //全网出块奖励，单位Fil	
        {
            label: 'total_quality_power',
            tip:'total_quality_power_tip',
            render: (v: number | string) => {
            return unitConversion(v, 4)
            }
        }, //全网有效算力
        {
            label: 'base_fee',
            render: (v: string | number) => { 
            return  Number(formatFilNum(v, true, true)).toFixed(4) + ' ' + formatFilNum(v, true).split(' ')[1]
            }
        }, //当前基础费率
        {
            label: 'miner_initial_pledge',
            render: (v: string | number) => formatNumber(v) + ' FIL/TiB'
        }, //当前扇区质押量
        {
            label: 'power_increase_24h',
            render: (v: number | string) => {
            return unitConversion(v, 4)
          } }, //近24h增长算力
        {
            label: 'rewards_increase_24h',
            render: (v: number | string) => formatNumber(v, 2) + ' FIL'
        }, //近24h出块奖励	
        {
            label: 'fil_per_tera_24h',
            tip:'fil_per_tera_24h_tip',
            render: (v: string) => { 
            return  Number(v).toFixed(4) + ' FIL/T'
        } }, //近24h产出效率，单位Fil/T	
        {
            label: 'gas_in_32g',
            tip:'gas_in_32g_tip',
            render: (v: number | string) => Number(v) < 0.0001 ? Number(Number(v) * Math.pow(10, 9)).toFixed(2) + 'nanoFIL/TiB' : Number(v).toFixed(4) + ' FIL/TiB'
        }, //32GiB扇区Gas消耗，单位Fil/T	
        {
            label: 'add_power_in_32g',
            tip:'add_power_in_32g_tip',
            render: (v: number | string) => formatNumber(v) + ' FIL/TiB'
        }, //32GiB扇区新增算力成本，单位Fil/T
        {
            label: 'gas_in_64g',
            tip:'gas_in_64g_tip',
            render: (v: number | string) => Number(v) < 0.0001 ? Number(Number(v) * Math.pow(10, 9)).toFixed(2) + 'nanoFIL/TiB' : Number(v).toFixed(4) + ' FIL/TiB'
              }, //64GiB扇区Gas消耗，单位Fil/T	
        {
            label: 'add_power_in_64g',
            tip:'add_power_in_64g_tip',
            render: (v: number | string) => formatNumber(v) + ' FIL/TiB'
        }, //64GiB扇区新增算力成本，单位Fil/T	
        { label: 'win_count_reward' }, //每赢票奖励，单位Fil		
        {
            label: 'avg_block_count',
            tip:'avg_block_count_tip',
            render: (v: number | string) => formatNumber(v)
        }, //平均每高度区块数量	
        {
            label: 'avg_message_count',
            tip:'avg_message_count_tip',
            render: (v: number | string) => formatNumber(v)
        }, //平均每高度消息数	
        {
            label: 'active_miners',
            render: (v: number | string) => formatNumber(v)
        }, //活跃节点数
        {
            label: 'burnt',
            render: (v: number | string) => formatNumber(v, 4) + ' FIL'
        }, //销毁量	
        {
            label: 'circulating_percent',
            render: (v: number) => Number(v * 100).toFixed(2) + '%'
        }, //流通率	
]
}


export const home_tend:Array<Home_meta>= [
    {
        title: {
        label: 'power_trend',
        icon: trend1,
        tip:'power_trend_tips',
        rightIcon: 'show_more'
        }, 
        list: [
            { label: 'total_power', yIndex:0,type:'line'},
            { label: 'base_line_power' ,yIndex:0,type:'line'},
            {label:'total_increase_power',yIndex:1,type:'line'},
        ],
    },
     {
        title: {
        label: 'trend_24',
        icon: trend1,
        tip:'power_trend_tips',
        rightIcon: 'show_more'
        }, 
        list: [
            { label: 'network_power', },
            { label: 'baseline' },
            {label:'power_growth'},
        ],
    },
]