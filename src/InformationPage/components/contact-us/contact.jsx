import location from "../../icons/location.svg";
import call from "../../icons/call.svg";
import mail from "../../icons/message.svg";
import facebook from "../../icons/facebook-blue.svg";
import twitter from "../../icons/twitter-blue.svg";
import instagram from "../../icons/instagram-blue.svg";
import DRMap from "./map";

const Contact = () => {
    return (
        <div className="contact-back">
            <div className="contact-body">
                <h2>Contact Us</h2>
                <div className="contact-information">
                    <a href="https://goo.gl/maps/8pGrkVirMP5oNatn6" target="_blank" rel='noreferrer'>
                        <div className="information-item">
                            <img src={location} alt="location" />
                            <span className="text">Del Rosario Compound Neighborhood Association,
                                Brgy. Coloong, Valenzuela City</span>
                        </div>
                    </a>
                    <div className="information-item">
                        <img src={call} alt="call" />
                        <span className="text">(+63) 932 932 6611</span>
                    </div>
                    <div className="information-item">
                        <img src={mail} alt="message" />
                        <a href="mailto:delrosariocompound@gmail.com">
                            <span className="text">delrosariocompound@gmail.com</span>
                        </a>
                    </div>
                    <div className="contact-socials">
                        <a href="https://www.facebook.com/profile.php?id=100064776607979" target="_blank" rel="noreferrer"><img src={facebook} alt="facebook" /></a>
                        <a href="https://www.twitter.com" target="_blank" rel="noreferrer"><img src={twitter} alt="facebook" /></a>
                        <a href="https://www.instagram.com" target="_blank" rel="noreferrer"><img src={instagram} alt="facebook" /></a>
                    </div>

                    <div className="dr-map">
                        <DRMap center={[14.729633, 120.942985]} zoom={18} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;