import React, { useState } from "react";
import accordionPlus from "../../icons/accordion-plus.svg";
import accordionMinus from "../../icons/accordion-minus.svg";

const FAQs = () => {
    function Accordion({ title, content }) {
        const [isActive, setIsActive] = useState(false);

        return (
            <div className="accordion-item">
                <div
                    className="accordion-title"
                    onClick={() => setIsActive(!isActive)}
                    style={{ color: isActive ? "#0C1096" : "" }}
                >
                    <div>{title}</div>
                    <div className="accordion-icon">
                        {(isActive) ? <img src={accordionMinus} alt="close-accordion" /> : <img src={accordionPlus} alt="open-accordion" />}
                    </div>
                </div>
                {isActive && <div className="accordion-content">{content}</div>}
                <hr />
            </div>
        );
    }
    const accordionData = [
        {
            key: "1",
            title: "Lorem ipsum dolor sit amet.",
            content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
          laborum cupiditate possimus labore, hic temporibus velit dicta earum
          suscipit commodi eum enim atque at? Et perspiciatis dolore iure
          voluptatem.`
        },
        {
            key: "2",
            title: "Lorem ipsum dolor sit amet.",
            content: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia veniam
          reprehenderit nam assumenda voluptatem ut. Ipsum eius dicta, officiis
          quaerat iure quos dolorum accusantium ducimus in illum vero commodi
          pariatur? Impedit autem esse nostrum quasi, fugiat a aut error cumque
          quidem maiores doloremque est numquam praesentium eos voluptatem amet!
          Repudiandae, mollitia id reprehenderit a ab odit!`
        },
        {

            key: "3",
            title: "Lorem ipsum dolor sit amet.",
            content: `Sapiente expedita hic obcaecati, laboriosam similique omnis architecto ducimus magnam accusantium corrupti
          quam sint dolore pariatur perspiciatis, necessitatibus rem vel dignissimos
          dolor ut sequi minus iste? Quas?`
        }
    ];

    return (
        <div className="informationContent">
            <h2>FREQUENTLY ASKED QUESTIONS</h2>
            <div className="faqs">
                <div className="general-inquiries">
                    <div className="faqs-body">
                        <h3>General Inquiries</h3>
                        {accordionData.map(({ key, title, content }) => (
                            <Accordion key={key} title={title} content={content} />
                        ))}
                    </div>
                </div>
                <div className="other-information">
                    <div className="faqs-body">
                        <h3>Other Information</h3>
                        {accordionData.map(({ key, title, content }) => (
                            <Accordion key={key} title={title} content={content} />
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default FAQs;