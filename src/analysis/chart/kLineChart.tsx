import { useEffect, useMemo, useRef, useState } from 'react'
import { observer } from 'mobx-react'
import style from './index.module.scss'
import { Translation } from '@/components/hooks/Translation'
import dynamic from 'next/dynamic'
import { Select, theme } from 'antd'
import { kline_options } from '@/contents/analysis'
import filscanStore from '@/store/modules/filscan'
import Selects from '@/packages/selects'
const KLineChart = dynamic(() => import('./kline'), { ssr: false })

export default observer(() => {
  const { tr } = Translation({ ns: 'analysis' })
  const { theme, lang } = filscanStore
  const [active, setActive] = useState('1')

  const listOptions = useMemo(() => {
    return kline_options.map((v) => {
      return { ...v, label: tr(v.title) }
    })
  }, [theme, tr])

  const handleChange = (value: any) => {
    setActive(value)
    //todo req
  }

  return (
    <div className={`${style.chart_main} ${style.klineChart}`}>
      <div className={style.klineChart_top}>
        <div className={style.klineChart_top_left}>
          <span>FIL/USDT</span>
          <span className={style.klineChart_top_left_title}>
            {tr('fil_origin')}
          </span>
          <span>$3.42</span>
          <span>2.6%</span>
        </div>
        <div className={style.klineChart_top_right}>
          <Selects
            size="small"
            style={{ width: 100 }}
            value={active}
            options={listOptions}
            onChange={handleChange}
            bordered={false}
            showSearch={false}
          />
          <ul className={style.klineChart_top_right_ul}>
            {listOptions.map((v) => {
              if (!v.select) {
                return (
                  <li
                    onClick={() => {
                      handleChange(v.value)
                    }}
                    key={v.value}
                    className={
                      active === v.value
                        ? style.klineChart_top_right_ul_active
                        : ''
                    }
                  >
                    {v.label}
                  </li>
                )
              }
            })}
          </ul>
        </div>
      </div>
      <div className={style.klineChart_content}>
        <KLineChart />
      </div>
    </div>
  )
})
