/** @format */

import Link from "next/link";
import { isIndent, formatFilNum, formatFil, unitConversion } from "@/utils/utils";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import { Tooltip } from 'antd'
import champion from "@/assets/images/champion.png";
import runnerup from "@/assets/images/runnerup.png";
import thirdrunner from "@/assets/images/thirdrunner.png";
import Image from 'next/image'
import { get_account_type } from "./varible";

dayjs.extend(relativeTime)


const basic_height = [
  
  { dataIndex: "miner_id", title: "miner_id"},
  { dataIndex: "height", title: "height"},
  {
    dataIndex: "block_time", title: "block_time", render: (text: number) => { 
      const time = dayjs(text*1000).format('YYYY-MM-DD HH:mm:ss')
    return `${time} (UTC + 08:00)`
  }},
  { dataIndex: "cid", title: "cid"},

  
]

const chain_columns = [
  { dataIndex: "height", title: "height",  render: (record: Array<any>,text:string) => { 
     return <Link className="link" href={`/tipset/chain?height=${text}`}>{text}</Link>
    }},
  {
    dataIndex: "cid",
    title: "blocks_cid",
    type:['block_basic'],
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
            return <Link key={ data?.miner_id} className="link" href={`/miner/${data.miner_id }`}>{data.miner_id}</Link>
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
    dataIndex: "reward",
    title: "blocks_reward",
      render: (record:any) => { 
         return <div>
        {record.map((data:any,index:number) => {
          return <div key={ index}>{data?.reward ? formatFil(data.reward,'FIL',5) :''}</div>
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
        return <Link href={`/miner/${text}`} className='link'>{ text}</Link>
      }
    },
      {
      label:'win_count',dataIndex:'win_count',
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
      label:'state_root',dataIndex:'state_root',
    },

  ],
   total: 'message_list_total',
    columns:[
            { dataIndex: "cid", title: "cid", render: (text: string) => <Link href={`/message/${text}` }className='link'>{ text?isIndent(text,6):''}</Link>},
            { dataIndex: "height", title: "height",render: (text: string) => <Link href={`/tipset/chain?height=${text}` }className='link'>{ text}</Link> },
            { dataIndex: "block_time", title: "block_time", render: (text: string|number)=> dayjs(Number(text)*1000).format('YYYY-MM-DD HH:mm')},
            { dataIndex: "from", title: "from", render: (text: string,record:any) => get_account_type(record.from_type,text)},
      {
        dataIndex: "to", title: "to", render: (text: string, record: any) => { 
        return get_account_type(record.to_type,text)
      }},
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
    render: (text:string) => <Link href={`/message/${text}`} className='link'>{ isIndent(text,6)}</Link>
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
    render: (text: string,record:any) => get_account_type(record.from_type,text)
  },
  {
    dataIndex: "to",
    title: "to",
    render: (text: string, record: any) =>  get_account_type(record.to_type,text)
  },
  {
    dataIndex: "value",
    title: "value",
    render: (text: number) => <span>{ formatFil(text,'FIL',4) + 'FIL'}</span>
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
    { value: "all", label: "address_all" },
    { value: "account", label: "account" },
    // { value: "2", label: "owner" },
    { value: "storageminer", label: "miner" },
    // { value: "9", label: "payment" },
    { value: "multisig", label: "multisig" },
  ],
};
const address_list_columns =(tr:any)=> {
  return [
  {
    dataIndex: "rank",
    title: "rank",
    width: 80,
    align: 'center',
    render: (_text: number, record: Record<string, any>, index: number) => {
      const url =
        _text === 1
          ? champion
          : _text === 2
            ? runnerup
            : _text === 3
              ? thirdrunner
              : '';
      return _text < 4 ? <Image src={url} width={24} className='rank-icon' alt={""} /> : _text;
    }
    //index + 1,
  },
  {
    dataIndex: "account_address",
    title: "account_address",
    align: 'center',
    render: (text: string, record: any) => { 
      return get_account_type(record?.account_type,text)
      // let href=`/address/${text}`
      // if (record.account_type === 'storageminer') { 
      //   href=`/miner/${text}`
      // }
      //   return <Link href={href} className='link'>
      //     {isIndent(text)}
      //   </Link>
    }
  },
  {
    dataIndex: "balance",
    title: "balance_percentage",
    rowKey: "balance_percentage",
    align:'center',
    render: (text: string, record: any) => {
      return `${formatFil(text,'FIL',2)} FIL / ${(record.balance_percentage*100).toFixed(2)}%`
    },
  },
  {
    dataIndex: "account_type",
    align:'center',
    title: "account_type",
    render: (text:string) => {
      return `${tr(text)}`
     }
  },
  {
    dataIndex: "latest_transfer_time",
    align:'center',
    title: "latest_transfer_time",
  },
];
}

const transfer_list = {
  title: "transfer_list",
  total_list: "transfer_total_list",
};

const transfer_columns = [
  {
    dataIndex: "height",
    title: "height",
    render: (text:string) => { 
      return <Link href={`/tipset/chain?height=${text}`} className="link" >{ text}</Link>
    }
  },
  {
    dataIndex: "cid",
    title: "cid",
      render: (text: string) => (
      <Link href={`/message/${text}`} className='table_link'>
        {isIndent(text)}
      </Link>
    ),
  },
  {
    dataIndex: "block_time",
    title: "block_time",
    render:(text:any)=>dayjs(Number(text)*1000).format('YYYY-MM-DD HH:mm:ss')
  },
  {
    dataIndex: "from",
    title: "from",
    render: (text: string,record:any) => get_account_type(record.from_type,text)
    //   render: (text: string) => (
    //   <Link href={`/address/${text}`} className='table_link'>
    //     {isIndent(text)}
    //   </Link>
    // ),
  },
  {
    dataIndex: "to",
    title: "to",
     render: (text: string, record: any) =>  get_account_type(record.to_type,text)
    // render: (text: string) => { 
    //   if (text.length > 8 && !text.startsWith('f0')) { 
    //     return  <Link href={`/address/${text}`} className='table_link'>
    //     {isIndent(text)}
    //   </Link>
    //   }
    //   return <Link href={`/miner/${text}`} className='table_link'>
    //     {isIndent(text)}
    //   </Link>
  
    // }
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
    render: (text:string,record:any) => { 
      return <Link href={`/deal/${text}`} className="link">
        <Tooltip  >
          {/* <Image width={15} height={ 15} src=''/> */}
          { text}
        </Tooltip>
      </Link>
    }
    
  },
  {
    dataIndex: "piece_cid",
    title: "piece_cid",
    render: (text:string) => { 
      return <span>{ isIndent(text,6)}</span>
    }
  },
  {
    dataIndex: "piece_size",
    title: "piece_size",
    with:120,
    render:(text:number|string)=>unitConversion(text)
  },
  {
    dataIndex: "client_address",
    title: "client_address",
    render: (text: string, record: any) =>  get_account_type(record.client_type,text)

  },
  {
    dataIndex: "provider_id",
    title: "provider_id",
      render: (text: string, record: any) =>  get_account_type(record.provider_type,text)

  },
  {
    dataIndex: "service_start_time",
    title: "service_start_time",
    render:(text:string)=>dayjs(Number(text)*1000).format('YYYY-MM-DD HH:mm:ss')
  },

  {
    dataIndex: "end_time",
    title: "end_time",
    render:(text:string)=>dayjs(Number(text)*1000).format('YYYY-MM-DD HH:mm:ss')

  },
  // {
  //   dataIndex: "start_height",
  //   title: "start_height",
  // },
  // {
  //   dataIndex: "end_height",
  //   title: "end_height",
  // },
  {
    dataIndex: "storage_price_per_height",
    title: "storage_price_per_height",
  },
  {
    dataIndex: "verified_deal",
    title: "verified_deal",
    render:(text:boolean)=>String(text)
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
      <Link href={`/message/${text}`} className='table_link'>
        {isIndent(text)}
      </Link>
    ),
  },
  { dataIndex: "block_time", title: "block_time",render:(text:string|number)=>dayjs(Number(text)*1000).format('YYYY-MM-DD HH:mm') },
  {
    dataIndex: "from",
    title: "from",
    render: (text: string,record: any) => { 
       return get_account_type(record?.from_type,text)
      return (
      <Link href={`/address/${text}`} className='table_link'>
        {isIndent(text)}
      </Link>
    )
    },
  },
  {
    dataIndex: "to",
    title: "to",
    render: (text: string, record: any) => { 
      return get_account_type(record?.to_type,text)
    //   return (
    //   <Link href={`/miner/${text}`} className='table_link'>
    //     {isIndent(text)}
    //   </Link>
    // )
    },
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
  basic_height,
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
