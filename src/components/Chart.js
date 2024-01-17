import React from 'react'
import 'chart.js/auto';
import { Line } from 'react-chartjs-2'
import { config } from '../config'

const Chart = ({ data }) => {
  
  const formattedData = {
    labels: config.months,
    datasets: [
      {
        label: 'retailSales',
        data: data.map(item => item.retailSales)
      },
      {
        label: 'wholesaleSales',
        data: data.map(item => item.wholesaleSales)
      },
      {
        label: 'unitsSold',
        data: data.map(item => item.unitsSold)
      },
      {
        label: 'retailerMargin',
        data: data.map(item => item.retailerMargin)
      }      
    ]
  }

  console.log('formattedData: ', formattedData)

  const options = {
    scales: {
      y: {
        stacked: true,
      }
    },
    elements: {
      line: {
        tension: 0.4, 
      }
    }
  }

  return (
    <Line data={formattedData} options={options} />
  )
}

export default Chart
