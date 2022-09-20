import React from "react";
import Header from "../OrganizationComponents/Header"
import Officials from "../OrganizationComponents/Officials"

import { OrganizationContextProvider } from '../../context/OrganizationContext'

function Organization() {
    return (
        <OrganizationContextProvider>
            <div>
                <Header />
                <Officials />
            </div>
        </OrganizationContextProvider>
    )
}

export default Organization
