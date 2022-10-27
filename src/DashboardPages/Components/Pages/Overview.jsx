import Summary from "../OverviewComponents/Summary"
import Graphs from "../OverviewComponents/Graphs"
import React from "react";
import { ResidentContextProvider } from '../../context/ResidentContext'
import useTitle from "../../hooks/useTitle"
export default function Overview() {
    useTitle("DRIMS | Overview")
    return (
        <div id="mainContentBlur">
            <ResidentContextProvider>
                <div className="flex-row">
                    <Summary />
                </div>
            </ResidentContextProvider>
            <div className="graph">
                <Graphs />
            </div>
        </div>
    );
}
