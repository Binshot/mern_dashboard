import { Link } from 'react-router-dom';

const MoreQuestions = () => {
    return (
        <div className="section-dark">
            <div className="more-questions">
                <h3>Do you still have a question?</h3>
                <p>If you cannot find an answer to your question in our FAQs,
                    go to our Contact Us page by clicking here! We will answer to you shortly!</p>
                <Link to="/contact">
                    <div className="contact-us">CONTACT US</div>
                </Link>
            </div>
        </div>
    );
}

export default MoreQuestions;