import { Pie, PieConfig } from '@ant-design/plots'
import { useStore } from '../store'

interface IChartData {
  type: string
  value: number
}

export default function PieChart() {
  const store = useStore()
  const data: IChartData[] = []

  store.users.forEach(user => {
    const { city } = user.address
    const index = data.findIndex(item => item.type === city)

    if (index === -1) {
      data.push({ type: city, value: 1 })
    } else {
      data[index].value++
    }
  })

  const config: PieConfig = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: data => `${(data.percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center'
      }
    },
    interactions: [
      {
        type: 'element-active'
      }
    ]
  }

  return <Pie {...config} />
}
