import dynamic from 'next/dynamic'
import style from './index.module.scss'

const AdvancedRealTimeChart = dynamic(
  () =>
    import('react-ts-tradingview-widgets').then((w) => w.AdvancedRealTimeChart),
  {
    ssr: false,
  },
)
export default () => {
  return (
    <div className={style.chart}>
      <AdvancedRealTimeChart
        width={'100%'}
        height={384}
        theme="light"
        autosize
      />
    </div>
  )
}
