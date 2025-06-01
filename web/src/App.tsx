import Nav from "./Components/Nav/Nav"
import "./App.css"
import { BrowserRouter} from "react-router-dom"
import Hero from "./Components/Hero/Hero"
import Benefits from "./Components/Benefits/Benefits"
import heroimg from "./assets/index.jpg"
import About from "./Components/About/About"
import Testimonials from "./Components/Testimonials/Testimonials"
import Contact from "./Components/Contact/Contact"
import Footer from "./Footer/Footer"
const App = () => {
  return (
    <div className="app_container">
      <BrowserRouter>
      <section className="allImg">
        <img src={heroimg} alt="hero img" />
        </section>
        <section className="app_content">
          <Nav />
          <Hero />
          <Benefits />
          <About/>
          <Testimonials/>
          <Contact/>
          <Footer/>
        </section>
      </BrowserRouter>
    </div>
  )
}

export default App
