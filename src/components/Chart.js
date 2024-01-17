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
        tension: 0.4
      },
      point: {
        radius: 0
      }
    }
  }

  return (
    <section className="retail-chart panel">
      <h3>Retail Sales</h3>
      <Dropdown onClick={handleDropdown} selected={showSales} />
      <Line data={formattedData} options={options} />
    </section>
  )
}

export default Chart
