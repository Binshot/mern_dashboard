import { useEffect, useState } from "react"
import Header from "./Header"
import AnnouncementsTable from "./AnnouncementTable"
import { useAnnouncementContext } from "../../hooks/useAnnouncementContext"
import CircularProgress from '@mui/material/CircularProgress';

function Container() {
    //get all announcement
    const { announcements, dispatch } = useAnnouncementContext()
    const [rows, setRows] = useState(null)

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch(process.env.REACT_APP_API_URL + '/announcements/')
            const json = await response.json()
            if (response.ok) {
                dispatch({ type: 'SET_ANNOUNCEMENT', payload: json })
                setRows(json)
            }
        }

        fetchWorkouts()
    }, [])

    const getRows = rows => setRows(rows)

    if (rows) {
        return (
            <>
                {rows.length != 0
                    ?
                    <div id="mainContentBlur" className="content">
                        <Header get={getRows} />
                        <AnnouncementsTable list={rows} get={getRows} />
                    </div>
                    :
                    <div className="emptyState">
                        <img src={EmptyState_Activity} />
                        <h2>No Announcements Yet</h2>
                        <p>Click on the button to add an Announcement</p>
                    </div>
                }
            </>
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