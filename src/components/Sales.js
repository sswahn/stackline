import { useSelector } from 'react-redux'
import Sidebar from './Sidebar'
import LineChart from './LineChart'
import Table from './Table'

const Sales = () => {
  const { sales, ...rest } = useSelector(state => state.data.retailSales).at(0)
  const sumMonetary = sales.reduce((acc, val) => acc + val.retailSales + val.wholesaleSales + val.retailerMargin, 0)
  const sumQuantity = sales.reduce((acc, val) => acc + val.unitsSold, 0)
  const normalizedData = sales.map(item => ({
    retailSales: item.retailSales / sumMonetary * 100,
    wholesaleSales: item.wholesaleSales / sumMonetary * 100,
    unitsSold: item.unitsSold / sumQuantity * 100,
    retailerMargin: item.retailerMargin / sumMonetary * 100
  }))

  console.log('normalizedData: ', normalizedData)

  return (
    <div className="retail-sales">
      <Sidebar data={rest} />
      <div>
        <LineChart data={normalizedData} /> 
        <Table data={normalizedData} />
      </div>
    </div>
  )
}

export default Sales
