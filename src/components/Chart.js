import React from 'react'
import { Line } from 'react-chartjs-2'
import { config } from './config'

const Chart = data => {
  const formattedData = {
    labels: config.months,
    datasets: data.map((item, index) => ({
      label: item.weekEnding,
      data: item,
      fill: true,
      borderColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`,
      backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
    }))
  }

  const options = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
      },
      y: {
        stacked: true,
      },
    },
  }

  return (
    <Line data={formattedData} options={options} />
  )
}

export default Chart
