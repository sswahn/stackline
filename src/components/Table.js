import { useState, useEffect } from 'react'
import Caret from './Caret'

const Table = ({ data }) => {
  const [state, setState] = useState([])
  const [sortKey, setSortKey] = useState(undefined)
  const [isDescending, setIsDescending] = useState(true)
  const [isScrolling, setIsScrolling] = useState(false)

  const formatDate = date => {
    const [year, month, day] = date.split('-')
    const shortYear = year.slice(2)
    return `${month}-${day}-${shortYear}`
  }

  const formatEntry = entry => {
    return `$${parseInt(entry, 10).toLocaleString()}`
  }

  const formatData = array => {
    return array.map(item => ({
      weekEnding: formatDate(item.weekEnding),
      retailSales: formatEntry(item.retailSales),
      wholesaleSales: formatEntry(item.wholesaleSales),
      unitsSold: item.unitsSold,
      retailerMargin: formatEntry(item.retailerMargin)
    }))
  }

  const formatSort = (id, value) => {
    return id === 'weekEnding' ? new Date(value[id]).getTime() : value[id]
  }

  const sortData = id => {
    return [...data].sort((a, b) => {
      const aVal = formatSort(id, a)
      const bVal = formatSort(id, b)
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

  const handleScrollEffect = event => {
    setIsScrolling(event.target.scrollTop > 0)
  }

  useEffect(() => {
    setState(formatData(data))
  }, [data])

  return (
    <section className="retail-table panel" onScroll={handleScrollEffect}>
      <table>
        <thead>
          <tr>
            {!!state.length && Object.keys(state[0]).map(item => (
              <th key={item} className={isScrolling ? 'scrolling' : ''}>
                <div data-id={item} onClick={handleSort}>
                  <span>{item.replace(/([A-Z])/g, ' $1')}</span>
                  <Caret id={item} sortKey={sortKey} isDescending={isDescending} />
                </div>
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
        <tfoot>
          <tr>
            <td>&nbsp;</td>
          </tr>
        </tfoot>
      </table>
    </section>
  )
}

export default Table
