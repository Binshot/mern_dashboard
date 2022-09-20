import { Link } from 'react-router-dom';
import logo from "../images/logo.png";
import facebook from "../icons/facebook.svg";
import twitter from "../icons/twitter.svg";
import instagram from "../icons/instagram.svg";

const Footer = () => {
    return (
        <div className='footer'>
            <img src={logo} alt="" className='logo' />
            <div className="system-name">DEL ROSARIO INFORMATION MANAGEMENT SYSTEM</div>
            <div className="footer-links">
                <Link to="/">HOME</Link>
                <Link to="/about">ABOUT US</Link>
                <Link to="/contact">CONTACT US</Link>
            </div>
            <div className="footer-socials">
                <a href="https://www.facebook.com" target="_blank" rel='noreferrer'>
                    <div className="social-link">
                        <img src={facebook} alt="" />
                    </div>
                </a>
                <a href="https://www.twitter.com" target="_blank" rel='noreferrer'>
                    <div className="social-link">
                        <img src={twitter} alt="" />
                    </div>
                </a>
                <a href="https://www.instagram.com" target="_blank" rel='noreferrer'>
                    <div className="social-link">
                        <img src={instagram} alt="" />
                    </div>
                </a>
            </div>
            <div className="footer-copyright">Copyright © 2022. DRCNAI. All rights reserved.</div>
        </div>
    );
}

export default Footer;