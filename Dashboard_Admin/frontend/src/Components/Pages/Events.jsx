import Header from "../EventsComponent/Header"
import ResidentsTable from "../EventsComponent/Table"
import { useState } from "react";
import EventsList from "../dummyDB/Events";
function Events() {
    const [eventList, setEventList] = useState(EventsList)
    const getevent = event => setEventList(oldArray => [...oldArray, event])

    return (
        <div className="content">
            <Header get={getevent} />
            <ResidentsTable list={eventList}  />
        </div>
    );
}

export default Events;