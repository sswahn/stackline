import { useSelector } from 'react-redux'
import Sidebar from './Sidebar'
import LineChart from './LineChart'
import Table from './Table'

const Sales = () => {
  const { sales, ...rest } = useSelector(state => state.data.retailSales).at(0)

  return (
    <div className="retail-sales">
      <Sidebar data={rest} />
      <div>
        <LineChart data={sales} /> 
        <Table data={sales} />
      </div>
    </div>
  )
}

export default Sales
