import { Link } from "react-router-dom";
import arrowBack from "../icons/arrow-left-back.svg";
import useTitle from "../hooks/useTitle";

const NotFound = () => {
    useTitle("DRCNAI | Page Not Found")
    return (
        <div className="content">
            <div className="error-page">
                <div className="error-details">
                    <h2>404</h2>
                    <p className="heading">Page not <b>Found!</b></p>
                    <p className="subheading">This page doesn't exist or was removed! <br />
                        We suggest you to go back to Home.</p>
                    <div className="buttons">
                        <Link to="/">
                            <div className="back-home">
                                <img src={arrowBack} alt="back-to-home" />
                                BACK TO HOME</div>
                        </Link>
                        <Link to="/contact">
                            <div className="contact-us-button">CONTACT US</div>
                        </Link>
                    </div>
                </div>
                <div className="illustration not-found"></div>
            </div>
        </div>
    );
}

export default NotFound;