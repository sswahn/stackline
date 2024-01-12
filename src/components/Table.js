import { useState, useEffect } from 'react'
import { formatTableDate } from '../utilities/formatDate'
import CaretDownIcon from '../icons/CaretDownIcon'
import CaretUpIcon from '../icons/CaretUpIcon'

const Table = ({ data }) => {
  const [state, setState] = useState([])
  const [key, setKey] = useState(null)
  const [isDescending, setIsDescending] = useState(true)

  const getKey = text => {
    switch (text) {
      case 'Week Ending':
        return 'weekEnding'
      case 'Retail Sales':
        return 'retailSales'
      case 'Wholesale Sales':
        return 'wholesaleSales'
      case 'Units Sold':
        return 'unitsSold'
      case 'Retailer Margin':
        return 'retailerMargin'
      default:
        return null
    }
  }

  const formatData = array => {
    return array.map((item) => ({
      weekEnding: formatTableDate(item.weekEnding),
      retailSales: `$${parseInt(item.retailSales, 10).toLocaleString()}`,
      wholesaleSales: `$${parseInt(item.wholesaleSales, 10).toLocaleString()}`,
      unitsSold: item.unitsSold,
      retailerMargin: `$${parseInt(item.retailerMargin, 10).toLocaleString()}`
    }))
  }

  const sortData = (currentKey, descending) => {
    return [...data].sort((a, b) => {
      const aValue = currentKey === 'weekEnding' ? Number(a[currentKey].split('-')[1]) : a[currentKey]
      const bValue = currentKey === 'weekEnding' ? Number(b[currentKey].split('-')[1]) : b[currentKey]
      return descending ? bValue - aValue : aValue - bValue
    })
  }

  const handleSort = event => {
    const currentKey = getKey(event.target.firstChild.textContent)
    const descending = currentKey === key ? !isDescending : true
    const sorted = sortData(currentKey, descending)
    const formatted = formatData(sorted)
    setState(formatted)
    setIsDescending(descending)
    setKey(currentKey)
  }

  const initializeState = () => {
    const init = formatData(data)
    setState(init)
  }

  useEffect(() => {
    initializeState()
  }, [data])

  return (
    <div className="retail-table panel">
      <table>
        <thead>
          <tr>
            <th onClick={handleSort}>
              <span>Week Ending</span>
              {key === 'weekEnding' && (isDescending ? <CaretDownIcon /> : <CaretUpIcon />) || <CaretDownIcon />}
            </th>
            <th onClick={handleSort}>
              <span>Retail Sales</span>
              {key === 'retailSales' && (isDescending ? <CaretDownIcon /> : <CaretUpIcon />) || <CaretDownIcon />}
            </th>
            <th onClick={handleSort}>
              <span>Wholesale Sales</span>
              {key === 'wholesaleSales' && (isDescending ? <CaretDownIcon /> : <CaretUpIcon />) || <CaretDownIcon />}
            </th>
            <th onClick={handleSort}>
              <span>Units Sold</span>
              {key === 'unitsSold' && (isDescending ? <CaretDownIcon /> : <CaretUpIcon />) || <CaretDownIcon />}
            </th>
            <th onClick={handleSort}>
              <span>Retailer Margin</span>
              {key === 'retailerMargin' && (isDescending ? <CaretDownIcon /> : <CaretUpIcon />) || <CaretDownIcon />}
            </th>
          </tr>
        </thead>
        <tbody>
          {!!state.length && state.map((item, index) => (
            <tr key={index}>
              <td>{item.weekEnding}</td>
              <td>{item.retailSales}</td>
              <td>{item.wholesaleSales}</td>
              <td>{item.unitsSold}</td>
              <td>{item.retailerMargin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
