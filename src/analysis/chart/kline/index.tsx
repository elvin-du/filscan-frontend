import { useEffect, useRef } from 'react'
import {
  init,
  registerLocale,
  dispose,
  TooltipShowRule,
  TooltipShowType,
  CandleTooltipCustomCallbackData,
} from 'klinecharts'
import { observer } from 'mobx-react'
import analysisStore from '@/store/modules/analysis'
import filscanStore from '@/store/modules/filscan'
import { formatDateTime } from '@/utils'

export default observer(
  ({
    loadData,
    active,
  }: {
    active: string
    loadData: (active: string, time: string | number, type?: string) => void
  }) => {
    const chartContainerRef = useRef<any>(null)
    const chartRef = useRef<any>(null)
    const { chartKOptions } = analysisStore
    const { theme, lang } = filscanStore
    const referData = useRef<any>(null)

    useEffect(() => {
      registerLocale('zh-CN', {
        time: '时间：',
        open: '开：',
        high: '高：',
        low: '低：',
        close: '收：',
        volume: '成交量：',
        turnover: '成交額：',
        Increase: '波幅：',
        change: '涨幅：',
      })
      // registerLocale('en-US', {
      //   time: '',
      //   open: '开：',
      //   high: '高：',
      //   low: '低：',
      //   close: '收：',
      //   volume: '成交量：',
      //   turnover: '成交額：',
      //   Increase: '波幅：',
      //   change: '涨幅：',
      // })
      referData.current = ''
      const options: any = {}
      chartRef.current = init(chartContainerRef.current, options)
      chartRef.current.createIndicator('VOL', false, {
        height: 80,
      }) as string
      chartRef.current?.createIndicator('MA', false, {
        id: 'candle_pane',
      })
      chartRef.current?.setStyles(
        getTooltipOptions(
          'standard' as TooltipShowType,
          'always' as TooltipShowRule,
          'always' as TooltipShowRule,
        ),
      )

      const timer = setInterval(async () => {
        referData.current = 'update'
        const timeValue = Math.floor(new Date().getTime() / 1000)
        loadData(active, timeValue, 'update')
      }, 30000)
      return () => {
        clearInterval(timer)
        dispose(chartRef.current)
      }
    }, [active])

    function getTooltipOptions(
      candleShowType: TooltipShowType,
      candleShowRule: TooltipShowRule,
      indicatorShowRule: TooltipShowRule,
    ) {
      return {
        candle: {
          tooltip: {
            showType: candleShowType,
            showRule: candleShowRule,
            custom: (data: CandleTooltipCustomCallbackData) => {
              const { prev, current } = data
              const prevClose = prev?.close ?? current.open
              // const change = ((current.close - prevClose) / prevClose) * 100
              const change = Number(
                ((current.close - current.open) / current.open) * 100,
              )
              const increase = Number(
                ((current.high - current.low) / current.open) * 100,
              )
              //涨幅 = (收盘价 - 开盘价) / 开盘价 * 100
              //波幅 = (最高价 - 最低价) / 最低价 * 100
              const showChange = current.close - current.open //绿涨红跌
              return [
                {
                  title: 'time',
                  value: {
                    text: formatDateTime(current.timestamp / 1000),
                    color: 'gary',
                  },
                },
                {
                  title: 'open',
                  value: {
                    text: current.open.toFixed(3),
                    color: showChange < 0 ? '#EF5350' : '#26A69A',
                  },
                },
                {
                  title: 'close',
                  value: {
                    text: current.close.toFixed(3),
                    color: showChange < 0 ? '#EF5350' : '#26A69A',
                  },
                },
                {
                  title: 'high',
                  value: {
                    text: current.high.toFixed(3),
                    color: showChange < 0 ? '#EF5350' : '#26A69A',
                  },
                },
                {
                  title: 'low',
                  value: {
                    text: current.low.toFixed(3),
                    color: showChange < 0 ? '#EF5350' : '#26A69A',
                  },
                },
                {
                  title: 'change',
                  value: {
                    text: `${change.toFixed(2)}%`,
                    color: change < 0 ? '#EF5350' : '#26A69A',
                  },
                },
                {
                  title: 'Increase',
                  value: {
                    text: `${increase.toFixed(2)}%`,
                    color: increase < 0 ? '#EF5350' : '#26A69A',
                  },
                },
              ]
            },
          },
        },
        indicator: {
          tooltip: {
            showRule: indicatorShowRule,
          },
        },
      }
    }

    useEffect(() => {
      if (chartRef.current) {
        chartRef.current?.loadMore((timestamp: any, data: any) => {
          setTimeout(() => {
            const last_time = timestamp / 1000
            referData.current = 'loadMore'
            loadData(active, last_time)
          }, 2000)
        })
      }
    }, [chartRef.current])

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
      const { dataValues, updateInfo } = chartKOptions
      if (dataValues && dataValues.length > 0) {
        if (referData.current && referData.current === 'loadMore') {
          chartRef.current.applyMoreData(dataValues, true)
        } else if (
          referData.current &&
          referData.current === 'update' &&
          updateInfo
        ) {
          chartRef.current.updateData(updateInfo)
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
