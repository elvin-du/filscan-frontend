import { formatNumber, get$Number } from '@/utils'

// export const kOptions= [
//   {
//     label: ''
//     value: ''
//   },
// ]

export const tabList_chart = [
  { title: 'trend_chart', dataIndex: 'trend_chart' },
  { title: 'k_chart', dataIndex: 'k_chart' },
]

export const overviewList = [
  [
    {
      title: 'market_value',
      dataIndex: 'market_value',
      tip: 'market_value_tip',
      render: (text: string | number) => get$Number(text),
    },
    {
      title: 'circulation',
      dataIndex: 'circulation',
      render: (text: number) => formatNumber(text),
    },
    {
      title: 'proportion',
      dataIndex: 'proportion',
    },
    {
      title: 'supply',
      dataIndex: 'supply',
      render: (text: number) => formatNumber(text),
    },
    {
      title: 'market_total',
      dataIndex: 'market_total',
      tip: 'market_total_tip',
      render: (text: number) => get$Number(text),
    },
  ],
  [
    {
      title: 'locked',
      dataIndex: 'locked',
      render: (text: number) => formatNumber(text),
    },
    {
      title: 'locked_ratio',
      dataIndex: 'locked_ratio',
    },
    {
      title: 'burn',
      dataIndex: 'burn',
      render: (text: number) => formatNumber(text),
    },
    {
      title: 'burn_ratio',
      dataIndex: 'burn_ratio',
    },
    {
      title: '24_quantity',
      dataIndex: '24_quantity',
      render: (text: number) => get$Number(text),
    },
  ],
  [
    {
      title: '24_amount',
      dataIndex: '24_amount',
      render: (text: number) => get$Number(text),
    },
    {
      title: 'turnover_rate',
      dataIndex: 'turnover_rate',
      tip: 'turnover_rate_tip',
    },
    {
      title: 'quantity_ratio',
      dataIndex: 'quantity_ratio',
      tip: 'quantity_ratio_tip',
    },
  ],
]

export const kline_options = [
  {
    title: 'period_1',
    value: '1',
  },
  {
    title: 'period_5',
    value: '5',
  },
  {
    title: 'period_30',
    value: '30',
  },
  {
    title: 'period_60',
    value: '60',
  },
  {
    title: 'period_240',
    value: '240',
  },
  {
    title: 'period_1440',
    value: '1440',
  },
  {
    title: 'period_10080',
    value: '10080',
    select: true,
  },
  {
    title: 'period_43200',
    value: '43200',
    select: true,
  },
]
