import Container from "../ResidentsComponents/Container"

import { ResidentContextProvider } from '../../context/ResidentContext'
import React from "react";

function Residents() {
    return (
        <ResidentContextProvider>
            <Container />
        </ResidentContextProvider>
    );
}

export default Residents;