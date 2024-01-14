import { useState } from 'react'
import Modal from './Modal'

const Sidebar = ({ data }) => {
  const [modal, setModal] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const handleOnClick = event => {
    setModal('test string')
    setIsOpen(true)
  }

  const handleOnClose = () => {
    setIsOpen(false)
    setModal('')
  }
  
  return (
    <section className="sidebar panel">
      <header>
        <img src={data.image} alt={data.title} />
        <h2>{data.title}</h2>
        <p>{data.subtitle}</p>
      </header>
      <nav>
        {data.tags.map(tag => (
          <button key={tag} onClick={handleOnClick}>{tag}</button>
        ))}
      </nav>
      <Modal open={isOpen} onClose={handleOnClose}>
        <p>{modal}</p>
      </Modal>
    </section>
  )
}

export default Sidebar
