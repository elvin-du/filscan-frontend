import { Translation } from '@/components/hooks/Translation'
import style from './index.module.scss'
import { formatNumber } from '@/utils'
import { time_options, token_list } from '@/contents/analysis'
import PieChart from './pieChart'
import Chart from './chart'
import Segmented from '@/packages/segmented'
import { useEffect, useState } from 'react'
import analysisStore from '@/store/modules/analysis'
import { observer } from 'mobx-react'

export default observer(() => {
  const { fileTokens } = analysisStore
  const { tr } = Translation({ ns: 'analysis' })
  const [active, setActive] = useState('30d')

  useEffect(() => {
    loadTrend()
  }, [])

  const loadTrend = (interval?: string) => {
    const inter = interval || active
    analysisStore.getTokensTrend(inter)
  }
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
              {formatNumber(fileTokens?.addrcount || '')}
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
                      {fileTokens[v.dataIndex]}%
                    </span>
                  </span>
                  <span className={style.token_header_item_pie}>
                    <PieChart value={fileTokens[v.dataIndex]} />
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
                loadTrend(value)
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
})
