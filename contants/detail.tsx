/** @format */
import Link from "next/link";
import { table_opt } from "@/types";
import { attoFormatFil, formatFil, formatFilNum, formatNumber, isIndent, unitConversion } from "@/utils/utils";
import dayjs from "dayjs";

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

//储存池概览 账户余额 & 有效算力
const pool_overview = {
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
}

// 统计指标
const indicators_overview = {
    title: {
      label: 'indicators',
      list: [
      { label: '24h', value: '24h' },
      { label: '7d', value: '7d' },
        { label: '30d', value: '30d' },
      { label: '1year', value: '365d' },
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


// 账户变化
const account_change = {
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

// miner 账户总览
const account_overview = {
   title: {
    label:'account_overview'
  },
  list: [
    {
      label: 'create_time',
      dataIndex: 'create_time',
       type: ["account_basic"],

      render: (text:string|number) => dayjs(Number(text)*1000).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      label: 'account_type',
      dataIndex: 'account_type',
      type: ["account_basic"],
    },
    {
      label: 'peer_id',
      dataIndex:'peer_id'
    },
    {
      label: 'account_address',
      dataIndex: 'account_address',
      type: ["account_basic"],
    },
    {
      label: 'owner_address',
      dataIndex: 'owner_address',
      render: (text:string) => { 
        return <Link href={`/detail/general/${text}`} className='link' >{ text}</Link>
      }
    },
    {
      label: 'area', //暂无
      dataIndex:'area'
    },
    {
      label: 'worker_address',
      dataIndex: 'worker_address',
        render: (text:string) => { 
        return <Link href={`/detail/general/${text}`} className='link' >{ text}</Link>
      }
    },
    {
      label: 'controllers_address',
      dataIndex: 'controllers_address',
      render: (text: any, record: any) => { 
        return <div className="array_item">
          {text?.map((linkItem:string) => { 
            return <Link key={ linkItem} href={`/detail/general/${linkItem}`} className='link' >{ linkItem}</Link>
          })}
        </div>
      }
    },
    {
      label: 'beneficiary_address',
      dataIndex: 'beneficiary_address',
      render: (text: any, record: any) => { 
        return <div className="array_item">
          {Array.isArray(text)? text.map((linkItem:string) => { 
            return <Link key={ linkItem} href={`/detail/general/${linkItem}`} className='link' >{ linkItem}</Link>
          }):text}
        </div>
      }
    },
   
  ]
}

// 有效算力
const power_trend = {
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

//消息
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
          <Link className='link' href={`/tipset/chain?height=${text}`}>
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
              href={`/tipset/chain?cid=${item}`}>
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
              const showValue = record&& record[key] ?record[key] :'';
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
              const showValue = record&& record[key] ?record[key] :'';
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

const minder_details = {
  pool_overview_title: {
    label:'account'
  }
}

//列表
const miner_list = {
  message_list_total: "message_list_total",
  title: [
    { value: "MessagesByAccountIDMethodName", label: "message_list", headerList:true},
    { value: "BlocksByAccountID", label: "block_list" },
    { value: "TracesByAccountID", label: "traces_list" },
  ],

  columns: (type: string) => {
    let arr: Array<any> = [];
    switch (type) {
      case "MessagesByAccountID":
        arr = [
          { dataIndex: "cid", title: "cid", render: (text: string) => <Link href={`/detail/message/${text}` }className='link'>{ text?isIndent(text,6):''}</Link>},
          { dataIndex: "height", title: "height",render: (text: string) => <Link href={`/tipset/chain?height=${text}` }className='link'>{ text}</Link> },
          { dataIndex: "block_time", title: "time", render: (text: string|number)=> dayjs(Number(text)*1000).format('YYYY-MM-DD HH:mm')},
          { dataIndex: "from", title: "from" ,  render: (text: string) => <Link href={`/detail/general/${text}` }className='link'>{ isIndent(text,6)}</Link>},
          { dataIndex: "to", title: "to" ,  render: (text: string) => <Link href={`/detail/miner/${text}` }className='link'>{ text}</Link>},
          { dataIndex: "value", title: "value" ,render:(text:number)=>formatFil(text,'FIL',4)+' FIL'},
          { dataIndex: "status", title: "status" },
          { dataIndex: "method_name", title: "method_name" },
        ];
        break;
      case "BlocksByAccountID":
        arr = [
          { dataIndex: 'cid', title: 'block_cid' ,render: (text: string) => <Link href={`/tipset/chain?cid=${text}` }className='link'>{ text?isIndent(text,6):''}</Link>},
          {dataIndex:'height',title:'block_height',render: (text: string) => <Link href={`/tipset/chain?height=${text}` }className='link'>{ text}</Link> },
          {dataIndex:'block_time',title:'block_time',render: (text: string|number)=> dayjs(Number(text)*1000).format('YYYY-MM-DD HH:mm')},
          {dataIndex:'messages_count',title:'block_messages_count'},
          {dataIndex:'miner_id',title:'block_miner_id',  render: (text: string) => <Link href={`/detail/miner/${text}` }className='link'>{ text}</Link>},
          {dataIndex:'mined_reward',title:'block_mined_reward',render:(text:number)=>formatFil(text,'FIL',2)+' FIL'},

        ]
        break;
      case 'TracesByAccountID':
        arr = [
          { dataIndex: "block_time", title: "time", render: (text: string|number)=> dayjs(Number(text)*1000).format('YYYY-MM-DD HH:mm')},
          { dataIndex: "cid", title: "cid", render: (text: string) => <Link href={`/detail/message/${text}` }className='link'>{text? isIndent(text,6):''}</Link>},
          { dataIndex: "from", title: "from" ,  render: (text: string) => <Link href={`/detail/general/${text}` }className='link'>{text? isIndent(text,6):''}</Link>},
          { dataIndex: "to", title: "to" ,  render: (text: string) => <Link href={`/detail/miner/${text}` }className='link'>{ text}</Link>},
          { dataIndex: "value", title: "value" ,render:(text:number)=>formatFil(text,'FIL',4)+' FIL'},
          { dataIndex: "method_name", title: "method_name" },
        ];
      default:
        break;
    }
    return arr;
  },

  resultObj: (type: string): string => {
    switch (type) {
      case "MessagesByAccountID":
        return "messages_by_account_id_list";
      case "BlocksByAccountID":
        return 'blocks_by_account_id_list'
      case "TracesByAccountID":
        return 'traces_by_account_id_list'
    }
    return "";
  },
};


//general 

const general_overview = {
  title: {
    label:'general_overview_title'
  },
    list: [
    { label: 'available_balance', type: 'line' },
    ],
  options: [
      { label: '24h', value: '24h' },
      { label: '7d', value: '7d' },
      { label: '30d', value: '30d' },
      {label:'1year',value:'365d'},
  ],
   message_list: [
    { value: "MessagesByAccountIDMethodName", label: "message_list", headerList:true},
    { value: "BlocksByAccountID", label: "block_list" },
  ],
}

const default_content =[
    {label: 'account_address', dataIndex: 'account_address',type:['account_basic'] },
    {label:'account_id',dataIndex:'base_account_id',type:['account_basic']},
    {label:'account_type',dataIndex:'account_type',type:['account_basic']},
    {label:'account_balance',dataIndex:'account_balance',type:['account_basic']},
    {label:'message_count',dataIndex:'message_count',type:['account_basic']},
    {label:'nonce',dataIndex:'nonce',type:['account_basic']},
    {label:'code_cid',dataIndex:'code_cid',type:['account_basic']},
    {label:'create_time',dataIndex:'create_time',type:['account_basic']},
    {label:'latest_transfer_time',dataIndex:'latest_transfer_time',type:['account_basic']},
  ]

const general_overview_type:Record<string,any> = {
  //所有者账户
  'account_basic': [
    {label: 'account_address', dataIndex: 'account_address',type:['account_basic'] },
    { label: 'base_account_id', dataIndex: 'account_id', type: ['account_basic'], render: (text:string) => <Link href={ `/detail/general/${text}`} className='link'>{ text}</Link>},
    { label: 'account_type', dataIndex: 'account_type', type: ['account_basic'],isNs:true},
    { label: 'balance', dataIndex: 'account_balance', type: ['account_basic'], render: (text:string) => <span>{attoFormatFil(text)}</span>},
    {label:'block_messages_count',dataIndex:'message_count',type:['account_basic']},
    {label:'nonce',dataIndex:'nonce',type:['account_basic']},
    {label:'code_cid',dataIndex:'code_cid',type:['account_basic']},
    { label: 'create_time', dataIndex: 'create_time', type: ['account_basic'], render: (text:string) => { text ? dayjs(Number(text)*1000).format('YYYY-MM-DD HH:mm:ss'):''}},
    {label:'latest_transfer_time',dataIndex:'latest_transfer_time',type:['account_basic'],render: (text:string) => { text ? dayjs(Number(text)*1000).format('YYYY-MM-DD HH:mm:ss'):''}},
  ],
  'account_signers': [
    ...default_content,
  ],
  'account_miner': [
    ...default_content,
  ],
  'account_owner': [
    ...default_content,
  ],
}

export {
  detail_owner,
  indicators_overview,
  pool_overview,
  account_change,
  power_trend,
  minder_details,
  account_overview,
  message_overview,
  message_other,
  miner_list,
  general_overview,
  general_overview_type
};
