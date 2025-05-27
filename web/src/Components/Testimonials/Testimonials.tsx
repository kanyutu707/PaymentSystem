import "./Testimonials.css"
import avatar from "../../assets/avatar-2027365_1920.png";
import { BiComment } from "react-icons/bi";
const Testimonials = () => {
  return (
    <div className="testimonials_container" id="testimonials">
        <header className="testimonials_header">
           <BiComment/> TESTIMONIALS
        </header>
        
        <section className="testimonials">
            <div className="testimonial">
                <span className="testimonial_header">
                    <img src={avatar} alt="persons avatar" />
                    <span className="testimonial_header_details">
                        <h3>John Doe</h3>
                        <h4>CEO, Unknown</h4>
                    </span>
                </span>
                <span className="testimonial_details">
                    Since we started using Securum Solutio to process payments we have found that we are able to be paid for every work that we deliver on top of that the system also gives us real time analysis of our finances
                </span>
            </div>
            <div className="testimonial">
                <span className="testimonial_header">
                    <img src={avatar} alt="persons avatar" />
                    <span className="testimonial_header_details">
                        <h3>John Doe</h3>
                        <h4>CEO, Unknown</h4>
                    </span>
                </span>
                <span className="testimonial_details">
                    Since we started using Securum Solutio to process payments we have found that we are able to be paid for every work that we deliver on top of that the system also gives us real time analysis of our finances
                </span>
            </div>
            <div className="testimonial">
                <span className="testimonial_header">
                    <img src={avatar} alt="persons avatar" />
                    <span className="testimonial_header_details">
                        <h3>John Doe</h3>
                        <h4>CEO, Unknown</h4>
                    </span>
                </span>
                <span className="testimonial_details">
                    Since we started using Securum Solutio to process payments we have found that we are able to be paid for every work that we deliver on top of that the system also gives us real time analysis of our finances
                </span>
            </div>
            <div className="testimonial">
                <span className="testimonial_header">
                    <img src={avatar} alt="persons avatar" />
                    <span className="testimonial_header_details">
                        <h3>John Doe</h3>
                        <h4>CEO, Unknown</h4>
                    </span>
                </span>
                <span className="testimonial_details">
                    Since we started using Securum Solutio to process payments we have found that we are able to be paid for every work that we deliver on top of that the system also gives us real time analysis of our finances
                </span>
            </div>
        </section>
    </div>
  )
}

export default Testimonials