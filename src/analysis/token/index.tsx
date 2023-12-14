import { Translation } from '@/components/hooks/Translation'
import style from './index.module.scss'
import { formatNumber } from '@/utils'
import { time_options, token_list } from '@/contents/analysis'
import PieChart from './pieChart'
import Chart from './chart'
import Segmented from '@/packages/segmented'
import { useState } from 'react'
const data: any = {
  total: '1172900',
  top_10: '75.4',
  top_20: '72.74',
  top_50: '75.65',
  top_100: '90.43',
}
export default () => {
  const { tr } = Translation({ ns: 'analysis' })
  const [active, setActive] = useState('30d')

  return (
    <>
      <h3 className={style.token_title}>{tr('token_list')} </h3>
      <div className={style.token}>
        <ul className={style.token_header}>
          <li
            className={`${style.token_header_main} ${style.token_header_content}`}
          >
            <span className={style.token_header_title}>
              {tr('token_address_total')}
            </span>
            <span className={style.token_header_value}>
              {formatNumber(data.total)}
            </span>
          </li>
          <ul className={style.token_header_right}>
            {token_list.map((v) => {
              return (
                <li key={v.dataIndex} className={style.token_header_item}>
                  <span className={style.token_header_content}>
                    <span className={style.token_header_title}>
                      {tr(v.title)}
                    </span>
                    <span className={style.token_header_value}>
                      {data[v.dataIndex]}%
                    </span>
                  </span>
                  <span className={style.token_header_item_pie}>
                    <PieChart value={data[v.dataIndex]} />
                  </span>
                </li>
              )
            })}
          </ul>
        </ul>
        <div className={style.token_chart}>
          <span className={style.token_chart_tabs}>
            <Segmented
              data={time_options}
              ns="analysis"
              defaultValue={active}
              isHash={false}
              onChange={(value) => {
                setActive(value)
              }}
            />
          </span>
          <div className={style.token_chart_content}>
            <Chart />
          </div>
        </div>
      </div>
    </>
  )
}
