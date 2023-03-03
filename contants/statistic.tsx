/** @format */

import { formatFilNum, formatNumber } from "@/utils/utils";
const power = {
  title: {
    label: "power",
    tip: "power_tips",
    right: {
      opt: [
        {
          label: "30day",
          value: "30d",
        },
        {
          label: "year",
          value: "365d",
        },
      ],
    },
  },
  list: [
    { label: "total_raw_byte_power", yIndex: 0, type: "line" },
    { label: "base_line_power", yIndex: 0, type: "line" },
    { label: "total_quality_adj_power", yIndex: 1, type: "bar" },
    { label: "change_quality_adj_power", yIndex: 1, type: "bar" },
  ],
};

const gas = {
  title: {
    label: "gas",
    right: {
      opt: [
        {
          label: "24h",
          value: "24h",
        },
        {
          label: "7D",
          value: "7d",
        },
        {
          label: "30d",
          value: "30d",
        },
        {
          label: "year",
          value: "365d",
        },
      ],
    },
  },
  list: [
    { label: "base_fee", yIndex: 0, type: "line" },
    { label: "gas_in_32g", yIndex: 1, type: "line" },
    { label: "gas_in_64g", yIndex: 1, type: "line" },
  ],
};

export const gas_24 = {
  title: {
    label: "gas_24",
  },

  columns: [
    { dataIndex: "method_name", title: "method_name", align: "left" }, //消息类型
    {
      dataIndex: "avg_gas_premium",
      title: "avg_gas_premium",
      render: (text: string | number) => formatFilNum(text, true, false),
    },
    {
      dataIndex: "avg_gas_limit",
      title: "avg_gas_limit",
      render: (v: string) => formatNumber(v),
    }, //平均Gas限额
    {
      dataIndex: "avg_gas_used",
      title: "avg_gas_used",
      render: (v: string) => formatNumber(v),
    }, //平均Gas消耗
    {
      dataIndex: "avg_gas_fee",
      title: "avg_gas_fee",
      render: (v: string) => {
        if (Number(v) === 0) {
          return 0;
        }
        let arr = formatFilNum(v, true).split(" ");
        return Number(arr[0]) < 1
          ? Number(arr[0]).toFixed(6) + arr[1]
          : Number(arr[0]).toFixed(2) + " " + arr[1];
      },
    }, //平均手续费
    {
      dataIndex: "sum_gas_fee",
      title: "sum_gas_fee/ratio",
      render: (text: string, record: any) => {
        if (Number(text) === 0) {
          return 0;
        }
        let arr = formatFilNum(text, true).split(" ");
        return Number(arr[0]) < 1
          ? Number(arr[0]).toFixed(6) + arr[1]
          : Number(arr[0]).toFixed(2) + " " + arr[1];
      },
    }, //合计手续费/占比
    {
      dataIndex: "message_count",
      title: "message_count/ratio",
      render: (text: string, record: any) => {
        return `${text}/${(record.msg_count_ratio * 100).toFixed(2)}%`;
      },
    }, //消息数/占比
  ],
};

export const statistics: any = {
  power,
  gas,
};
