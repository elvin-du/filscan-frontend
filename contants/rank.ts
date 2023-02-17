
export const rank_header = [

    {
        label: 'pool',
        value:'pool'
    },
    {
        label: 'provider',
        value:'provider'
    },
    {
        label: 'growth',
        value:'growth'
       
    },
    {
        label: 'rewards',
        value:'rewards'
    }
]

export const TimeList = [{ label: '24h',value:'24h' }, { label: 'week_days',value:'week_days' }, { label: 'month' ,value:'month'}]
export const select_rank = [{ label: 'select_rank_all',value:'all' }, { label: 'select_rank_32',value:'32' }, { label: 'select_rank_64',value:'64' }]
export const header_right:Record<string,any> = { 
    'growth': {
    TimeList,
    select_rank
    },
    'rewards': {
    TimeList,
    select_rank
    }
}