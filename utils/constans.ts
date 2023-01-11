import { MenuItem } from "@/types";

export const navMenu:Array<MenuItem> = [
    {
        key: 'home',
        path:'/home',
    },
    {
        key: 'tipset',
        path:'',
        childrens: [
            {
            path: '/tipset/chain',
            key: 'chain'
            },
            {
            path: '/tipset/message-list',
            key: 'message'
            },
            {
            path: '/tipset/address-list',
            key: 'ranking'
            },
            {
            path: '/tipset/transfer-list',
            key: 'transfer'
            },
            {
            path: '/tipset/dsn',
            key: 'dsn'
            },
            {
            path: '/tipset/pool-message-list',
            key: 'pool-message'
          }
        ]
    }
]