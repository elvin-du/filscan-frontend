

import { unitConversion,formatFilNum,formatNumber, formatFil, formatTime } from '@/utils/utils'
import meta from '@/assets/images/home/meta.png';
import trend1 from '@/assets/images/home/chartbackup@2x.png';
import trend2 from '@/assets/images/home/trend@2x.png';
import { Home_meta } from '@/types/home_types';
import TimerHtml from '@/components/TimerHtml'
import { number } from 'echarts';




export const home_meta:Home_meta|any = {
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
        {
            label: 'latest_block_time',
            returnType:'React_Node',
        },
          {
            label: 'power_increase_24h',
            render: (v: number | string) => {
            return unitConversion(v, 4)
          } }, //近24h增长算力
        //最新区块时间
        // {
        //     label: 'total_blocks',
        //     render: (v: number | string) => formatNumber(v, 2)
        // }, //全网出块数量
      
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
            return formatFilNum(Number(v),false,false) //  Number(formatFil(v,'attoFIL'))+' attoFIL'
            }
        }, //当前基础费率
        {
            label: 'miner_initial_pledge',
            render: (v: string | number) => formatNumber(formatFil(v,'FIL',4)) + ' FIL/TiB'
        }, //当前扇区质押量
      
        {
            label: 'rewards_increase_24h',
            render: (v: number | string) => formatNumber(formatFil(v,'FIL'), 2) + ' FIL'
        }, //近24h出块奖励	
        {
            label: 'fil_per_tera_24h',
            tip:'fil_per_tera_24h_tip',
            render: (v: string) => { 
            return formatFil(v,'FIL',4) + ' FIL/T'
        } }, //近24h产出效率，单位Fil/T	
        {
            label: 'gas_in_32g',
            tip:'gas_in_32g_tip',
            render: (v: number | string) => Number(v) < 0.0001 ?formatFil(v,'nanoFIL',4) + 'nanoFIL/TiB' :formatFil(v,'FIL',4) + ' FIL/TiB'
        }, //32GiB扇区Gas消耗，单位Fil/T	
        {
            label: 'add_power_in_32g',
            tip:'add_power_in_32g_tip',
            render: (v: number | string) => formatFil(v,'FIL',4) + ' FIL/TiB'
        }, //32GiB扇区新增算力成本，单位Fil/T
          {
            label: 'total_rewards',
            render: (v: number | string) => { 
                return Number(formatFil(v,'FIL')).toLocaleString() + ' FIL'
            }
        }, //全网出块奖励，单位Fil	
        {
            label: 'gas_in_64g',
            tip:'gas_in_64g_tip',
            render: (v: number | string) => Number(v) < 0.0001 ?formatFil(v,'nanoFIL',4) + 'nanoFIL/TiB' : formatFil(v,'FIL',4) + ' FIL/TiB'
              }, //64GiB扇区Gas消耗，单位Fil/T	
        {
            label: 'add_power_in_64g',
            tip:'add_power_in_64g_tip',
            render: (v: number | string) => formatFil(v,'FIL',4) + ' FIL/TiB'
        }, //64GiB扇区新增算力成本，单位Fil/T	
        { label: 'win_count_reward',render:(v:any)=>Number(formatFil(v,'FIL',4)).toLocaleString() + ' FIL' }, //每赢票奖励，单位Fil		
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
            render: (v: number | string) => formatNumber(formatFil(v,'FIL'), 4) + ' FIL'
        }, //销毁量	
        {
            label: 'circulating_percent',
            render: (v: number) => Number(v * 100).toFixed(2) + '%'
        }, //流通率	
]
}

export const home_tend = [
    {
        label: 'power',
        // tip: 'power_tips',
        icon: trend1,
        right: {
            title: 'show_more',
            link:'/statistics/power'
        }
    },
    {
        label: 'gas',
        icon: trend2,
         right: {
            title: 'show_more',
            link:'/statistics/gas'
        }
    }
]

export const no_result = {
    title: 'search_notFound',
    warn_text: 'warn_text',
    warn_details: 'warn_details',
    go_home:'go_home'
    
}