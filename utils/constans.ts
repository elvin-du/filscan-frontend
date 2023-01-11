import { MenuItem } from "@/types";

export const navMenu:Array<MenuItem> = [
    {
        key: 'home',
        value:'/home',
    },
    {
        key: 'tipset',
        value:'',
        childrens: [
            {
            value: '/tipset/chain',
            key: 'chain'
            },
            {
            value: '/tipset/message-list',
            key: 'message'
            },
            {
            value: '/tipset/address-list',
            key: 'ranking'
            },
            {
            value: '/tipset/transfer-list',
            key: 'transfer'
            },
            {
            value: '/tipset/dsn',
            key: 'dsn'
            },
            {
            value: '/tipset/pool-message-list',
            key: 'pool-message'
          }
        ]
    }
]