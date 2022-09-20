import History from "../components/about-us/history";
import FAQs from "../components/about-us/faqs";
import MoreQuestions from "../components/about-us/more-questions";
import useTitle from "../hooks/useTitle";

const AboutPage = () => {
    useTitle("DRCNAI | About Us")
    return ( 
        <div className="about-page">
            <History />
            <FAQs />
            <MoreQuestions />
        </div>
     );
}
 
export default AboutPage;