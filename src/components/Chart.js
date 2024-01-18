import { useState, useEffect } from 'react'
import { config } from '../config'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import Dropdown from './Dropdown'
import CustomTooltip from './CustomTooltip'

const Chart = ({ data }) => {
  const [adjustedBase, setAdjustedBase] = useState(0)
  const [adjustedHeight, setAdjustedHeight] = useState(0)
  const [padding, setPadding] = useState({
    retailSales: 0,
    wholesaleSales: 0,
    unitsSold: 0,
    retailerMargin: 0
  })
  const [showSales, setShowSales] = useState({
    wholesaleSales: false,
    unitsSold: false,
    retailerMargin: false
  })
  
  const handleDropdown = event => {
    const id = event.currentTarget.dataset.id
    setShowSales(prevState => ({ ...prevState, [id]: !prevState[id] }))
  }
  
  const adjustYAxisHeight = () => {
    const retailSales = data.map(item => item.retailSales)
    const min = Math.min(...retailSales)
    const max = Math.max(...retailSales)
    const range = 0.2 // Adjust range to control line height
    setAdjustedBase(min - (max - min) * (1 - range))
    setAdjustedHeight(max + (max - min) * (1 - range))
  }

  const setLinePadding = () => {  
    const padding = {}
    const dynamicLines = Object.keys(showSales).filter(key => showSales[key])
    const lines = ['retailSales', ...dynamicLines]
    const calculatePadding = index => 150 + (lines.length > 1 ? 50 : 0) * (lines.length - 1 - index)
    
    lines.forEach((line, index) => {
      console.log('line in loop: ', line)
      padding[line] = calculatePadding(index)
      console.log('padding[line]: ', padding[line])
    })
    setPadding(padding)
  }
  
  useEffect(() => {
    setLinePadding()
  }, [showSales])

  useEffect(() => {
    adjustYAxisHeight()
  }, [data])
  
  return (
    <section className="retail-chart panel">
      <h3>Retail Sales</h3>
      <Dropdown onClick={handleDropdown} selected={showSales} />
      <ResponsiveContainer height={475}>
        <LineChart data={data}>
          <Line type="monotone" dataKey="retailSales" stroke="#44A8F6" strokeWidth={4} dot={false} yAxisId="retailSales" />
          <YAxis hide={true} yAxisId="retailSales" domain={[adjustedBase, adjustedHeight + 2]} padding={{ bottom: padding.retailSales }} />
          {showSales.wholesaleSales && (
            <>
              <Line type="monotone" dataKey="wholesaleSales" stroke="#9AA5BF" strokeWidth={4} dot={false} yAxisId="wholesaleSales" />
              <YAxis hide={true} yAxisId="wholesaleSales" domain={[adjustedBase, adjustedHeight + 2]} padding={{ bottom: padding.wholesaleSales }} />
            </>
          )}
          {showSales.unitsSold && (
            <>
              <Line type="monotone" dataKey="unitsSold" stroke="#F69244" strokeWidth={4} dot={false} yAxisId="unitsSold" />
              <YAxis hide={true} yAxisId="unitsSold" domain={[adjustedBase, adjustedHeight + 10]} padding={{ bottom: padding.unitsSold }} />
            </>
          )}
          {showSales.retailerMargin && (
            <>
              <Line type="monotone" dataKey="retailerMargin" stroke="#Eb44F6" strokeWidth={4} dot={false} yAxisId="retailerMargin" />
              <YAxis hide={true} yAxisId="retailerMargin" domain={[adjustedBase, adjustedHeight + 2]} padding={{ bottom: padding.retailerMargin }} />
            </>  
          )}
          <XAxis hide={true} dataKey="weekEnding" padding={{ left: 35, right: 35 }} />
          {/* need to fix <Tooltip content={<CustomTooltip />} /> */}
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

export default Chart
