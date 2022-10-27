import React, { useEffect, useState } from 'react'
import usersIcon from "../NewImageFiles/Overview/TotalUsers.svg"
import residentsIcon from "../NewImageFiles/Overview/TotalResidents.svg"
import familiesIcon from "../NewImageFiles/Overview/TotalFamilies.svg"
import CircularProgress from '@mui/material/CircularProgress';

function Summary() {

    //get all resident
    const [numberOfUser, setnumberOfUser] = useState(null)
    const [residents, setResidents] = useState(null)

    useEffect(() => {
        const fetchResidents = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL + '/residents/')
            const json = await response.json()
            if (response.ok) {
                setResidents(json)
            }
        }
        const fetchUsers = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL + '/account/users')
            const json = await response.json()
            if (response.ok) {
                setnumberOfUser(json.length)
            }
        }

        fetchUsers()
        fetchResidents()
    }, [])

    if (residents && numberOfUser) {
        return (
            <div className="summary">
                <h2 style={{ marginBottom: "24px" }}>Summary</h2>
                <div className='flex-row'>
                    <div className='violet'>
                        <img src={usersIcon} alt="" />
                        <h3 style={{ fontSize: "24px", marginBottom: "8px" }}>
                            {numberOfUser}
                        </h3>
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
    } else {
        return (
            <div style={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CircularProgress size={70} />
            </div>
        )
    }
}

export default Summary
