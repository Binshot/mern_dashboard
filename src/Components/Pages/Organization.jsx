import Header from "../OrganizationComponents/Header"
import Officials from "../OrganizationComponents/Officials"

import Residents from "../dummyDB/Residents";
import OfficialsList from "../dummyDB/Officials";
import { useState } from "react";

function Organization() {
    const [officialsList, setOfficialsList] = useState(OfficialsList)

    const getres = res => setOfficialsList(oldArray => [...oldArray, res])
    return (
        <div>
            <Header list={Residents} getSelectedRes={getres} length ={officialsList.length}/>
            <Officials list={officialsList}/>
        </div>
    )
}

export default Organization
