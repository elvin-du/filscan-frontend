/** @format */
import Link from "next/link";
import { table_opt } from "@/types";
import { formatFilNum, formatNumber } from "@/utils/utils";

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
      title: "account",
      dataIndex: "account_address",
      type: ["account_ore_pool", "account_ore"],
    },
    {
      title: "owner_address",
      dataIndex: "owner_address",
      type: ["account_ore_pool"],
    },
    {
      title: "owned_miners",
      dataIndex: "owned_miners",
      type: ["account_ore_pool"],
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
        type: ["account_ore_pool", "account_ore"],
        showValue: "53298.8501988961943544",
      },
      {
        label: "init_pledge",
        dataIndex: "init_pledge",
        type: ["account_ore_pool", "account_ore"],
        showValue: "1320853.8586000049537222",
      },
      {
        label: "pre_deposits",
        dataIndex: "pre_deposits",
        type: ["account_ore_pool", "account_ore"],
        showValue: "0",
      },
      {
        label: "locked_balance",
        dataIndex: "locked_balance",
        type: ["account_ore_pool", "account_ore"],
        showValue: "249105.345078382241285",
      },
    ],
  },
  power_list: {
    header: [
      {
        label: "quality_adjust_power",
        dataIndex: "quality_adjust_power",
        type: ["account_ore_pool", "account_ore"],
      },
      {
        label: "quality_power_rank",
        dataIndex: "quality_power_rank",
        type: ["account_ore_pool", "account_ore"],
      },
    ],
    content: [
      {
        label: "raw_power_percentage",
        dataIndex: "raw_power_percentage",
        type: ["account_ore_pool", "account_ore"],
      },
      {
        label: "raw_power",
        dataIndex: "raw_power",
        type: ["account_ore_pool", "account_ore"],
      },
      {
        label: "total_block_count",
        dataIndex: "total_block_count",
        type: ["account_ore_pool", "account_ore"],
      },
      {
        label: "total_reward",
        dataIndex: "total_reward",
        type: ["account_ore_pool", "account_ore"],
      },
    ],
  },
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
    label: 'power',
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
