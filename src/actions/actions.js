import data from '../data.json'

export const fetchData = () => ({
  type: 'FETCH_RETAIL_SALES',
  payload: data
})
