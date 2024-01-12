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
      <button type="button" onClick={toggleDropdown} ref={dropdownRef}>
        <EllipsisVerticalIcon /> 
      </button>
      <menu className={`${isOpen ? 'dropdown-open' : 'dropdown-closed'} panel`} ref={menuRef}>
        <li id="wholesale" onClick={onClick}>
          {selected.wholesale ? <CheckedIcon /> : <UncheckedIcon />}
          <div>Wholesale Sales</div>
        </li>
        <li id="unitsSold" onClick={onClick}>
          {selected.unitsSold ? <CheckedIcon /> : <UncheckedIcon />}
          <div>Units Sold</div>
        </li>
        <li id="retailerMargin" onClick={onClick}>
          {selected.retailerMargin ? <CheckedIcon /> : <UncheckedIcon />}
          <div>Retailer Margin</div>
        </li>
      </menu>
    </div>
  )
}

export default Dropdown
