import Header from "../EventsComponent/Header"
import ResidentsTable from "../EventsComponent/Table"
import { EventContextProvider } from '../../context/EventsContext'
import React from "react";

function Events() {

    return (
        <EventContextProvider>
            <div className="content">
                <Header />
                <ResidentsTable />
            </div>
        </EventContextProvider>
    );
}

export default Events;