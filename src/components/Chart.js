import React from 'react'
import { Line } from 'react-chartjs-2'
import { config } from '../config'

const Chart = ({ data }) => {

  console.log('data: ', data)
  
  const formattedData = {
    labels: config.months,
    datasets: [
      {
        label: 'retailSales',
        data: data.map(item => item.retailSales)
      },
      {
        lable: 'wholesaleSales',
        data: data.map(item => item.wholesaleSales)
      },
      {
        lable: 'unitsSold',
        data: data.map(item => item.unitsSold)
      },
      {
        lable: 'retailerMargin',
        data: data.map(item => item.retailerMargin)
      }      
    ]
  }

  console.log('formattedData: ', formattedData)

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
