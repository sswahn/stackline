import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import store from './store/store'
import Header from './components/Header'
import Sales from './components/Sales'
import Footer from './components/Footer'
import Modal from './components/Modal'
import './index.css'

const App = () => {
  return (
    <StrictMode>
      <Provider store={store}>
        <Header />
        <Sales />
        <Footer />
        <Modal />
      </Provider>
    </StrictMode>
  )
}

export default App
