import { useEffect, useRef } from 'react'
import { init, dispose } from 'klinecharts'
import { observer } from 'mobx-react'
import analysisStore from '@/store/modules/analysis'
import filscanStore from '@/store/modules/filscan'

export default observer(
  ({
    loadData,
    active,
  }: {
    active: string
    loadData: (active: string, time: string | number) => void
  }) => {
    const chartContainerRef = useRef<any>(null)
    const chartRef = useRef<any>(null)
    const { chartKOptions } = analysisStore
    const { theme, lang } = filscanStore
    const referData = useRef<any>(null)

    useEffect(() => {
      chartRef.current = init(chartContainerRef.current)
      chartRef.current.createIndicator('VOL', false, {
        height: 80,
      }) as string
      chartRef.current?.createIndicator('MA', false, {
        id: 'candle_pane',
      })
      return () => {
        dispose(chartRef.current)
      }
    }, [])

    useEffect(() => {
      if (chartRef.current) {
        referData.current = false
        chartRef.current?.loadMore((timestamp: any, data: any) => {
          setTimeout(() => {
            const last_time = timestamp / 1000
            referData.current = true
            loadData(active, last_time)
          }, 2000)
        })
      }
    }, [active, chartRef.current])
    useEffect(() => {
      const show_language = lang === 'zh' ? 'zh-CN' : 'en-US'
      chartRef.current && chartRef.current.setLocale(show_language)
    }, [lang])

    useEffect(() => {
      chartRef.current && chartRef.current.setStyles(theme)
    }, [theme])

    useEffect(() => {
      createAndRenderChart(chartContainerRef.current)
    }, [chartKOptions])

    const createAndRenderChart = (chartContainerRef: any) => {
      const { dataValues } = chartKOptions
      if (dataValues && dataValues.length > 0) {
        if (referData.current) {
          chartRef.current.applyMoreData(dataValues, true)
        } else {
          chartRef.current.applyNewData(dataValues)
        }
      }
    }
    return (
      <div ref={chartContainerRef} style={{ width: '100%', height: '100%' }} />
    )
  },
)
