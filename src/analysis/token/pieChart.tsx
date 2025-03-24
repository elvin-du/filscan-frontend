import Echarts from '@/components/echarts'
import { useMemo } from 'react'

interface Props {
  value: Number
}
export default (props: Props) => {
  const { value } = props
  const option = useMemo(() => {
    return {
      //       tooltip: {
      //         trigger: 'item',
      //       },
      //       legend: {
      //         top: '5%',
      //         left: 'center',
      //       },
      series: [
        {
          animation: true,
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            {
              value: value,
              name: '',
              itemStyle: { color: 'rgba(28, 106, 253, 1)' },
            },
            {
              value: Number(100 - Number(value)),
              name: '',
              itemStyle: { color: 'rgba(176, 203, 254, 1)' },
            },
          ],
        },
      ],
    }
  }, [value])

  return <Echarts options={option} />
}
