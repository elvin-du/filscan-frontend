/** @format */

interface Rank_list {
  label: "pool" | "provider" | "growth" | "rewards";
  value: string;

}
import { unitConversion, formatNumber, formatFil } from "@/utils/utils";
import Link from "next/link";
import Image from 'next/image'
import { Popover } from "antd";
import champion from '@/assets/images/champion.png'
import runnerup from '@/assets/images/runnerup.png'
import thirdrunner from '@/assets/images/thirdrunner.png'

export const rank_header: Array<Rank_list> = [
   {
    label: "provider",
    value: "provider",
  },
  {
    label: "pool",
    value: "pool",
  },
 
  {
    label: "growth",
    value: "growth",
   
  },
  {
    label: "rewards",
    value: "rewards",
  },
];

export const getColumns = (type: string,progress?:number) => {
  const fristObj = {
    title: "ranking", //排名
    dataIndex: "rank",
    width: "120px",
    align:'center',
    render: (text: number) => { 
      if (text === 1) {
        return <Image src={champion} alt="" width={22} />
      } else if (text === 2) {
        return <Image src={runnerup} alt="" width={22} />
      } else if (text === 3) { 
         return <Image src={thirdrunner} alt="" width={22} />
      }
      return text
    }
    // render: (text: string, rec: any, index: number) => index + 1,
  };
  let list: any[] = [];
  switch (type) {
    case "pool":
      list = [
        {
          title: "pool_owner", //存储池号
          dataIndex: "owner_id",
          align:'center',
          render: (text: string) => {
            return (
              <Link href={`/owner/${text}`} className='table_link'>
                {text}
              </Link>
            );
          },
        },
        {
          title: "pool_power", //有效算力
          dataIndex: "quality_adj_power",
          align:'center',
          sorter: true,
          defaultSortOrder: 'descend',
          render: (text: string) => { 
            const left = (Number(text) / Number(progress)) * 100 + "%";
            return <span className="other_progress">
              <span className="progress">
                 <span className="mask" style={{left}}></span>
              </span>
              <span>{ unitConversion(text, 2)}</span>
            </span>
          }
        },
        {
          title: "pool_efficiency_24h", //近24小时产出效率
          dataIndex: "rewards_ratio_24h",
          sorter: true,
          align:'center',
          render: (text: string) => formatFil(text,'FIL',4) + " FIL/TiB",
        },
        {
          title: "pool_increase_24h", //近24小时增长算力
          dataIndex: "power_change_24h",
          sorter: true,
          align:'center',
          render: (text: string) => unitConversion(text, 4),
        },
        {
          title: "pool_block_count_24h", //出块总数
          dataIndex: "block_count",
          align: 'center',
          sorter: true,
          render: (text: string,record:any) => record?.blocks? Number(record.blocks):'',
        },
      ];
      break;
    case "provider":
      list = [
        {
          title: "provider_miner", //节点号
          dataIndex: "miner_id",
          align:'center',
          render: (text: string) => {
            return (
              <Link href={`/miner/${text}`} prefetch className='table_link'>
                {text}
              </Link>
            );
          },
        },
        // {
        //   title: "miner", //节点号
        //   dataIndex: "miner",
        // },
        {
          title: "provider_power_ratio", //有效算力占比
          dataIndex: "quality_adj_power",
          rowKey: "quality_adj_power",
          sorter: true,
          defaultSortOrder: 'descend',
          render: (text: string|number, record: any) => {
            const text1 = record.quality_power_ratio;
            const left = (Number(text) / Number(progress)) * 100 + "%";
            return <span className="other_progress">
              <span className="progress">
                 <span className="mask" style={{left}}></span>
              </span>
              <span>{ `${unitConversion(text, 2)} / ${(Number(text1) *100).toFixed(2)}%`}</span>
            </span>
          
          },
        },
        {
          title: "pool_increase_24h", //近24小时增长算力
          dataIndex: "power_increase_24h",
          sorter: true,
          render: (text: string) => unitConversion(text, 4),
        },
        {
          title: "provider_block_ratio", //出块总数占比
          dataIndex: "block_count",
          rowKey: "block_count",
          sorter: true,
          render: (text: string, record: any) => {
            const text1 = record.block_ratio;
            return `${text} / ${(Number(text1) * 100).toFixed(2)}%`;
          },
        },
        {
          title: "provider_rewards_ratio", //奖励总数占比
          dataIndex: "rewards",
          rowKey: "rewards",
           sorter: true,
          render: (text: string, record: any) => {
            const text1 = formatFil(text,'FIL',2)+ "FIL";
            return `${text1} / ${(Number(record.rewards_ratio) * 100).toFixed(2)}%`;
          },
        },
        {
          title: "balance", //余额
          dataIndex: "balance",
          sorter: true,
          render: (text: string) => {
            const showText = formatFil(text,'FIL',2)
            return (
              <div
                className={
                  showText < 200 ? "warning text-center" : "text-center"
                }>
                {showText < 200 ? (
                  <Popover
                    trigger='hover'
                    //content={tr("lowBalance")}
                  >
                    <span slot='reference' className='pointer'>
                      {formatNumber(showText) + " FIL" || "-"}
                    </span>
                  </Popover>
                ) : (
                  formatNumber(showText) + " FIL" || "-"
                )}
              </div>
            );
          },
        },
      ];
      break;
    case "growth":
      list = [
        {
          title: "miner", //节点号
          dataIndex: "miner_id",
            render: (text: string) => {
            return (
              <Link href={`/miner/${text}`} className='table_link'>
                {text}
              </Link>
            );
          },
        },
          {
          title: "power_ratio", //算力增速
          title_tip:'power_ratio_tip',
            dataIndex: "quality_power_increase",
            // sorter: true,
            // defaultSortOrder: 'descend',
            render: (text2: string | number, record: any) => {
              const text = record.power_ratio;
            const text1 = record.power_ratio;
            const left = (Number(text1) / Number(progress)) * 100 + "%";
            return <span className="other_progress">
              <span className="progress">
                 <span className="mask" style={{left}}></span>
              </span>
              <span>{ `${unitConversion(text, 2)} / D`}</span>
            </span>
          
          },
        },
        {
          title: "quality_power_increase", //算力增量
          title_tip: 'quality_power_increase_tip',
          align: 'center',
          // sorter: true,
          // defaultSortOrder: 'descend',
          dataIndex: "quality_power_increase",
          render:(text:string)=>unitConversion(text, 2)
        },
        {
          title: 'quality_adj_power', //有效算力
          dataIndex: 'quality_adj_power',
          sorter: true,
          render: (text: string) => { 
            const num = unitConversion(text, 2)
            return num
          }
        },
      
        {
          title: "raw_power", //原值算力
          dataIndex: "raw_power",
          sorter: true,
          render:(text:string)=>unitConversion(text, 2)
        },
        {
          title: "sector_size", //扇区大小
          dataIndex: "sector_size",
        },
      ];
      break;
    case 'rewards':
      list = [
         {
          title: "miner", //节点号
          dataIndex: "miner_id",
            render: (text: string) => {
            return (
              <Link href={`/miner/${text}`} className='table_link'>
                {text}
              </Link>
            );
          },
        },
        {
          title: 'rewards/ratio',
          dataIndex: 'rewards',
          title_tip:'rewards/ratio_tip',
          sorter: true,
          defaultSortOrder: 'descend',
           align:'center',
          render: (text:string,record:any) => { 
            const showNum = formatFil(text, 'FIL');
            const ratio =  Number(record.rewards_ratio *100).toFixed(2) + '%'
            return `${showNum}/${ratio}`
          }
        },
         {
          title: 'block_count',
           dataIndex: 'block_count',
          align:'center',
          title_tip:'block_count_tip',
           sorter: true,
        },
          {
          title: 'winning_rate',
            dataIndex: 'winning_rate',
             sorter: true,
            render: (text: any) => Number(text * 100).toFixed(2) + '%' //
        },
           {
          title: 'quality_adj_power',
          dataIndex: 'quality_adj_power',
          sorter: true,
          render:(text:string|number)=> unitConversion(text, 2)
        },
              {
          title: 'sector_size',
          dataIndex: 'sector_size',
          // render:(text:string|number)=> text + 'G'
        },
      ]
      break;
  }
  list.unshift(fristObj);
  return list;
};

export const resultObj = (type: string): string => {
  switch (type) {
    case "pool":
      return "ore_pool_rank_list";
    case "provider":
      return "miner_rank_list";
    default:
      return "miner_profit_rank_list";
  }
};


export const TimeList = [
  { label: "24h", value: "24h" },
  { label: "week_days", value: "7d" },
  { label: "month", value: "1m" },
];
export const select_rank = [
  { label: "select_rank_all", value: "all" },
  { label: "select_rank_32", value: "32 GiB" },
  { label: "select_rank_64", value: "64 GiB" },
];
export const header_right: Record<string, any> = {
  growth: {
    TimeList,
    select_rank,
  },
  rewards: {
    TimeList,
    select_rank,
  },
};
