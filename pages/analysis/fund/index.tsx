import dynamic from 'next/dynamic'
import style from './index.module.scss'
const Fund = dynamic(() => import('@/src/analysis/fund'), { ssr: false })
export default () => {
  return (
    <div className={`${style.fund} main_contain`}>
      <Fund />
    </div>
  )
}
