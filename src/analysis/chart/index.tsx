import { useEffect } from 'react'
import KChart from './KChart'
import analysisStore from '@/store/modules/analysis'
import style from './index.module.scss'
import BottomEcharts from './kChartTrend'
import Segmented from '@/packages/segmented'
import { tabList_chart } from '@/contents/analysis'
import KLineChart from './kLineChart'
import dynamic from 'next/dynamic'

export default () => {
  useEffect(() => {
    analysisStore.getData()
  }, [])
  return (
    <div className={style.chart_content}>
      <Segmented
        data={tabList_chart}
        ns="analysis"
        defaultValue={'k_chart'}
        defaultActive="growth"
        isHash={false}
      />
      <div className={style.chart_list}>
        <KLineChart />
      </div>
    </div>
  )
}
