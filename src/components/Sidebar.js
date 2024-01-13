
const Sidebar = ({ data }) => {
  return (
    <section className="sidebar panel">
      <header>
        <img src={data.image} alt={data.title} />
        <h2>{data.title}</h2>
        <p>{data.subtitle}</p>
      </header>
      <nav>
        {data.tags.map(tag => <button key={tag} type="button">{tag}</button> )}
      </nav>
    </section>
  )
}

export default Sidebar
