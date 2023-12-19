import dynamic from 'next/dynamic'
import style from './index.module.scss'
import { useEffect } from 'react'
import filscanStore from '@/store/modules/filscan'
import { useRouter } from 'next/router'
import { Translation } from '@/components/hooks/Translation'
import {
  fund_list,
  rank_options,
  related_options,
  level_options,
} from '@/contents/analysis'
import Segmented from '@/packages/segmented'
import { Radio } from 'antd'
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

  const data: any = {
    account: 'f01234',
    rank: '12',
    balance: '11123112312312334563',
    ratio: '34.5',
    balance_change: '234',
  }

  const renderItem = (data: Array<any>) => {
    return (
      <ul className={style.fund_card_main}>
        {data.map((item: any, index) => {
          const { title, dataIndex, render } = item
          const value = data[dataIndex]
          const showValue = render ? render(value, data) : value
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
                    defaultValue={'fund_volume'}
                    ns={'analysis'}
                    isHash={false}
                  />
                </span>
              </li>
              <li className={style.fund_card_item}>
                <span className={style.fund_card_item_title}>{tr('rank')}</span>
                <span className={style.fund_card_item_value}>
                  <Radio.Group className="custom_radio_group">
                    {rank_options.map((option) => {
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
              <li className={style.fund_card_item}>
                <span className={style.fund_card_item_title}>
                  {tr('level')}
                </span>
                <span className={style.fund_card_item_value}>
                  <Radio.Group className="custom_radio_group">
                    {level_options.map((option) => {
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
            </ul>
          </ul>
        </div>
        <div className={style.fund_contain_chart}>
          <Fund />
        </div>
      </div>
    </div>
  )
}
