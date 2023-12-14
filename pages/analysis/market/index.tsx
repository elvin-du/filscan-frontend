import Market from '@/src/analysis/market'
import style from './index.module.scss'
import Chart from '@/src/analysis/chart'
import Liquidity from '@/src/analysis/liquidity'
import ReleaseList from '@/src/analysis/releaseList'
import Token from '@/src/analysis/token'
export default () => {
  return (
    <div className={`main_contain ${style.market}`}>
      <Market />
      <Chart />
      <Liquidity />
      <ReleaseList />
      <Token />
      <ReleaseList />
    </div>
  )
}
