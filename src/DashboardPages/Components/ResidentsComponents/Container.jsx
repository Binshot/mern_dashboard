import { useEffect, useState } from "react"
import Header from "./Header"
import ResidentsTable from "./ResidentsTable"
import { useResidentContext } from "../../hooks/userResidentContext"

function Container() {
    const { residents, dispatch } = useResidentContext()
    const [rows, setRows] = useState(null)

    useEffect(() => {
        const fetchResidents = async () => {
            const response = await fetch('https://drims-demo.herokuapp.com/api/residents/')
            const json = await response.json()
            if (response.ok) {
                dispatch({ type: 'SET_RESIDENT', payload: json })
                setRows(json)
            }
        }

        fetchResidents()
    }, [dispatch])

    const getRows = rows => setRows(rows)
    if (residents) {
        return (
            <div id="mainContentBlur" className="content">
                <Header get={getRows} />
                <ResidentsTable list={rows ? residents : rows} />
            </div>
        );
    }
}

export default Container;