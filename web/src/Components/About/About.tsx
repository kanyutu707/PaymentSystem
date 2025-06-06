import { FcAbout } from "react-icons/fc"
import "./About.css"
const About = () => {
  return (
    <div className="about_container" id="about">
      <header className="about_header">ABOUT CENTAL PAYMENTS</header>
      <FcAbout/>
      <span className="about_text">
       (1) CENTAL PAYMENTS (Secure payment) is a <u><b>payment security services</b></u>. This means that by using CENTAL PAYMENTS as a product and / or service provider you are ensured that the payment once you have confirmed its deposit cannot be withdrawn by the buyer unless both of you agree.
        On the other hand if you are the buyer you are assured that the service/ product provider cannot withdraw your money unless you authorize it. This creates a harmonious environment where neither the buyer nor the seller has to worry about the security of the payment<br/>
      (2) The platform ensures <u><b>smooth integration</b></u> with other financial services so that you don't have to hustle when it comes to withdrawals, transfers and deposit<br/>
      (3) Use the platform as a <u><b>savings method</b></u> where you can lock your money for a given period of time and withdraw it at your convenience<br/>
      (4) <u><b>Joint account</b></u> feature helps you and another party keep your money safe where you and the other party can<br/>
      <ol>
        <li>Withdraw the money together</li>
        <li>Withdraw the money separately</li>
      </ol>
      </span>
    </div>
  )
}

export default About