import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import store from './store/store'
import Header from './components/Header'
import RetailSales from './components/RetailSales'
import Footer from './components/Footer'
import './index.css'

const App = () => {
  return (
    <StrictMode>
      <Provider store={store}>
        <Header />
        <RetailSales />
        <Footer />
      </Provider>
    </StrictMode>
  )
}

export default App
