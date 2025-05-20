import "./Nav.css"
const Nav = () => {
  return (
    <div className="nav_container">
        <span className="logo">
            PACO FINANCE SYSTEM
        </span>
        <section className="navigations">
            <a href="#home" >Home</a>
            <a href="#benefits" >Benefits</a>
            <a href="#about" >About</a>
            <a href="#testimonials" >Testimonials</a>
            <a href="#contact" >Contact</a>
        </section>
    </div>
  )
}

export default Nav
