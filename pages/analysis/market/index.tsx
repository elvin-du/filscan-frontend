import Market from '@/src/analysis/market'
import style from './index.module.scss'
import Chart from '@/src/analysis/chart'
import Liquidity from '@/src/analysis/liquidity'
import ReleaseList from '@/src/analysis/releaseList'
import Token from '@/src/analysis/token'
import { useEffect } from 'react'
import analysisStore from '@/store/modules/analysis'
import ActiveList from '@/src/analysis/activeList'
export default () => {
  useEffect(() => {
    analysisStore.getNetWork()
    analysisStore.getReleaseDate()
    analysisStore.getTokens()
    analysisStore.getActiveList()
  }, [])
  return (
    <div className={`main_contain ${style.market}`}>
      <Market />
      <Chart />
      <Liquidity />
      <ReleaseList />
      <Token />
      <ActiveList />
    </div>
  )
}
