import Summary from "../OverviewComponents/Summary"
import Graphs from "../OverviewComponents/Graphs"
import React from "react";
import { ResidentContextProvider } from '../../context/ResidentContext'

export default function Overview() {
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
