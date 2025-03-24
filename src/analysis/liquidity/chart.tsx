import Echarts from '@/components/echarts'
import { Translation } from '@/components/hooks/Translation'
import { liquidity_chart } from '@/contents/analysis'
import filscanStore from '@/store/modules/filscan'
import { getSvgIcon } from '@/svgsIcon'
import { getColor, get_xAxis } from '@/utils/echarts'
import { useMemo, useState } from 'react'
import style from './index.module.scss'
import { observer } from 'mobx-react'
import analysisStore from '@/store/modules/analysis'

export default observer(() => {
  const { theme } = filscanStore
  const { fileNetworkTrend } = analysisStore
  const { tr } = Translation({ ns: 'analysis' })
  const [noShow, setNoShow] = useState<Record<string, boolean>>({})

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
        left: 80,
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
          // splitNumber: 6,
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
      tooltip: {
        //@ts-ignore
        position: function (pos, params, dom, rect, size) {
          // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
          var obj = { top: 80 }
          //@ts-ignore
          obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5
          return undefined
        },
        trigger: 'axis',
        backgroundColor: color.toolbox,
        borderColor: 'transparent',
        textStyle: {
          color: '#ffffff',
        },
        formatter(v: any) {
          var result = v[0].data.showTime
          v.forEach((item: any) => {
            if (item.data) {
              result +=
                '<br/>' +
                item.marker +
                tr(item.seriesName) +
                ': ' +
                item.data.value +
                ' FIL'
            }
          })
          return result
        },
      },
    }

    return options
  }, [theme])

  const newOptions = useMemo(() => {
    const seriesObj = fileNetworkTrend.seriesObj
    const series: Array<any> = []
    if (fileNetworkTrend.date && fileNetworkTrend.date.length > 0) {
      liquidity_chart.forEach((item: any) => {
        if (!noShow[item.dataIndex]) {
          series.push({
            type: 'line',
            data: seriesObj[item.dataIndex],
            key: item.dataIndex,
            name: item.title,
            symbol: 'circle',
            smooth: true,
            itemStyle: {
              color: item.color,
            },
          })
        }
      })
    }

    return {
      ...defaultOptions,
      xAxis: {
        ...default_xAxis,
        data: fileNetworkTrend.date || [],
      },
      series,
    }
  }, [defaultOptions, fileNetworkTrend, noShow])
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
})
