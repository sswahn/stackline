import { useState, useEffect } from 'react'
import { formatTableDate } from '../utilities/formatDate'
import CaretDownIcon from '../icons/CaretDownIcon'
import CaretUpIcon from '../icons/CaretUpIcon'
import Caret from './Caret'

const Table = ({ data }) => {
  const [state, setState] = useState([])
  const [sortKey, setSortKey] = useState(undefined)
  const [isDescending, setIsDescending] = useState(true)
  const [isSticky, setIsSticky] = useState(false)

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
      const aVal = id === 'weekEnding' ? new Date(a[id]).getTime() : a[id]
      const bVal = id === 'weekEnding' ? new Date(b[id]).getTime() : b[id]
      return isDescending ? bVal - aVal : aVal - bVal
    })
  }

  const handleSort = event => {
    const id = event.currentTarget.dataset.id
    const sorted = sortData(id)
    const formatted = formatData(sorted)
    setIsDescending(prevState => !prevState)
    setState(formatted)
    setSortKey(id)
  }

  const initializeState = () => {
    const init = formatData(data)
    setState(init)
  }

  const handleTableScroll = event => {
    const offset = event.target.scrollTop
    setIsSticky(offset > 0)
  }

  useEffect(() => {
    initializeState()
  }, [data])

  return (
    <section className="retail-table panel" onScroll={handleTableScroll}>
      <table id="table">
        <thead>
          <tr>
            {!!state.length && Object.keys(state[0]).map(item => (
              <th key={item} data-id={item} className={isSticky ? 'sticky-header' : ''} onClick={handleSort}>
                <span>{item.replace(/([A-Z])/g, ' $1')}</span>
                <Caret id={item} sortKey={sortKey} isDescending={isDescending} />
              </th>
            ))}
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
