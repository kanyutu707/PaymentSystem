import { MdPayment } from "react-icons/md"
import "./Benefits.css"
import { GiDeliveryDrone } from "react-icons/gi"
import { GrTransaction } from "react-icons/gr"
const Benefits = () => {
  return (
    <div className="benefits_container" id="benefits">
      <header className="benefits_header">
        BENEFITS OF Securum Solutio
      </header>
      <section className="benefits">
        <span className="benefit">
          <GiDeliveryDrone/>
          <h3>GUARANTEED DELIVERY</h3>
          <h4>With Securum Solutio money doesn't leave the account unless authorized by the owner</h4>
        </span>
        <span className="benefit">
          <MdPayment/>
          <h3>GUARANTEED PAYMENTS</h3>
          <h4>Payment once confirmed cannot be removed from the account unless both the owner and service provider agree</h4>
        </span>
        <span className="benefit">
          <GrTransaction/>
          <h3>CONVENIENT TRANSACTIONS</h3>
          <h4>Deposit or withdraw money from the account by use of various services</h4>
        </span>

      </section>
    </div>
  )
}

export default Benefits