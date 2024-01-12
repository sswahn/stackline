import Sidebar from './Sidebar'
import LineChart from './LineChart'
import Table from './Table'
import { useSelector } from 'react-redux'

const RetailSales = () => {
  const { title, image, subtitle, tags, sales } = useSelector(state => state.data.retailSales).at(0)

  return (
    <div className="retail-sales">
      <Sidebar title={title} image={image} subtitle={subtitle} tags={tags} />
      <div>
        <LineChart data={sales} /> 
        <Table data={sales} />
      </div>
    </div>
  )
}

export default RetailSales
