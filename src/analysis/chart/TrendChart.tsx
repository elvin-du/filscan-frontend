import { Translation } from '@/components/hooks/Translation'
import { fil_list } from '@/contents/analysis'
import analysisStore from '@/store/modules/analysis'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import style from './index.module.scss'
import Trend from './trend'
import ComLoading from '@/components/ComLoading'

export default observer(() => {
  const { tr } = Translation({ ns: 'analysis' })
  const { filValueList } = analysisStore
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    analysisStore.getFilValues()
    handleLoad()
  }, [])

  const handleLoad = async (value?: string) => {
    setLoading(true)
    const payload = {
      code: 'filecoinnew',
      webp: 1,
      type: value || 'all',
    }
    await analysisStore.getFilTrend(payload)
    setLoading(false)
  }

  if (loading) {
    return (
      <div className={style.trendChart}>
        <div className={style.trendChart_loading}>
          <ComLoading width={160} />
        </div>
      </div>
    )
  }
  return (
    <div className={style.trendChart}>
      <div className={style.trendChart_left}>
        <Trend />
      </div>
      <ul className={style.trendChart_right}>
        <li
          className={`${style.trendChart_right_item} ${style.trendChart_right_title}`}
        >
          {tr('fil_title')}
        </li>
        {fil_list.map((v) => {
          const value = Number(filValueList[v.dataIndex])
          let newClassName = ''
          let flag = ''
          if (value !== 0) {
            flag = value > 0 ? '+' : ''
            newClassName = value > 0 ? 'text_green' : 'text_red'
          }
          return (
            <li key={v.dataIndex} className={style.trendChart_right_item}>
              <span
                className={style.trendChart_right_item_title}
                onClick={() => {
                  handleLoad(v.value)
                }}
              >
                {tr(v.title)}
              </span>
              <span
                className={`${style.trendChart_right_item_value} ${newClassName}`}
              >
                {flag}
                {value}%
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
})
