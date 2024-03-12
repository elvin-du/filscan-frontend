import { convertStringToArray, formatDateTime, formatFil } from '@/utils'
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
  fundSvg: any
  select: string
  constructor() {
    this.select = ''
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
      select: observable,
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
          block_time,
          circulating, //合约交易
          produced,
          locked,
          burn,
        } = value
        const time = formatDateTime(block_time, 'YYYY-MM-DD')
        date.push(time)
        //amount
        seriesObj.circulating.push({
          value: formatFil(circulating),
          showTime: time,
          unit: '',
        })

        seriesObj.produced.push({
          value: formatFil(produced),
          showTime: time,
          unit: '',
        })
        seriesObj.locked.push({
          value: formatFil(locked),
          showTime: time,
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
    for (let i = 0; i < rawData.length; i++) {
      const [time, high, open, low, close, other, volume] = rawData[i]
      //categoryData.push(time) //time
      // const change = Number(((close - open) / open) * 100).toFixed(2)
      dataValues.push({
        timestamp: time * 1000,
        open,
        close,
        low,
        high,
        volume: Number(volume),
        // turnover: other,
      })
    }
    return {
      //categoryData: categoryData,
      dataValues: dataValues,
    }
  }

  async getKline(payload: any) {
    const result: any = await axiosServer(marketKline, payload)
    const newResult =
      result?.data && (JSON.parse(result?.data?.data || '{}') as any)
    if (newResult.data) {
      const data = this.splitData(cloneDeep(newResult.data?.kline || []))
      const newOptions: any = {}
      const updateInfo =
        data?.dataValues && data?.dataValues[data.dataValues?.length - 1]
      newOptions.dataValues = data.dataValues
      newOptions.data = newResult.data?.kline || []
      newOptions.updateInfo = updateInfo
      runInAction(() => {
        this.chartKOptions = newOptions
      })
    }
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
      baseSize = (baseSize - level * 20) * Number(value)
    } else {
      baseSize = Math.floor(Number(baseSize) * Number(value))
    }
    return baseSize < 8 ? 8 : baseSize
  }

  calcOrigin = (type?: string) => {
    return type === 'x'
      ? Math.abs(Math.ceil(Math.random() * 300))
      : Math.ceil(Math.random() * 300)
  }
  async getFundAddress(payload: any) {
    const result = await axiosServer(fundAddress, { ...payload })
    const fundAddrData = result.data || []
    let seriesData: Array<any> = []
    let linkData: Array<any> = []
    let nodesObj: any = {}
    if (fundAddrData && fundAddrData?.nodes?.length > 0) {
      fundAddrData.nodes.forEach((node: any) => {
        const { level, address, tag, proportion_with_father_node } = node
        const size = this.calcSize(level, proportion_with_father_node)
        let itemColor: Record<string, any> = {}
        let itemSelect: Record<string, any> = {}
        nodesObj[address] = true
        if (!!level) {
          itemColor = {
            color: 'rgba(95,219,194,0.2)',
            borderColor: '#5FDBC2',
          }
          itemSelect = {
            color: 'rgba(95,219,194,0.8)',
            borderColor: '#5FDBC2',
          }
        } else {
          itemColor = {
            color: 'rgba(28,106,253,0.2)',
            borderColor: '#1C6AFD',
          }
          itemSelect = {
            color: 'rgba(28,106,253,0.8)',
            borderColor: '#1C6AFD',
          }
        }
        if (node.tag !== '') {
          itemColor = {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#A2E7A2',
                },
                {
                  offset: 0.61,
                  color: '#16CDE5',
                },
                {
                  offset: 1,
                  color: '#1764FF',
                },
              ],
              globalCoord: false,
            },
          }
          itemSelect = {
            borderWidth: 2,
            borderColor: '#ffffff',
          }
        }
        const obj = {
          name: address,
          seriesName: address,
          symbolSize: size,
          x: !!level ? this.calcOrigin('x') : 150, //1~10 之间随机数
          y: !!level ? this.calcOrigin('y') : 100, //10～100之间随机数
          itemStyle: {
            ...itemColor,
          },
          label: {
            show: !!node.tag,
            position: 'bottom',
            color: 'rgba(255,255,255,0.6)',
            fontSize: '14px',
            formatter: () => {
              return 'Exchange Address'
            },
            force: {
              repulsion: 80,
            },
          },
          emphasis: {
            focus: 'adjacency',
            itemStyle: {
              borderWidth: 2,
            },
          },
          select: {
            itemStyle: {
              ...itemSelect,
            },
          },
          ...node,
        }
        seriesData.push(obj)
      })

      fundAddrData.edges.forEach((linkNode: any) => {
        const { from, to, direction } = linkNode
        if (nodesObj[from] && nodesObj[to]) {
          let linkObj = {
            source: linkNode.from,
            target: linkNode.to,
          }
          if (direction === 'IN') {
            linkObj = {
              source: linkNode.to,
              target: linkNode.from,
            }
          } else if (direction === 'IN/OUT') {
            const otherObj = {
              source: linkNode.to,
              target: linkNode.from,
            }
            linkData.push(otherObj)
          }
          linkData.push(linkObj)
        }
      })
    }
    runInAction(() => {
      this.fundAddrData = {
        series: [
          {
            type: 'graph',
            layout: 'none',
            symbolSize: 50,
            selectedMode: true,
            roam: true,
            data: seriesData,
            links: linkData,
            force: {
              // 节点排斥力设置
              repulsion: 400,
              gravity: 0.01,
              edgeLength: 200,
            },

            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 8],
            lineStyle: {
              width: 1,
              color: 'rgba(100, 100, 100, 1)',
              curveness: 0.2,
              type: 'solid',
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

  setSelect(value: string) {
    runInAction(() => {
      this.select = value
    })
  }
}

const analysisStore = new Analysis()

export default analysisStore
