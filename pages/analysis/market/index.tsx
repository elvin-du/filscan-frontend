import Market from '@/src/analysis/market'
import style from './index.module.scss'
import Chart from '@/src/analysis/chart'
import Liquidity from '@/src/analysis/liquidity'
export default () => {
  return (
    <div className={`main_contain ${style.market}`}>
      <Market />
      <Chart />
      <Liquidity />
    </div>
  )
}
