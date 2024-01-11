import logo from '../assets/images/stackline.svg'
const Header = () => {
  return (
    <header className="banner">
      <h1>
        <img src={logo} alt="Stackline" />
      </h1>
    </header>
  )
}

export default Header