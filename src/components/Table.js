import { useState, useEffect } from 'react'
import { formatTableDate } from '../utilities/formatDate'
import CaretDownIcon from '../icons/CaretDownIcon'
import CaretUpIcon from '../icons/CaretUpIcon'
import Caret from './Caret'

const Table = ({ data }) => {
  const [state, setState] = useState([])
  const [key, setKey] = useState(undefined)
  const [isDescending, setIsDescending] = useState(true)

  const formatData = array => {
    return array.map((item) => ({
      weekEnding: formatTableDate(item.weekEnding),
      retailSales: `$${parseInt(item.retailSales, 10).toLocaleString()}`,
      wholesaleSales: `$${parseInt(item.wholesaleSales, 10).toLocaleString()}`,
      unitsSold: item.unitsSold,
      retailerMargin: `$${parseInt(item.retailerMargin, 10).toLocaleString()}`
    }))
  }

  const sortData = id => {
    return [...data].sort((a, b) => {
      return isDescending ? b - a : a - b
    })
  }

  const handleSort = event => {
    const id = event.currentTarget.dataset.id
    const sorted = sortData(id)
    const formatted = formatData(sorted)
    setIsDescending(prevState => !prevState)
    setState(formatted)
    setKey(id)
  }

  const initializeState = () => {
    const init = formatData(data)
    setState(init)
  }

  useEffect(() => {
    initializeState()
  }, [data])

  return (
    <section className="retail-table panel">
      <table>
        <thead>
          <tr>
            <th data-id="weekEnding" onClick={handleSort}>
              <span>Week Ending</span>
              <Caret direction={key === 'weekEnding' ? (isDescending ? 'down' : 'up') : 'down'} />
            </th>
            <th data-id="retailSales" onClick={handleSort}>
              <span>Retail Sales</span>
              {key === 'retailSales' && (isDescending ? <CaretDownIcon /> : <CaretUpIcon />) || <CaretDownIcon />}
            </th>
            <th data-id="wholesaleSales" onClick={handleSort}>
              <span>Wholesale Sales</span>
              {key === 'wholesaleSales' && (isDescending ? <CaretDownIcon /> : <CaretUpIcon />) || <CaretDownIcon />}
            </th>
            <th data-id="unitsSold" onClick={handleSort}>
              <span>Units Sold</span>
              {key === 'unitsSold' && (isDescending ? <CaretDownIcon /> : <CaretUpIcon />) || <CaretDownIcon />}
            </th>
            <th data-id="retailerMargin" onClick={handleSort}>
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
    </section>
  )
}

export default Table
