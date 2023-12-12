import { formatDateTime, formatTime } from '@/utils'
import axios from 'axios'
import { cloneDeep } from 'lodash'
import { makeObservable, observable, runInAction } from 'mobx'

const market_data = {
  value: 3.14,
  change_value: '1.9 %',
  rmb_value: '¥24.82',
  market_value: 154400000000,
  circulation: 454383283,
  proportion: '24.52%',
  supply: 2000000000,
  market_total: 6678909999900000,
  locked: 1354383283,
  locked_ratio: '70.11%',
  burn: 387907533500,
  burn_ratio: '1.54%',
  '24_quantity': 3024786000000,
  '24_amount': 1023467234674321,
  turnover_rate: '23.6%',
  quantity_ratio: 1.13,
}

const upColor = '#00da3c'
const downColor = '#ec0000'

class Analysis {
  marketData: Record<string, any>
  chartKOptions: Record<string, any>
  dataZoom: [number, number]
  constructor() {
    this.marketData = market_data
    this.chartKOptions = {}
    this.dataZoom = [98, 100]
    //  this.chartData = chart_data
    makeObservable(this, {
      marketData: observable,
      chartKOptions: observable,
      dataZoom: observable,
    })
  }

  splitData(rawData: Array<any>) {
    let categoryData = []
    let values = []
    let dataValues = []
    let bottomValue = []
    let volumes = []
    let maxNumber = 0
    let minNumber = 0
    for (let i = 0; i < rawData.length; i++) {
      const [time, high, open, low, close, other, volume] = rawData[i]
      categoryData.push(time) //time
      values.push([open, close, low, high]) //开 收 低 高
      volumes.push([i, volume, open > close ? 1 : -1])
      dataValues.push({
        time,
        open,
        close,
        low,
        high,
        // volume: volume ? Number(volume) : 0,
      })
      bottomValue.push({
        volume: volume,
        time,
      })
    }
    return {
      categoryData: categoryData,
      values: values,
      volumes: volumes,
      dataValues: dataValues,
      bottomValue: bottomValue,
      max: maxNumber,
      min: minNumber,
    }
  }

  calculateMA(dayCount: number, data: any) {
    var result = []
    for (var i = 0, len = data.values.length; i < len; i++) {
      if (i < dayCount) {
        result.push('-')
        continue
      }
      var sum = 0
      for (var j = 0; j < dayCount; j++) {
        sum += data.values[i - j][1]
      }
      result.push(+(sum / dayCount).toFixed(3))
    }
    return result
  }

  calculateMovingAverage = (data: Array<any>, period: number) => {
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
  async getData() {
    const result: any = await axios.get(
      'https://dncapi.bostonteapartyevent.com/api/v1/kline/market?tickerid=binance_fil_usdt&period=1440&reach=1702270907&since=&utc=0&webp=1',
    )
    //[time,height,open,lower,close]
    const data = this.splitData(result?.data?.data?.kline || [])
    const newOptions: any = {}

    newOptions.xAxisData = data.categoryData
    newOptions.series = [
      {
        name: 'volume',
        type: 'candlestick',
        data: data.values,
      },
      {
        name: 'MA5',
        type: 'line',
        color: 'rgba(255, 155, 19, 1)',
        data: this.calculateMA(5, data),
      },
      {
        name: 'MA10',
        type: 'line',
        color: 'rgba(238, 239, 241, 1)',
        data: this.calculateMA(10, data),
      },
      {
        name: 'MA20',
        type: 'line',
        color: 'rgba(28, 106, 253, 1)',
        data: this.calculateMA(20, data),
      },
      {
        name: 'MA30',
        type: 'line',
        color: 'rgba(51, 190, 83, 1)',
        data: this.calculateMA(30, data),
      },
    ]
    newOptions.bottomSeries = [
      {
        name: 'MA5',
        type: 'line',
        data: this.calculateMA(5, data),
      },
      {
        name: 'MA10',
        type: 'line',
        data: this.calculateMA(10, data),
      },
      {
        name: 'Volume',
        type: 'bar',
        data: data.volumes,
      },
    ]
    newOptions.dataValues = data.dataValues
    newOptions.bottomValue = data.bottomValue
    newOptions.ma5Data = this.calculateMovingAverage(data.dataValues, 5)
    newOptions.ma10Data = this.calculateMovingAverage(data.dataValues, 10)
    newOptions.ma30Data = this.calculateMovingAverage(data.dataValues, 30)
    newOptions.ma60Data = this.calculateMovingAverage(data.dataValues, 60)

    runInAction(() => {
      this.chartKOptions = newOptions
    })
  }

  setDataZoom(params: [number, number]) {
    runInAction(() => {
      this.dataZoom = params
    })
  }
}

const analysisStore = new Analysis()

export default analysisStore
