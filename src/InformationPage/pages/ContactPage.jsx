import Contact from "../components/contact-us/contact";
import useTitle from "../hooks/useTitle";

const ContactPage = () => {
    useTitle("DRCNAI | Contact Us")
    return (
        <div className="contact-page">
            <Contact />
        </div>
    );
}

export default ContactPage;