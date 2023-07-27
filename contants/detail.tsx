/** @format */
import Link from "next/link";
import { table_opt } from "@/types";
import { formatFilNum, formatDateTime, formatFil, formatNumber, isIndent, unitConversion, getImgUrl, isMobile } from "@/utils/utils";
import dayjs from "dayjs";
import Copy from '@/components/copy'
import { get_account_type } from "./varible";
import Image from "@/packages/image";
import { Button, Select } from "antd";
import Router from "next/router";
import { getSvgIcon } from "@/svgUtils";
import DropDown from '@/packages/dropDown';
import Fold from '@/components/flod'
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
          {text&& Array.isArray(text)&&text?.map((item:any,index:number) => { 
            return <Link className='link' key={ index}  href={`/miner/${item}`}>{item}</Link>
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
        align:'right',
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
        renderList: [{ label: 'sector_count', value: 'live_sector_count' },
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
  content: [{ label: 'power_increase_indicators', style: { width: '22%', textAlign:'left'},  dataIndex: 'power_increase',render:(text:string|number)=>unitConversion(text, 2), },
      {label: 'precommit_deposits', dataIndex: 'sector_deposits',style: { width: '33%', textAlign:'center'}, render: (text: string | number) => formatFilNum(text, false,false)}, //扇区质押
    {
      label: 'block_count', dataIndex: 'block_count_increase', style: { width: '25%', textAlign: 'center' }, label_tip: 'block_count_tip', render: (text: any) =>  text},
    { label: 'mining_efficiency', dataIndex: 'rewards_per_tb', style: { width: '20%', justifyContent:'end'}, label_tip: 'mining_efficiency_tip' ,render:(text:string|number)=>formatFil(text,'FIL',4) +' FIL/TiB' },
    { label: 'power_ratio', dataIndex: 'power_ratio' , style: { width: '22%', textAlign:'left'},render:(text:string|number)=>unitConversion(text, 2) + '/D',},
    { label: 'gas_fee', dataIndex: 'gas_fee',style: { width: '33%', textAlign:'center'}, render:(text:string|number)=>formatFilNum(text, false,false)},
    { label: 'block_rewards', dataIndex: 'block_reward_increase',style: { width: '25%', textAlign:'center'}, render:(text:string|number)=>formatFil(text,'FIL',4)  + ' FIL'  },
    { label: 'lucky', dataIndex: 'lucky',style: { width: '20%', justifyContent:'end'}, render:(text:string|number)=>  text!== '-1' ? Number(100 * Number(text)).toFixed(4) + ' %' : '--' },
      { label: 'sector_increase',style: { width: '22%', textAlign:'left'}, dataIndex: 'sector_increase',render:(text:string|number)=>unitConversion(text, 2), },
      { label: 'sector_ratio',style: { width: '33%', textAlign:'center'}, dataIndex: 'sector_ratio',render:(text:string|number)=>unitConversion(text, 2) + '/D' },
    { label: 'win_count', style: { width: '25%', textAlign:'center'},dataIndex: 'win_count' ,label_tip: 'win_count_tip',render: (text: any) =>  text},
     { label: 'net_profit_per_tb', style: { width: '20%', justifyContent:'end'},dataIndex: 'gas_fee_per_tb',label_tip:'net_profit_per_tb_tip',render:(text:string|number)=>formatFilNum(text, false,false,3) },
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
      label: 'account_type',
      dataIndex: 'account_type',
      type: ["account_basic"],
      render:(text:any,record:any,tr:any)=>tr(text)
      },
       {
      label: 'account_address',
      dataIndex: 'account_address',
      type: ["account_basic"],
            render:(text:string)=>isIndent(text)

     },
  
      {
      label: 'owner_address',
      dataIndex: 'owner_address',
      render: (text:string) => { 
        return <Link href={`/address/${text}`} className='link' >{ isIndent(text)}</Link>
      }
      },
       {
      label: 'worker_address',
      dataIndex: 'worker_address',
        render: (text:string) => { 
        return <Link href={`/address/${text}`} className='link' >{ isIndent(text)}</Link>
      }
    },
        {
      label: 'beneficiary_address',
      dataIndex: 'beneficiary_address',
      render: (text: any, record: any) => { 
        return <div className="array_item">
          {text&&Array.isArray(text)? text?.map((linkItem:string,index:number) => { 
            return <Link key={linkItem} href={`/address/${linkItem}`} className='link' >{ linkItem}</Link>
          }):<Link key={ text} href={`/address/${text}`} className='link' >{ isIndent(text)}</Link>}
        </div>
      }
    },
   
   
        //   {
    //   label: 'create_time',
    //   dataIndex: 'create_time',
    //    type: ["account_basic"],
    //   render: (text: string | number) => { 
    //     return formatDateTime(text)
    //   }
    // },
    //       {
    //   label: 'area', //暂无
    //   dataIndex:'ip_address'
    // },
        {
      label: 'controllers_address',
      dataIndex: 'controllers_address',
      render: (text: any, record: any) => { 
        return <div className="array_item_column">
          {text&& Array.isArray(text)?text?.map((linkItem:string,index:number) => { 
            return <Link key={linkItem}  href={`/address/${linkItem}`} className='link' >{ isIndent(linkItem)}</Link>
          }):'--'}
        </div>
      }
      },
        
  
  ],
  // list: [

  //   [
  //     {
  //     label: 'create_time',
  //     dataIndex: 'create_time',
  //      type: ["account_basic"],
  //     render: (text: string | number) => { 
  //       return formatDateTime(text)
  //     }
  //   },
  
  //     {
  //     label: 'owner_address',
  //     dataIndex: 'owner_address',
  //     render: (text:string) => { 
  //       return <Link href={`/address/${text}`} className='link' >{ isIndent(text)}</Link>
  //     }
  //     },
  //      {
  //     label: 'worker_address',
  //     dataIndex: 'worker_address',
  //       render: (text:string) => { 
  //       return <Link href={`/address/${text}`} className='link' >{ isIndent(text)}</Link>
  //     }
  //   },
  //       {
  //     label: 'beneficiary_address',
  //     dataIndex: 'beneficiary_address',
  //     render: (text: any, record: any) => { 
  //       return <div className="array_item">
  //         {text&&Array.isArray(text)? text?.map((linkItem:string,index:number) => { 
  //           return <Link key={linkItem} href={`/address/${linkItem}`} className='link' >{ linkItem}</Link>
  //         }):<Link key={ text} href={`/address/${text}`} className='link' >{ isIndent(text)}</Link>}
  //       </div>
  //     }
  //   },
  //   ],
  //   [
  //     {
  //     label: 'account_type',
  //     dataIndex: 'account_type',
  //     type: ["account_basic"],
  //     render:(text:any,record:any,tr:any)=>tr(text)
  //     },
  //      {
  //     label: 'account_address',
  //     dataIndex: 'account_address',
  //     type: ["account_basic"],
  //           render:(text:string)=>isIndent(text)

  //     },
  //         {
  //     label: 'area', //暂无
  //     dataIndex:'ip_address'
  //   },
  //       {
  //     label: 'controllers_address',
  //     dataIndex: 'controllers_address',
  //     render: (text: any, record: any) => { 
  //       return <div className="array_item_column">
  //         {text&& Array.isArray(text)?text?.map((linkItem:string,index:number) => { 
  //           return <Link key={linkItem}  href={`/address/${linkItem}`} className='link' >{ isIndent(linkItem)}</Link>
  //         }):'--'}
  //       </div>
  //     }
  //     },
        
  //   ]
  // ],
  
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

export const message_list = {
  tabs: [
    { label: 'message_detail', value: 'detail' },
    {label:'trade',value:'trade'},
    {label:'event_log',value:'event_log'},
  ],
  
}

// //详情概况
export const message_overview_trade= [
    {
        dataIndex: 'from',
        title: 'from_ath',
        render: (text: string, record: any) => get_account_type(record.from_type, text)
    },
     {
        dataIndex: 'to',
         title: 'to_ath',
        render:(text:string,record:any)=>get_account_type(record.from_type,text)
    },
      {
        dataIndex: 'value',
          title: 'amount',
        render: (text: string) => { 
        return  formatFilNum(text,false,false,4)
      }
    },
    {
        dataIndex: 'method',
        title: 'method'
    },
]

export const message_event_log = [
  { title: 'account_address', dataIndex: 'address' },
  { title: 'Name', dataIndex: 'name' },
  {
    title: 'topic', dataIndex: 'topics', render: (text:any,record:any) => { 
      if (Array.isArray(text)) { 
        return text.map((item:string,index:number) => { 
          return <li key={item} className='array_item' >
            <span className="array_item_icon">{ index}</span>
            { item}
          </li>
        })
      }
      return text||'--'
     
  }}, 
  {
    title: 'params', dataIndex: 'data', render: (text:string) => {
      return <div className="bg-render">
        { text}
    </div>
   } },
  { title:'Log Index',dataIndex:'log_index' },
  { title:'Removed',dataIndex:'removed' },
]


export const message_overview_detail:any = {
  title: {
    label: "message_overview_detail",
  },
  content: [
    [{
      dataIndex: "cid", title: "cid", type: ["message_basic"], render: (text:string) => { 
        return text? <span className="flex_align_center">{isMobile() ? isIndent(text,6):text} <Copy text={ text} /></span>:text
    }},
    { dataIndex: 'eth_message', title: 'eth_message',  elasticity:true,render: (text:string) => { 
        return text? <span className="flex_align_center">{ isMobile() ? isIndent(text,6):text} <Copy text={ text} /></span>:text
    } },
    {
      dataIndex: "exit_code",
      title: "exit_code",
      type: ["message_basic"],
      render: (text: any) => {
        if (text?.startsWith('Ok')) {
          return <div className='flex-center'>
            <span className="antd-icon">
              <span className="success_color">
             { getSvgIcon('successIcon')}
            </span>
            </span>
            <span style={{ color: '#059b02' }}>Success</span>
          </div>
        } else if (text?.startsWith('Pending')) { 
          return <div className='flex-center'>
            <span className="antd-icon">{getSvgIcon('penddingIcon')}</span>
            <span style={{ color: '#FFBF03' }}>Pending</span>
          </div>
        }
        return <div className='flex-center'>
            <span className="antd-icon">{getSvgIcon('errorIcon')}</span>
            <span style={{color:'#e11919' }}>Error</span>
          </div>
      }

    },
     {
      dataIndex: "value", title: "value", type: ["message_basic"], render: (text:number) => {
        return  formatFilNum(text, false,false,4)
     } },
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
      dataIndex: "block_time", title: "time", type: ["message_basic"], render: (text: string) => {
        return text ? dayjs(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss') : '--'
      }
    },
     {
      dataIndex: "method_name",
      title: "method_name",
      type: ["message_basic"],
    },
    {
      dataIndex: "swap_info",
      elasticity: true,
      style: {borderTop:'1px solid var(--border-color)',padding:'15px 10px'},
      title: (tr: any) => <span style={{position:'relative',paddingLeft:25}}>
        <span style={{position:'absolute',top:'4px',left:'5px'}}> {getSvgIcon('transaction')}</span>
          {tr('Transaction')}:
      </span>,
      render: (text: any) => {
        if (text) { 
           return <span className="flex_align_center">
             <span className="font-Weight_500">Swap</span>
          <span>{ text?.amount_in?.toLocaleString()}</span>
          <span>{text?.amount_in_token_name.toLocaleUpperCase()}</span>
          <span className="font-des">For</span>
         <span>{text?.amount_out}</span>
          <span>{text?.amount_out_token_name}</span>
             <span className="margin-6">On</span>
             {text.dex_url ? <span className="link" onClick={ 
               () => { 
                 window.open(text.dex_url)
               }
             }>
               <Image className="margin-6 fvm_img_url"  src={getImgUrl(text?.dex)} alt='' width={20} height={20} />
             </span>:<Image className="margin-6 fvm_img_url"  src={getImgUrl(text?.dex)} alt='' width={20} height={20} />
             }
             <span>{text?.dex}</span>
        </span>
        }
        return null
       
      },

    },
  {
      dataIndex: "from",
      title: "from",
      style: {borderTop:'1px solid var(--border-color)',paddingTop:'15px'},
      type: ["message_basic"],
      render: (text: string,record:any) =>  get_account_type(record.to_type,text,0)
    },
    {
      dataIndex: "to",
      title: "to",
      type: ["message_basic"],
      render: (text: string,record:any) => {
        return get_account_type(record.to_type,text,0)
      },
    }],

   [  {
       label: 'message_ERC20Trans',
       elasticity: true,
     dataIndex: 'message_ERC20Trans', 
       style: {borderBottom:'1px solid var(--border-color)',paddingBottom:'15px'},
       render: (text: any, record: any, tr: any) => {
         if (Array.isArray(text)) { 
          // return <Fold data={text} tr={ tr} />
          return <div className="array_item_column"> {text.map((item: any, index) => { 
            return <li key={index} className='array_item_column_li'>
              <div className="flex_align_center ">
                <span className="font_weight">{tr('from_ath')}</span><span>{get_account_type(item.from_type, item.from)}</span>
              </div>
              <div className="flex_align_center">
                <span className="font_weight">{tr('to_ath')}</span> <span>{get_account_type(item.to_type, item.to)}</span>
              </div>
              <div className="flex_align_center">
              <span className="font_weight">For</span>  
              <span>{Number(item?.amount).toFixed(4) || '--'}</span>
                <span>{item?.token_name}</span>
                
              </div>
              
            </li>
            })}
          </div>
        }
        return '--'
       }
   },
     {
       label: 'message_NftTrans',
       elasticity: true,
     dataIndex: 'nftTrans', 
       style: {borderBottom:'1px solid var(--border-color)',paddingBottom:'15px'},
       render: (text: any, record: any, tr: any) => {
        if (Array.isArray(text) ) { 
          return <div className="array_item_column"> {text.map((item: any, index) => { 
            return <li key={index}
              className='array_item_column_li'>
              <div className="array_item_column_li">
               <span className="font_weight">{tr('from_ath')}</span><span>{get_account_type(item.from_type, item.from)}</span>
              </div>
              <div className="flex_align_center">
                <span className="font_weight">{tr('to_ath')}</span> <span>{get_account_type(item.to_type, item.to)}</span>
              </div>
              <div className="flex_align_center">
              <span  className="font_weight">For</span>  
              <span>{Number(item?.amount).toFixed(4) || '--'}</span>
              <span>{ item?.token_name}</span>
              </div>
              
            </li>
            })}
          </div>
        }
        return '--'
       }
     },
      {
          label: 'message_tranf', dataIndex: 'consume_list',
        elasticity: true,
          style: {margin:'10px 0px 0px 0px',},
          render: (text: any, record: any, tr: any) => {
        if (Array.isArray(text) ) { 
          return <div className="array_item_column"> {text.map((item: any, index) => { 
            return <li key={index} className='array_item_column_li'>
              <div  className="flex_align_center">
                <span  className="font_weight">{tr('from_ath')}</span><span>{get_account_type(item.from_type, item.from)}</span>
              </div>
              <div  className="flex_align_center">
              <span  className="font_weight">{tr('to_ath')}</span> <span>{get_account_type(item.to_type, item.to)}</span>
              </div>
              <div  className="flex_align_center">
             <span  className="font_weight">For</span>  
              <span>{formatFilNum(item.value, false,false,4) || '--'}</span>
             <span>({tr(item.consume_type)})</span>
              </div>
             
            </li>
            })}
          </div>
        }
        return '--'
      }
    },],
      
    [   {
      dataIndex: "blk_cids",
         title: "blk_cids",
      render: (text: Array<string>) => {
        if (!Array.isArray(text) || !text) return "--";
        return text.map((item: string,index:number) => {
          return (
            <div className="flex_align_center">
              <Link
              key={index}
              className='link link-html'
              href={`/tipset/chain?cid=${item}`}>
              {isMobile()? isIndent(item,8) :item}
              </Link>
               { item && <Copy text={item} />}
            </div>
           
          );
        });
      },
    },
    {
      dataIndex: "base_fee",
          title: "base_fee",
      style: {borderTop:'1px solid var(--border-color)',marginTop:15,paddingTop:15},
      render: (text: string) => { 
        return formatFilNum(text, false,false,4)
      }
    },
    { dataIndex: "version", title: "version",render:(text:any)=>text},
    { dataIndex: "nonce", title: "nonce",render:(text:any)=>text},
    {
      dataIndex: "gas_fee_cap",
      title: "gas_fee_cap",
      render: (text: string) => formatFilNum(text,false,false,4),
    },
    {
      dataIndex: "gas_premium",
      title: "gas_premium",
      render: (text: string) => formatFilNum(text, false,false,4),
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
      dataIndex: "all_gas_fee",
      title: "all_gas_fee",
      render: (text: string) => formatFilNum(text, false,false,4),
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
            {["params", "params_detail"].map((key,index:number) => {
              const showValue = record&& record[key] ?record[key] :'';
              return (
                <div className='text' key={index}>
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
            {["returns", "returns_detail"].map((key,index) => {
              const showValue = record&& record[key] ?record[key] :'';
              return (
                <div className='text' key={index}>
                  {showValue && JSON.stringify(showValue, undefined, 3)}
                </div>
              );
            })}
            {" }"}
          </div>
        );
      },
    },]
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
    { value: "MessagesByAccountID", label: "message_list",show_active:'message', headerList:true},
    { value: "BlocksByAccountID", label: "block_list",show_active:'block', },
    { value: "TracesByAccountID", label: "traces_list",show_active:'trace', },
  ],

  columns: (type: string, fromList: any, toList: any) => {
    let arr: Array<any> = [];
    switch (type) {
      case "MessagesByAccountID":
        arr = [
          { dataIndex: "cid", title: "cid", render: (text: string) => text? <Link href={`/message/${text}` }className='link'>{ text?isIndent(text,6):''}</Link>:'--'},
          { dataIndex: "height", title: "height",render: (text: string) => <Link href={`/tipset/chain?height=${text}` }className='link'>{ text}</Link> },
          { dataIndex: "block_time", title: "time", render: (text: string|number)=> dayjs(Number(text)*1000).format('YYYY-MM-DD HH:mm')},
          {
            dataIndex: "from", title: "from", render: (text: string, record: any) => { 
              if (!text) return '--';
              return <span className="table_li">
                {get_account_type(record.from_type, text)}
                {fromList?.domains&&fromList?.domains[text] && <Link href={ `/domain/${fromList.domains[text]}?provider=${fromList.provider}`}>({ fromList.domains[text]})</Link>}

              </span>
          }},
          { dataIndex: "to", title: "to" ,     render: (text: string, record: any) => { 
              if (!text) return '--';
            return <div className="table_li">
              <div>
                  {get_account_type(record.to_type, text)}
                </div>
                
           {toList?.domains&&toList?.domains[text] && <Link href={ `/domain/${toList.domains[text]}?provider=${toList.provider}`}>({ toList.domains[text]})</Link>}

              </div>
          }},
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
          { dataIndex: "block_time", title: "time", render: (text: string | number) => dayjs(Number(text) * 1000).format('YYYY-MM-DD HH:mm') },
          { dataIndex: "cid", title: "cid", render: (text: string) => text ? <Link href={`/message/${text}`} className='link'>{isIndent(text, 6)}</Link> : '--' },
            {
            dataIndex: "from", title: "from", render: (text: string, record: any) => { 
              if (!text) return '--';
              return <span className="table_li">
                {get_account_type(record.from_type, text)}
                {fromList?.domains && fromList?.domains[text] && <Link href={ `/domain/${fromList.domains[text]}?provider=${fromList.provider}`}>({ fromList.domains[text]})</Link>}
              </span>
          }},
          { dataIndex: "to", title: "to" ,     render: (text: string, record: any) => { 
              if (!text) return '--';
            return <div className="table_li">
              <div>
                  {get_account_type(record.to_type, text)}
                </div>
                
                {toList?.domains&&toList?.domains[text] && <Link href={ `/domain/${toList.domains[text]}?provider=${toList.provider}`}>({ toList.domains[text]})</Link>}
              </div>
          }},
          { dataIndex: "value", title: "value", render: (text: number) => formatFil(text, 'FIL', 4) + ' FIL' },
          { dataIndex: "method_name", title: "method_name" },
        ];
        break;
      case "ERC20OwnerTokenList":
        arr = [
          { dataIndex: "token_name", title: "token_name" },
          { dataIndex: "contract_id", title: "contract_id", render: (text: string) => text? <Link href={`/address/${text}` }className='link'>{ isIndent(text,6)}</Link>:'--'},
          { dataIndex: "amount", title: "amount", render: (text: number) => formatFil(text, 'FIL', 4) + ' FIL' },
           { dataIndex: "value", title: "value" ,render:(text:number)=>formatFil(text,'FIL',4)+' FIL'},

        ];
        break;
       case "ERC20AddrTransfers":
        arr = [
          { dataIndex: "time", title: "time", render: (text: string | number) => formatDateTime(text) },
          { dataIndex: "cid", title: "cid", render: (text: string) => text ? <Link className="link" href={`/message/${text}`} >{isIndent(text,6)}</Link> : '--' },
            {
            dataIndex: "from", title: "from", render: (text: string, record: any) => { 
              if (!text) return '--';
              return <span className="table_li">
                {get_account_type(record.from_type, text)}
                {fromList?.domains&&fromList?.domains[text] && <Link href={ `/domain/${fromList.domains[text]}?provider=${fromList.provider}`}>({ fromList.domains[text]})</Link>}

              </span>
          }},
          { dataIndex: "to", title: "to" ,     render: (text: string, record: any) => { 
              if (!text) return '--';
            return <div className="table_li">
              <div>
                  {get_account_type(record.to_type, text)}
                </div>
                
           {toList?.domains&&toList?.domains[text] && <Link href={ `/domain/${toList.domains[text]}?provider=${toList.provider}`}>({ toList.domains[text]})</Link>}

              </div>
          }},
          { dataIndex: "method", title: "method" },
          {
            dataIndex: "amount", title: "amount", render: (text: number,record:any) => { 
              return <div>
                {formatNumber(text)}
                <span className="margin-6">{record.token_name }</span>
              </div>

          } },
             {
               dataIndex: "icon_url",
               width:150,
               title: "platform", render: (text: string, record: any) => { 
                 if (!text) { 
                   return <Image src={text} width={25} style={{borderRadius:'50%'}} height={25}/>
                 }
                 return <Link href={`/token/${record?.contract_id}`}>
                   <Image src={text} width={25} height={25} style={{borderRadius:'50%'}}/>
                 </Link>

          } },
        ];
        break;
      default:
        return arr
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
      case 'ERC20OwnerTokenList':
        return 'items'
      case 'ERC20AddrTransfers':
      return 'items'
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
    { value: "MessagesByAccountID", label: "message_list",show_active:'message', headerList:true},
    { value: "TracesByAccountID", label: "traces_list",show_active:'traces', },
  ],
}

export const default_content = [
  {
    label: 'account_address', dataIndex: 'account_address', type: ['account_basic'],elasticity:true, render: (text:string,record:any,tr:any) => { 
      const owned_miners = record?.account_basic?.owned_miners || [];
      if(!text) return text
      if (owned_miners.length > 0) { 
        return <div style={{ display: 'flex' }}>
          <span className="flex_align_center">
            {isMobile() || text && text.length > 50 ?  isIndent(text, 10) :text}
            {text && <Copy text={text} />}
          </span>

         
          <Button className="btn-link" onClick={() => { 
            Router.push(`/owner/${record?.account_basic?.account_id}`)
          }}>  
            {tr('account_detail')}
          </Button>
         
        </div>
      }
      return  <div className="flex_align_center">
        {text && text.length > 50 || isMobile()  ? isIndent(text, 10) : text}
        {text && <Copy text={text} />}
      </div>
    }
  },
  {
    label: 'contract_name', dataIndex: 'contract_name', elasticity: true, type: ['account_basic', 'evm_contract'], render: (text: any, record:any,tr:any) => { 
      if (record?.account_basic?.account_type === 'evm') { 
        if (text) {
          return <span className="flex_align_center">
            <span className="success_color">
              {getSvgIcon('successIcon')}
            </span>
            {text}
          </span>
        } 
        return <Button className=" active_btn flex-center" onClick={() => { 
          Router.push('/contract/verify')
        }}>{ tr('go_verify')}</Button>
      }
     return text
    
  } },
    {
      label: 'base_account_id', dataIndex: 'account_id', type: ['account_basic'], render: (text: string, record: any) => text ? <span className="flex-center">{text} <Copy text={ text} /></span>: text
  },
    { label: 'balance', dataIndex: 'account_balance', type: ['account_basic'], render: (text: string) => text ? formatFilNum(text) : '--' },

    { label: 'account_type', dataIndex: 'account_type', type: ['account_basic'],render:(text:string,record:any,tr:any)=> text ? tr(text):'--'},
    { label: 'eth_address', dataIndex: 'eth_address',elasticity:true, type: ['account_basic'],render: (text: string, record: any) => text ? <span className="flex-center">{text} <Copy text={ text} /></span>: text},
    { label: 'stable_address', dataIndex: 'stable_address',elasticity:true, type: ['account_basic'],render: (text: string, record: any) => text ? <span className="flex-center">{text} <Copy text={ text} /></span>: text },
    
  //multiple
  { label: 'Initial Balance', dataIndex: 'initial_balance', elasticity: true, render: (text: string) => text ? formatFilNum(text) : '--', },
  { label: 'Unlock Balance', dataIndex: 'locked_balance', elasticity: true, render: (text: string) => text ? formatFilNum(text) : '--' },
    {
      label: 'Locking Period ', dataIndex: 'unlock_start_time', elasticity: true, render: (text: string, record: any) => { 
        if (!text) { 
          return '--'
        }
        const lastTime = record?.unlock_end_time;
        return <span> {formatDateTime(text,"YYYY-MM-DD HH:mm")} to  { formatDateTime(lastTime,'YYYY-MM-DD HH:mm')}</span>
    }},
  { label: 'Approvals Threshold',elasticity:true, dataIndex: 'approvals_threshold'},
    {label:'tokenList', elasticity:true, dataIndex: 'tokenList', render: (text: any) => { 
      if (Array.isArray(text)) { 
        const value = text[0];
        return <DropDown value={value} content={text.slice(1)}/>
      }
    }
  },
  { label: 'nonce', dataIndex: 'nonce', type: ['account_basic'], render: (text: any) => text },
  { label: 'Available Balance', dataIndex: 'available_balance',  elasticity:true,render: (text:string) =>text ? formatFilNum(text) : '--' },
  {
    label: 'Robust Address', dataIndex: 'account_address', elasticity: true, type: ['account_basic'], render: (text: string, record: any) => { 
      if (record.account_type === 'multisig') { 
        return  text ? <span className="flex-center">{text} <Copy text={ text} /></span>: text
      }
      return '--'
    
  }},
  {
      label: 'owned_miners', dataIndex: 'owned_miners', elasticity:true,type: ['account_basic'], render: (text:string) => { 
        return Array.isArray(text) ?  <span className="array_item">
          {Array.isArray(text) &&text?.map((item:any) => { 
            return <Link className='link' key={item } href={`/miner/${item}`}>{item}</Link>
          })}
          </span>:text
      }
  },
  {label:'user_count',dataIndex:'user_count',type:['account_basic','evm_contract'],elasticity:true,render:(text:string)=>text ?formatNumber(text):text},  
  { label: 'transfer_count', dataIndex: 'transfer_count', type: ['account_basic','evm_contract'],elasticity:true,render:(text:string)=>text ?formatNumber(text):text},
  { label: 'create_time', dataIndex: 'create_time', type: ['account_basic'], render: (text: number | string) => formatDateTime(text) },
    { label: 'Signers', dataIndex: 'signers',elasticity:true, render: (text:string) => { 
        return Array.isArray(text) ?  <span className="array_item_column array_item_over">
          {text?.map((item:any,index:number) => { 
            return <div key={ index}>{ get_account_type(item?.from_type, item,20)}</div>
            
          })}
          </span>:text
      }},
  { label: 'latest_transfer_time', dataIndex: 'latest_transfer_time', type: ['account_basic'], render: (text: number | string) => formatDateTime(text) },

]
  


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
  miner_list,
  general_overview,
  //general_overview_type,
  deal,
  deal_hosting
};
