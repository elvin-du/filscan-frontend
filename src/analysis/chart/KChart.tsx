import Echarts from '@/components/echarts'
import analysisStore from '@/store/modules/analysis'
import filscanStore from '@/store/modules/filscan'
import { formatDateTime, formatNumberUnit, get$Number } from '@/utils'
import { getColor } from '@/utils/echarts'
import { theme } from 'antd'
import { cloneDeep } from 'lodash'
import { observer } from 'mobx-react'
import { useEffect, useMemo } from 'react'
import style from './index.module.scss'
const downColor = 'rgba(64, 162, 145, 1)'
const upColor = 'rgba(225, 82, 82, 1)'
export default observer(() => {
  const { chartKOptions } = analysisStore
  const { theme } = filscanStore
  const Colors = useMemo(() => {
    return getColor(theme)
  }, [theme])
  const default_options = useMemo(() => {
    return {
      legend: {
        bottom: 10,
        left: 'center',
        data: ['vol', 'MA5', 'MA10', 'MA20', 'MA25', 'MA30'],
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        textStyle: {
          color: '#000',
        },
        position: function (
          pos: number[],
          params: any,
          el: any,
          elRect: any,
          size: { viewSize: number[] },
        ) {
          const obj: any = {
            top: 10,
          }
          obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30
          return obj
        },
        // extraCssText: 'width: 170px'
      },
      axisPointer: {
        link: [
          {
            xAxisIndex: 'all',
          },
        ],
        label: {
          backgroundColor: '#777',
        },
      },

      grid: [
        {
          z: 0, // 将K线图放置在Y轴下层
          left: -1,
          right: 60,
          height: '50%',
          //bottom: '30%',
          border: Colors.splitLine,
          // containLabel: true,
        },
        // {
        //   z: 0, // 将K线图放置在Y轴下层
        //   left: -1,
        //   right: 60,
        //   top: '70%',
        //   height: '20%',
        //   border: Colors.splitLine,
        //   //containLabel: true,
        // },
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
              //if (index === 0) return ''
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
        // {
        //   position: 'right',
        //   scale: true,
        //   gridIndex: 1,
        //   splitNumber: 2,

        //   axisLabel: {
        //     show: true,
        //     formatter: (value: any) => {
        //       return formatNumberUnit(value)
        //     },
        //     color: Colors.labelColor,
        //   },
        //   axisLine: {
        //     show: true,
        //     lineStyle: {
        //       color: Colors.splitLine,
        //     },
        //   },
        //   axisTick: { show: false },
        //   splitLine: {
        //     show: true,
        //     lineStyle: {
        //       color: Colors.splitLine,
        //     },
        //   },
        // },
      ],
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: [0, 1],
          start: 95,
          end: 100,
        },
        {
          show: true,
          xAxisIndex: [0, 1],
          type: 'inside',
          top: '95%',
          start: 95,
          end: 100,
        },
      ],
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
          axisTick: {
            length: 50,
          },
          axisLabel: { show: false },
          min: 'dataMin',
          max: 'dataMax',
        },
        // {
        //   type: 'category',
        //   gridIndex: 1,
        //   alignTicks: true,
        //   boundaryGap: false,
        //   axisLine: { onZero: false },
        //   axisTick: { show: false },
        //   splitLine: {
        //     show: true,
        //     lineStyle: {
        //       color: Colors.splitLine,
        //     },
        //   },
        //   axisLabel: {
        //     show: true,
        //     formatter: (value: string) => {
        //       return formatDateTime(Number(value), 'YYYY-MM')
        //     },
        //   },
        //   min: 'dataMin',
        //   max: 'dataMax',
        //   axisPointer: {
        //     z: 100,
        //   },
        // },
      ],
    }
  }, [Colors])

  const options = useMemo(() => {
    const newOptions: any = cloneDeep(default_options)
    if (chartKOptions && Object.keys(chartKOptions).length > 0) {
      newOptions.xAxis = newOptions.xAxis.map((c: any, index: number) => {
        return {
          ...c,
          ...(chartKOptions?.xAxis[index] || {}),
        }
      })
      newOptions.series = chartKOptions?.series
    }
    return { ...newOptions }
  }, [chartKOptions, default_options])

  return (
    <div className={style.chart_content}>
      <div>
        <div>
          <span>FIL/USDT </span>
          <span>$4.17</span>
          <span>-7.46%</span>
        </div>
        <div></div>
      </div>
      <div className={style.kCharts}>
        <Echarts options={options} />
      </div>
    </div>
  )
})
