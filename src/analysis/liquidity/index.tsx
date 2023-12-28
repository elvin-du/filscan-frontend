import { Translation } from '@/components/hooks/Translation'
import style from './index.module.scss'
import Tooltip from '@/packages/tooltip'
import FILUp from '@/assets/images/filUp.svg'
import FILDown from '@/assets/images/filDown.svg'
import freed from '@/assets/images/freed.png'
import pledge from '@/assets/images/pledge.png'
import Image from 'next/image'
import { liquidity, time_options } from '@/contents/analysis'
import { formatFil, formatNumber } from '@/utils'
import Cycle from '@/assets/images/cycle.svg'
import Chart from './chart'
import { useEffect, useState } from 'react'
import Segmented from '@/packages/segmented'
import { observer } from 'mobx-react'
import analysisStore from '@/store/modules/analysis'

export default observer(() => {
  const { fileNetwork } = analysisStore
  const { tr } = Translation({ ns: 'analysis' })
  const [active, setActive] = useState('30d')
  // const data: any = {
  //   destruction: 24354654546,
  //   destruction_change: 345,
  //   freed: 123123112,
  //   freed_change: 31123,
  //   provider: 1231231321,
  //   provider_change: 345,
  //   lockup: 1231341321,
  //   lockup_change: -245,
  //   reserver: 1231231678,
  //   reserver_change: 3556,
  //   pledge: 1231231345,
  //   pledge_change: 3567,
  //   sector: 1231231345,
  //   sector_change: 333,
  //   defi: 1231231390,
  //   defi_change: 3556,
  // }

  const renderChange = (value: number) => {
    let className = ''

    if (Number(value) !== 0) {
      className = value > 0 ? 'text_green' : 'text_red'
    }
    return (
      <span className={`${className} ${style.liquidity_change}`}>
        {className && <span>{value > 0 ? <FILUp /> : <FILDown />}</span>}
        {formatNumber(formatFil(value), 2)}
      </span>
    )
  }

  return (
    <>
      <h3 className={style.liquidity_title}>
        <span className={style.liquidity_title_text}>
          {tr('liquidity_watch')}
        </span>
        <Tooltip context={tr('liquidity_watch_tip')} />
      </h3>
      <div className={style.liquidity}>
        <div className={style.liquidity_top}>
          <span className={style.liquidity_top_label}>
            {tr('liquidity_total_24')}
          </span>
          <span className={style.liquidity_top_value}>
            <span className={style.liquidity_top_value_text}>454,383,283</span>
            <FILDown />
            <span>2.3</span>
          </span>
        </div>
        <div className={style.liquidity_content}>
          <div className={style.liquidity_left}>
            <div className={style.liquidity_left_left}>
              <Image src={freed} alt="" width={55} height={42} />
              <div className={style.liquidity_left_item}></div>{' '}
              <span
                className={`${style.liquidity_left_item_value} ${style.liquidity_left_item_mainValue}`}
              >
                <span>
                  {formatNumber(formatFil(fileNetwork['fil_produce'] || ''), 2)}
                </span>
                <span>
                  {renderChange(fileNetwork[`fil_produce_24h`] || '')}
                </span>
              </span>
              <span className={style.liquidity_left_item_title}>
                {tr('liquidity_freed_24')}
              </span>
            </div>
            <ul className={style.liquidity_left_main}>
              {liquidity.left.map((item: any) => {
                const { title, dataIndex, render, tip } = item
                const value = fileNetwork[dataIndex] || ''
                return (
                  <li key={title} className={style.liquidity_left_item}>
                    <span className={style.liquidity_left_item_value}>
                      <span>{formatNumber(formatFil(value), 2)}</span>
                      {renderChange(fileNetwork[`${dataIndex}_24h`])}
                    </span>
                    <span className={style.liquidity_left_item_title}>
                      {tr(title)}
                      {tip && <Tooltip context={tr(tip)} />}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className={style.liquidity_center}>
            <Cycle width={30} height={30} />
          </div>
          <div className={`${style.liquidity_right}`}>
            <div
              className={`${style.liquidity_left} ${style.liquidity_right_content}`}
            >
              <div className={style.liquidity_right_left}>
                <Image src={pledge} alt="" width={55} height={42} />
                <div className={style.liquidity_left_item}></div>{' '}
                <span
                  className={`${style.liquidity_left_item_value} ${style.liquidity_left_item_mainValue}`}
                >
                  <span>
                    {formatNumber(formatFil(fileNetwork['locked']), 2)}
                  </span>
                  <span>{renderChange(fileNetwork[`locked_24h`])}</span>
                </span>
                <span className={style.liquidity_left_item_title}>
                  {tr('liquidity_pledge_24')}
                </span>
              </div>
              <ul className={style.liquidity_left_main}>
                {liquidity.right.map((item: any) => {
                  const { title, dataIndex, render, tip } = item
                  const value = fileNetwork[dataIndex]
                  return (
                    <li key={title} className={style.liquidity_left_item}>
                      <span className={style.liquidity_left_item_value}>
                        <span>{formatNumber(formatFil(value), 2)}</span>
                        {renderChange(fileNetwork[`${dataIndex}_24h`])}
                      </span>
                      <span className={style.liquidity_left_item_title}>
                        {tr(title)}
                        {tip && <Tooltip context={tr(tip)} />}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className={`${style.liquidity_right_item}`}>
              <span className={`${style.liquidity_right_item_title}`}>
                {tr('liquidity_destruction_24')}
              </span>
              <span className={`${style.liquidity_right_item_value}`}>
                {formatNumber(formatFil(fileNetwork['burn']), 2)}
              </span>
              <span>{renderChange(fileNetwork['burn_24h'])}</span>
            </div>
          </div>
        </div>
        <div className={style.liquidity_chart}>
          <span className={style.liquidity_chart_tabs}>
            <Segmented
              data={time_options}
              ns="analysis"
              defaultValue={active}
              isHash={false}
              onChange={(value) => {
                setActive(value)
              }}
            />
          </span>
          <div className={style.liquidity_chart_content}>
            <Chart />
          </div>
        </div>
      </div>
    </>
  )
})
