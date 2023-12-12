import Echarts from '@/components/echarts'
import analysisStore from '@/store/modules/analysis'
import filscanStore from '@/store/modules/filscan'
import { formatDateTime, formatNumberUnit, get$Number } from '@/utils'
import { getColor } from '@/utils/echarts'
import { theme } from 'antd'
import { cloneDeep } from 'lodash'
import { observer } from 'mobx-react'
import { useEffect, useMemo, useRef } from 'react'
import style from './index.module.scss'
const downColor = 'rgba(64, 162, 145, 1)'
const upColor = 'rgba(225, 82, 82, 1)'
export default observer(() => {
  const { chartKOptions, dataZoom } = analysisStore
  const { theme } = filscanStore
  const myChart = useRef<any>(null)

  const handleChartInstance = (current: any) => {
    myChart.current = current
  }

  useEffect(() => {
    console.log('---44', dataZoom)

    if (dataZoom && myChart.current) {
      myChart.current.dispatchAction({
        type: 'dataZoom',
        // 开始位置的百分比，0 - 100
        start: dataZoom[0],
        // 结束位置的百分比，0 - 100
        end: dataZoom[1],
      })
    }
  }, [dataZoom])

  // const handleDataZoom = (params: any) => {
  //   const start = params?.start || params?.batch[0]?.start
  //   const end = params?.end || params?.batch[0]?.end
  //   analysisStore.setDataZoom([start, end])
  // }

  // useEffect(() => {
  //   if (myChart.current) {
  //     // 在这里监听dataZoom事件，当数据范围发生变化时触发
  //     myChart.current.on('dataZoom', handleDataZoom)
  //     return () => {
  //       myChart.current.off('dataZoom', handleDataZoom)
  //     }
  //   }
  // }, [myChart.current])

  const Colors = useMemo(() => {
    return getColor(theme)
  }, [theme])
  const default_options = useMemo(() => {
    return {
      legend: {
        bottom: 10,
        left: 'center',
        //data: ['vol', 'MA5', 'MA10', 'MA20', 'MA25', 'MA30'],
      },
      //   trigger: 'axis',
      //   axisPointer: {
      //     type: 'cross',
      //   },
      //   // borderWidth: 1,
      //   // borderColor: '#ccc',
      //   // padding: 10,
      //   // textStyle: {
      //   //   color: '#000',
      //   // },
      //   // position: function (
      //   //   pos: number[],
      //   //   params: any,
      //   //   el: any,
      //   //   elRect: any,
      //   //   size: { viewSize: number[] },
      //   // ) {
      //   //   const obj: any = {
      //   //     top: 10,
      //   //   }
      //   //   obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30
      //   //   return obj
      //   // },
      //   // extraCssText: 'width: 170px'
      // },

      grid: [
        {
          z: 0, // 将K线图放置在Y轴下层
          left: -1,
          right: 60,
          top: 0,
          border: Colors.splitLine,
          // containLabel: true,
        },
      ],
      yAxis: [
        {
          position: 'right',
          scale: true,
          splitNumber: 2,
          axisLabel: {
            show: true,
            formatter: (value: any) => {
              return formatNumberUnit(value)
            },
            color: Colors.labelColor,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: Colors.splitLine,
            },
          },
          axisTick: { show: false },
          splitLine: {
            show: true,
            lineStyle: {
              color: Colors.splitLine,
            },
          },
        },
      ],
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: [0, 1],
          start: 95,
          end: 100,
        },
      ],
      xAxis: [
        {
          type: 'category',
          alignTicks: true,
          boundaryGap: false,
          axisLine: { onZero: false },
          axisTick: { show: false },
          splitLine: {
            show: true,
            lineStyle: {
              color: Colors.splitLine,
            },
          },
          axisLabel: {
            show: true,
            formatter: (value: string) => {
              return formatDateTime(Number(value), 'YYYY-MM')
            },
          },
          min: 'dataMin',
          max: 'dataMax',
          axisPointer: {
            z: 100,
          },
        },
      ],
    }
  }, [Colors])

  const options = useMemo(() => {
    const newOptions: any = cloneDeep(default_options)
    if (chartKOptions && Object.keys(chartKOptions).length > 0) {
      newOptions.xAxis = newOptions.xAxis.map((c: any, index: number) => {
        return {
          ...c,
          data: chartKOptions.xAxisData,
        }
      })
      newOptions.series = chartKOptions?.bottomSeries
    }
    return { ...newOptions }
  }, [chartKOptions, default_options])

  console.log('----44', options)

  return (
    <div className={style.bottom_Charts}>
      <Echarts
        options={options}
        key="bottomChart"
        onChartInstance={handleChartInstance}
      />
    </div>
  )
})
