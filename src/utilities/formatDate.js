export const formatChartDate = date => {
  const month = date.split('-').at(1)
  const monthNames = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ]
  return monthNames[parseInt(month, 10) - 1]
}

export const formatTableDate = date => {
  const [year, month, day] = date.split('-')
  const shortYear = year.slice(2)
  return `${month}-${day}-${shortYear}`
}