import React from "react";
import Container from "../OrganizationComponents/Container"
import { OrganizationContextProvider } from '../../context/OrganizationContext'

function Organization() {
    return (
        <OrganizationContextProvider>
            <Container />
        </OrganizationContextProvider>
    )
}

export default Organization
