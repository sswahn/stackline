
const CustomTooltip = ({ active, payload, label }) => {

   console.log('active: ', active)
   console.log('payload: ', payload)
  
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
    return name === 'weekEnding' || name === 'unitsSold' ? value : `$${parseInt(value, 10).toLocaleString()}`
  }

  const formatData = (name, value) => {
    return `${formatName(name)}: ${formatValue(name, value)}`
  }
  
  return active && payload ? (
    <div className="custom-tooltip panel">
      <p>{formatDate(label)}</p>
      {payload.map((entry, index) => (
        <p key={`item-${index}`} style={{ color: entry.color }}>
          {formatData(entry.name, entry.value)}
        </p>
      ))}
    </div>
  ) : null
}

export default CustomTooltip
