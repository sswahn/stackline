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

  // move to parent:
  const formattedData = {
    labels: config.months,
    datasets: [
      {
        label: 'retailSales',
        data: data.map(item => item.retailSales),
        borderColor: '#44A8F6'
      },
      {
        label: 'wholesaleSales',
        data: data.map(item => item.wholesaleSales),
        borderColor: '#9AA5BF'
      },
      {
        label: 'unitsSold',
        data: data.map(item => item.unitsSold),
        borderColor: '#F69244'
      },
      {
        label: 'retailerMargin',
        data: data.map(item => item.retailerMargin),
        borderColor: '#Eb44F6'
      }      
    ].reverse()
  }

  console.log('formattedData: ', formattedData)

  const options = {
    scales: {
      x: {
        display: false,
        grid: {
          display: false
        },
      },
      y: {
        stacked: true,
        display: false,
        grid: {
          display: false
        }
      }
    },
    elements: {
      line: {
        tension: 1.9
      },
      point: {
        radius: 0
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true
      }
    }
  }

  return (
    <section className="retail-chart panel">
      <h3>Retail Sales</h3>
      <Dropdown onClick={handleDropdown} selected={showSales} />
      <Line data={formattedData} options={options} />
      <div className="months">
        <div>
          {config.months.map(month => <span key={month}>{month}</span>)}
        </div>
      </div>
    </section>
  )
}

export default Chart
