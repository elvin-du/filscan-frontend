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

export const fil_list = [
  { title: 'change_day', dataIndex: 'change_day' },
  { title: 'change_week', dataIndex: 'change_week' },
  { title: 'change_month', dataIndex: 'change_month' },
  { title: 'change_threemonth', dataIndex: 'change_threemonth' },
  { title: 'change_sixmonth', dataIndex: 'change_sixmonth' },
  { title: 'change_year', dataIndex: 'change_year' },
  { title: 'change_thisyear', dataIndex: 'change_thisyear' },
  { title: 'change_ico', dataIndex: 'change_ico' },
]

export const fil_trend = [
  {
    title: 'usd_price',
    dataIndex: 'usd',
    color: 'rgba(36, 166, 66, 1)',
    type: 'line',
    name: 'usd_price',
  },
  {
    title: 'btc_price',
    dataIndex: 'btc',
    color: 'rgba(239, 127, 26, 1)',
    type: 'line',
    name: 'btc_price',
    yIndex: 1,
  },
  {
    title: 'market_price',
    dataIndex: 'market',
    name: 'market_price',
    type: 'line',

    color: 'rgba(28, 106, 253, 1)',
  },
  {
    title: 'volume',
    name: 'volume',
    dataIndex: 'volume',
    color: '#B0CBFE',
    type: 'bar',
    gridIndex: 1,
    xIndex: 1,
    yIndex: 2,
  },
]

export const liquidity = {
  left: [
    { title: 'provider_rewards_24', dataIndex: 'provider' },
    { title: 'lockup_freed_24', dataIndex: 'lockup', tip: 'lockup_freed_tip' },
    { title: 'reserved_freed_24', dataIndex: 'reserver' },
  ],
  right_main: { title: 'liquidity_pledge_24', dataIndex: 'pledge' },
  right: [
    { title: 'sector_pledge_24', dataIndex: 'sector' },
    { title: 'defi_staking_24', dataIndex: 'defi' },
  ],
}

export const liquidity_chart = [
  {
    type: 'line',
    dataIndex: 'total',
    title: 'liquidity_total',
    color: 'rgba(255, 197, 61, 1)',
  },
  {
    type: 'line',
    dataIndex: 'freed',
    title: 'liquidity_freed',
    color: 'rgba(74, 202, 180, 1)',
  },
  {
    type: 'line',
    dataIndex: 'pledge',
    title: 'liquidity_pledge',
    color: 'rgba(28, 106, 253, 1)',
  },
  {
    type: 'line',
    dataIndex: 'destruction',
    title: 'liquidity_destruction',
    color: 'rgba(176, 203, 254, 1)',
  },
]

export const time_options = [
  { title: '30d', dataIndex: '30d' },
  { title: '1year', dataIndex: '1year' },
]
