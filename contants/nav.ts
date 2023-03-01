import { Menu_Info } from "@/types/index"



const navMenu:Array<Menu_Info> = [
    {
        key: 'home',
        link:'/home'
    },
      {
          key: 'tipset',
          childrens: [
              {
                  key: 'tipset_chain',
                  link:'/tipset/chain'
              },
              {
                  key: 'tipset_message',
                   link:'/tipset/message-list'
              },
              {
                  key: 'tipset_ranking',
                  link:'/tipset/address-list'
              },
              {
                  key: 'tipset_transfer',
                link:'/tipset/transfer'
              },
              {
                  key: 'tipset_dsn',
                  link:'/tipset/dsn'
              },
               {
                  key:'tipset_pool-message'
              },
          ]
    },
    { key: 'ranking' ,link:'/rank'}, 
    {
        key: 'statistics',
        childrens: [
            { key: 'statistics_gas',link:'/statistics/gas'},
            { key: 'statistics_base',link:'/statistics/power' },
            { key: 'statistics_fil' },
            {key:'statistics_charts'},
            {key:'statistics_map'},
        ]
    },
    {
        key: 'resources',
        childrens: [
            { key: 'resources_tools' },
        ]
    }, 
    {
        key: 'provider',
        icon: 'pro',
    }
]  



export { navMenu }