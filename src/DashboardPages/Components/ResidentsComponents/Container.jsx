import { useEffect, useState } from "react"
import Header from "./Header"
import ResidentsTable from "./ResidentsTable"
import { useResidentContext } from "../../hooks/userResidentContext"
import CircularProgress from '@mui/material/CircularProgress';
import EmptyState from "../NewImageFiles/EmptyStates/Sheets.svg"
function Container() {
    const { residents, dispatch } = useResidentContext()
    const [rows, setRows] = useState(null)

    useEffect(() => {
        const fetchResidents = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL + '/residents/')
            const json = await response.json()
            if (response.ok) {
                dispatch({ type: 'SET_RESIDENT', payload: json })
            }
        }

        fetchResidents()
    }, [])

    useEffect(() => {
        setRows(residents)
    }, [residents])
    const getRows = rows => setRows(rows)
    if (rows) {
        return (
            <div id="mainContentBlur" className="content">
                <Header get={getRows} />
                {rows.length != 0
                    ? <ResidentsTable list={rows} />
                    : <div className="emptyState">
                        <img src={EmptyState} />
                        <h2>No Residents Yet</h2>
                        <p>Click on the "Add Head of the Family" button to add a head of the family</p>
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

export default Container;