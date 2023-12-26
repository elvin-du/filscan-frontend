import Echarts from '@/components/echarts'
import analysisStore from '@/store/modules/analysis'
import { observer } from 'mobx-react'
import { useEffect, useMemo, useRef } from 'react'

export default observer(() => {
  const { fundAddrData } = analysisStore
  const myChart = useRef<any>(null)
  const handleChart = (chart: any) => {
    myChart.current = chart
  }

  const handleClick = (params: any) => {
    const [name, level] = params.name.split('-')[0]
    console.log('====00003', params, name, level)
  }

  useEffect(() => {
    if (myChart.current) {
      myChart.current?.on('click', handleClick)
    }
    return () => {
      if (myChart.current) {
        myChart.current?.off('click', handleClick)
      }
    }
  }, [myChart.current])
  const option = {
    title: {
      text: '',
    },
    gird: {
      left: 10,
      right: 10,
      bottom: 10,
      top: 20,
    },
    tooltip: {
      show: false,
    },
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
  }

  const calcSize = (value: string, volume?: string, size?: number) => {
    const baseSize = size || 80 //最大的size
    if (!volume) {
      return baseSize
    }
    return Math.floor((Number(value) / Number(volume)) * baseSize)
  }

  const calcOrigin = (type?: string) => {
    return type === 'x'
      ? Math.abs(Math.ceil(Math.random() * 300))
      : Math.ceil(Math.random() * 300)
  }

  const calcSeries = (
    result: Array<any>,
    source: string,
    volume: string,
    size: number,
  ) => {
    let dataList: any = []
    const linkList: any = []
    result?.forEach((v: any) => {
      const nameKey = `${v.address}-${v.level}`
      const symbolSize = calcSize(
        v.transaction_volume_with_father_node,
        volume,
        size,
      )
      const obj = {
        name: nameKey,
        symbolSize: symbolSize,
        itemStyle: {
          color: 'rgba(95,219,194,0.2)',
          borderColor: '#5FDBC2',
        },
        x: calcOrigin('x'), //1~10 之间随机数
        y: calcOrigin('y'), //10～100之间随机数
        ...v,
      }
      const linkObj = {
        source,
        target: nameKey,
        symbolSize: [5, 20],
        lineStyle: {
          width: 0.5,
          color: 'rgba(51, 51, 51, 1)',
          curveness: 0.2,
          type: 'solid',
        },
      }
      linkList.push(linkObj)
      dataList.push(obj)
      if (v.nodes) {
        const { data, link } = calcSeries(
          v.nodes,
          nameKey,
          v.cal_child_transaction_volume,
          symbolSize,
        )
        dataList.push(...data)
        linkList.push(...link)
      }
    })
    return {
      data: [...dataList],
      link: [...linkList],
    }
  }

  const newOptions = useMemo(() => {
    const seriesData = []
    let linkData = []
    if (fundAddrData && fundAddrData.address) {
      const nameKey = `${fundAddrData.address}-${fundAddrData.level}`
      const size = calcSize(fundAddrData.total_transaction_volume)
      const obj = {
        name: nameKey,
        symbolSize: size,
        x: 150, //1~10 之间随机数
        y: 100, //10～100之间随机数
        itemStyle: {
          color: 'rgba(28,106,253,0.2)',
          borderColor: '#1C6AFD',
        },
        ...fundAddrData,
      }
      // delete obj.nodes
      seriesData.push(obj)
      if (fundAddrData.nodes) {
        const { data, link } = calcSeries(
          fundAddrData.nodes,
          nameKey,
          fundAddrData?.cal_child_transaction_volume,
          size,
        )
        seriesData.push(...data)
        linkData = link
      }
      return {
        ...option,
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
    }
  }, [fundAddrData, option])

  return <Echarts options={{ ...newOptions }} onChartInstance={handleChart} />
})
