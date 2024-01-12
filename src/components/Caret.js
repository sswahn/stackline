import CaretDownIcon from '../icons/CaretDownIcon'
import CaretUpIcon from '../icons/CaretUpIcon'

const Caret = ({ direction = 'down' }) => {
  return direction === 'down' ? <CaretDownIcon /> : <CaretUpIcon />
}

export default Caret
