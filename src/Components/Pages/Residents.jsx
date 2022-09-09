import Header from "../ResidentsComponents/Header"
import ResidentsTable from "../ResidentsComponents/ResidentsTable"

import { ResidentContextProvider } from '../../context/ResidentContext'
import React from "react";

function Residents() {
    return (
        <ResidentContextProvider>
            <div className="content">
                <Header />
                <ResidentsTable />
            </div>
        </ResidentContextProvider>
    );
}

export default Residents;