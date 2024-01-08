import {
  formatDateTime,
  formatFil,
  formatNumber,
  formatTime,
  get$Number,
  isIndent,
  truncateDecimalAfterZeros,
} from '@/utils'
import Vip from '@/assets/images/member/vip.svg'
import Copy from '@/components/copy'
import { Progress } from 'antd'
import Link from 'next/link'

export const tabList_chart = [
  { title: 'trend_chart', dataIndex: 'trend_chart' },
  { title: 'k_chart', dataIndex: 'k_chart' },
]
export const time_options = [
  { title: '30d', dataIndex: '30d' },
  // { title: '1year', dataIndex: '1year' },
]

export const overviewList = [
  [
    {
      title: 'market_value',
      dataIndex: 'circulating',
      tip: 'market_value_tip',
      render: (text: string | number) => get$Number(text),
    },
    {
      title: 'circulation',
      dataIndex: 'circulating_amount',
      render: (text: number) => formatNumber(text),
    },
    {
      title: 'proportion',
      dataIndex: 'circulating_rate',
      render: (text: number) => formatNumber(text, 2) + '%',
    },
    {
      title: 'supply',
      dataIndex: 'max_supply',
      render: (text: number) => formatNumber(text),
    },
    {
      title: 'market_total',
      dataIndex: 'vol',
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
      dataIndex: 'locked_rate',
      render: (text: number) => formatNumber(text, 2) + '%',
    },
    {
      title: 'burn',
      dataIndex: 'burn',
      render: (text: number) => formatNumber(text),
    },
    {
      title: 'burn_ratio',
      dataIndex: 'burn_rate',
      render: (text: number) => formatNumber(text, 2) + '%',
    },
    {
      title: '24_quantity',
      dataIndex: 'changed_vol',
      render: (text: number) => get$Number(text),
    },
  ],
  [
    {
      title: '24_amount',
      dataIndex: 'changed_amount',
      render: (text: number) => get$Number(text),
    },
    {
      title: 'turnover_rate',
      dataIndex: 'change_rate',
      tip: 'turnover_rate_tip',
      render: (text: number) => formatNumber(text * 100, 2) + '%',
    },
    // {
    //   title: 'quantity_ratio',
    //   dataIndex: 'txs_rate',
    //   tip: 'quantity_ratio_tip',
    // },
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
  { title: 'change_day', dataIndex: 'change_day', value: 'd' },
  { title: 'change_week', dataIndex: 'change_week', value: 'w' },
  { title: 'change_month', dataIndex: 'change_month', value: 'm' },
  { title: 'change_threemonth', dataIndex: 'change_threemonth', value: '3m' },
  { title: 'change_sixmonth', dataIndex: 'change_sixmonth', value: '6m' },
  { title: 'change_year', dataIndex: 'change_year', value: 'y' },
  { title: 'change_thisyear', dataIndex: 'change_thisyear', value: 'ytd' },
  { title: 'change_ico', dataIndex: 'change_ico', value: 'all' },
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
    { title: 'provider_rewards_24', dataIndex: 'mined' },
    { title: 'lockup_freed_24', dataIndex: 'vested', tip: 'lockup_freed_tip' },
    { title: 'reserved_freed_24', dataIndex: 'reserved' },
  ],
  right_main: { title: 'liquidity_pledge_24', dataIndex: 'pledge' },
  right: [
    { title: 'sector_pledge_24', dataIndex: 'pledge' },
    { title: 'defi_staking_24', dataIndex: 'defi_tvl' },
  ],
}

export const liquidity_chart = [
  {
    type: 'line',
    dataIndex: 'circulating',
    title: 'liquidity_total',
    color: 'rgba(255, 197, 61, 1)',
  },
  {
    type: 'line',
    dataIndex: 'produced',
    title: 'liquidity_freed',
    color: 'rgba(74, 202, 180, 1)',
  },
  {
    type: 'line',
    dataIndex: 'locked',
    title: 'liquidity_pledge',
    color: 'rgba(28, 106, 253, 1)',
  },
  {
    type: 'line',
    dataIndex: 'burn',
    title: 'liquidity_destruction',
    color: 'rgba(176, 203, 254, 1)',
  },
]

export const releaseList = (tr: any) => [
  {
    title: 'account',
    dataIndex: 'account_id',
    render: (text: string, record: any) => {
      return (
        <span className="flex items-center gap-x-2">
          <Link href={`/address/${text}`}>
            <span>{isIndent(text)}</span>
          </Link>
          {/* <Copy text={text} /> */}
          {record?.account_tag && (
            <span className="account_tag">{record?.account_tag}</span>
          )}
        </span>
      )
    },
  },
  {
    title: 'total_lockup',
    dataIndex: 'initial_balance',
    render: (text: string | Number) => formatNumber(Number(text), 0),
  },
  {
    title: 'released',
    dataIndex: 'released',
    render: (text: string | Number) => formatNumber(Number(text), 0),
  },
  {
    title: 'daily_release',
    dataIndex: 'daily_release',
    render: (text: any, record: any) => {
      if (!record.initial_balance) return '--'
      const number =
        record.initial_balance /
        ((record.unlock_end_time - record.unlock_start_time) / 86400)
      return <span>{formatNumber(number, 0)}</span>
    },
  },
  {
    title: 'release_cycle',
    dataIndex: 'release_cycle',
    render: (text: any, record: any) => {
      if (!record.initial_balance) return '--'
      const number = (record.released / record.initial_balance) * 100
      return (
        <span>
          <Progress percent={number} size="small" showInfo={false} />
          <span className="text-xs">
            {tr('release_cycle_detail', {
              value: formatNumber(number, 2),
              date: formatDateTime(record.unlock_end_time, 'YYYY-MM-DD'),
            })}
          </span>
        </span>
      )
    },
  },
  {
    title: 'account_balance',
    dataIndex: 'balance',
    render: (text: string | Number) => formatNumber(Number(text), 0),
  },
  { title: 'balance_change_7', dataIndex: 'balance_changed' },
  {
    title: 'fund_penetration',
    dataIndex: '',
    render: (text: any, record: any) => {
      return (
        <Link href={`/analysis/fund/${record.account_id}`} className="link">
          {tr('go_fund')}
        </Link>
      )
    },
  },
]
export const activeList = [
  {
    title: 'rank',
    dataIndex: 'rank',
    width: '10%',
    render: (text: any, record: any, index: number) => (
      <span className="rank_icon">{index + 1}</span>
    ),
  },
  { title: 'account', dataIndex: 'address', width: '20%' },
  {
    title: 'quantity',
    dataIndex: 'quantity',
    width: '30%',

    render: (text: string | number) => formatNumber(text),
  },
  {
    title: 'percentage',
    dataIndex: 'percentage',
    width: '20%',

    render: (text: number | string) => text + '%',
  },
  {
    title: 'change_7d',
    dataIndex: 'change',
    width: '30%',
    render: (text: string | number) => {
      if (Number(text) === 0) return text
      if (!text) return '--'
      const className = Number(text) > 0 ? 'text_green' : 'text_red'
      const flag = Number(text) > 0 ? '+' : ''
      return (
        <span className={className}>
          {flag}
          {formatNumber(text)}
        </span>
      )
    },
  },
]
//token
export const token_list = [
  { title: 'token_top_10', dataIndex: 'top10rate', color: '#FFC53D' },
  { title: 'token_top_20', dataIndex: 'top20rate', color: '#4ACAB4' },
  { title: 'token_top_50', dataIndex: 'top50rate', color: '#1C6AFD' },
  { title: 'token_top_100', dataIndex: 'top100rate', color: '#B0CBFE' },
]
//资金穿透

export const balance_options = [
  {
    title: '7d',
    dataIndex: '7d',
  },
  {
    title: '30d',
    dataIndex: '30d',
    disabled: true,
    sufIcon: <Vip width={16} />,
  },
  {
    title: '1year',
    dataIndex: '1year',
    disabled: true,
    sufIcon: <Vip width={16} />,
  },
]

export const fund_list = [
  {
    title: 'check_account',
    dataIndex: 'address',
    render: (text: string, record: any) => {
      return (
        <>
          <span>{isIndent(text)}</span>
          <Copy text={text} />
          {record?.tag && <span className="account_tag">{record?.tag}</span>}
        </>
      )
    },
  },
  {
    title: 'network_rank',
    dataIndex: 'rank',
    render: (text: string | number) => {
      if (Number(text) === -1) {
        return '1000+'
      }
      return text
    },
  },
  {
    title: 'account_balance',
    dataIndex: 'balance',
    render: (text: string) => formatFil(text) + ' FIL',
  },
  {
    title: 'position_ratio',
    dataIndex: 'proportion',
    render: (text: string) => {
      if (Number(text) < 0.0001) {
        return '<0.01%'
      }
      return Number(truncateDecimalAfterZeros(Number(text))) * 100 + '%'
    },
  },
  {
    title: 'balance_change',
    dataIndex: 'balance_increase',
    options: balance_options,
    defaultValue: '7d',
  },
]

export const related_options = [
  {
    title: 'fund_volume',
    dataIndex: 'transaction_volume',
  },
  {
    title: 'fund_number',
    dataIndex: 'transaction_count',
  },
]
export const rank_options = [
  {
    title: 'rank_3',
    dataIndex: 'rank_3',
  },
  {
    title: 'rank_5',
    dataIndex: 'rank_5',
    disabled: true,
    sufIcon: <Vip width={16} />,
  },
  {
    title: 'rank_10',
    dataIndex: 'rank_10',
    disabled: true,
    sufIcon: <Vip width={16} />,
  },
]
export const level_options = [
  {
    title: 'level_3',
    dataIndex: 'level_3',
  },
  {
    title: 'level_5',
    dataIndex: 'level_5',
    disabled: true,
    sufIcon: <Vip width={16} />,
  },
  {
    title: 'level_all',
    dataIndex: 'level_all',
    disabled: true,
    sufIcon: <Vip width={16} />,
  },
]

export const related_list = [
  {
    title: 'rank',
    dataIndex: 'rank',
    options: rank_options,
    defaultValue: 'rank_3',
  },
  {
    title: 'level',
    dataIndex: 'level',
    options: level_options,
    defaultValue: 'level_3',
  },
]
export const fund_card = (type: string) => {
  const list: any = [
    {
      title: 'select_account',
      dataIndex: 'address',
      render: (text: string, record: any) => {
        return (
          <>
            <span>{isIndent(text)}</span>
            <Copy text={text} />
            {record.tag && (
              <span className="account_tag ml-2">{record.tag || ''}</span>
            )}
          </>
        )
      },
    },
    {
      title: 'account_balance',
      dataIndex: 'balance',
      render: (text: string) => formatNumber(formatFil(text)) + ' FIL',
    },
    {
      title: 'position_ratio',
      dataIndex: 'proportion',
      render: (text: string) => {
        if (Number(text) < 0.0001) {
          return '<0.01%'
        }
        return Number(truncateDecimalAfterZeros(Number(text))) * 100 + '%'
      },
    },
  ]
  if (type === 'volume') {
    list.push({
      title: 'total_volume',
      dataIndex: 'total_transaction_value',
      render: (text: string) => formatNumber(formatFil(text)) + ' FIL',
    })
  } else {
    list.push({ title: 'total_number', dataIndex: 'total_transaction_Count' })
  }
  return list
}
