import { useEffect, useState } from "react"
import Header from "./Header"
import ResidentsTable from "./Table"
import { useEventContext } from "../../hooks/useEventContext"

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
                <ResidentsTable list={rows ? events : rows} />
            </div>
        );
    }
}

export default Container;