import {
  convertStringToArray,
  formatDateTime,
  formatFil,
  formatTime,
} from '@/utils'
import axios from 'axios'
import { cloneDeep } from 'lodash'
import { makeObservable, observable, observe, runInAction } from 'mobx'
import { axiosServer } from '../axiosServer'
import {
  fileActive,
  fileBase,
  fileNetwork,
  fileNetworkTrend,
  fileTokenTrend,
  fileTokens,
  fileTrend,
  fileVestList,
  filecoinValue,
  fundAddress,
  fundInfo,
  fundTransaction,
  marketKline,
} from '../ApiUrl'

class Analysis {
  marketData: Record<string, any>
  chartKOptions: Record<string, any>
  filValueList: Record<string, any>
  filTrend: Record<string, any>
  fundAddrData: Record<string, any>
  fundInfo: Record<string, any>
  fundTrans: Record<string, any>
  fileNetwork: Record<string, any>
  fileNetworkTrend: Record<string, any>
  fileTokensTrend: Record<string, any>
  fileTokens: Record<string, any>
  fileActiveList: any[]
  fundList: any
  releaseData: any[]
  constructor() {
    this.marketData = {}
    this.chartKOptions = {}
    this.filValueList = {}
    this.fileNetwork = {}
    this.fileNetworkTrend = {}
    this.filTrend = {}
    this.fundAddrData = {}
    this.fundInfo = {}
    this.fundTrans = {}
    this.fileTokens = {}
    this.fileActiveList = []
    this.fileTokensTrend = {}
    this.releaseData = []
    this.fundList = new Set()
    makeObservable(this, {
      marketData: observable,
      chartKOptions: observable,
      filValueList: observable,
      filTrend: observable,
      fileNetwork: observable,
      fileNetworkTrend: observable,
      fundAddrData: observable,
      fundInfo: observable,
      fundTrans: observable,
      fileTokens: observable,
      fileActiveList: observable,
      fileTokensTrend: observable,
      releaseData: observable,
    })
  }

  async getFilBase() {
    const result: any = await axiosServer(fileBase)
    runInAction(() => {
      this.marketData = result.data || {}
    })
  }

  async getNetWork() {
    const result: any = await axiosServer(fileNetwork)
    runInAction(() => {
      this.fileNetwork = result.data || {}
    })
  }

  async getNetWorkTrend(interval: string) {
    const result: any = await axiosServer(fileNetworkTrend, { interval })
    const fileNetworkTrendResult = result?.data?.list || []
    const date: Array<string> = []
    const seriesObj: any = {
      circulating: [],
      produced: [],
      locked: [],
      burn: [],
    }
    if (fileNetworkTrendResult && fileNetworkTrendResult.length > 0) {
      fileNetworkTrendResult.forEach((value: any) => {
        const {
          epoch,
          circulating, //合约交易
          produced,
          locked,
          burn,
        } = value
        date.push(epoch)
        //amount
        seriesObj.circulating.push({
          value: formatFil(circulating),
          showTime: epoch,
          unit: '',
        })

        seriesObj.produced.push({
          value: formatFil(produced),
          showTime: epoch,
          unit: '',
        })
        seriesObj.locked.push({
          value: formatFil(locked),
          showTime: epoch,
          unit: '',
        })
        seriesObj.burn.push({
          value: formatFil(burn),
          showTime: epoch,
          unit: '',
        })
      })
    }

    runInAction(() => {
      this.fileNetworkTrend = {
        date,
        seriesObj,
      }
    })
  }

  async getReleaseDate() {
    const result: any = await axiosServer(fileVestList)
    runInAction(() => {
      this.releaseData = result?.data?.account_list || []
    })
  }

  async getTokens() {
    const result: any = await axiosServer(fileTokens)
    runInAction(() => {
      this.fileTokens = result.data || {}
    })
  }

  //fileTokenTrend
  async getTokensTrend(interval: string) {
    const result: any = await axiosServer(fileTokenTrend, { interval })
    const fileTokensTrend = result.data || {}
    const date: Array<string> = []
    const seriesObj: any = {
      top10rate: [],
      top20rate: [],
      top50rate: [],
      top100rate: [],
    }
    if (fileTokensTrend && fileTokensTrend.length > 0) {
      fileTokensTrend.forEach((value: any) => {
        const {
          timpstamp,
          top10rate, //合约交易
          top20rate,
          top50rate,
          top100rate,
        } = value
        date.push(timpstamp)
        //amount
        seriesObj.top10rate.push({
          value: top10rate,
          showTime: timpstamp,
          unit: '',
        })

        seriesObj.top20rate.push({
          value: top20rate,
          showTime: timpstamp,
          unit: '',
        })
        seriesObj.top50rate.push({
          value: top50rate,
          showTime: timpstamp,
          unit: '',
        })
        seriesObj.top100rate.push({
          value: top100rate,
          showTime: timpstamp,
          unit: '',
        })
      })
    }

    runInAction(() => {
      this.fileTokensTrend = {
        date,
        seriesObj,
      }
    })
  }

  async getActiveList() {
    const result: any = await axiosServer(fileActive)
    runInAction(() => {
      this.fileActiveList = result.data || []
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

<<<<<<< HEAD
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
=======
  async getKline(payload: any) {
    const result: any = await axiosServer(marketKline, payload)
    const newResult =
      result?.data && (JSON.parse(result?.data?.data || '{}') as any)
    if (newResult.data) {
      const data = this.splitData(newResult.data?.kline || [])
      const newOptions: any = {}
      newOptions.dataValues = data.dataValues
      runInAction(() => {
        this.chartKOptions = newOptions
      })
    }
>>>>>>> 624c6864 (feat: update kline data)
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
    const result: any = await axiosServer(filecoinValue, {
      code: 'filecoinnew',
      webp: 1,
    })
    const newResult =
      result?.data && (JSON.parse(result?.data?.data || '{}') as any)
    runInAction(() => {
      this.filValueList = newResult?.data || {}
    })
  }

  async getFilTrend(payload: any) {
    const result: any = await axiosServer(fileTrend, payload)
    const newResult =
      result?.data && (JSON.parse(result?.data?.data || '{}') as any)
    const data: string = newResult.value
    if (data) {
      const dataArr = convertStringToArray(data)
      const newOptions = this.splitTrendData(dataArr)
      runInAction(() => {
        this.filTrend = newOptions
      })
    }
    return true
  }

  calcSize = (level: number, value: string) => {
    let baseSize = 80 //最大的size 等差20
    if (!Number(value)) return baseSize
    if (level) {
      baseSize = baseSize - level * 20
    }
    return Math.floor(Number(baseSize) * Number(value))
  }

  calcOrigin = (type?: string) => {
    return type === 'x'
      ? Math.abs(Math.ceil(Math.random() * 300))
      : Math.ceil(Math.random() * 300)
  }
  async getFundAddress(payload: any) {
    const result = await axiosServer(fundAddress, { ...payload })
    const fundAddrData = result.data
    let seriesData: Array<any> = []
    let linkData: Array<any> = []
    if (fundAddrData && fundAddrData?.nodes?.length > 0) {
      fundAddrData.nodes.forEach((node: any) => {
        const { level, address, proportion_with_father_node } = node
        const size = this.calcSize(level, proportion_with_father_node)
        const obj = {
          name: address,
          seriesName: address,
          symbolSize: size,
          x: !!level ? this.calcOrigin('x') : 150, //1~10 之间随机数
          y: !!level ? this.calcOrigin('y') : 100, //10～100之间随机数
          itemStyle: !!level
            ? {
                color: 'rgba(95,219,194,0.2)',
                borderColor: '#5FDBC2',
              }
            : {
                color: 'rgba(28,106,253,0.2)',
                borderColor: '#1C6AFD',
              },
          ...node,
        }
        seriesData.push(obj)
      })

      fundAddrData.edges.forEach((linkNode: any) => {
        const linkObj = {
          source: linkNode.from,
          target: linkNode.to,
          symbolSize: [5, 20],
          lineStyle: {
            width: 0.5,
            color: 'rgba(74, 74, 74, 1)',
            curveness: 0.2,
            type: 'solid',
          },
        }
        linkData.push(linkObj)
      })
    }
    runInAction(() => {
      this.fundAddrData = {
        series: [
          {
            type: 'graph',
            layout: 'none',
            symbolSize: 50,
            roam: true,
            label: {
              show: false,
              emphasis: {
                show: false, // 将 show 属性设置为 false
              },
            },
            edgeSymbol: ['circle', 'none'],
            edgeSymbolSize: [4, 10],
            data: seriesData,
            links: linkData,
            force: {
              // 节点排斥力设置
              repulsion: 200,
              gravity: 0.01,
              edgeLength: 200,
            },
            lineStyle: {
              opacity: 0.9,
              width: 2,
              curveness: 0.3,
            },
          },
        ],
      }
    })
  }

  async getFundAddrInfo(payload: any) {
    const result = await axiosServer(fundInfo, { ...payload })
    runInAction(() => {
      this.fundInfo = {
        address: payload.address,
        ...(result?.data || {}),
      }
    })
  }
  async getFundTransaction(address: string) {
    const result = await axiosServer(fundTransaction, { address })
    runInAction(() => {
      this.fundTrans = {
        address: address,
        ...(result?.data || {}),
      }
    })
  }
}

const analysisStore = new Analysis()

export default analysisStore
