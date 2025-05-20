import { IoCall } from "react-icons/io5"
import { LiaLocationArrowSolid } from "react-icons/lia"
import { MdEmail } from "react-icons/md"
import "./Contact.css"

const Contact = () => {
  return (
    <div className="contact_container" id="contact">
        <section className="contacts">
            <header className="getintouch">GET IN TOUCH WITH US</header>
            <span className="contact">
                <h3><IoCall/> Phone No:</h3>
                <h4>+254000000000</h4>
            </span>
            <span className="contact">
                <h3><MdEmail/> EMAIL: </h3>
                <h4>abc@abc.com</h4>
            </span>
            <span className="contact">
                <h3><LiaLocationArrowSolid/> Location</h3>
                <h4>1st floor building</h4>
            </span>
        </section>
        <form action="" className="contact_form">
            <span className="input_group">
                <label htmlFor="email">EMAIL</label>
                <input type="email"  placeholder="email"/>
            </span>
            <span className="input_group">
                <label htmlFor="subject">SUBJECT</label>
                <input type="text" placeholder="subject" />
            </span>
            <span className="description_group">
                <label htmlFor="comment">COMMENT</label>
                <textarea name="" id="" placeholder="comment"></textarea>
            </span>
            <button className="feedback_button">SUBMIT FEEDBACK</button>
        </form>
    </div>
  )
}

export default Contact