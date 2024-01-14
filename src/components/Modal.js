import { useEffect, useRef } from 'react'

const Modal = ({ open, children }) => {
  const dialogRef = useRef(null)
  
  const openModal = () => {
    dialogRef.current.showModal()
  }
  
  const closeModal = event => {
    dialogRef.current.close()
  }

  const clickToClose = event => {
    if (event.target === dialogRef.current) {
      closeModal()
    }
  }
  
  const toggleModal = () => {
    open ? openModal() : closeModal()
  }
  
  useEffect(() => {
    toggleModal()
  }, [open])

  useEffect(() => {
    document.addEventListener('mousedown', clickToClose)
    return () => {
      document.removeEventListener('mousedown', clickToClose)
    }
  }, [])
  
  
  return (
    <dialog className="modal" ref={dialogRef}>
      <div>{children}</div>
    </dialog>
  )
}

export default Modal
