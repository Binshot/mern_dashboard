import Summary from "../OverviewComponents/Summary"
import Activity from "../OverviewComponents/recentActivity"
import Messages from "../OverviewComponents/RecentMessages"
import Header from "../OverviewComponents/GraphHeader"
import Graphs from "../OverviewComponents/Graphs"
import React from "react";

export default function Overview() {
    return (
        <div>
            <div className="flex-row">
                <Summary />
            </div>
            <div className="graph">
                <Header />
                <Graphs />
            </div>
        </div>
    );
}
