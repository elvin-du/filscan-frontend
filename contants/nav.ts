import { Menu_Info } from "@/types/index"



const navMenu:Array<Menu_Info> = [
    {
        key: 'home',
        link:'/home'
    },
    {
        key: 'contract',
        childrens: [
             {
                  key: 'contract_verify',
                  link:'/contract/verify/'
            },
             {
                  key: 'token',
                  link:'/contract/token/'
              },
        ]
    },
    {
          key: 'tipset',
          childrens: [
              {
                  key: 'tipset_chain',
                  link:'/tipset/chain/'
              },
              {
                  key: 'tipset_message',
                   link:'/tipset/message-list/'
              },
              {
                  key: 'tipset_ranking',
                  link:'/tipset/address-list/'
              },
            //   {
            //       key: 'tipset_transfer',
            //     link:'/tipset/transfer/'
            //   },
              {
                  key: 'tipset_dsn',
                  link:'/tipset/dsn/'
              },
               {
                   key: 'tipset_pool-message',
                   link:'/tipset/pool-message/'
              },
          ]
    },
    { key: 'ranking' ,link:'/rank'}, 
    {
        key: 'statistics',
        childrens: [
            { key: 'statistics_gas',link:'/statistics/gas'},
            { key: 'statistics_base',link:'/statistics/power' },
            { key: 'statistics_fil' ,link:'/statistics/fil'},
            {key:'statistics_charts',link:'/statistics/charts'},
            // {key:'statistics_map'},
        ]
    },
    // {
    //     key: 'resources',
    //     childrens: [
    //         { key: 'resources_tools' ,link:'resources/tools'},
    //     ]
    // }, 
    {
        key: 'fvm',
        icon: 'Hot',
        color:'#F44C30',
        link:'/fvm'
    }
]  


const search = {
    holder: 'search_holder',
    opt: [
    {label: 'all', value: 'all' },
    {label:'address',value:'address'},
    {label: 'message_id', value: 'message_id' },
    {label: 'height', value: 'height' },
    {label:'cid',value:'cid'},
   {label:'node',value:'node'}
]
}


export { navMenu,search }