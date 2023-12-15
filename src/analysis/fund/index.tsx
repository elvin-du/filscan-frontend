import Echarts from '@/components/echarts'
import style from './index.module.scss'
import { useEffect, useMemo, useRef } from 'react'
const result: any = {
  address: 'node1',
  value: 10,
  children: [
    {
      address: 'node1_2',
      value: 8,
      children: [
        {
          address: 'node1_2_1',
          value: 7,
        },
        {
          address: 'node1_2_2',
          value: 6,
        },
        {
          address: 'node1_2_3',
          value: 5,
        },
      ],
    },
    {
      address: 'node2_1',
      value: 8,
      children: [
        {
          address: 'node2_2_1',
          value: 6,
        },
        {
          address: 'node2_2_2',
          value: 6,
        },
        {
          address: 'node2_2_3',
          value: 5,
        },
      ],
    },
    {
      address: 'node2_3',
      value: 7,
      children: [
        {
          address: 'node2_3_1',
          value: 6,
        },
        {
          address: 'node2_3_2',
          value: 4,
        },
        {
          address: 'node2_3_3',
          value: 2,
        },
      ],
    },
  ],
}
export default () => {
  const myChart = useRef<null>(null)
  const handleChart = (chart: any) => {
    myChart.current = chart
  }

  // useEffect(() => {
  //   if (myChart.current) {
  //     myChart.current?.on('click', function (params: any) {
  //       console.log(params)
  //     })
  //   }
  // }, [myChart.current])
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

  const calcSize = (value: number) => {
    const baseSize = 80
    const baseValue = 10
    return Math.abs((baseSize * value) / baseValue)
  }

  const calcOrigin = (type?: string) => {
    return type === 'x'
      ? Math.abs(Math.ceil(Math.random() * 300))
      : Math.ceil(Math.random() * 300)
  }

  const calcSeries = (result: Array<any>, source: string) => {
    const dataList: any = []
    const linkList: any = []
    result.forEach((v: any) => {
      const obj = {
        name: v.address,
        symbolSize: calcSize(v.value),
        itemStyle: {
          color: 'rgba(95,219,194,0.2)',
          borderColor: '#5FDBC2',
        },
        x: calcOrigin('x'), //1~10 之间随机数
        y: calcOrigin('y'), //10～100之间随机数
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
      if (v.children) {
        const { data, link } = calcSeries(v.children, v.address)
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
    const obj = {
      name: result.address,
      symbolSize: calcSize(result.value),
      x: 150, //1~10 之间随机数
      y: 100, //10～100之间随机数
      itemStyle: {
        color: 'rgba(28,106,253,0.2)',
        borderColor: '#1C6AFD',
      },
    }
    seriesData.push(obj)
    if (result.children) {
      const { data, link } = calcSeries(result.children, result.address)
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
  }, [result, option])

  console.log('===newOptions', newOptions)

  return (
    <div className={style.fund}>
      <div className={style.fund_left}>left</div>
      <div className={style.fund_chart}>
        <Echarts options={{ ...newOptions }} onChartInstance={handleChart} />
      </div>
    </div>
  )
}
