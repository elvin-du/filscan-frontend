import Echarts from '@/components/echarts'
import analysisStore from '@/store/modules/analysis'
import { formatFil } from '@/utils'
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
    console.log('====dd', first, last, name, params)
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
        show: false,
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderColor: 'transparent',
        textStyle: {
          color: '#ffffff',
        },
        // formatter(v: any) {
        //   const {
        //     address,
        //     source = '',
        //     total_transaction_volume,
        //     total_count,
        //   } = v.data || {}
        //   let result = ''
        //   result =
        //     'address: ' +
        //     address +
        //     '<br /> ' +
        //     'source: ' +
        //     source +
        //     '<br /> ' +
        //     'total_transaction_volume: ' +
        //     formatFil(total_transaction_volume) +
        //     'FIL' +
        //     '<br /> ' +
        //     'total_count: ' +
        //     total_count

        //   return result
        // },
      },
      animationDurationUpdate: 1500,
      animationEasingUpdate: 'quinticInOut',
      series: fundAddrData?.series || [],
    }
  }, [fundAddrData])
  return <Echarts options={{ ...newOptions }} onChartInstance={handleChart} />
})
