import Header from "../ResidentsComponents/Header"
import ResidentsTable from "../ResidentsComponents/ResidentsTable"
import ResidentsList from "../dummyDB/Residents";
import { useState } from "react";

function Residents() {
    const [residentList, setResidentList] = useState(ResidentsList)
    const getres = res => setResidentList(oldArray => [...oldArray, res])
    return (
        <div className="content">
            <Header list={residentList} getSelectedRes={getres}/>
            <ResidentsTable list={residentList}/>
        </div>
    );
}

export default Residents;