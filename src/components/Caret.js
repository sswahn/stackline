import CaretDownIcon from '../icons/CaretDownIcon'
import CaretUpIcon from '../icons/CaretUpIcon'

const Caret = ({ id, sortKey, direction }) => {
  return sortKey === id && (direction ? <CaretDownIcon /> : <CaretUpIcon />) || <CaretDownIcon />
}

export default Caret
