import dynamic from 'next/dynamic'
import style from './index.module.scss'
import { useEffect, useMemo, useState } from 'react'
import filscanStore from '@/store/modules/filscan'
import { useRouter } from 'next/router'
import { Translation } from '@/components/hooks/Translation'
import {
  fund_list,
  related_options,
  related_list,
  fund_card,
} from '@/contents/analysis'
import Segmented from '@/packages/segmented'
import { Radio } from 'antd'
import analysisStore from '@/store/modules/analysis'
import { observer } from 'mobx-react'
import options from '@/src/cw/leecharts/options'
import { add } from 'lodash'
const Fund = dynamic(() => import('@/src/analysis/fund'), { ssr: false })
export default observer(() => {
  const router = useRouter()
  const { address } = router.query
  const { fundInfo, fundTrans } = analysisStore
  const { tr } = Translation({ ns: 'analysis' })
  const [showCard, setShowCard] = useState('transaction_volume')

  useEffect(() => {
    filscanStore.setTheme('dark')
    return () => {
      const lastTheme: any = localStorage.getItem('theme')
      filscanStore.setTheme(lastTheme)
    }
  }, [])

  useEffect(() => {
    load()
  }, [address])

  const load = () => {
    const payload = {
      address,
      type: showCard,
    }
    analysisStore.getFundAddress(payload)
    const infoPayload = {
      address,
      interval: '7d',
    }
    analysisStore.getFundAddrInfo(infoPayload)
    loadTrans(address)
  }

  const loadTrans = (address: any) => {
    analysisStore.getFundTransaction({
      address,
    })
  }

  const renderItem = (data: Array<any>, type?: string) => {
    const showData = type === 'card' ? fundTrans : fundInfo
    return (
      <ul className={style.fund_card_main}>
        {data.map((item: any, index) => {
          const { title, dataIndex, render, options, defaultValue } = item
          const value = (showData && showData[dataIndex]) || ''
          const showValue = render ? render(value, showData) : value
          if (options) {
            return (
              <li className={style.fund_card_item} key={index}>
                <span className={style.fund_card_item_title}>{tr(title)}</span>
                <span className={style.fund_card_item_value}>
                  <Radio.Group
                    className="custom_radio_group"
                    defaultValue={defaultValue || ''}
                  >
                    {options.map((option: any) => {
                      return (
                        <Radio
                          value={option.dataIndex}
                          key={option.dataIndex}
                          disabled={option.disabled}
                        >
                          <span className={style.fund_card_item_base}>
                            {tr(option.title)}
                            {option.sufIcon}
                          </span>
                        </Radio>
                      )
                    })}
                  </Radio.Group>
                </span>
              </li>
            )
          }
          return (
            <li key={index} className={style.fund_card_item}>
              <span className={style.fund_card_item_title}>{tr(title)}</span>
              <span className={style.fund_card_item_value}>{showValue}</span>
            </li>
          )
        })}
      </ul>
    )
  }

  const cardData = useMemo(() => {
    return showCard === 'transaction_volume'
      ? fund_card('volume')
      : fund_card('count')
  }, [showCard])

  return (
    <div className={`${style.fund} main_contain`}>
      <h3 className={style.fund_title}>{tr('fund_analysis')}</h3>
      <div className={style.fund_contain}>
        <div className={style.fund_contain_left}>
          <ul className={style.fund_card}>
            <span className={style.fund_card_topBorder} />
            <span className={style.fund_card_bottomBorder} />
            <span className={style.fund_card_after} />
            {renderItem(fund_list)}
            <hr className={style.fund_card_hr} />
            <ul className={style.fund_card_main}>
              <li className={style.fund_card_item}>
                <span className={style.fund_card_item_title}>
                  {tr('related_way')}
                </span>
                <span className={style.fund_card_item_value}>
                  <Segmented
                    data={related_options}
                    defaultValue={'transaction_volume'}
                    ns={'analysis'}
                    isHash={false}
                    onChange={(value) => setShowCard(value)}
                  />
                </span>
              </li>
              {renderItem(related_list)}
            </ul>
          </ul>
          <ul className={style.fund_card}>
            <span className={style.fund_card_topBorder} />
            <span className={style.fund_card_bottomBorder} />
            <span className={style.fund_card_after} />
            {renderItem(cardData, 'card')}
          </ul>
        </div>
        <div className={style.fund_contain_chart}>
          <Fund />
        </div>
      </div>
    </div>
  )
})
