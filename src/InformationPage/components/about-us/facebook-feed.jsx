import React from "react";

const FacebookFeed = () => {
    return (
        <iframe
                title="facebook-feed"
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FDel-Rosario-Compound-Neighborhood-Association-196266153858066&tabs=timeline&width=500&height=800&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                height="800"
                style={{ border: "none", overflow: "hidden", width: "100%" }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
            </iframe>
    )
};

export default FacebookFeed;