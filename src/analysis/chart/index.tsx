import { useEffect, useState } from 'react'
import analysisStore from '@/store/modules/analysis'
import style from './index.module.scss'
import BottomEcharts from './kChartTrend'
import Segmented from '@/packages/segmented'
import { tabList_chart } from '@/contents/analysis'
import KLineChart from './kLineChart'
import TrendChart from './TrendChart'

export default () => {
  const [active, setActive] = useState('trend_chart')

  useEffect(() => {
    analysisStore.getFilBase()
  }, [])

  return (
    <div className={style.chart_content}>
      <Segmented
        data={tabList_chart}
        ns="analysis"
        defaultValue={active}
        defaultActive="growth"
        isHash={false}
        onChange={(value) => {
          setActive(value)
        }}
      />
      <div className={style.chart_list}>
        {active === 'k_chart' && <KLineChart />}
        {active === 'trend_chart' && <TrendChart />}
      </div>
    </div>
  )
}
