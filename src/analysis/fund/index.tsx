import Echarts from '@/components/echarts'
import analysisStore from '@/store/modules/analysis'
import { observer } from 'mobx-react'
import { useEffect, useMemo, useRef } from 'react'

export default observer(() => {
  const { fundAddrData } = analysisStore
  const myChart = useRef<null>(null)
  const handleChart = (chart: any) => {
    myChart.current = chart
  }
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

  const calcSize = (value: string, volume?: string) => {
    const baseSize = 80 //最大的size
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

  const calcSeries = (result: Array<any>, source: string, volume: string) => {
    const dataList: any = []
    const linkList: any = []
    result?.forEach((v: any) => {
      const obj = {
        name: v.address,
        symbolSize: calcSize(v.transaction_volume_with_father_node, volume),
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
        target: v.address,
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
          v.address,
          v.total_transaction_volume,
        )
        console.log('==--09933', data, link)
        // dataList.push(...data)
        // linkList.push(...link)
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
    const obj = {
      name: fundAddrData.address,
      symbolSize: calcSize(fundAddrData.total_transaction_volume),
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
        fundAddrData.address,
        fundAddrData?.total_transaction_volume,
      )
      seriesData.push(...data)
      linkData = link
    }
    console.log('-----dd', seriesData, linkData)
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
          },
          edgeSymbol: ['circle', 'none'],
          edgeSymbolSize: [4, 10],
          edgeLabel: {
            fontSize: 20,
          },

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
  }, [fundAddrData, option])

  console.log('===newOptions', newOptions)

  return <Echarts options={{ ...newOptions }} onChartInstance={handleChart} />
})
