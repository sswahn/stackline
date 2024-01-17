import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { config } from '../config'
import Dropdown from './Dropdown'
import CustomTooltip from './CustomTooltip'

const LineChartComponent = ({ data }) => {
  const [retailYAxis, setRetailYAxis] = useState({})
  const [wholesaleYAxis, setWholesaleYAxis] = useState({})
  const [unitsSoldYAxis, adjustUnitsSoldYAxis] = useState({})
  const [retailerMarginYAxis, adjustRetailerMarginYAxis] = useState({})
  
  const [showSales, setShowSales] = useState({
    wholesale: false,
    unitsSold: false,
    retailerMargin: false
  })
  
  const handleDropdown = event => {
    const id = event.currentTarget.dataset.id
    setShowSales(prevState => ({ ...prevState, [id]: !prevState[id] }))
  }

  const adjustRetailYAxis = () => {
    const retailSales = data.map(item => item.retailSales)
    const min = Math.min(...retailSales)
    const max = Math.max(...retailSales)
    const range = 0.1 // Adjust range to control line height
    setRetailYAxis({
      base: min - (max - min) * (1 - range),
      height: max + (max - min) * (1 - range)
    })
  }

  const adjustWholesaleYAxis = () => {
    const retailSales = data.map(item => item.wholesaleSales)
    const min = Math.min(...retailSales)
    const max = Math.max(...retailSales)
    const range = 0.1 // Adjust range to control line height
    setWholesaleYAxis({
      base: min - (max - min) * (1 - range),
      height: max + (max - min) * (1 - range)
    })
  }

  const adjustUnitsSoldYAxis = () => {
    const retailSales = data.map(item => item.unitsSold)
    const min = Math.min(...retailSales)
    const max = Math.max(...retailSales)
    const range = 0.1 // Adjust range to control line height
    setUnitsSoldYAxis({
      base: min - (max - min) * (1 - range),
      height: max + (max - min) * (1 - range)
    })
  }

  const adjustRetailerMarginYAxis = () => {
    const retailSales = data.map(item => item.retailerMargin)
    const min = Math.min(...retailSales)
    const max = Math.max(...retailSales)
    const range = 0.1 // Adjust range to control line height
    setRetailerMarginYAxis({
      base: min - (max - min) * (1 - range),
      height: max + (max - min) * (1 - range)
    })
  }

  useEffect(() => {
    adjustYAxisHeight()
    adjustWholesaleYAxis()
    adjustUnitsSoldYAxis()
    adjustRetailerMarginYAxis()
  }, [data])

  return (
    <section className="retail-chart panel">
      <h3>Retail Sales</h3>
      <Dropdown onClick={handleDropdown} selected={showSales} />
      <ResponsiveContainer height={475}>
        <LineChart data={data}>
          <Line type="monotone" dataKey="retailSales" stroke="#44A8F6" strokeWidth={4} dot={false} stackId="sales" yAxisId="retail" />
          <YAxis hide={true} domain={[retailYAxis.base, retailYAxis.height]} yAxisId="retail" />
          {showSales.wholesale && (
            <>      
              <Line type="monotone" dataKey="wholesaleSales" stroke="#9AA5BF" strokeWidth={4} dot={false} stackId="sales" yAxisId="wholesale" />}
              <YAxis hide={true} domain={[wholesaleYAxis.base, wholesaleYAxis.height]} yAxisId="wholesale" />
            </>
          )}
          {showSales.unitsSold && (
            <>
              <Line type="monotone" dataKey="unitsSold" stroke="#F69244" strokeWidth={4} dot={false} stackId="sales" yAxisId="units" />
              <YAxis hide={true} domain={[unitsSoldYAxis.base, unitsSoldYAxis.height]} yAxisId="units" />  
            </>
          )}
          {showSales.retailerMargin && (
            <>
              <Line type="monotone" dataKey="retailerMargin" stroke="#Eb44F6" strokeWidth={4} dot={false} stackId="sales" yAxisId="margin" />
              <YAxis hide={true} domain={[retailerMarginYAxis.base, retailerMarginYAxis.height]} yAxisId="margin" />
            </>
          )}
          <XAxis hide={true} dataKey="weekEnding" padding={{ left: 35, right: 35 }} />
          <Tooltip content={<CustomTooltip />} />
        </LineChart>
      </ResponsiveContainer>
      <div className="months">
        <div>
          {config.months.map(month => <span key={month}>{month}</span>)}
        </div>
      </div>
    </section>
  )
}

export default LineChartComponent
