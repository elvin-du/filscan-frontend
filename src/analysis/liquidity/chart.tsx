import Echarts from '@/components/echarts'
import { Translation } from '@/components/hooks/Translation'
import { liquidity_chart, time_options } from '@/contents/analysis'
import filscanStore from '@/store/modules/filscan'
import { getSvgIcon } from '@/svgsIcon'
import { getColor, get_xAxis } from '@/utils/echarts'
import { useMemo, useState } from 'react'
import style from './index.module.scss'
import Segmented from '@/packages/segmented'

export default () => {
  const { theme } = filscanStore
  const { tr } = Translation({ ns: 'analysis' })
  const [noShow, setNoShow] = useState<Record<string, boolean>>({})
  const result: any = {
    total: [120, 132, 101, 134, 90, 230, 210],
    freed: [220, 182, 191, 234, 290, 330, 310],
    pledge: [150, 232, 201, 154, 190, 330, 410],
    destruction: [320, 332, 301, 334, 390, 330, 320],
  }
  const color = useMemo(() => {
    return getColor(theme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme])
  const default_xAxis = useMemo(() => {
    return get_xAxis(theme, false)
  }, [theme])

  const defaultOptions = useMemo(() => {
    let options = {
      grid: {
        top: 30,
        left: 30,
        right: 20,
        bottom: 20,
      },
      yAxis: [
        {
          type: 'value',
          position: 'left',
          scale: true,
          nameTextStyle: {
            color: color.textStyle,
          },
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              color: color.labelColor,
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
              color: color.splitLine,
            },
          },
        },
      ],
      legend: {
        show: false,
      },
      //       tooltip: {
      //         //@ts-ignore
      //         position: function (pos, params, dom, rect, size) {
      //           // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
      //           var obj = { top: 80 }
      //           //@ts-ignore
      //           obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5
      //           return undefined
      //         },
      //         trigger: 'axis',
      //         backgroundColor: color.toolbox,
      //         borderColor: 'transparent',
      //         textStyle: {
      //           color: '#ffffff',
      //         },
      //         formatter(v: any) {
      //           var result = v[0].data.showTime
      //           v.forEach((item: any) => {
      //             if (item.data) {
      //               result +=
      //                 '<br/>' +
      //                 item.marker +
      //                 tr(item.seriesName) +
      //                 ': ' +
      //                 item.data.amount +
      //                 item.data.unit
      //             }
      //           })
      //           return result
      //         },
      //       },
    }

    return options
  }, [theme])

  const newOptions = useMemo(() => {
    const series: any = []
    liquidity_chart.forEach((item: any) => {
      if (!noShow[item.dataIndex]) {
        series.push({
          type: item.type,
          data: result[item.dataIndex],
          key: item.dataIndex,
          name: item.dataIndex,
          yAxisIndex: item.yIndex,
          symbol: 'circle',
          smooth: true,
          itemStyle: {
            color: item.color,
          },
        })
      }
    })
    return {
      ...defaultOptions,
      xAxis: {
        ...default_xAxis,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      series,
    }
  }, [defaultOptions, result, noShow])
  return (
    <>
      <ul className={style.liquidity_chart_legend}>
        {liquidity_chart.map((v) => {
          return (
            <li
              key={v.dataIndex}
              onClick={() => {
                setNoShow({ ...noShow, [v.dataIndex]: !noShow[v.dataIndex] })
              }}
            >
              <span
                style={{ color: noShow[v.dataIndex] ? '#d1d5db' : v.color }}
              >
                {getSvgIcon(v.type === 'bar' ? 'barLegend' : 'legendIcon')}
              </span>
              <span>{tr(v.title)}</span>
            </li>
          )
        })}
      </ul>
      <Echarts options={newOptions} />
    </>
  )
}
