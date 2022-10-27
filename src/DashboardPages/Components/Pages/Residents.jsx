import Container from "../ResidentsComponents/Container"

import { ResidentContextProvider } from '../../context/ResidentContext'
import React from "react";
import useTitle from "../../hooks/useTitle"
function Residents() {
    useTitle("DRIMS | Residents")
    return (
        <ResidentContextProvider>
            <Container />
        </ResidentContextProvider>
    );
}

export default Residents;