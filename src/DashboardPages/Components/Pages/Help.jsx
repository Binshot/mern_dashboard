import Content from "../HelpComponents/Content"
import React from "react";
import useTitle from "../../hooks/useTitle"
function Help() {
    useTitle("DRIMS | Help")
    return (
        <div id="mainContentBlur" className="content">
            <Content />
        </div>
    );
}

export default Help;