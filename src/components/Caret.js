import CaretDownIcon from '../icons/CaretDownIcon'
import CaretUpIcon from '../icons/CaretUpIcon'

const Caret = ({ id, sortKey, isDescending }) => {
  return sortKey === id && (isDescending ? <CaretDownIcon /> : <CaretUpIcon />) || <CaretDownIcon />
}

export default Caret
