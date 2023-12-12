import React, { useEffect, useMemo, useRef } from 'react'
import { createChart } from 'lightweight-charts'
import { observer } from 'mobx-react'
import analysisStore from '@/store/modules/analysis'
import { getColor } from '@/utils/echarts'
import filscanStore from '@/store/modules/filscan'
const ChartComponent = () => {
  const chartContainerRef = useRef<any>(null)
  const { chartKOptions } = analysisStore
  const { theme } = filscanStore
  const colors = getColor(theme)
  const chartOptions: any = useMemo(() => {
    return {
      width: 1200,
      height: 300,
      layout: {
        textColor: colors.textStyle,
        background: { type: 'solid', color: 'white' },
      },
      timeScale: {
        borderColor: colors.lineStyle, // 修改坐标轴线的颜色
      },
      rightPriceScale: {
        borderColor: colors.lineStyle, // 修改右侧y轴线的颜色
      },
    }
  }, [])
  useEffect(() => {
    createAndRenderChart(chartContainerRef.current)
  }, [chartKOptions])

  const calculateMovingAverage = (data: Array<any>, period: number) => {
    const movingAverageData = []
    for (let i = period - 1; i < data.length; i++) {
      let sum = 0
      for (let j = i - period + 1; j <= i; j++) {
        sum += data[j].close
      }
      const average = sum / period
      movingAverageData.push({ time: data[i].time, value: average })
    }

    return movingAverageData
  }

  const createAndRenderChart = (chartContainerRef: any) => {
    const { dataValues } = chartKOptions
    if (dataValues) {
      const chart = createChart(chartContainerRef, chartOptions)
      const volumeSeries = chart.addHistogramSeries({
        color: 'rgba(0, 150, 136, 0.4)',
        priceFormat: { type: 'volume' },
      })
      const candlestickSeries = chart.addCandlestickSeries({
        upColor: '#26a69a',
        downColor: '#ef5350',
        borderVisible: false,
        wickUpColor: '#26a69a',
        wickDownColor: '#ef5350',
      })
      console.log('====344', dataValues)
      candlestickSeries.setData(dataValues)
      // volumeSeries.setData(dataValues)

      // Calculate MA5
      const ma5Series = chart.addLineSeries({
        color: 'blue',
        lineWidth: 1,
        crosshairMarkerVisible: false,
        lastValueVisible: false,
        priceLineVisible: false,
      })
      const ma5Data = calculateMovingAverage(dataValues, 5)
      console.log('----33', dataValues, ma5Data)
      ma5Series.setData(ma5Data)

      // Calculate MA10
      const ma10Series = chart.addLineSeries({
        color: 'green',
        lineWidth: 1,
        crosshairMarkerVisible: false,
        lastValueVisible: false,
        priceLineVisible: false,
      })
      const ma10Data = calculateMovingAverage(dataValues, 10)
      ma10Series.setData(ma10Data)
      chart.timeScale().fitContent()
    }
  }

  return <div ref={chartContainerRef} />
}

export default observer(ChartComponent)
