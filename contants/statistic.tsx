/** @format */


import { formatFil, formatFilNum, formatNumber } from "@/utils/utils";
const power = {
  title: {
    label: "power",
    // tip: "power_tips",
    right: {
      opt: [
        //   {
        //   label: "7d",
        //   value: "7d",
        // },
        // {
        //   label: "30d",
        //   value: "1m",
        // },
      ],
    },
  },
  list: [
    { label: "total_raw_byte_power", yIndex: 0, type: "line" },
    // { label: "base_line_power", yIndex: 1, type: "line" },
    { label: "total_quality_adj_power", yIndex: 0, type: "line" }, //算力
    { label: "change_quality_adj_power", yIndex: 1, type: "bar" },
  ],
};

const gas = {
  title: {
    label: "gas",
    right: {
      opt: [
        {
          label: "24h",
          value: "24h",
        },
        {
          label: "7d",
          value: "7d",
        },
        {
          label: "30d",
          value: "1m",
        },
      ],
    },
  },
  list: [
    { label: "base_fee", yIndex: 0, type: "line",unit:'nanoFiL' },
    { label: "gas_in_32g", yIndex: 1, type: "line" },
    { label: "gas_in_64g", yIndex: 1, type: "line" },
  ],
};

export const gas_24 = {
  title: {
    label: "gas_24",
  },

  columns: [
    { dataIndex: "method_name", title: "method_name", align: "left" }, //消息类型
    {
      dataIndex: "avg_gas_premium",
      title: "avg_gas_premium",
      render: (text: string | number) => formatFilNum(text, false, false),
    },
    {
      dataIndex: "avg_gas_limit",
      title: "avg_gas_limit",
      render: (v: string) => formatNumber(v),
    }, //平均Gas限额
    {
      dataIndex: "avg_gas_used",
      title: "avg_gas_used",
      render:  (text: string | number) => formatFil(text, "FIL",4) + ' FIL',
    }, //平均Gas消耗
    {
      dataIndex: "avg_gas_fee",
      title: "avg_gas_fee",
      render: (v: string) => {
        if (Number(v) === 0) {
          return 0;
        }
       return formatFilNum(v,false,false);
      },
    }, //平均手续费
    {
      dataIndex: "sum_gas_fee",
      title: "sum_gas_fee/ratio",
      render: (text: string, record: any) => {
        if (Number(text) === 0) {
          return 0;
        }
    
        return `${formatFilNum(text,false,false)}/${Number(record.gas_fee_ratio*100).toFixed(2)}%`
      },
    }, //合计手续费/占比
    {
      dataIndex: "message_count",
      title: "message_count/ratio",
      render: (text: string, record: any) => {
        return `${text}/${(record.message_count_ratio * 100).toFixed(2)}%`;
      },
    }, //消息数/占比
  ],
};


export const fil = {
  title: {
    label:'TokenRules'
  },
  chart:  [
        {
          key: 'FilecoinFoundation',
          name: 'Filecoin基金会',
          value: '5',
          color: '#477DE5'
        },
        {
          key: 'Contributors',
          name: '协议实验室团队及贡献者',
          value: '4.5',
          color: '#4FD0A1'
        },
        {
          key: 'protocolLab',
          name: '协议实验室',
          value: '10.5',
          color: '#5D77A3'
        },
        {
          key: 'FundraisingRemainder',
          name: '募资 – 剩余代币',
          value: '2.5',
          color: '#E8B61B'
        },
        {
          key: 'FundraisingSAFT',
          name: '募资 – 未来代币简单协议',
          value: '7.5',
          color: '#D75B42'
        },
        {
          key: 'MiningReserve',
          name: '为存储服务提供者预留代币',
          value: '15',
          color: '#59BAE3'
        },
        {
          key: 'TokenAllocation',
          name: '存储提供者代币分配',
          value: '55',
          color: '#876AC3'
        }
  ],
  content: [
        {
          label: 'Allocation',
          value: 'value',
          Released: 'Released',
          description: 'description'
        },
        {
          label: 'filBase',
          value: '2,000,000,000',
          Released: '2,000,000',
          description: 'filBase_des'
        },
        {
          label: 'ReservedTokens',
          value: '300,000,000 ',
          Released: '300,000 ',
          description:
            'ReservedTokens_des'
        },
        {
          label: 'TokenAllocation',
          value: '1,100,000,000',
          Released: '1,100',
          description: 'TokenAllocation_des'
        },
        {
          label: 'Fundraising',
          value: '150,000,000 ',
          Released: '50,000 ',
          description: 'Fundraising_des'
        },
        {
          label: 'Funds',
          value: '50,000,000',
          Released: '50,000 ',
          description: 'Funds_des'
        },
        {
          label: 'protocolLab',
          value: '210,000,000',
          Released: '20,000',
          description: 'protocolLab_des'
        },
        {
          label: 'Contributors',
          value: '90,000,000',
          Released: '9,000 ',
          description: 'Contributors_des'
        }
      ]
}

export const charts: any = {
  header: [
    { label: '24h', value: '24h' },
    { label: '7d', value: '7d' },
    { label: '30d', value: '1m' },
  ],
  
  pie: {
    title: {
      label: 'pie_title'
    },
    list: [
      {
        title: 'pie_title_a',

        list: [
      {
          key: 'mined',
          color: '#477DE5'
        },
        {
          key: 'remaining_mined',
          color: '#4FD0A1'
        },
        {
          key: 'vested',
          color: '#5D77A3'
        },
        {
          key: 'remaining_vested',        
          color: '#E8B61B'
        },
        {
          key: 'reserve_disbursed',
          color: '#D75B42'
        },
        {
          key: 'remaining_reserved',
          color: '#59BAE3'
        },]
      },
      {
        title: 'pie_title_b',
        title_tip:'pie_title_a_tip',
        list: [
        {
          key: 'locked',
          color: '#477DE5'
        },
        {
          key: 'burnt',
          color: '#4FD0A1'
        },
        {
          key: 'circulating',
          color: '#5D77A3'
        },
  ],
      }
    ]
   ,
  
  },
  block_trend: {
    
    title: {
      label: 'block_trend'
    },
    list: [
      { label: "acc_block_rewards", yIndex: 0, type: "line", unit: 'FIL', color: '#477DE5', yUnit: 'FIL/TiB' },
      { label: "block_reward_per_TiB", yIndex: 1, type: "line", unit: 'FIL/TiB', color: '#E8B61B' },
    ],
   
  },
  active_nodes: { 
     title: {
      label: 'active_nodes'
    },
    list: [
      { label: "active_miner_count", yIndex: 0, type: "line", unit: '', color: '#477DE5' },
    ],
  },
   messages_trend: { 
     title: {
      label: 'messages_trend'
    },
    list: [
    //  { label: "all_message_count", yIndex: 0, type: "line", unit: '', color: '#477DE5', },
      { label: "message_count", yIndex: 0, type: "line", unit: '', color: '#E8B61B',tip:'all_message_count_tip' },
    ],
  }
}



export const statistics: any = {
  power,
  gas,
};
