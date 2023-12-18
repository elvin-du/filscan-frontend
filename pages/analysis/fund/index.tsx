import dynamic from 'next/dynamic'
import style from './index.module.scss'
import { useEffect } from 'react'
import filscanStore from '@/store/modules/filscan'
const Fund = dynamic(() => import('@/src/analysis/fund'), { ssr: false })
export default () => {
  const { theme } = filscanStore

  useEffect(() => {
    if (theme !== 'dark') {
      filscanStore.setTheme('dark')
      return () => {
        const lastTheme: any = localStorage.getItem('theme')
        filscanStore.setTheme(lastTheme)
      }
    }
  }, [])
  return (
    <div className={`${style.fund} main_contain`}>
      <Fund />
    </div>
  )
}
