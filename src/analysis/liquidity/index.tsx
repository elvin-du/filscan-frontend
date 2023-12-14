import { Translation } from '@/components/hooks/Translation'
import style from './index.module.scss'
import Tooltip from '@/packages/tooltip'
import FILUp from '@/assets/images/filUp.svg'
import FILDown from '@/assets/images/filDown.svg'
import freed from '@/assets/images/freed.png'
import pledge from '@/assets/images/pledge.png'
import Image from 'next/image'
import { liquidity, time_options } from '@/contents/analysis'
import { formatNumber } from '@/utils'
import Cycle from '@/assets/images/cycle.svg'
import Chart from './chart'
import { useState } from 'react'
import Segmented from '@/packages/segmented'

export default () => {
  const { tr } = Translation({ ns: 'analysis' })
  const [active, setActive] = useState('30d')

  const data: any = {
    destruction: 24354654546,
    destruction_change: 345,
    freed: 123123112,
    freed_change: 31123,
    provider: 1231231321,
    provider_change: 345,
    lockup: 1231341321,
    lockup_change: -245,
    reserver: 1231231678,
    reserver_change: 3556,
    pledge: 1231231345,
    pledge_change: 3567,
    sector: 1231231345,
    sector_change: 333,
    defi: 1231231390,
    defi_change: 3556,
  }

  const renderChange = (value: number) => {
    const className = value > 0 ? 'text_green' : 'text_red'
    return (
      <span className={`${className} ${style.liquidity_change}`}>
        {value > 0 ? <FILUp /> : <FILDown />}
        {value}
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
              <span className={style.liquidity_left_item_value}>
                <span>{formatNumber(data['freed'])}</span>
                <span>{renderChange(data[`freed_change`])}</span>
              </span>
              <span className={style.liquidity_left_item_title}>
                {tr('liquidity_freed')}
              </span>
            </div>
            <ul className={style.liquidity_left_main}>
              {liquidity.left.map((item: any) => {
                const { title, dataIndex, render, tip } = item
                const value = data[dataIndex]
                return (
                  <li key={title} className={style.liquidity_left_item}>
                    <span className={style.liquidity_left_item_value}>
                      <span>{formatNumber(value)}</span>
                      {renderChange(data[`${dataIndex}_change`])}
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
                <span className={style.liquidity_left_item_value}>
                  <span>{formatNumber(data['freed'])}</span>
                  <span>{renderChange(data[`freed_change`])}</span>
                </span>
                <span className={style.liquidity_left_item_title}>
                  {tr('liquidity_freed')}
                </span>
              </div>
              <ul className={style.liquidity_left_main}>
                {liquidity.right.map((item: any) => {
                  const { title, dataIndex, render, tip } = item
                  const value = data[dataIndex]
                  return (
                    <li key={title} className={style.liquidity_left_item}>
                      <span className={style.liquidity_left_item_value}>
                        <span>{formatNumber(value)}</span>
                        {renderChange(data[`${dataIndex}_change`])}
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
                {formatNumber(data['destruction'])}
              </span>
              <span>{renderChange(data['destruction_change'])}</span>
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
}
