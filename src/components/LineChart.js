import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { formatChartDate } from '../utilities/formatDate'
import Dropdown from './Dropdown'

const LineChartComponent = ({ data }) => {
  const [state, setState] = useState([])
  const [uniqueMonths, setUniqueMonths] = useState([])
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
  
  const formatData = array => {
    return array.map(item => ({ 
      weekEnding: formatChartDate(item.weekEnding),
      retailSales: item.retailSales,
      wholesaleSales: item.wholesaleSales,
      unitsSold: item.unitsSold,
      retailerMargin: item.retailerMargin
    }))
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

  const initializeState = () => {
    const init = formatData(data)
    const months = [...new Set(init.map(item => item.weekEnding))]
    setState(init)
    setUniqueMonths(months)
    adjustYAxisHeight()
  }

  useEffect(() => {
    initializeState()
  }, [data])
   
  return (
    <div className="retail-chart panel">
      <h3>Retail Sales</h3>
      <Dropdown onClick={handleDropdown} selected={showSales} />
      <ResponsiveContainer width="100%" height={530}>
        <LineChart data={state}>
          <Line type="monotone" dataKey="retailSales" stroke="#44A8F6" strokeWidth={3} dot={false} x1="10%" x2="50%" />
          <YAxis hide={true} domain={[adjustedMinValue, adjustedMaxValue]} />
          {showSales.wholesale && <Line type="monotone" dataKey="wholesaleSales" stroke="#9AA5BF" strokeWidth={3} dot={false} />}
          {showSales.unitsSold && <Line type="monotone" dataKey="unitsSold" stroke="#F69244" strokeWidth={3} dot={false} />}
          {showSales.retailerMargin && <Line type="monotone" dataKey="retailerMargin" stroke="#Eb44F6" strokeWidth={3} dot={false} />}
          <line x1="0%" y1="90%" x2="100%" y2="90%" stroke="#eeeeee" strokeWidth="1" />
          <XAxis dataKey="weekEnding" axisLine={false} tickLine={false} ticks={uniqueMonths} tick={{ fill: '#ABB8C8', fontSize: '14px' }} dx={-5} padding={{ left: 35, right: 35 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default LineChartComponent
