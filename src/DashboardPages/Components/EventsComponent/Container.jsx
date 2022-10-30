import { useEffect, useState } from "react"
import Header from "./Header"
import ResidentsTable from "./Table"
import { useEventContext } from "../../hooks/useEventContext"
import CircularProgress from '@mui/material/CircularProgress';
import EmptyState from "../NewImageFiles/EmptyStates/Sheets.svg"
function Container() {
    //get all announcement
    const { events, dispatch } = useEventContext()
    const [rows, setRows] = useState(null)

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL + '/events/')
            const json = await response.json()
            if (response.ok) {
                dispatch({ type: 'SET_EVENT', payload: json })
            }
        }

        fetchWorkouts()
    }, [])

    useEffect(() => {
        setRows(events)
    }, [events])

    const getRows = rows => setRows(rows)

    if (rows) {
        return (
            <div id="mainContentBlur" className="content">
                <Header get={getRows} />
                {rows.length != 0
                    ? <ResidentsTable list={rows} />
                    : <div className="emptyState">
                        <img src={EmptyState} />
                        <h2>No Events Yet</h2>
                        <p>Click on the "Add Events" button to add an event</p>
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