import { Translation } from '@/components/hooks/Translation'
import style from './index.module.scss'
import { overviewList } from '@/contents/analysis'
import { observer } from 'mobx-react'
import analysisStore from '@/store/modules/analysis'
import Tooltip from '@/packages/tooltip'

export default observer(() => {
  const { tr } = Translation({ ns: 'analysis' })
  const { marketData } = analysisStore
  return (
    <div className={`${style.market}`}>
      <div className={style.market_left}></div>
      <div className={style.market_right}>
        {overviewList.map((itemList, index) => {
          return (
            <ul
              key={index}
              className={`${style.market_right_ul} ${
                style[`market_right_${index}`]
              }`}
            >
              {itemList.map((item: any) => {
                const { title, render, dataIndex, tip } = item
                let value = render
                  ? render(marketData[dataIndex], marketData)
                  : marketData[dataIndex]
                return (
                  <li key={item.dataIndex} className={style.market_right_item}>
                    <span className={style.market_right_item_title}>
                      {tr(title)} {tip && <Tooltip context={tr(tip)} />}
                    </span>
                    <span>{value}</span>
                  </li>
                )
              })}
            </ul>
          )
        })}
      </div>
    </div>
  )
})
