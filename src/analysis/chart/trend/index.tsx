import Echarts from '@/components/echarts'
import { Translation } from '@/components/hooks/Translation'
import { fil_trend } from '@/contents/analysis'
import analysisStore from '@/store/modules/analysis'
import filscanStore from '@/store/modules/filscan'
import { getColor, get_xAxis } from '@/utils/echarts'
import { clone, cloneDeep } from 'lodash'
import { observer } from 'mobx-react'
import { useMemo, useState } from 'react'
import style from '../index.module.scss'
import { getSvgIcon } from '@/svgsIcon'
import { transaction } from 'mobx'

export default observer(() => {
  const { filTrend } = analysisStore
  const { theme } = filscanStore
  const { tr } = Translation({ ns: 'analysis' })

  const [noShow, setNoShow] = useState<Record<string, boolean>>({})

  const Colors = useMemo(() => {
    return getColor(theme)
  }, [theme])
  const defaultOptions = useMemo(() => {
    return {
      grid: [
        {
          top: -1,
          right: 0,
          left: 0,
          height: '60%',
          border: Colors.splitLine,
        },
        {
          right: 0,
          left: 0,
          bottom: 0,
          top: '60%',
          height: 130,
          border: Colors.splitLine,
        },
      ],
      yAxis: [
        {
          type: 'value',
          position: 'right',
          scale: true,
          offset: -40,
          nameTextStyle: {
            color: Colors.textStyle,
          },
          splitNumber: 3,
          axisLabel: {
            formatter: (value: string | number, index: number) => {
              if (Number(value) === 0 || index === 4) {
                return ''
              }
              return '$' + value
            },
            textStyle: {
              color: Colors.labelColor,
            },
          },
          axisPointer: {
            label: {
              show: true,
              backgroundColor: Colors.labelColor,
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: Colors.splitLine,
            },
          },
        },
        {
          type: 'value',
          position: 'left',
          scale: true,
          axisPointer: {
            label: {
              show: false, // 隐藏第一个 grid 的坐标轴指示器标签
            },
          },
          nameTextStyle: {
            color: Colors.textStyle,
          },
          axisLabel: {
            show: false,
            textStyle: {
              color: Colors.labelColor,
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
            lineStyle: {
              type: 'dashed',
              color: Colors.splitLine,
            },
          },
        },
        {
          type: 'value',
          position: 'right',
          scale: true,
          offset: -50,
          gridIndex: 1,
          splitNumber: 2,
          nameTextStyle: {
            color: Colors.textStyle,
          },
          axisLabel: {
            formatter: (value: string | number, index: number) => {
              if (Number(value) === 0 || index === 3) {
                return ''
              }
              return '$' + value + '亿'
            },
            textStyle: {
              color: Colors.labelColor,
            },
          },
          axisPointer: {
            label: {
              show: true,
              backgroundColor: Colors.labelColor,
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: Colors.splitLine,
            },
          },
        },
      ],
      xAxis: [
        {
          type: 'category',
          axisLabel: {
            show: false,
          },
          axisPointer: {
            label: {
              show: false, // 隐藏第一个 grid 的坐标轴指示器标签
            },
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: Colors.splitLine,
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: Colors.splitLine,
            },
          },
          data: [],
        },
        {
          type: 'category',
          axisLabel: {
            color: Colors.labelColor,
          },
          axisPointer: {
            label: {
              show: true,
              backgroundColor: Colors.labelColor,
            },
          },
          gridIndex: 1,
          axisLine: {
            lineStyle: {
              color: Colors.splitLine,
            },
          },
          lightStyle: {
            color: Colors.lineStyle,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: Colors.splitLine,
            },
          },
          data: [],
        },
      ],
      tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
      },
      axisPointer: {
        link: [
          {
            xAxisIndex: [0, 1],
          },
        ],
      },
      legend: {
        show: false,
      },
      dataZoom: [
        {
          type: 'slider',
          xAxisIndex: [0, 1],
          realtime: false,
          start: 0,
          end: 100,
          bottom: 10,
          height: 20,
          handleIcon:
            'path://M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '120%',
        },
        {
          type: 'inside',
          xAxisIndex: [0, 1],
          start: 40,
          end: 70,
          height: 20,
        },
      ],
    }
  }, [Colors])

  const default_xAxis = useMemo(() => {
    return get_xAxis(theme, false)
  }, [theme])

  const options = useMemo(() => {
    const { categoryData } = filTrend
    const series: Array<any> = []
    fil_trend.forEach((item) => {
      if (!noShow[item?.name]) {
        series.push({
          type: item.type,
          data: filTrend[item.dataIndex],
          key: item.dataIndex,
          name: item.dataIndex,
          symbol: 'none',
          smooth: true,
          yAxisIndex: item.yIndex,
          xAxisIndex: item.xIndex,
          connectNulls: true,
          itemStyle: {
            color: item.color,
          },
          lineStyle: {
            width: 1,
          },
          barMaxWidth: '30',
        })
      }
    })

    const newOptions: any = cloneDeep(defaultOptions)
    newOptions.xAxis.map((v: any) => {
      v.data = categoryData || []
      return v
    })
    newOptions.series = series
    return newOptions
  }, [defaultOptions, filTrend, noShow, default_xAxis])

  return (
    <>
      <ul className={style.trendChart_legend}>
        {fil_trend.map((v) => {
          if (!noShow[v.name]) {
          }
          return (
            <li
              key={v.dataIndex}
              className={style.trendChart_legend_li}
              onClick={() => {
                setNoShow({ ...noShow, [v.name]: !noShow[v.name] })
              }}
            >
              <span style={{ color: noShow[v.name] ? '#d1d5db' : v.color }}>
                {getSvgIcon(v.type === 'bar' ? 'barLegend' : 'legendIcon')}
              </span>
              <span> {tr(v.title)}</span>
            </li>
          )
        })}
      </ul>
      <Echarts options={{ ...options }} />
    </>
  )
})
