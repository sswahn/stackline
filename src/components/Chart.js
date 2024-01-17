import React from 'react'
import { Line } from 'react-chartjs-2'
import { config } from '../config'

const Chart = ({ data }) => {

  console.log('data: ', data)
  
  const formattedData = {
    labels: config.months,
    datasets: [
      {
        id: 'retailSales',
        label: 'retailSales',
        data: data.map(item => item.retailSales)
      },
      {
        id: 'wholesaleSales',
        lable: 'wholesaleSales',
        data: data.map(item => item.wholesaleSales)
      },
      {
        id: 'unitsSold',
        lable: 'unitsSold',
        data: data.map(item => item.unitsSold)
      },
      {
        id: 'retailerMargin',
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
