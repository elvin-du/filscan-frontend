import { Menu_Info } from "@/types/index"



const navMenu:Array<Menu_Info> = [
    {
        key: 'home'
    },
      {
          key: 'tipset',
          childrens: [
              {
                  key:'tipset_chain'
              },
              {
                  key:'tipset_message'
              },
              {
                  key:'tipset_ranking'
              },
              {
                  key:'tipset_transfer'
              },
              {
                  key:'tipset_dsn'
              },
               {
                  key:'tipset_pool-message'
              },
          ]
    },
    { key: 'ranking' }, 
    {
        key: 'statistics',
        childrens: [
            { key: 'statistics_gas' },
            { key: 'statistics_base' },
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