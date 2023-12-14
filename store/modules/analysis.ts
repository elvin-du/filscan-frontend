import { convertStringToArray, formatDateTime, formatTime } from '@/utils'
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
class Analysis {
  marketData: Record<string, any>
  chartKOptions: Record<string, any>
  filValueList: Record<string, any>
  filTrend: Record<string, any>
  constructor() {
    this.marketData = market_data
    this.chartKOptions = {}
    this.filValueList = []
    this.filTrend = {}
    makeObservable(this, {
      marketData: observable,
      chartKOptions: observable,
      filValueList: observable,
      filTrend: observable,
    })
  }

  splitData(rawData: Array<any>) {
    // let categoryData = []
    let dataValues = []
<<<<<<< HEAD
    let bottomValue = []
    let volumes = []
    let maxNumber = 0
    let minNumber = 0
    for (let i = 0; i < rawData.length; i++) {
      const [time, high, open, low, close, other, volume] = rawData[i]
      categoryData.push(time) //time
      values.push([open, close, low, high]) //开 收 低 高
      volumes.push([i, volume, open > close ? 1 : -1])
=======
    for (let i = 0; i < rawData.length; i++) {
      const [time, high, open, low, close, other, volume] = rawData[i]
      //categoryData.push(time) //time
>>>>>>> 1d0a0c74 (feat: update trend)
      dataValues.push({
        time,
        open,
        close,
        low,
        high,
        // volume: volume ? Number(volume) : 0,
      })
    }
    return {
      //categoryData: categoryData,
      dataValues: dataValues,
<<<<<<< HEAD
      bottomValue: bottomValue,
      max: maxNumber,
      min: minNumber,
=======
>>>>>>> 1d0a0c74 (feat: update trend)
    }
  }

  async getData() {
    const result: any = await axios.get(
      'https://dncapi.bostonteapartyevent.com/api/v1/kline/market?tickerid=binance_fil_usdt&period=1440&reach=1702270907&since=&utc=0&webp=1',
    )
    const data = this.splitData(result?.data?.data?.kline || [])
    const newOptions: any = {}
<<<<<<< HEAD

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

=======
    newOptions.dataValues = data.dataValues
>>>>>>> 1d0a0c74 (feat: update trend)
    runInAction(() => {
      this.chartKOptions = newOptions
    })
  }

  //trend chart
  splitTrendData(data: Array<any>) {
    let categoryData = []
    let usdData = []
    let btcData = []
    let marketData = []
    let volumeData = []
    let maxNum = 0
    let minNum
    let volume_max = 0
    let volume_min
    let btc_max = 0
    let btc_min
    for (let i = 0; i < data.length; i++) {
      const [time, usd, btc, market, volumeValue] = data[i]
      const marketValue = market / Math.pow(10, 8)
      const volume = volumeValue / Math.pow(10, 8)
      categoryData.push(formatDateTime(Number(time) / 1000))
      usdData.push(usd)
      btcData.push(btc)
      marketData.push(marketValue) //亿
      volumeData.push(volume)
      maxNum = Math.max(maxNum, Number(usd), Number(marketValue))
      minNum = minNum
        ? Math.min(minNum, Number(usd), Number(marketValue))
        : Math.min(Number(usd), Number(marketValue))
      volume_max = Math.max(volume_max, Number(volume))
      volume_min = volume_min
        ? Math.min(volume_min, Number(volume))
        : Number(volume)
      btc_max = Math.max(btc_max, Number(marketValue))
      btc_min = btc_min
        ? Math.min(btc_min, Number(marketValue))
        : Number(marketValue)
    }
    return {
      categoryData,
      usd: usdData,
      btc: btcData,
      market: marketData,
      volume: volumeData,
      usdNum: {
        max: maxNum,
        min: minNum,
      },
      btcNum: {
        max: btc_max,
        min: btc_min,
      },
      volumeNum: {
        max: volume_max,
        min: volume_min,
      },
    }
  }
  async getFilValues() {
    const result: any = await axios.get(
      'https://dncapi.bostonteapartyevent.com/api/coin/coinchange?code=filecoinnew&webp=1',
    )
    this.getFilTrend()
    runInAction(() => {
      this.filValueList = result.data?.data
    })
  }

  async getFilTrend() {
    const result: any = await axios.get(
      'https://dncapi.bostonteapartyevent.com/api/coin/web-charts?code=filecoinnew&type=all&webp=1',
    )
    const data: string = result?.data.value

    if (data) {
      const dataArr = convertStringToArray(data)
      const newOptions = this.splitTrendData(dataArr)
      // const yIndexNum = newOptions.usdNum.max / 4
      // console.log('-------eee', newOptions, yIndexNum)

      runInAction(() => {
        this.filTrend = newOptions
      })
    }
  }
}

const analysisStore = new Analysis()

export default analysisStore
