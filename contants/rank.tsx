/** @format */

interface Rank_list {
  label: "pool" | "provider" | "growth" | "rewards";
  value: string;
}
import { unitConversion } from "@/utils/utils";
import Link from "next/link";

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
  switch (type) {
    case "pool":
      return [
        {
          title: "ranking", //排名
          dataIndex: "rank_index",
          width: "120px",
          render: (text: string, rec: any, index: number) => index + 1,
        },
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
  }

  return [];
};

export const resultObj = (type: string): string => {
  switch (type) {
    case "pool":
      return "ore_pool_rank_list";
    default:
      return "";
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
