export const formatTableDate = date => {
  const [year, month, day] = date.split('-')
  const shortYear = year.slice(2)
  return `${month}-${day}-${shortYear}`
}
