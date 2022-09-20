import FacebookFeed from "./facebook-feed";

const History = () => {
    return (
        <div className="section-dark">
            <div className="informationContent">
                <h2>HISTORY</h2>
                <div className="history">
                    <div className="left">
                        <p>Del Rosario Compound Neighborhood Association, Inc. (DRCNAI) comprises
                            106 families that recently acquired a 4,604-square meter private
                            property in Barangay Coloong 1 that they have been informally
                            occupying for over five decades now.
                            <br /><br />
                            Although reported as being generally dry, in the past 15 years, the
                            residents say that their housing site is now permanently flooded.
                            <br /> <br />
                            DRCNAI's site is located in a low-lying area abutting fishpens that
                            extend from the middle of Malanday River. Malanday River and the
                            surrounding fishpond receive drainage and storm water from the built
                            up areas around the fishponds.
                            <br /> <br />
                            Footpath in the DRCNAI compound,
                            underwater after days of rain. In the 1980s, flood levels were
                            observed to rise, although it would not take long for the flood to
                            subside. Flood height further increased during the late 1990s through
                            the 2000s.
                            <br /> <br />
                            However, starting in 1998, the water no longer drained out
                            of the site. Consequently, the area is now permanently under water.</p>
                    </div>
                    <div className="right">
                        <FacebookFeed />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default History;