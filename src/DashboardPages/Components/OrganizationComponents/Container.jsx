import React, { useEffect, useState } from "react";
import Header from "./Header"
import Officials from "./Officials"
import { useOrganizationContext } from "../../hooks/useOrganizationContext"
import CircularProgress from '@mui/material/CircularProgress';

function Container() {

    const { organizations, dispatch } = useOrganizationContext()

    // get all resident that are officials
    const [rows, setRows] = useState(null)

    useEffect(() => {
        const fetchOfficials = async () => {
            const response = await fetch('https://drims-demo.herokuapp.com/api/organization/')
            const json = await response.json()
            if (response.ok) {
                const resresponse = await fetch('https://drims-demo.herokuapp.com/api/residents/')
                const resjson = await resresponse.json()
                if (resresponse.ok) {
                    const dta = await json.map(props => {
                        let obj = resjson.find(r => r._id === props.resident_id)
                        return { official: obj, position: props.position, _id: props._id }
                    })
                    dispatch({ type: 'SET_OFFICIAL', payload: dta })
                }
            }
        }

        fetchOfficials()
    }, [])
    
    useEffect(() => {
        setRows(organizations)
    }, [organizations])

    const getRows = rows => setRows(rows)

    if (organizations) {
        return (
            <div id="mainContentBlur" className="content">
                <Header get={getRows} />
                <Officials list={rows} />
            </div>
        );
    }else {
        return (
            <div style={{height: "100%", display: "flex", alignItems: "center", justifyContent: "center"} }>
                <CircularProgress size={100} />
            </div>
        )
    }

}

export default Container