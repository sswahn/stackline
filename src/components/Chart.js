import { useState } from 'react'
import { config } from '../config'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'
import Dropdown from './Dropdown'

const Chart = ({ data }) => {
  const [showSales, setShowSales] = useState({
    wholesale: false,
    unitsSold: false,
    retailerMargin: false
  })
  
  const handleDropdown = event => {
    const id = event.currentTarget.dataset.id
    setShowSales(prevState => ({ ...prevState, [id]: !prevState[id] }))
  }
  
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
