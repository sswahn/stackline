import CaretDownIcon from '../icons/CaretDownIcon'
import CaretUpIcon from '../icons/CaretUpIcon'

const Caret = ({ id, key, direction }) => {
  return key === id && (direction ? <CaretDownIcon /> : <CaretUpIcon />) || <CaretDownIcon />
}

export default Caret
