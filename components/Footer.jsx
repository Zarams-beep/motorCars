import { PiCarSimpleBold } from "react-icons/pi";
const Footer =()=>{
    return(
        <>
            <footer>
                <div className="logo">
                        <PiCarSimpleBold className="logoIcons"/>
                        <p>Quick Moving</p>
                        <p className="smallCopy">&copy;2024</p>
                    </div>
                <div className="terms">
                    <h2>Terms</h2>
                    <div className="terms2">
                        <p>Meet the Teams</p>
                        <p>FAQ</p>
                        <p>Code of Conduct</p>
                        <p>Privacy Policy</p>
                        <p>Terms and Condition</p>
                    </div>
                </div>

                <div className="getInvolved">
                    <h2>Get Involved</h2>
                    <div className="getInvolved2">
                        <p>Partner With Us</p>
                        <p>Annual Report</p>
                        <p>Upcoming Events</p>
                        <p>Contact Us</p>
                        <p>Follow Us On Social Media</p>
                    </div>
                </div>
            </footer>
        </>
    )
}
export default Footer