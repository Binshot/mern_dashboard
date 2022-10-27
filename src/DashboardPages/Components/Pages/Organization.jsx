import React from "react";
import Container from "../OrganizationComponents/Container"
import { OrganizationContextProvider } from '../../context/OrganizationContext'
import useTitle from "../../hooks/useTitle"
function Organization() {
    useTitle("DRIMS | Organization")
    return (
        <OrganizationContextProvider>
            <Container />
        </OrganizationContextProvider>
    )
}

export default Organization
