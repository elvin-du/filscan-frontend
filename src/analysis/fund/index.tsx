import Echarts from '@/components/echarts'
import analysisStore from '@/store/modules/analysis'
import { formatFil, isIndent } from '@/utils'
import { data } from 'autoprefixer'
import { observer } from 'mobx-react'
import { useEffect, useMemo, useRef } from 'react'

export default observer(() => {
  const { fundAddrData } = analysisStore
  const myChart = useRef<any>(null)
  const handleChart = (chart: any) => {
    myChart.current = chart
  }

  const handleClick = (params: any) => {
    const { name } = params
    const [first, last] = name?.split('>')
    if (last) {
      analysisStore.getFundTransaction(last)
    } else {
      analysisStore.getFundTransaction(name)
    }
  }

  useEffect(() => {
    if (myChart.current) {
      myChart.current?.on('click', 'series', handleClick)
    }
    return () => {
      if (myChart.current) {
        myChart.current?.off('click', 'series', handleClick)
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
            address,
            tag = '',
            total_transaction_volume,
            total_count,
          } = v.data || {}
          let result = ''
          result =
            'Address: ' +
            isIndent(address) +
            '<br /> ' +
            'Transaction Volume: ' +
            formatFil(total_transaction_volume) +
            'FIL' +
            '<br /> ' +
            'Transaction Count: ' +
            total_count

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
  }, [fundAddrData])
  return <Echarts options={{ ...newOptions }} onChartInstance={handleChart} />
})
