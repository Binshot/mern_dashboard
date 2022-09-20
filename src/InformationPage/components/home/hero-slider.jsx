import React, { Component } from "react";
import Slider from "react-slick";
import sliderPrev from "../../icons/slider-prev.svg";
import sliderNext from "../../icons/slider-next.svg";


class HeroSlider extends Component {
    renderArrows = () => {
        return (
            <div className="slider-arrow">
                <div className="arrow-prev" onClick={() => this.slider.slickPrev()}>
                    <img src={sliderPrev} alt="previous-slide" />
                </div>
                <div className="arrow-next" onClick={() => this.slider.slickNext()}>
                    <img src={sliderNext} alt="next-slide" />
                </div>
            </div>
        );
    };

    render() {
        const settings = {
            ref: c => (this.slider = c),
            dots: true,
            fade: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            arrows: false,
            slidesToScroll: 1,
            className: "slides",
            customPaging: i => (
                <div
                    className="custom-dots"
                >
                </div>
            )
        };

        const images = this.props.images;

        return (
            <div className="slider-container">
                {this.renderArrows()}
                <Slider {...settings}>
                    {images.map((image, index) => {
                        return (
                            <div key={index}>
                                <div className="container">
                                    <img src={image} alt="" />
                                    <div className="overlay"></div>
                                </div>
                            </div>
                        )
                    })}
                </Slider>
            </div>
        );
    };
}

export default HeroSlider;