import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { config } from '../config'
import Dropdown from './Dropdown'
import CustomTooltip from './CustomTooltip'

const LineChartComponent = ({ data }) => {
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
  
  return (
    <section className="retail-chart panel">
      <h3>Retail Sales</h3>
      <Dropdown onClick={handleDropdown} selected={showSales} />
      <ResponsiveContainer height={475}>
        <LineChart data={data}>
          <Line type="monotone" dataKey="retailSales" stroke="#44A8F6" strokeWidth={4} dot={false} stackId="1" stackOffset="expand" isAnimationActive={false} />
          {showSales.wholesaleSales && <Line type="monotone" dataKey="wholesaleSales" stroke="#9AA5BF" strokeWidth={4} dot={false} stackId="1" stackOffset="expand" isAnimationActive={false}  />}
          {showSales.unitsSold && <Line type="monotone" dataKey="unitsSold" stroke="#F69244" strokeWidth={4} dot={false} stackId="1" stackOffset="expand" isAnimationActive={false} />}
          {showSales.retailerMargin && <Line type="monotone" dataKey="retailerMargin" stroke="#Eb44F6" strokeWidth={4} dot={false} stackId="1" stackOffset="expand" isAnimationActive={false} />}
          <YAxis hide={true} type="number" />
          <XAxis hide={true} dataKey="weekEnding" padding={{ left: 35, right: 35 }} />
          {/*<Tooltip content={<CustomTooltip />} /> */}
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
