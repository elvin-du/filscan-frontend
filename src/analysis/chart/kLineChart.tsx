import { useEffect, useMemo, useRef, useState } from 'react'
import { observer } from 'mobx-react'
import style from './index.module.scss'
import { Translation } from '@/components/hooks/Translation'
import dynamic from 'next/dynamic'
import { kline_options } from '@/contents/analysis'
import filscanStore from '@/store/modules/filscan'
import Selects from '@/packages/selects'
import analysisStore from '@/store/modules/analysis'
import { formatNumber } from '@/utils'
import FILUp from '@/assets/images/filUp.svg'
import FILDown from '@/assets/images/filDown.svg'
const KLineChart = dynamic(() => import('./kline'), { ssr: false })

export default observer(() => {
  const { tr } = Translation({ ns: 'analysis' })
  const { theme, lang } = filscanStore
  const { marketData } = analysisStore
  const [active, setActive] = useState('1')

  const listOptions = useMemo(() => {
    return kline_options.map((v) => {
      return { ...v, label: tr(v.title) }
    })
  }, [theme, tr])

  useEffect(() => {
    loadData()
  }, [])
  const loadData = (value?: string) => {
    const period = value || active
    const payload = {
      tickerid: 'binance_fil_usdt',
      period: Number(period),
      reach: Math.floor(new Date().getTime() / 1000), //当前时间
      utc: 0,
      webp: 1,
      since: '',
    }
    analysisStore.getKline(payload)
  }

  const handleChange = (value: any) => {
    setActive(value)
    loadData(value)
    //todo req
  }

  const renderRate = (value: number) => {
    let className = ''
    if (Number(value) !== 0) {
      className = value > 0 ? 'text_green' : 'text_red'
    }
    return (
      <span className={`${className} ${style.klineChart_top_left_rate}`}>
        <span className={style.klineChart_top_left_rate_value}>
          ${formatNumber(marketData.price, 2)}
        </span>
        {className && <span>{value > 0 ? <FILUp /> : <FILDown />}</span>}
        <span> {formatNumber(value, 2)}%</span>
      </span>
    )
  }

  return (
    <div className={`${style.klineChart}`}>
      <div className={style.klineChart_top}>
        <div className={style.klineChart_top_left}>
          <span>FIL/USDT</span>
          <span className={style.klineChart_top_left_title}>
            {tr('fil_origin')}
          </span>
          {renderRate(marketData.price_change_rate)}
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
