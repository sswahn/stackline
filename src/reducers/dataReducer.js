const initialState = {
  retailSales: []
}

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_RETAIL_SALES':
      return { ...state, retailSales: action.payload }
    default:
      return state
  }
}

export default dataReducer
