
const CustomTooltip = ({ active, payload, label }) => {

//  console.log('active: ', active)
//  console.log('payload: ', payload)
//  console.log('label: ', label)
  
  const formatDate = date => {
    const month = date.split('-').at(1)
    const monthNames = [
      'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
    ]
    return monthNames[parseInt(month, 10) - 1]
  }
  
  const formatName = name => {
    return name.replace(/([A-Z])/g, ' $1').charAt(0).toUpperCase()
  }

  const formatValue = (name, value) => {
    //console.log('name: ', name)
   // console.log('value: ', value)
    return name === 'weekEnding' || name === 'unitsSold' ? value : `$${parseInt(value, 10).toLocaleString()}`
  } 
  
  return active && payload ? (
    <div className="custom-tooltip panel">
      <p>{formatDate(label)}</p>
      {payload.map((entry, index) => {
    
        console.log('entry: ', entry)
    
        return (
        <p key={`item-${index}`} style={{ color: entry.color }}>
          {`${formatName(entry.name)}: ${formatValue(entry.value)}`}
        </p>
      )})}
    </div>
  ) : null
}

export default CustomTooltip
