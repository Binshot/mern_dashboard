import Container from "../EventsComponent/Container"
import { EventContextProvider } from '../../context/EventsContext'
import React from "react";
import useTitle from "../../hooks/useTitle"
function Events() {
    useTitle("DRIMS | Events")
    return (
        <EventContextProvider>
            <Container />
        </EventContextProvider>
    );
}

export default Events;