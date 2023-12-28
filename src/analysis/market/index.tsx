import { Translation } from '@/components/hooks/Translation'
import style from './index.module.scss'
import { overviewList } from '@/contents/analysis'
import { observer } from 'mobx-react'
import analysisStore from '@/store/modules/analysis'
import Tooltip from '@/packages/tooltip'
import fLogo from '@/assets/images/f_logo.png'
import Image from 'next/image'
import { formatNumber } from '@/utils'
import FILUp from '@/assets/images/filUp.svg'
import FILDown from '@/assets/images/filDown.svg'
import TwitterIcon from '@/assets/images/twitter.svg'
import NetworkIcon from '@/assets/images/network.svg'
import { getSvgIcon } from '@/svgsIcon'

export default observer(() => {
  const { tr } = Translation({ ns: 'analysis' })
  const { marketData } = analysisStore

  const renderRate = (value: number) => {
    let className = ''
    if (Number(value) !== 0) {
      className = value > 0 ? 'text_green' : 'text_red'
    }
    return (
      <span className={`${className} ${style.market_left_main_rate}`}>
        {className && <span>{value > 0 ? <FILUp /> : <FILDown />}</span>}
        {formatNumber(value, 2)}%
      </span>
    )
  }

  return (
    <div className={`${style.market}`}>
      <div className={style.market_left}>
        <div className={style.market_left_top}>
          <span className={style.market_left_top_left}>
            <Image src={fLogo} alt="" height={30} />
            <span>FIL</span>
            <span className={style.market_left_top_des}>filecoin</span>
          </span>
          <span className={style.market_left_top_rank}>
            NO.{marketData.rank}
          </span>
        </div>
        <div>
          <div className={style.market_left_main}>
            <span className={style.market_left_main_price}>
              <span>{formatNumber(marketData?.price)}</span>

              <span
                className={style.market_left_main_price_rmb}
              >{`≈  ¥${formatNumber(marketData.rmb_price, 2)}`}</span>
            </span>
            {renderRate(marketData.price_change_rate)}
          </div>
          <span className={style.market_left_main_des}>
            {tr('price_origin')}
            {/* <Tooltip context={tr('price_origin')} /> */}
          </span>
        </div>

        <div className={style.market_left_links}>
          <span
            className={style.market_left_links_icon}
            onClick={() => {
              window.open('https://twitter.com/Filecoin')
            }}
          >
            <TwitterIcon />
          </span>
          <span
            className={style.market_left_links_icon}
            onClick={() => {
              window.open('https://filecoin.io/')
            }}
          >
            <NetworkIcon />
          </span>
        </div>
      </div>
      <div className={style.market_right}>
        {overviewList.map((itemList, index) => {
          return (
            <ul
              key={index}
              className={`${style.market_right_ul} ${
                style[`market_right_${index}`]
              }`}
            >
              {itemList.map((item: any) => {
                const { title, render, dataIndex, tip } = item
                let value = render
                  ? render(marketData[dataIndex], marketData)
                  : marketData[dataIndex]
                return (
                  <li key={item.dataIndex} className={style.market_right_item}>
                    <span className={style.market_right_item_title}>
                      {tr(title)} {tip && <Tooltip context={tr(tip)} />}
                    </span>
                    <span>{value}</span>
                  </li>
                )
              })}
            </ul>
          )
        })}
        <span className={style.market_right_tip}>
          <span className="cursor-pointer">{getSvgIcon('tip')}</span>
          {tr('market_tip')}
        </span>
      </div>
    </div>
  )
})
