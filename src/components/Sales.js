import { useSelector } from 'react-redux'
import Sidebar from './Sidebar'
import LineChart from './LineChart'
import Table from './Table'

const Sales = () => {
  const { sales, ...rest } = useSelector(state => state.data.retailSales).at(0)
  const totalMonetaryValue = sales.reduce((acc, val) => acc + val.retailSales + val.wholesaleSales + val.retailerMargin, 0)
  const totalUnitsSold = sales.reduce((acc, val) => acc + val.unitsSold, 0)
  const percentages = sales.map(item => ({
    weekEnding: item.weekEnding,
    retailSales: item.retailSales / totalMonetaryValue * 100,
    wholesaleSales: item.wholesaleSales / totalMonetaryValue * 100,
    unitsSold: item.unitsSold / totalUnitsSold * 100,
    retailerMargin: item.retailerMargin / totalMonetaryValue * 100
  }))

  const maxPercentage = Math.max(...percentages.map(item => Object.values(item)).flat())

  const normalizedData = percentages.map(item => ({
    weekEnding: item.weekEnding,
    retailSales: item.retailSales / maxPercentage,
    wholesaleSales: item.wholesaleSales / maxPercentage,
    unitsSold: item.unitsSold / maxPercentage,
    retailerMargin: item.retailerMargin / maxPercentage
  }))

  console.log('normalizedData: ', normalizedData)

  return (
    <div className="retail-sales">
      <Sidebar data={rest} />
      <div>
        <LineChart data={normalizedData} /> 
        <Table data={sales} />
      </div>
    </div>
  )
}

export default Sales
