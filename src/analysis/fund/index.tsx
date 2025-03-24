import Echarts from '@/components/echarts'
import analysisStore from '@/store/modules/analysis'
import { formatFil, isIndent } from '@/utils'
import { observer } from 'mobx-react'
import { useEffect, useMemo, useRef } from 'react'
import Nodata from '@/assets/images/Nodata.svg'
import style from './index.module.scss'

interface Props {
  showCard: string
  onChange?: (value: string) => void
}
export default observer((props: Props) => {
  const { showCard, onChange } = props
  const { fundAddrData } = analysisStore
  const myChart = useRef<any>(null)
  const handleChart = (chart: any) => {
    myChart.current = chart
  }

  const handleClick = (params: any) => {
    const { name } = params
    const dataType = params.dataType || params?.data?.dataType
    if (dataType === 'node') {
      analysisStore.getFundTransaction(name)
      analysisStore.setSelect(name)
    }
  }

  useEffect(() => {
    if (myChart.current) {
      myChart.current?.on('click', handleClick)
    }
    return () => {
      if (myChart.current) {
        myChart.current?.off('click', handleClick)
      }
    }
  }, [myChart.current])

  const newOptions = useMemo(() => {
    return {
      title: {
        text: '',
      },
      gird: {
        left: 10,
        right: 10,
        bottom: 10,
        top: 20,
      },
      tooltip: {
        show: true,
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderColor: 'transparent',
        textStyle: {
          color: '#ffffff',
        },
        formatter(v: any) {
          const {
            name,
            address,
            tag = '',
            total_transaction_volume,
            transaction_volume_with_father_node,
            cnt_with_father_node,
            total_count,
          } = v.data || {}
          if (!name) return undefined
          let result = ''
          result = 'Address: ' + isIndent(address)
          if (showCard === 'transaction_volume') {
            result =
              result +
              '<br /> ' +
              'Transaction Volume From Previous : ' +
              formatFil(transaction_volume_with_father_node) +
              'FIL' +
              '<br /> ' +
              'Total Volume: ' +
              formatFil(total_transaction_volume) +
              'FIL'
          } else if (showCard === 'transaction_count') {
            result =
              result +
              '<br /> ' +
              'Transaction Count From Previous : ' +
              cnt_with_father_node +
              '<br /> ' +
              'Total Transactions: ' +
              total_count
          }
          if (tag !== '') {
            result = result + '<br />' + 'Exchange: ' + tag
          }
          return result
        },
      },
      animationDurationUpdate: 1500,
      animationEasingUpdate: 'quinticInOut',
      series: fundAddrData?.series || [],
    }
  }, [fundAddrData, showCard])

  if (fundAddrData.series[0].data.length === 0) {
    return (
      <div className={style.no_data}>
        <Nodata width={161} height={81} />
        <span>No Data</span>
      </div>
    )
  }
  return <Echarts options={{ ...newOptions }} onChartInstance={handleChart} />
})
