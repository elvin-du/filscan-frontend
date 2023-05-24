/** @format */
import Link from "next/link";
import { table_opt } from "@/types";
import { attoFormatFil, formatDateTime, formatFil, formatFilNum, formatNumber, isIndent, unitConversion } from "@/utils/utils";
import dayjs from "dayjs";
import { get_account_type } from "./varible";
import Image from 'next/image'
import { Button } from "antd";
import Router from "next/router";
import rightImg from '@/assets/images/themeright.@2x.png'
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
      label: "account_name",
      dataIndex: "account_id",
    },
    {
      label: "owner_address",
      dataIndex: "account_address",
      render: (text:string) => { 
        return <Link className='link'  href={`/address/${text}`}>{text}</Link>
      }
    },
    {
      label: "owned_miners",
      dataIndex: "owned_miners",
      render: (text: Array<any>, record:any) => { 
        return <span className="array_item">
          {text&& Array.isArray(text)&&text?.map((item:any) => { 
            return <Link className='link'  href={`/miner/${item}`}>{item}</Link>
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
        color:'#E8B61B',

      },
      {
        label: "init_pledge",
        dataIndex: "init_pledge",
        type: ["account_indicator"],
        color:'#4FD0A1'
      },
      {
        label: "pre_deposits",
        dataIndex: "pre_deposits",
           color: '#5D77A3',
        type: ["account_indicator"],

      },
      {
        label: "locked_balance",
        dataIndex: "locked_balance",
        type: ["account_indicator"],
        color: '#D75B42'


      },
    ],
  },
  power_list: {
    header: [
      {
        label: "quality_adjust_power",
        dataIndex: "quality_adjust_power",
        render:(text:number)=> text? unitConversion(text, 2):'--'
      },
      {
        label: "quality_power_rank",
        dataIndex: "quality_power_rank",
        render:(text:number)=>text
      },
    ],
    content: [
      {
        label: "raw_power_percentage",
        dataIndex: "quality_power_percentage",
        render:(text:number)=> text ? Number(text*100).toFixed(4) +'%':'--'
      },
      {
        label: "raw_power",
        dataIndex: "raw_power",
        render:(text:number)=>text ? unitConversion(text, 2) :'--'

      },
      // {
      //   label: "total_block_count",
      //   dataIndex: "total_block_count",
      // },
      // {
      //   label: "total_reward",
      //   dataIndex: "total_reward",
      //   render:(text:number)=>text ? formatFil(text,'FIL',4) +' FIL':'--'
      // },
      // {
      //   label: 'total_win_count',
      //   dataIndex: 'total_win_count',
      // },
       {
        label: 'sector_size',
         dataIndex: 'sector_size',
         render: (text:number) => { 
           return text?  unitConversion(text):'--'
         }
      },
      {
        label: 'sector_stauts',
        dataIndex: 'sector_stauts',
        width: '100%',
        renderList: [{ label: 'sector_count', value: 'sector_count' },
        { label: 'live_sector_count', value: 'active_sector_count', color: '#5ad8a6' },
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
      { label: '30d', value: '1m' },
    ]
    },
    content: [{ label:'power_increase_indicators',  dataIndex: 'power_increase',render:(text:string|number)=>unitConversion(text, 2), },
      {label: 'precommit_deposits', dataIndex: 'sector_deposits', render: (text: string | number) => formatFilNum(text, false,false)}, //扇区质押
    { label: 'block_count', dataIndex: 'block_count_increase' ,label_tip:'block_count_tip'},
    { label: 'mining_efficiency', dataIndex: 'rewards_per_tb',  label_tip: 'mining_efficiency_tip' ,render:(text:string|number)=>formatFil(text,'FIL',4) +' FIL/T' },
    { label: 'power_ratio', dataIndex: 'power_ratio' , render:(text:string|number)=>unitConversion(text, 2) + '/D',},
    { label: 'gas_fee', dataIndex: 'gas_fee', render:(text:string|number)=>formatFilNum(text, false,false)},
    { label: 'block_rewards', dataIndex: 'block_reward_increase', render:(text:string|number)=>formatFil(text,'FIL',4)  + ' FIL'  },
    { label: 'lucky', dataIndex: 'lucky', render:(text:string|number)=>  text!== '-1' ? Number(100 * Number(text)).toFixed(4) + ' %' : '--' },
      { label: 'sector_increase', dataIndex: 'sector_increase',render:(text:string|number)=>unitConversion(text, 2), },
      { label: 'sector_ratio', dataIndex: 'sector_ratio',render:(text:string|number)=>unitConversion(text, 2) + '/D' },
    { label: 'win_count', dataIndex: 'win_count' ,label_tip: 'win_count_tip'},
     { label: 'net_profit_per_tb', dataIndex: 'gas_fee_per_tb',label_tip:'net_profit_per_tb_tip',render:(text:string|number)=>formatFilNum(text, false,false,3) },
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
      render: (text: string | number) => { 
        return formatDateTime(text)
      }
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
        return <Link href={`/address/${text}`} className='link' >{ text}</Link>
      }
    },
    {
      label: 'area', //暂无
      dataIndex:'ip_address'
    },
    {
      label: 'worker_address',
      dataIndex: 'worker_address',
        render: (text:string) => { 
        return <Link href={`/address/${text}`} className='link' >{ text}</Link>
      }
    },
    {
      label: 'controllers_address',
      dataIndex: 'controllers_address',
      render: (text: any, record: any) => { 
        return <div className="array_item">
          {text&& Array.isArray(text)?text?.map((linkItem:string) => { 
            return <Link key={ linkItem} href={`/address/${linkItem}`} className='link' >{ linkItem}</Link>
          }):'--'}
        </div>
      }
    },
    {
      label: 'beneficiary_address',
      dataIndex: 'beneficiary_address',
      render: (text: any, record: any) => { 
        return <div className="array_item">
          {text&&Array.isArray(text)? text?.map((linkItem:string) => { 
            return <Link key={ linkItem} href={`/address/${linkItem}`} className='link' >{ linkItem}</Link>
          }):<Link key={ text} href={`/address/${text}`} className='link' >{ text}</Link>}
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
       { label: '7d', value: '7d' },
      { label: '30d', value: '1m' },
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
    { dataIndex: "cid", title: "cid", type: ["message_basic"]},
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
    {
      dataIndex: "block_time", title: "time", type: ["message_basic"], render: (text:string) => { 
        return text ? dayjs(Number(text)*1000).format('YYYY-MM-DD HH:mm:ss'):'--'
    } },
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
    {
      dataIndex: "value", title: "value", type: ["message_basic"], render: (text:number) => {
        return formatFil(text,'FIL',3) +'FIL'
     } },
    {
      dataIndex: "from",
      title: "from",
      type: ["message_basic"],
      render: (text: string,record:any) =>  get_account_type(record.to_type,text,true)
    },
    {
      dataIndex: "to",
      title: "to",
      type: ["message_basic"],
      render: (text: string,record:any) => {
        return get_account_type(record.to_type,text,true)
      },
    },
    {
      dataIndex: "exit_code",
      title: "exit_code",
      type: ["message_basic"],

    },
    {
      dataIndex: "method_name",
      title: "method_name",
      type: ["message_basic"],
    },
  ],
};

const message_tranf = {
   title: {
    label: "message_tranf",
  },
  columns: (tr:any) => {
    return [
    { dataIndex: 'from', title:tr('from_tranf'), align:'center', render: (text: string, record: any) => get_account_type(record.from_type, text) },
    { dataIndex: 'edit', title: '', align:'center', render: (text: string, record: any) => <Image src={rightImg} width='24' alt='' />} ,
    {dataIndex:'to',title:tr('to_tranf'), align:'center',render:(text:string,record:any)=>get_account_type(record.from_type,text)},
      {
        dataIndex: 'value', title: tr('value'), align: 'center', render: (text: string) => { 
        return  formatFilNum(text, false,false,4)
      }},
    {dataIndex:'consume_type',title:tr('consume_type'), align:'center',render:(text:string)=>tr(text)},

  ]
  } 
}

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
      render: (text: string) => formatFilNum(text, true,false,4),
    },
    {
      dataIndex: "gas_premium",
      title: "gas_premium",
      render: (text: string) => formatFilNum(text, true,false,4),
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
      render: (text: string) => { 
        return formatFilNum(text, true,false,4)
      }
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
    { value: "MessagesByAccountID", label: "message_list", headerList:true},
    { value: "BlocksByAccountID", label: "block_list" },
    { value: "TracesByAccountID", label: "traces_list" },
  ],

  columns: (type: string) => {
    let arr: Array<any> = [];
    switch (type) {
      case "MessagesByAccountID":
        arr = [
          { dataIndex: "cid", title: "cid", render: (text: string) => text? <Link href={`/message/${text}` }className='link'>{ text?isIndent(text,6):''}</Link>:'--'},
          { dataIndex: "height", title: "height",render: (text: string) => <Link href={`/tipset/chain?height=${text}` }className='link'>{ text}</Link> },
          { dataIndex: "block_time", title: "time", render: (text: string|number)=> dayjs(Number(text)*1000).format('YYYY-MM-DD HH:mm')},
          { dataIndex: "from", title: "from" , render: (text: string,record:any) => get_account_type(record.from_type,text)},
          { dataIndex: "to", title: "to" ,     render: (text: string, record: any) =>  get_account_type(record.to_type ,text)},
          { dataIndex: "value", title: "value" ,render:(text:number)=>formatFil(text,'FIL',4)+' FIL'},
          { dataIndex: "exit_code", title: "status" },
          { dataIndex: "method_name", title: "method_name" },
        ];
        break;
      case "BlocksByAccountID":
        arr = [
          { dataIndex: 'cid', title: 'block_cid' ,render: (text: string) => text? <Link href={`/tipset/chain?cid=${text}` }className='link'>{ text?isIndent(text,6):''}</Link>:'--'},
          {dataIndex:'height',title:'block_height',render: (text: string) => <Link href={`/tipset/chain?height=${text}` }className='link'>{ text}</Link> },
          {dataIndex:'block_time',title:'block_time',render: (text: string|number)=> dayjs(Number(text)*1000).format('YYYY-MM-DD HH:mm')},
          {dataIndex:'messages_count',title:'block_messages_count'},
          {dataIndex:'miner_id',title:'block_miner_id',  render: (text: string) => <Link href={`/miner/${text}` }className='link'>{ text}</Link>},
          {dataIndex:'reward',title:'block_mined_reward',render:(text:number)=>formatFil(text,'FIL',2)+' FIL'},

        ]
        break;
      case 'TracesByAccountID':
        arr = [
          { dataIndex: "block_time", title: "time", render: (text: string|number)=> dayjs(Number(text)*1000).format('YYYY-MM-DD HH:mm')},
          { dataIndex: "cid", title: "cid", render: (text: string) => text? <Link href={`/message/${text}` }className='link'>{ isIndent(text,6)}</Link>:'--'},
          { dataIndex: "from", title: "from" ,     render: (text: string,record:any) => get_account_type(record.from_type,text)},
          { dataIndex: "to", title: "to" ,      render: (text: string, record: any) =>  get_account_type(record.to_type ,text)},
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
    { label: 'balance', type: 'line',dataIndex:'balance' },
    ],
  options: [
      { label: '24h', value: '24h' },
      { label: '7d', value: '7d' },
      { label: '30d', value: '1m' },
  ],
   message_list: [
    { value: "MessagesByAccountID", label: "message_list", headerList:true},
    { value: "TracesByAccountID", label: "traces_list" },
  ],
}

const default_content =[
  {
    label: 'account_address', dataIndex: 'account_address', type: ['account_basic'], render: (text:string,record:any,tr:any) => { 
      const owned_miners = record?.account_basic?.owned_miners || [];
      if (owned_miners.length > 0) { 
        return <div>
          {text}
          <Button className="btn-link" onClick={() => { 
            Router.push(`/owner/${record?.account_basic?.account_id}`)
          }}>  
            {tr('account_detail')}
          </Button>
         
        </div>
      }
        return text
  } },
    {
        label: 'base_account_id', dataIndex: 'account_id', type: ['account_basic'],  render: (text: string,record:any) => get_account_type(record.from_type,text)},
    { label: 'account_type', dataIndex: 'account_type', type: ['account_basic'],isNs:true},
    { label: 'balance', dataIndex: 'account_balance', type: ['account_basic'], render: (text:string) => <span>{attoFormatFil(text)}</span>},
    {label:'nonce',dataIndex:'nonce',type:['account_basic']},
    {label:'code_cid',dataIndex:'code_cid',type:['account_basic']},
    { label: 'create_time', dataIndex: 'create_time', type: ['account_basic'],render:(text:number|string)=> formatDateTime(text) },
    {label:'latest_transfer_time',dataIndex:'latest_transfer_time',type:['account_basic'],render:(text:number|string)=> formatDateTime(text)},
  ]

const general_overview_type = (type:string,tr: any) => { 
  const obj :Record<string, any> = {
  //所有者账户
    'account_type':[...default_content],
  'account': [
    ...default_content
  ],
  'multisig': [
  {
    label: 'account_address', dataIndex: 'account_address', type: ['account_basic'], render: (text:string,record:any,tr:any) => { 
      const owned_miners = record?.account_basic?.owned_miners || [];
      if (owned_miners.length > 0) { 
        return <div>
          {text}
          <Button className="btn-link" onClick={() => { 
            Router.push(`/owner/${record?.account_basic?.account_id}`)
          }}>  
            {tr('account_detail')}
          </Button>
         
        </div>
      }
        return text
      }
    },
    {
      label: 'account_type', dataIndex: 'account_type',type: ['account_basic'], render: (text: string) => { 
        return tr(text)
      }
    },
    { label: 'balance', dataIndex: 'account_balance', type: ['account_basic'], render: (text: string) => <span>{attoFormatFil(text)}</span> },
    { label: 'Initial Balance', dataIndex: 'initial_balance', render: (text:string) => <span>{attoFormatFil(text)}</span>},
    { label: 'Unlock Period', dataIndex: 'locked_balance', render: (text:string) => <span>{attoFormatFil(text)}</span>},
    { label: 'Locking Balance', dataIndex: 'locked_balance', render: (text:string) => <span>{attoFormatFil(text)}</span>},
    { label: 'Signers', dataIndex: 'signers', render: (text:string) => { 
        return Array.isArray(text) ?  <span className="array_item">
          {text?.map((item:any) => { 
            return get_account_type(item?.from_type,item)
          })}
          </span>:text
      }},
    { label: 'Approvals Threshold', dataIndex: 'approvals_threshold'},
    {label:'nonce',dataIndex:'nonce',type:['account_basic']},
    { label: 'Available Balance', dataIndex: 'available_balance', render: (text:string) => <span>{attoFormatFil(text)}</span>},
  { label: 'Robust Address', dataIndex: 'account_address',type:['account_basic']},
  {
      label: 'owned_miners', dataIndex: 'owned_miners',type: ['account_basic'], render: (text:string) => { 
        return Array.isArray(text) ?  <span className="array_item">
          {Array.isArray(text) &&text?.map((item:any) => { 
            return <Link className='link'  href={`/miner/${item}`}>{item}</Link>
          })}
          </span>:text
      }
    },
      { label: 'code_cid', dataIndex: 'code_cid', type: ['account_basic'] },

    { label: 'create_time', dataIndex: 'create_time', type: ['account_basic'], render:(text:number|string)=> formatDateTime(text)},
    {label:'latest_transfer_time',dataIndex:'latest_transfer_time',type:['account_basic'],render:(text:number|string)=> formatDateTime(text)},

  ],
  'account_miner': [
    ...default_content,
  ],
  'owner': [
    ...default_content,
    {
      label: 'owned_miners', dataIndex: 'owned_miners', render: (text:string) => { 
        return Array.isArray(text) ?  <span className="array_item">
          {Array.isArray(text) &&text?.map((item:any) => { 
            return <Link className='link'  href={`/miner/${item}`}>{item}</Link>
          })}
          </span>:text
      }
    },
     {
      label: 'owned_active_miners', dataIndex: 'owned_active_miners', render: (text:string) => { 
        return Array.isArray(text) ?  <span className="array_item">
          {Array.isArray(text) && text?.map((item:any) => { 
            return <Link className='link'  href={`/miner/${item}`}>{item}</Link>
          })}
          </span>:text
    } },

    ],
    'placeholder': [
  {
    label: 'account_address', dataIndex: 'account_address', type: ['account_basic'], render: (text:string,record:any,tr:any) => { 
      const owned_miners = record?.account_basic?.owned_miners || [];
      if (owned_miners.length > 0) { 
        return <div>
          {text}
          <Button className="btn-link" onClick={() => { 
            Router.push(`/owner/${record?.account_basic?.account_id}`)
          }}>  
            {tr('account_detail')}
          </Button>
         
        </div>
      }
        return text
        }
      },
             {label: 'eth_address', dataIndex: 'eth_address', type: ['account_basic']},

    {
        label: 'base_account_id', dataIndex: 'account_id', type: ['account_basic'],  render: (text: string,record:any) => get_account_type(record.from_type,text)},
    { label: 'account_type', dataIndex: 'account_type', type: ['account_basic'],isNs:true},
    { label: 'balance', dataIndex: 'account_balance', type: ['account_basic'], render: (text:string) => <span>{attoFormatFil(text)}</span>},
    {label:'nonce',dataIndex:'nonce',type:['account_basic']},
    {label:'code_cid',dataIndex:'code_cid',type:['account_basic']},
    { label: 'create_time', dataIndex: 'create_time', type: ['account_basic'],render:(text:number|string)=> formatDateTime(text) },
    {label:'latest_transfer_time',dataIndex:'latest_transfer_time',type:['account_basic'],render:(text:number|string)=> formatDateTime(text)},
  ],
}
  return obj[type]? obj[type]:[...default_content]
}


const deal = {
  title: {
    label:'deal_details',
  },
  list: [
    { dataIndex: 'deal_id', label: 'deal_id' },
        { dataIndex: 'service_start_time', label: 'service_start_time' ,render:(text:string) =>formatDateTime(text)},
    { dataIndex: 'epoch', label: 'epoch', render: (text:number|string) => <Link className="link" href={`/tipset/chain?height=${text}`}>{ text}</Link> },
    {dataIndex:'message_cid',label:'message_cid',render: (text:number|string) => <Link className="link" href={`/message/${text}`}>{ text}</Link> },
    {dataIndex:'piece_cid',label:'piece_cid'},
    {dataIndex:'verified_deal',label:'verified_deal'},
  ],
  content: {
    left_title: 'deal_left_title',
    right_title: 'deal_right_title',
    value: 'deal_value',
    cash: 'deal_cash',
    time:'deal_time'
  }
}

const deal_hosting = {
    title: {
    label:'deal_hosting',
  },
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
  message_tranf,
  message_other,
  miner_list,
  general_overview,
  general_overview_type,
  deal,
  deal_hosting
};
