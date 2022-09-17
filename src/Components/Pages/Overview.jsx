import Summary from "../OverviewComponents/Summary"
import Header from "../OverviewComponents/GraphHeader"
import Graphs from "../OverviewComponents/Graphs"
import React from "react";
import { ResidentContextProvider } from '../../context/ResidentContext'

export default function Overview() {
    return (
        <div>
            <ResidentContextProvider>
                <div className="flex-row">
                    <Summary />
                </div>
            </ResidentContextProvider>
            <div className="graph">
                <Header />
                <Graphs />
            </div>
        </div>
    );
}
