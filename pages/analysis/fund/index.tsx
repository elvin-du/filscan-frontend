import style from './index.module.scss'
import { Input } from 'antd'
import filscanStore from '@/store/modules/filscan'
import { useEffect, useState } from 'react'
import { Translation } from '@/components/hooks/Translation'
import GifBorderTop from '@/assets/images/gifBorderTop.svg'
import GifBorder from '@/assets/images/gifBorder.svg'
import { getSvgIcon } from '@/svgsIcon'
import { useRouter } from 'next/router'

export default () => {
  const { theme } = filscanStore
  const { tr } = Translation({ ns: 'analysis' })
  const [value, setValue] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    if (theme !== 'dark') {
      filscanStore.setTheme('dark')
      return () => {
        const lastTheme: any = localStorage.getItem('theme')
        filscanStore.setTheme(lastTheme)
      }
    }
  }, [])

  const handleEnter = () => {
    router.push(`/analysis/fund/${value}`)
  }
  return (
    <div className={style.fundContain}>
      <span className={style.fundContain_bg}></span>
      <div className={style.fundContain_main}>
        <GifBorderTop
          className={style.fundContain_main_topSvg}
          width={44}
          height={38}
        />
        <Input
          className={`${style.fundContain_main_input}`}
          placeholder={tr('fund_placeholder')}
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
          onPressEnter={handleEnter}
        />
        <span
          className={`${style.fundContain_main_input_suffix}`}
          onClick={handleEnter}
        >
          {getSvgIcon('search')}
        </span>
        <GifBorder
          className={style.fundContain_main_svg}
          width={44}
          height={38}
        />
      </div>
    </div>
  )
}
