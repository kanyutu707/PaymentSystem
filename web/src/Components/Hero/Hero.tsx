import { BiLogoPlayStore } from "react-icons/bi";
import "./Hero.css"
import { GrAppleAppStore } from "react-icons/gr";

const Hero = () => {
  return (
    <div className="hero_container" id="home">
      <section className="hero_img">
    
      </section>
      <section className="hero_cover">
        <span className="hero_text">
            Securum Solutio IS A FINANCE SYSTEM THAT AIMS TO ENSURE THAT EVERY TRANSACTION IS HANDLED SECURELY. OUR PRIMARY OBJECTIVE IS TO FACILITATE FUTURE PAYMENT THIS MAY BE INTERMS OF PAYING FOR A SERVICE OR A PRODUCT WHERE THE SELLER NEEDS TO CONFIRM AVAILABILITY OF FUNDS AND THE BUYER NEEDS TO ENSURE THE DELIVERY OF PRODUCTS
            <span className="hero_buttons">
                <button><BiLogoPlayStore/> DOWNLOAD FROM PLAYSTORE</button>
                <button><GrAppleAppStore/> DOWNLOAD FROM APPLE STORE</button>
            </span>
        </span>
       
      </section>
    </div>
  )
}

export default Hero
