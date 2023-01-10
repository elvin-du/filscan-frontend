const zh ={ 
    network_title: "当前网络",
    navMunu: {
        home: {
        label: 'Home',
        index: 'home',
        path: '/'
      },
      tipset: {
        label: 'Tipset',
        index: 'tipset',
        down: true,
        items: [
          {
            label: 'Chain',
            path: '/tipset/chain',
            index: 'chain'
          },
          {
            label: 'Message',
            path: '/tipset/message-list',
            index: 'message-list'
          },
          {
            label: 'Rich Ranking',
            path: '/tipset/address-list',
            index: 'address-list'
          },
          {
            label: 'Large Amount Transfer',
            path: '/tipset/transfer-list',
            index: 'transfer-list'
          },
          {
            label: 'Dsn',
            path: '/tipset/dsn',
            index: 'dsn'
          },
          {
            label: 'Pool Message',
            path: '/tipset/pool-message-list',
            index: 'pool-message-list'
          }
        ]
      },
      mining: {
        label: 'Ranking',
        path: '/mining',
        index: 'mining'
      },
      statistics: {
        label: 'Statistics',
        index: 'statistics',
        down: true,
        items: [
          {
            label: 'Gas Fee',
            index: 'gas',
            path: '/statistics/gas'
          },
          {
            label: 'BaseFee& Power',
            path: '/statistics/power',
            index: 'power'
          },
          {
            label: 'FIL',
            path: '/statistics/fil',
            index: 'fil'
          },
          {
            label: 'Charts',
            index: 'charts',
            path: '/statistics/charts'
          },
          {
            label: 'Map',
            index: 'map',
            path: '/statistics/map'
          }
        ]
      },
      resources: {
        label: 'Resources',
        index: 'resources',
        down: true,
        items: [
          // {
          //   label: 'Calculator',
          //   path: '/resources/calculator',
          //   index: 'calculator',
          // },
          {
            label: 'Tools',
            path: '/resources/tools',
            index: 'tools'
          }
        ]
      },
      // filwallet: {
      //   label: 'Wallet',
      //   href: 'https://filecoinwallet.com/',
      //   index: 'filwallet',
      // },
      incubation: {
        label: 'Storage Provider',
        path: '/forcepool/center?type=1',
        index: 'incubation',
        pro: true
      }
    
    }

}
export default zh