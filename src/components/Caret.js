import CaretDownIcon from '../icons/CaretDownIcon'
import CaretUpIcon from '../icons/CaretUpIcon'

const Caret = ({ direction }) => {
  return direction ? <CaretDownIcon /> : <CaretUpIcon />
}

export default Caret
