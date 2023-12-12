import Echarts from '@/components/echarts'
import analysisStore from '@/store/modules/analysis'
import filscanStore from '@/store/modules/filscan'
import { formatDateTime, formatNumberUnit } from '@/utils'
import { getChartSeriesObj, getColor } from '@/utils/echarts'
import { cloneDeep } from 'lodash'
import { observer } from 'mobx-react'
import { useMemo } from 'react'
import style from './index.module.scss'

export default observer(() => {
  const { chartKOptions } = analysisStore
  const { theme } = filscanStore
  const Colors = useMemo(() => {
    return getColor(theme)
  }, [theme])

  const default_options = useMemo(() => {
    return {
      grid: [
        {
          z: 0, // 将K线图放置在Y轴下层
          left: -1,
          right: 60,
          height: '50%',
          border: Colors.splitLine,
        },
        {
          z: 0, // 将K线图放置在Y轴下层
          left: -1,
          right: 60,
          top: '70%',
          height: '20%',
          border: Colors.splitLine,
        },
      ],
      tooltip: {
        trigger: 'axis',
        showContent: false,
        axisPointer: {
          //snap: 'true',
          type: 'cross',
        },
      },
      axisPointer: {
        link: { xAxisIndex: 'all' },
        label: {
          backgroundColor: '#777',
        },
      },

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
        {
          position: 'right',
          scale: true,
          gridIndex: 1,
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
            onZero: true,
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

          axisLabel: {
            show: false,
            formatter: (value: string) => {
              return formatDateTime(Number(value), 'YYYY-MM-DD HH:mm:ss')
            },
            color: 'transparent',
          },
          min: 'dataMin',
          max: 'dataMax',
        },
        {
          type: 'category',
          gridIndex: 1,
          alignTicks: true,
          boundaryGap: false,
          axisLine: { onZero: true },
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
              return formatDateTime(Number(value), 'YYYY-MM-DD HH:mm:ss')
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
      newOptions.series = []
      chartKOptions?.series.forEach((v: any) => {
        const newObj = getChartSeriesObj(v.type)
        newOptions.series.push({
          ...newObj,
          ...v,
        })
      })
      chartKOptions.bottomSeries.forEach((v: any) => {
        const newObj = getChartSeriesObj(v.type)
        newOptions.series.push({
          ...newObj,
          ...v,
          yAxisIndex: 1,
          xAxisIndex: 1,
        })
      })
    }
    return { ...newOptions }
  }, [chartKOptions, default_options])

  return (
    <div className={style.Charts}>
      <Echarts options={options} />
    </div>
  )
})
