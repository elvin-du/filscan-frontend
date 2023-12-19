import dynamic from 'next/dynamic'
import style from './index.module.scss'
import { useEffect } from 'react'
import filscanStore from '@/store/modules/filscan'
import { useRouter } from 'next/router'
import { Translation } from '@/components/hooks/Translation'
const Fund = dynamic(() => import('@/src/analysis/fund'), { ssr: false })
export default () => {
  const router = useRouter()
  const { address } = router.query
  const { tr } = Translation({ ns: 'analysis' })
  useEffect(() => {
    filscanStore.setTheme('dark')
    return () => {
      const lastTheme: any = localStorage.getItem('theme')
      filscanStore.setTheme(lastTheme)
    }
  }, [])

  return (
    <div className={`${style.fund} main_contain`}>
      <h3 className={style.fund_title}>{tr('fund_analysis')}</h3>
      <div className={style.fund_contain}>
        <div className={style.fund_contain_left}>left</div>
        <div className={style.fund_contain_chart}>
          <Fund />
        </div>
      </div>
    </div>
  )
}
