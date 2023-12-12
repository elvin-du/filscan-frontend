import { useEffect } from 'react'
import KChart from './KChart'
import analysisStore from '@/store/modules/analysis'
import style from './index.module.scss'
import BottomEcharts from './kChartTrend'
import Segmented from '@/packages/segmented'
import { tabList_chart } from '@/contents/analysis'
import TrendView from './TrendView'
import Chart from './Chart'
import Test from './test'

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
      <div className={style.chart_main}>
        <div className={style.chart_main_top}>
          <div>
            <span>FIL/USDT </span>
            <span>$4.17</span>
            <span>-7.46%</span>
          </div>
          <div></div>
        </div>
        <div className={style.chart_list}>
          {/* <Test /> */}
          <TrendView />
          {/* <Chart /> */}
          {/* <KChart />
          <div className={style.chart_list_hr}></div>
          <BottomEcharts /> */}
        </div>
      </div>
    </div>
  )
}
