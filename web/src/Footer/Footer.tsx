import { BiSupport } from "react-icons/bi"
import { FcPrivacy, FcRules } from "react-icons/fc"
import { Link } from "react-router-dom"
import "./Footer.css"

const Footer = () => {
  return (
    <div className="footer_container">
        <header className="footer_header">
            CENTAL PAYMENTS
        </header>
        <section className="footer_options">
            <Link to="#"><FcRules/> Terms Of Service</Link>
            <Link to="#"><FcPrivacy/> Privacy Policy</Link>
            <Link to="#"><BiSupport/>Support</Link>
        </section>
    </div>
  )
}

export default Footer