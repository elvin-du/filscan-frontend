import Market from '@/src/analysis/market'
import style from './index.module.scss'
import Chart from '@/src/analysis/chart'
export default () => {
  return (
    <div className={`main_contain ${style.market}`}>
      <Market />
      <Chart />
    </div>
  )
}
