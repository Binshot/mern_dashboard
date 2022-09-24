import Container from "../EventsComponent/Container"
import { EventContextProvider } from '../../context/EventsContext'
import React from "react";

function Events() {

    return (
        <EventContextProvider>
            <Container />
        </EventContextProvider>
    );
}

export default Events;