
const Sidebar = ({ title, image, subtitle, tags }) => {
  return (
    <section className="sidebar panel">
      <header>
        <img src={image} alt={title} />
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </header>
      <nav>
        {tags.map(tag => <button key={tag} type="button">{tag}</button> )}
      </nav>
    </section>
  )
}

export default Sidebar