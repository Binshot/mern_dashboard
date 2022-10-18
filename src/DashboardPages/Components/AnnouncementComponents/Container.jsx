import { useEffect, useState } from "react"
import Header from "./Header"
import AnnouncementsTable from "./AnnouncementTable"
import { useAnnouncementContext } from "../../hooks/useAnnouncementContext"

function Container() {
    //get all announcement
    const { announcements, dispatch } = useAnnouncementContext()
    const [rows, setRows] = useState(announcements)

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('https://drims-demo.herokuapp.com/api/announcements/')
            const json = await response.json()
            if (response.ok) {
                dispatch({ type: 'SET_ANNOUNCEMENT', payload: json })
                setRows(json)
            }
        }

        fetchWorkouts()
    }, [dispatch])

    const getRows = rows => setRows(rows)

    if (rows) {
        return (
            <div id="mainContentBlur" className="content">
                <Header get={getRows} />
                <AnnouncementsTable list={rows} get={getRows} />
            </div>
        );
    }
    
}

export default Container;