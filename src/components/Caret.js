import CaretDownIcon from '../icons/CaretDownIcon'
import CaretUpIcon from '../icons/CaretUpIcon'

const Caret = ({ direction }) => {
  return direction === 'down' ? <CaretDownIcon /> : <CaretUpIcon />
}

export default Caret
