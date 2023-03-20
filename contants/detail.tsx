/** @format */
import Link from "next/link";
import { table_opt } from "@/types";
import { formatFil, formatFilNum, formatNumber, unitConversion } from "@/utils/utils";

interface Card {
  title: {
    label: string;
    [key: string]: any;
  };
  content: Array<table_opt>;
}

const detail_owner: Card = {
  title: {
    label: "owner_title",
    tip: "owner_title_tip",
  },
  content: [
    {
      label: "account",
      dataIndex: "account_id",
      type: ["account_basic"],
    },
    {
      label: "owner_address",
      dataIndex: "account_address",
      type: ["account_basic"],
      render: (text:string) => { 
        return <Link className='link'  href={`/detail/general/${text}`}>{text}</Link>
      }
    },
    {
      label: "owned_miners",
      dataIndex: "owned_miners",
      render: (text: Array<any>, record:any) => { 
        return <span className="array_item">
          {text?.map((item:any) => { 
            return <Link className='link'  href={`/detail/general/${item}`}>{item}</Link>
          })}
          </span>
      }
    },
  ],
};
const detail_owner_overview = {
  title: {
    label: "owner_overview_title",
  },
  list: {
    title: "balance",
    content: [
      {
        label: "available_balance",
        dataIndex: "available_balance",
        type: ["account_indicator"],

      },
      {
        label: "init_pledge",
        dataIndex: "init_pledge",
        type: ["account_indicator"],
      },
      {
        label: "pre_deposits",
        dataIndex: "pre_deposits",
        type: ["account_indicator"],

      },
      {
        label: "locked_balance",
        dataIndex: "locked_balance",
        type: ["account_indicator"],

      },
    ],
  },
  power_list: {
    header: [
      {
        label: "quality_adjust_power",
        dataIndex: "quality_adjust_power",
      },
      {
        label: "quality_power_rank",
        dataIndex: "quality_power_rank",
      },
    ],
    content: [
      {
        label: "raw_power_percentage",
        dataIndex: "quality_power_percentage",
      },
      {
        label: "raw_power",
        dataIndex: "raw_power",
      },
      {
        label: "total_block_count",
        dataIndex: "total_block_count",
      },
      {
        label: "total_reward",
        dataIndex: "total_reward",
      },
      {
        label: 'total_win_count',
        dataIndex: 'total_win_count',
        width: '100%',
      },
      {
        label: 'sector_stauts',
        dataIndex: 'sector_stauts',
        width: '100%',
        renderList: [{ label: 'sector_count', value: 'sector_count' },
        { label: 'live_sector_count', value: 'live_sector_count', color: '#5ad8a6' },
        { label: 'fault_sector_count', value: 'fault_sector_count', color: '#ff000f' },
        { label: 'recover_sector_count', value: 'recover_sector_count', color: '#ffc631' }],
       
      }
    ],
  },
  indicators_list: {
    title: {
      label: 'indicators',
      list: [
      { label: '24h', value: '24h' },
      { label: '7d', value: '7d' },
      { label: '30d', value: '30d' },
    ]
    },
    content: [{ label:'power_increase_indicators', dataIndex: 'power_increase',render:(text:string|number)=>unitConversion(text, 2), },
      {
        label: 'precommit_deposits', dataIndex: 'sector_deposits', render: (text: string | number) => formatFil(text, 'FIL', 4) + ' FIL'}, //扇区质押
    { label: 'block_count', dataIndex: 'block_count_increase' ,label_tip:'block_count_tip'},
    { label: 'mining_efficiency', dataIndex: 'mining_efficiency', label_tip: 'mining_efficiency_tip' ,render:(text:string|number)=>Number(text).toFixed(4) + ' FIL/TiB',},
    { label: 'power_ratio', dataIndex: 'power_ratio' ,render:(text:string|number)=>unitConversion(text, 2) + '/D',},
    { label: 'gas_fee', dataIndex: 'gas_fee' },
    { label: 'block_rewards', dataIndex: 'block_reward_increase',render:(text:string|number)=>formatFil(text,'FIL',4)  + ' FIL'  },
    { label: 'lucky', dataIndex: 'lucky',render:(text:string|number)=>  text!== '-1' ? Number(100 * Number(text)).toFixed(3) + ' %' : '--' },
      { label: 'sector_increase', dataIndex: 'sector_increase',render:(text:string|number)=>unitConversion(text, 2), },
      { label: 'sector_ratio', dataIndex: 'sector_ratio',render:(text:string|number)=>unitConversion(text, 2) + '/D' },
    { label: 'win_count', dataIndex: 'win_count' ,label_tip: 'win_count_tip'},
     { label: 'net_profit_per_tb', dataIndex: 'gas_fee_per_tb',label_tip:'net_profit_per_tb_tip' },
    ]
   
  }
};
//owner 储存池概览
const owner_pool_storage = {
    title:''
}

// owner 账户变化
const owner_account_change = {
  title: {
    label:'owner_account_change'
  },
  list: [
    { label: 'available_balance', type: 'line' },
     {label:'init_pledge',type:'line'},
    { label: 'locked_balance', type: 'line' },
    { label: 'pre_deposits',type:'line' },
  ]
}
// 有效算力
const owner_power_trend = {
  title: {
    label: 'quality_adjust_power',
    list: [
      { label: '30d', value: '30d' },
      {label:'1year',value:'365d'},
    ]
  },

  list: [
    { label: 'power', type: 'line' },
     {label:'power_increase',type:'bar',backgroundColor:'#5B8FF9'},
  ]
}

const message_overview: Card = {
  title: {
    label: "message_overview",
  },
  content: [
    { dataIndex: "cid", title: "cid", type: ["message_basic"] },
    {
      dataIndex: "height",
      title: "height",
      type: ["message_basic"],
      render: (text: string) => {
        return (
          <Link className='link' href={`/detail/chain-height/${text}`}>
            {text}
          </Link>
        );
      },
    },
    { dataIndex: "block_time", title: "time", type: ["message_basic"] },
    {
      dataIndex: "blk_cids",
      title: "blk_cids",
      render: (text: Array<string>) => {
        if (!Array.isArray(text) || !text) return "--";
        return text.map((item: string) => {
          return (
            <Link
              className='link link-html'
              href={`/detail/chain-hash/${item}`}>
              {item}
            </Link>
          );
        });
      },
    },
    { dataIndex: "value", title: "value", type: ["message_basic"] },
    {
      dataIndex: "from",
      title: "from",
      type: ["message_basic"],
      render: (text: string) => {
        return (
          <Link className='link' href={`/detail/general/${text}`}>
            {text}
          </Link>
        );
      },
    },
    {
      dataIndex: "to",
      title: "to",
      type: ["message_basic"],
      render: (text: string) => {
        return (
          <Link className='link' href={`/detail/miner/${text}`}>
            {text}
          </Link>
        );
      },
    },
    {
      dataIndex: "Applied",
      title: "status",
      type: ["returns_detail"],
    },
    {
      dataIndex: "method_name",
      title: "method_name",
      type: ["message_basic"],
    },
  ],
};

const message_other: Card = {
  title: {
    label: "message_other",
  },
  content: [
    { dataIndex: "version", title: "version" },
    { dataIndex: "nonce", title: "nonce" },
    {
      dataIndex: "gas_fee_cap",
      title: "gas_fee_cap",
      render: (text: string) => formatFilNum(text, true),
    },
    {
      dataIndex: "gas_premium",
      title: "gas_premium",
      render: (text: string) => formatFilNum(text, true),
    },
    {
      dataIndex: "gas_limit",
      title: "gas_limit",
      render: (text: string) => formatNumber(text),
    },
    {
      dataIndex: "gas_used",
      title: "gas_used",
      render: (text: string) => formatNumber(text),
    },
    {
      dataIndex: "base_fee",
      title: "base_fee",
      render: (text: string) => formatFilNum(text, true),
    },
    {
      dataIndex: "all_gas_fee",
      title: "all_gas_fee",
      render: (text: string) => formatFilNum(text, true),
    },
    {
      dataIndex: "params",
      title: "params",
      isRecord: true,
      render: (text: string, record?: any) => {
        // "returns", "returns_detail"
        return (
          <div className='box-html'>
            {"Args { "}
            {["params", "params_detail"].map((key) => {
              const showValue = record[key];
              return (
                <div className='text'>
                  {showValue && JSON.stringify(showValue, undefined, 3)}
                </div>
              );
            })}
            {" }"}
          </div>
        );
      },
    },
    {
      dataIndex: "returns",
      title: "returns",
      isRecord: true,
      render: (text: string, record?: any) => {
        return (
          <div className='box-html'>
            {"Return { "}
            {["returns", "returns_detail"].map((key) => {
              const showValue = record[key];
              return (
                <div className='text'>
                  {showValue && JSON.stringify(showValue, undefined, 3)}
                </div>
              );
            })}
            {" }"}
          </div>
        );
      },
    },
  ],
};

const miner_list = {
  message_list_total: "message_list_total",
  title: [
    { value: "MessagesByAccountID", label: "message_list" },
    { value: "BlocksByAccountID", label: "block_list" },
    { value: "TracesByAccountID", label: "traces_list" },
  ],
  columns: (type: string) => {
    let arr: Array<any> = [];
    switch (type) {
      case "MessagesByAccountID":
        arr = [
          { dataIndex: "cid", title: "cid" },
          { dataIndex: "height", title: "height" },
          { dataIndex: "block_time", title: "time" },
          { dataIndex: "from", title: "from" },
          { dataIndex: "value", title: "value" },
          { dataIndex: "status", title: "status" },
          { dataIndex: "method_name", title: "method_name" },
        ];
        break;

      default:
        break;
    }
    return arr;
  },
  resultObj: (type: string): string => {
    switch (type) {
      case "MessagesByAccountID":
        return "messages_by_account_id_list";
    }
    return "";
  },
};

export {
  detail_owner,
  detail_owner_overview,
  owner_account_change,
  owner_power_trend,
  message_overview,
  message_other,
  miner_list,
};
