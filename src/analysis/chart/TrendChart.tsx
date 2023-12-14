import { Translation } from '@/components/hooks/Translation'
import { fil_list } from '@/contents/analysis'
import analysisStore from '@/store/modules/analysis'
import { observer } from 'mobx-react'
import { useEffect } from 'react'
import style from './index.module.scss'
import Trend from './trend'

export default observer(() => {
  const { tr } = Translation({ ns: 'analysis' })
  const { filValueList } = analysisStore
  useEffect(() => {
    analysisStore.getFilValues()
  }, [])

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
          return (
            <li key={v.dataIndex} className={style.trendChart_right_item}>
              <span className={style.trendChart_right_item_title}>
                {tr(v.title)}
              </span>
              <span className={style.trendChart_right_item_value}>
                {filValueList[v.dataIndex]}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
})
