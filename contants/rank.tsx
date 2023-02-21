/** @format */

interface Rank_list {
  label: "pool" | "provider" | "growth" | "rewards";
  value: string;
}
import { unitConversion, formatNumber } from "@/utils/utils";
import Link from "next/link";
import { Popover } from "antd";

export const rank_header: Array<Rank_list> = [
  {
    label: "pool",
    value: "pool",
  },
  {
    label: "provider",
    value: "provider",
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

export const getColumns = (type: string) => {
  const fristObj = {
    title: "ranking", //排名
    dataIndex: "rank_index",
    width: "120px",
    render: (text: string, rec: any, index: number) => index + 1,
  };
  let list: any[] = [];
  switch (type) {
    case "pool":
      list = [
        {
          title: "pool_owner", //存储池号
          dataIndex: "owner",
          render: (text: string) => {
            return (
              <Link href='' className='table_link'>
                {text}
              </Link>
            );
          },
        },
        {
          title: "pool_power", //有效算力
          dataIndex: "quality_adj_power",
          render: (text: string) => unitConversion(text, 2),
          sortable: true,
        },
        {
          title: "pool_efficiency_24h", //近24小时产出效率
          dataIndex: "mining_efficiency_24h",
          sortable: true,
          render: (text: string) => Number(text).toFixed(4) + " FIL/T",
        },
        {
          title: "pool_increase_24h", //近24小时增长算力
          dataIndex: "power_increase_24h",
          sortable: true,
          render: (text: string) => unitConversion(text, 4),
        },
        {
          title: "pool_block_count", //出块总数
          dataIndex: "block_count",
          render: (text: string) => Number(text),
        },
      ];
      break;
    case "provider":
      list = [
        {
          title: "provider_miner", //节点号
          dataIndex: "miner",
          render: (text: string) => {
            return (
              <Link href='' className='table_link'>
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
          dataIndex: "quality_power_ratio",
          rowKey: "quality_adj_power",
          render: (text: string, record: any) => {
            const text1 = unitConversion(record.quality_adj_power, 2);
            return `${text1} / ${unitConversion(text, 2)}`;
          },
        },
        {
          title: "pool_increase_24h", //近24小时增长算力
          dataIndex: "power_increase_24h",
          render: (text: string) => unitConversion(text, 4),
        },
        {
          title: "provider_block_ratio", //出块总数占比
          dataIndex: "block_ratio",
          rowKey: "block_count",
          render: (text: string, record: any) => {
            const text1 = record.block_count;
            return `${text1} / ${(Number(text) * 100).toFixed(2)}%`;
          },
        },
        {
          title: "provider_rewards_ratio", //奖励总数占比
          dataIndex: "rewards_ratio",
          rowKey: "rewards",
          render: (text: string, record: any) => {
            const text1 = Number(record.rewards).toFixed(2) + "FIL";
            return `${text1} / ${(Number(text) * 100).toFixed(2)}%`;
          },
        },
        {
          title: "balance", //余额
          dataIndex: "balance",
          render: (text: string) => {
            const showText = Number(text);
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
          dataIndex: "miner",
        },
        {
          title: "miner", //算力增量
          dataIndex: "quality_power_increase",
        },
        {
          title: "quality_adj_power", //有效算力
          dataIndex: "quality_adj_power",
        },
        {
          title: "raw_power", //原值算力
          dataIndex: "raw_power",
        },
        {
          title: "sector_size", //扇区大小
          dataIndex: "sector_size",
        },
      ];
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
  { label: "week_days", value: "week_days" },
  { label: "month", value: "month" },
];
export const select_rank = [
  { label: "select_rank_all", value: "all" },
  { label: "select_rank_32", value: "32" },
  { label: "select_rank_64", value: "64" },
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
