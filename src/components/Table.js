import { useState, useEffect, useRef } from 'react'
import Caret from './Caret'

const Table = ({ data }) => {
  const [state, setState] = useState([])
  const [sortKey, setSortKey] = useState(undefined)
  const [isDescending, setIsDescending] = useState(true)
  const [isScrolling, setIsScrolling] = useState(false)
  const tableContainerRef = useRef(null)

  const formatDate = date => {
    const [year, month, day] = date.split('-')
    const shortYear = year.slice(2)
    return `${month}-${day}-${shortYear}`
  }

  const formatData = array => {
    return array.map(item => ({
      weekEnding: formatDate(item.weekEnding),
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

  const handleScrollEffect = () => {
    setIsScrolling(tableContainerRef.current.scrollTop > 0)
  }

  useEffect(() => {
    setState(formatData(data))
  }, [data])

  useEffect(() => {
    const container = tableContainerRef.current
    container.addEventListener('scroll', handleScrollEffect)
    return () => {
      container.removeEventListener('scroll', handleScrollEffect)
    }
  }, [])

  return (
    <section className="retail-table panel" ref={tableContainerRef}>
      <table>
        <thead>
          <tr>
            {!!state.length && Object.keys(state[0]).map(item => (
              <th key={item} className={isScrolling ? 'scrolling' : ''}>
                <div data-id={item} onClick={handleSort} style={{ 
                  border: '1px dashed red',
                  cursor: 'pointer',
                  display: 'inline-block'
                }}>
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
      </table>
    </section>
  )
}

export default Table
