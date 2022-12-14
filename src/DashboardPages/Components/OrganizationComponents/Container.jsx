import React, { useEffect, useState } from "react";
import Header from "./Header"
import Officials from "./Officials"
import { useOrganizationContext } from "../../hooks/useOrganizationContext"
import CircularProgress from '@mui/material/CircularProgress';
import EmptyState from "../NewImageFiles/EmptyStates/Organization.svg"
function Container() {

    const { organizations, dispatch } = useOrganizationContext()
    // get all resident that are officials
    const [rows, setRows] = useState(null)

    useEffect(() => {
        const fetchOfficials = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL + '/organization/')
            const json = await response.json()
            if (response.ok) {
                const resresponse = await fetch(process.env.REACT_APP_API_URL + '/residents/')
                const resjson = await resresponse.json()
                if (resresponse.ok) {
                    const dta = await json.map(props => {
                        let obj = resjson.find(r => r._id === props.resident_id)
                        let sortPosition
                        switch (props.position) {
                            case "President":
                                sortPosition = 1;
                                break;
                            case "Vice President":
                                sortPosition = 2;
                                break;
                            case "Secretary":
                                sortPosition = 3;
                                break;
                            case "Treasurer":
                                sortPosition = 4;
                                break;
                            case "Auditor":
                                sortPosition = 5;
                                break;
                            default:
                                sortPosition = 6;
                                break;
                        }
                        return { official: obj, position: props.position, _id: props._id, positionIndex: sortPosition }
                    })
                    dispatch({ type: 'SET_OFFICIAL', payload: dta })
                    setRows(dta)
                }
            }
        }

        fetchOfficials()
    }, [])

    useEffect(() => {
        setRows(organizations)
    }, [organizations])

    const getRows = rows => setRows(rows)

    if (rows) {
        return (
            <div id="mainContentBlur" className="content">
                <Header get={getRows} />
                {rows.length != 0
                    ? <Officials list={rows} />
                    : <div className="emptyState">
                        <img src={EmptyState} />
                        <h2>No Organization Yet</h2>
                        <p>Click on the "Add official" button to add officials</p>
                    </div>
                }
            </div>
        );
    } else {
        return (
            <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CircularProgress size={100} sx={{ color: "#0C1096" }} />
            </div>
        )
    }

}

export default Container