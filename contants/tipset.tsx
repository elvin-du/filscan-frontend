/** @format */

import Link from "next/link";
import { isIndent, formatFilNum, formatFil } from "@/utils/utils";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
 
dayjs.extend(relativeTime)

const chain_columns = [
  { dataIndex: "height", title: "height",  render: (record: Array<any>,text:string) => { 
     return <Link className="link" href={`/tipset/chain?height=${text}`}>{text}</Link>
    }},
  {
    dataIndex: "cid",
    title: "blocks_cid",
    render: (record: Array<any>) => { 
      return <div className="array_item_column">
        {record.map(data => {
          if (data?.cid) { 
            return <Link key={ data.cid} className="link" href={`/tipset/chain?cid=${data.cid }`}>{isIndent(data.cid,6)}</Link>
          }
          return '--'
        })}
      </div>
    }
  },
  {
    dataIndex: "miner_id",
    title: "blocks_miner",
      render: (record: Array<any>) => { 
        return <div className="array_item_column">
        {record.map(data => {
          if (data?.miner_id) { 
            return <Link key={ data?.miner_id} className="link" href={`/detail/miner/${data.miner_id }`}>{data.miner_id}</Link>
          }
          return '--'
        })}
      </div>
    }
    
  },
  {
    dataIndex: "tag", title: "tag", 
    render: (record: Array<any>) => { 
        return <div className="array_item_column">
        {record.map(data => {
            return <div>{data?.tag||'--'}</div>
        })}
      </div>
    }},
  {
    dataIndex: "messages_count",
    title: "blocks_messages",
     render: (record:any) => { 
        return <div>
        {record.map((data:any,index:number) => {
          return <div key={index}>{data?.messages_count ||0}</div>
        })}
      </div>
    }
  },
  {
    dataIndex: "mined_reward",
    title: "blocks_reward",
      render: (record:any) => { 
         return <div>
        {record.map((data:any,index:number) => {
          return <div key={ index}>{data?.mined_reward ? formatFil(data.mined_reward,'FIL',5) :''}</div>
        })}
      </div>
    }
  },
  {
    dataIndex: "block_time",
    title: "block_time",
    type: ["blocks", "block_basic"],
    render: (record: any) => { 
      const time = record.length > 0 && record[0]?.block_time;
      if (time) { 
         return <div >{dayjs(Number(time)*1000).fromNow()}</div>
      }
      return '--'
     
    }
  },
];

const chain_cid = {
  title: {
    label: 'chain_cid_detail',
  },
  list: [
    {
      label: 'blocks_cid', dataIndex: 'cid', type: ['block_basic'],
      render: (text: any, data:any) => { 
        return <span style={{fontWeight:'bolder'}}>{ text}</span>
      }
    },
    {
      label: 'cid_height', dataIndex: 'height', type: ['block_basic'],
      render: (text: any) => { 
        return <Link href={`/tipset/chain?height=${text}`} className='link'>{ text}</Link>
      }
    },
    {
      label: 'block_time', dataIndex: 'block_time', type: ['block_basic'],
       render: (text: any, data:any) => { 
        return <span>{dayjs(Number(text)*1000).format()}</span>
      }
    },
    {
      label: 'blocks_messages', dataIndex: 'messages_count', type: ['block_basic'],
    
    },
    {
      label: 'blocks_miner', dataIndex: 'miner_id', type: ['block_basic'],
        render: (text: any) => { 
        return <Link href={`/detail/miner/${text}`} className='link'>{ text}</Link>
      }
    },
    {
      label: 'blocks_reward', dataIndex: 'mined_reward', type: ['block_basic'],
       render: (text: any, data:any) => { 
        return <span >{formatFil(text,'FIL',6)} FIL</span>
      }
    },
    {
      label: 'parents_cid', dataIndex: 'parents', type: ['block_basic'],
      render: (text:any, data:any) => { 
        return <div  className='array_item_column'>
          {data?.parents?.map((item:string) => { 
            return <Link href={`/tipset/chain?cid=${item}`} key={ item} className='link'>{item}</Link>
          })}
        </div>
      }
    },
    {
      label:'parent_weight',dataIndex:'parent_weight',
    },
    {
      label:'parent_base_fee',dataIndex:'parent_base_fee',
    },
    {
      label:'ticket_value',dataIndex:'ticket_value',
    },
    {
      label:'parent_weight',dataIndex:'parent_weight',
    },

  ],
   total: 'message_list_total',
    columns:[
            { dataIndex: "cid", title: "cid", render: (text: string) => <Link href={`/detail/message/${text}` }className='link'>{ text?isIndent(text,6):''}</Link>},
            { dataIndex: "height", title: "height",render: (text: string) => <Link href={`/tipset/chain?height=${text}` }className='link'>{ text}</Link> },
            { dataIndex: "block_time", title: "block_time", render: (text: string|number)=> dayjs(Number(text)*1000).format('YYYY-MM-DD HH:mm')},
            { dataIndex: "from", title: "from" ,  render: (text: string) => <Link href={`/detail/general/${text}` }className='link'>{ isIndent(text,6)}</Link>},
            { dataIndex: "to", title: "to" ,  render: (text: string) => <Link href={`/detail/miner/${text}` }className='link'>{ text}</Link>},
            { dataIndex: "value", title: "value" ,render:(text:number)=>formatFil(text,'FIL',4)+' FIL'},
            { dataIndex: "status", title: "message_list_exit_code" },
            { dataIndex: "method_name", title: "method_name" },
  ],

}


const message_list = {
  title: "message_list",
  total_list: "total_list",
};

const message_list_columns = [
  {
    dataIndex: "cid",
    title: "cid",
    render: (text:string) => <Link href={`/detail/message/${text}`} className='link'>{ isIndent(text,6)}</Link>
  },
  {
    dataIndex: "height",
    title: "height",
    render: (text:string) => <Link href={`/tipset/chain?height=${text}`} className='link'>{text}</Link>

  },
  {
    dataIndex: "block_time",
    title: "block_time",
    render:(text:string|number)=>dayjs(Number(text)*1000).format('YYYY-MM-DD HH:mm')
  },
  {
    dataIndex: "from",
    title: "from",
    render: (text:string) => <Link href={`/detail/general/${text}`} className='link'>{isIndent(text,6)}</Link>
  },
  {
    dataIndex: "to",
    title: "to",
        render: (text:string) => <Link href={`/detail/general/${text}`} className='link'>{isIndent(text,6)}</Link>

  },
  {
    dataIndex: "value",
    title: "value",
  },
  {
    dataIndex: "exit_code",
    title: "message_list_exit_code",
  },
  {
    dataIndex: "method_name",
    title: "method_name",
  },
];

const address_list = {
  title: "address_list",
  total_list: "address_total_list",
  options: [
    { value: "0", label: "address_all" },
    { value: "1", label: "account" },
    { value: "2", label: "owner" },
    { value: "3", label: "miner" },
    // { value:"system", index: "4", label:"系统账户" },
    // { value:"init", index: "5", label:"初始化账户" },
    // { value:"cron", index: "6", label:"定时任务" },
    // { value:"power", index: "7", label:"存储算力" },
    // { value:"market", index: "8", label:"市场账户" },
    { value: "9", label: "payment" },
    { value: "10", label: "multisig" },
    // { value:"reward", index: "11", label:"奖励账户" },
  ],
};
const address_list_columns = [
  {
    dataIndex: "rank",
    title: "rank",
    render: (_text: string, record: Record<string, any>, index: number) =>
      index + 1,
  },
  {
    dataIndex: "account_address",
    title: "account_address",
  },
  {
    dataIndex: "tag",
    title: "tag",
    render: () => "--",
  },
  {
    dataIndex: "balance",
    title: "balance_percentage",
    rowKey: "balance_percentage",
    render: (text: string, record: any) => {
      return text;
    },
  },
  {
    dataIndex: "account_type",
    title: "account_type",
  },
  {
    dataIndex: "latest_transfer_time",
    title: "latest_transfer_time",
  },
];

const transfer_list = {
  title: "transfer_list",
  total_list: "transfer_total_list",
};

const transfer_columns = [
  {
    dataIndex: "height",
    title: "height",
  },
  {
    dataIndex: "cid",
    title: "cid",
  },
  {
    dataIndex: "block_time",
    title: "block_time",
  },
  {
    dataIndex: "from",
    title: "from",
  },
  {
    dataIndex: "to",
    title: "to",
  },
  {
    dataIndex: "value",
    title: "value",
  },
  {
    dataIndex: "method_name",
    title: "method_name",
  },
];

const dsn_list = {
  title: "dsn_list",
  total_list: "dsn_total_list",
  placeholder: "dsn_placeholder",
};

const dsn_columns = [
  {
    dataIndex: "deal_id",
    title: "deal_id",
  },
  {
    dataIndex: "piece_cid",
    title: "piece_cid",
  },
  {
    dataIndex: "piece_size",
    title: "piece_size",
  },
  {
    dataIndex: "client_address",
    title: "client_address",
  },
  {
    dataIndex: "provider_id",
    title: "provider_id",
  },
  {
    dataIndex: "service_start_time",
    title: "service_start_time",
  },

  {
    dataIndex: "end_time",
    title: "end_time",
  },
  {
    dataIndex: "start_height",
    title: "start_height",
  },
  {
    dataIndex: "end_height",
    title: "end_height",
  },
  {
    dataIndex: "storage_price_per_height",
    title: "storage_price_per_height",
  },
  {
    dataIndex: "verified_deal",
    title: "verified_deal",
  },
];

const pool_list = {
  title: "pool_list",
  total_list: "total_list",
};

const pool_columns = [
  {
    dataIndex: "cid",
    title: "cid",
    render: (text: string) => (
      <Link href={`/detail/message/${text}`} className='table_link'>
        {isIndent(text)}
      </Link>
    ),
  },
  { dataIndex: "block_time", title: "block_time" },
  {
    dataIndex: "from",
    title: "from",
    render: (text: string) => (
      <Link href={`/detail/general/${text}`} className='table_link'>
        {isIndent(text)}
      </Link>
    ),
  },
  {
    dataIndex: "to",
    title: "to",
    render: (text: string) => (
      <Link href={`/detail/miner/${text}`} className='table_link'>
        {isIndent(text)}
      </Link>
    ),
  },
  {
    dataIndex: "value",
    title: "value",
    render: (text: string) => {
      let str = formatFilNum(text, true, false);
      let ArrStr = str.split(" ");
      return Number(ArrStr[0]).toFixed(3) + " " + ArrStr[1];
    },
  },
  { dataIndex: "gas_fee_cap", title: "gas_fee_cap" },
  {
    dataIndex: "gas_premium",
    title: "gas_premium",
    render: (text: string) => (text ? text + " attoFIL" : "--"),
  },
  { dataIndex: "method_name", title: "method_name" },
];

export {
  chain_columns,
  chain_cid,
  message_list,
  message_list_columns,
  address_list,
  address_list_columns,
  transfer_list,
  transfer_columns,
  dsn_list,
  dsn_columns,
  pool_list,
  pool_columns,
};
