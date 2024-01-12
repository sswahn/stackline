import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import Dropdown from './Dropdown'

const months = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
]

const LineChartComponent = ({ data }) => {
  const [state, setState] = useState([])
  const [adjustedMinValue, setAdjustedMinValue] = useState([])
  const [adjustedMaxValue, setAdjustedMaxValue] = useState([])
  const [showSales, setShowSales] = useState({
    wholesale: false,
    unitsSold: false,
    retailerMargin: false
  })
  
  const getType = text => {
    switch (text) {
      case 'Wholesale Sales':
        return 'wholesale'
      case 'Units Sold':
        return 'unitsSold'
      case 'Retailer Margin':
        return 'retailerMargin'
      default:
        return null
    }
  }
  
  const handleDropdown = event => {
    const type = getType(event.currentTarget.lastChild.textContent)
    setShowSales(prevState => ({ ...prevState, [type]: !prevState[type] }))
  }

  const adjustYAxisHeight = () => {
    const min = Math.min(...data.map(item => item.retailSales))
    const max = Math.max(...data.map(item => item.retailSales))
    const range = 0.2 // Adjust range to control line height
    const minValue = min - (max - min) * (1 - range)
    const maxValue = max + (max - min) * (1 - range)
    setAdjustedMinValue(minValue)
    setAdjustedMaxValue(maxValue)
  }

  useEffect(() => {
    adjustYAxisHeight()
  }, [data])
   
  return (
    <section className="retail-chart panel">
      <h3>Retail Sales</h3>
      <Dropdown onClick={handleDropdown} selected={showSales} />
      <ResponsiveContainer height={465}>
        <LineChart data={data}>
          <Line type="monotone" dataKey="retailSales" stroke="#44A8F6" strokeWidth={4} dot={false} />
          {showSales.wholesale && <Line type="monotone" dataKey="wholesaleSales" stroke="#9AA5BF" strokeWidth={4} dot={false} />}
          {showSales.unitsSold && <Line type="monotone" dataKey="unitsSold" stroke="#F69244" strokeWidth={4} dot={false} />}
          {showSales.retailerMargin && <Line type="monotone" dataKey="retailerMargin" stroke="#Eb44F6" strokeWidth={4} dot={false} />}
          <YAxis hide={true} domain={[adjustedMinValue, adjustedMaxValue]} />
          <XAxis hide={true} padding={{ left: 35, right: 35 }} />
        </LineChart>
      </ResponsiveContainer>
      <div className="months">
        <div>
          {months.map(month => <span key={month}>{month}</span>)}
        </div>
      </div>
    </section>
  )
}

export default LineChartComponent
