import React, { useEffect, useState } from 'react'
import usersIcon from "../NewImageFiles/Overview/TotalUsers.svg"
import residentsIcon from "../NewImageFiles/Overview/TotalResidents.svg"
import familiesIcon from "../NewImageFiles/Overview/TotalFamilies.svg"

import { useResidentContext } from "../../hooks/userResidentContext"

function Summary() {

    //get all resident
    const { residents, dispatch } = useResidentContext()

    useEffect(() => {
        const fetchResidents = async () => {
            const response = await fetch('https://drims-demo.herokuapp.com/api/residents/')
            const json = await response.json()
            if (response.ok) {
                dispatch({ type: 'SET_RESIDENT', payload: json })
            }
        }

        fetchResidents()
    }, [dispatch])

    const [family, setFamily] = useState(null)

    if (residents) {
        return (
            <div className="summary">
                <h2 style={{ marginBottom: "24px" }}>Summary</h2>
                <div className='flex-row'>
                    <div className='violet'>
                        <img src={usersIcon} alt="" />
                        <h3 style={{ fontSize: "24px", marginBottom: "8px" }}>62</h3>
                        <h4 style={{ fontSize: "20px" }}>Total Users</h4>
                    </div>
                    <div className='green' style={{ margin: "0 30px" }}>
                        <img src={residentsIcon} alt="" />
                        <h3 style={{ fontSize: "24px", marginBottom: "8px" }}>
                            {residents.length}
                        </h3>
                        <h4 style={{ fontSize: "20px" }}>Total Residents</h4>
                    </div>
                    <div className='brown'>
                        <img src={familiesIcon} alt="" />
                        <h3 style={{ fontSize: "24px", marginBottom: "8px" }}>
                            {residents.filter(head => head.isHeadOfFamily === true).length}
                        </h3>
                        <h4 style={{ fontSize: "20px" }}>Total Families</h4>
                    </div>
                </div>

            </div>
        )
    }
}

export default Summary