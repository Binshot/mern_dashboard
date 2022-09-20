import React from 'react';

import useTitle from "../hooks/useTitle";
import AboutSlider from "../components/home/about-slider";

const HomePage = () => {
    useTitle("DRCNAI");

    return (
        <div className="home">
            <AboutSlider />
        </div>
    );
}

export default HomePage;