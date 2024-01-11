import { useState, useEffect, useRef } from 'react'
import EllipsisVerticalIcon from '../icons/EllipsisVerticalIcon'
import UncheckedIcon from '../icons/UncheckedIcon'
import CheckedIcon from '../icons/CheckedIcon'

const Dropdown = ({ onClick, selected }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const menuRef = useRef(null)
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const clickToClose = event => {
    if (!menuRef.current.contains(event.target) && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', clickToClose)
    return () => {
      document.removeEventListener('mousedown', clickToClose)
    }
  }, [])
  
  return (
    <div className="dropdown">
      <button type="button" onClick={toggleDropdown} ref={dropdownRef} aria-label="dropdown button" aria-haspopup="true" aria-expanded={isOpen}>
        <EllipsisVerticalIcon /> 
      </button>
      <menu className={`${isOpen ? 'dropdown-open' : 'dropdown-closed'} panel`} ref={menuRef} aria-hidden={!isOpen}>
        <li onClick={onClick} role="menuitem">
          {selected.wholesale ? <CheckedIcon /> : <UncheckedIcon />}
          <div>Wholesale Sales</div>
        </li>
        <li onClick={onClick} role="menuitem">
          {selected.unitsSold ? <CheckedIcon /> : <UncheckedIcon />}
          <div>Units Sold</div>
        </li>
        <li onClick={onClick} role="menuitem">
          {selected.retailerMargin ? <CheckedIcon /> : <UncheckedIcon />}
          <div>Retailer Margin</div>
        </li>
      </menu>
    </div>
  )
}

export default Dropdown