import { useState } from 'react'
import Modal from './Modal'

const Sidebar = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOnClick = event => {
    // display some item from data in modal
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
      <Modal open={isOpen} />
    </section>
  )
}

export default Sidebar
