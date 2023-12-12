import Echarts from '@/components/echarts'
import analysisStore from '@/store/modules/analysis'
import filscanStore from '@/store/modules/filscan'
import { formatNumberUnit } from '@/utils'
import { getColor } from '@/utils/echarts'
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

  const handleDataZoom = (params: any) => {
    console.log('---ff', params)
    const start = params?.start || params?.batch[0]?.start
    const end = params?.end || params?.batch[0]?.end
    analysisStore.setDataZoom([start, end])
  }

  useEffect(() => {
    if (dataZoom && myChart.current) {
      myChart.current.dispatchAction({
        type: 'dataZoom',
        // 可选，dataZoom 组件的 index，多个 dataZoom 组件时有用，默认为 0
        dataZoomIndex: 0,
        // 开始位置的百分比，0 - 100
        start: dataZoom[0],
        // 结束位置的百分比，0 - 100
        end: dataZoom[1],
      })
    }
  }, [dataZoom])

  useEffect(() => {
    if (myChart.current) {
      // 在这里监听dataZoom事件，当数据范围发生变化时触发
      myChart.current.on('dataZoom', handleDataZoom)
      return () => {
        myChart.current.off('dataZoom', handleDataZoom)
      }
    }
  }, [myChart.current])

  const Colors = useMemo(() => {
    return getColor(theme)
  }, [theme])
  const default_options = useMemo(() => {
    return {
      legend: {
        //   bottom: 10,
        left: 'center',
        // data: ['vol', 'MA5', 'MA10', 'MA20', 'MA30'],
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
          bottom: 0,
          border: Colors.splitLine,
        },
      ],
      yAxis: [
        {
          position: 'right',
          scale: true,
          splitArea: {
            show: false,
          },
          axisLabel: {
            show: true,
            formatter: (value: any, index: number) => {
              if (index === 0) return ''
              return formatNumberUnit(value)
            },
            color: Colors.labelColor,
          },
          lineStyle: {
            color: Colors.splitLine,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: Colors.splitLine,
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: Colors.splitLine,
            },
          },
        },
      ],
      dataZoom: {
        type: 'inside',
        xAxisIndex: [0, 1],
        start: 95,
        end: 100,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            show: true,
            onZero: false,
            lineStyle: {
              color: Colors.splitLine,
            },
          },
          alignTicks: true,
          splitLine: {
            show: true,
            lineStyle: {
              color: Colors.splitLine,
            },
          },

          axisLabel: { show: false },
          min: 'dataMin',
          max: 'dataMax',
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
      newOptions.series = chartKOptions?.series
    }
    return { ...newOptions }
  }, [chartKOptions, default_options])
  return (
    <div className={style.kCharts}>
      <Echarts options={options} onChartInstance={handleChartInstance} />
    </div>
  )
})
