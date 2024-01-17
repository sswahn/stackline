import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { config } from '../config'
import Dropdown from './Dropdown'
import CustomTooltip from './CustomTooltip'

const Chart = ({ data }) => {
  const [adjustedBase, setAdjustedBase] = useState([])
  const [adjustedPeak, setAdjustedPeak] = useState([])
  const [showSales, setShowSales] = useState({
    wholesaleSales: false,
    unitsSold: false,
    retailerMargin: false
  })
  
  const handleDropdown = event => {
    const id = event.currentTarget.dataset.id
    setShowSales(prevState => ({ ...prevState, [id]: !prevState[id] }))
  }

  /*
  const adjustYAxisHeight = () => {
    const retailSales = data.map(item => item.retailSales)
    const min = Math.min(...retailSales)
    const max = Math.max(...retailSales)
    const range = 0.2 // Adjust range to control line height
    setAdjustedBase(min - (max - min) * (1 - range))
    setAdjustedPeak(max + (max - min) * (1 - range))
  }

  useEffect(() => {
    adjustYAxisHeight()
  }, [data])
  */

    // Calculate Y-axis heights for stacking
  const calculateYAxisHeights = () => {
    const yAxisHeights = {}
    let yOffset = 0

    Object.keys(showSales).forEach(key => {
      yAxisHeights[key] = yOffset
      yOffset += 100 // Adjust this value based on your preference for spacing
    })

    return yAxisHeights
  }

  const yAxisHeights = calculateYAxisHeights()

  
  return (
    <section className="retail-chart panel">
      <h3>Retail Sales</h3>
      <Dropdown onClick={handleDropdown} selected={showSales} />
      <ResponsiveContainer height={475}>
        <LineChart data={data}>
          <Line type="monotone" dataKey="retailSales" stroke="#44A8F6" strokeWidth={4} dot={false} yAxisId="retailSales" />
          <YAxis hide={true} yAxisId="retailSales" domain={[yAxisHeights['retailSales'], yAxisHeights['retailSales'] + 30]} />
          {showSales.wholesaleSales && (
            <>
              <Line type="monotone" dataKey="wholesaleSales" stroke="#9AA5BF" strokeWidth={4} dot={false} yAxisId="wholesaleSales" />
              <YAxis hide={true} yAxisId="wholesaleSales" domain={[yAxisHeights.wholesaleSales, yAxisHeights.wholesaleSales + 30]} />
            </>
          )}
          {showSales.unitsSold && (
            <>
              <Line type="monotone" dataKey="unitsSold" stroke="#F69244" strokeWidth={4} dot={false} yAxisId="unitsSold" />
              <YAxis hide={true} yAxisId="unitsSold" domain={[yAxisHeights.unitsSold, yAxisHeights.unitsSold + 30]} />
            </>
          )}
          {showSales.retailerMargin && (
            <>
              <Line type="monotone" dataKey="retailerMargin" stroke="#Eb44F6" strokeWidth={4} dot={false} yAxisId="retailerMargin" />
              <YAxis hide={true} yAxisId="retailerMargin" domain={[yAxisHeights.retailerMargin, yAxisHeights.retailerMargin + 30]} />
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
