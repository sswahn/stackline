import { createStore } from 'redux'
import rootReducer from '../reducers/rootReducer'
import { fetchData } from '../actions/actions'

const store = createStore(rootReducer)

store.dispatch(fetchData())

export default store
