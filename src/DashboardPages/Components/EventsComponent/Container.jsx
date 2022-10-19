import { useEffect, useState } from "react"
import Header from "./Header"
import ResidentsTable from "./Table"
import { useEventContext } from "../../hooks/useEventContext"
import CircularProgress from '@mui/material/CircularProgress';
    
function Container() {
    //get all announcement
    const { events ,dispatch } = useEventContext()
    const [rows, setRows] = useState(null)

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('https://drims-demo.herokuapp.com/api/events/')
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
                <ResidentsTable list={rows} />
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

export default Container;