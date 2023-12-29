import { convertStringToArray, formatDateTime, formatTime } from '@/utils'
import axios from 'axios'
import { cloneDeep } from 'lodash'
import { makeObservable, observable, runInAction } from 'mobx'

class Analysis {
  marketData: Record<string, any>
  chartKOptions: Record<string, any>
  filValueList: Record<string, any>
  filTrend: Record<string, any>
  constructor() {
    this.marketData = {}
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
    for (let i = 0; i < rawData.length; i++) {
      const [time, high, open, low, close, other, volume] = rawData[i]
      //categoryData.push(time) //time
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
    }
  }

  async getData() {
    const result: any = await axios.get(
      'https://dncapi.bostonteapartyevent.com/api/v1/kline/market?tickerid=binance_fil_usdt&period=1440&reach=1702270907&since=&utc=0&webp=1',
    )
    const data = this.splitData(result?.data?.data?.kline || [])
    const newOptions: any = {}
    newOptions.dataValues = data.dataValues
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
