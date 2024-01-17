import { useState, useEffect } from 'react'
import { config } from '../config'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'
import Dropdown from './Dropdown'

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
      tension: 0.1
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
  },
  tooltips: {
    mode: 'index',
    intersect: false
  }
}

const Chart = ({ data }) => {
  const [state, setState] = useState({})
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
  const formatData = () => {
    return {
      labels: config.months,
      datasets: [
        {
          label: 'retailerMargin',
          data: data.map(item => item.retailerMargin),
          borderColor: '#Eb44F6',
          borderWidth: 4
        }, 
        {
          label: 'unitsSold',
          data: data.map(item => item.unitsSold),
          borderColor: '#F69244',
          borderWidth: 4
        },
        {
          label: 'wholesaleSales',
          data: data.map(item => item.wholesaleSales),
          borderColor: '#9AA5BF',
          borderWidth: 4
        },
        {
          label: 'retailSales',
          data: data.map(item => item.retailSales),
          borderColor: '#44A8F6',
          borderWidth: 4
        }
      ]
    }
  }

  useEffect(() => {
    formatData()
  }, [])

  return (
    <section className="retail-chart panel">
      <h3>Retail Sales</h3>
      <Dropdown onClick={handleDropdown} selected={showSales} />
      {!!Object.keys(state).length && <Line data={state} options={options} />}
      <div className="months">
        <div>
          {config.months.map(month => <span key={month}>{month}</span>)}
        </div>
      </div>
    </section>
  )
}

export default Chart
