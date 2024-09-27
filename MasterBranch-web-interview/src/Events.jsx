import { useContext } from "react";
import { styled } from "styled-components";
import { EventContext } from "./App";
import Spinner from "./Spinner";
import { appointments } from "./appointment";

const EventList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
`;
const Event = styled.div`
  border: none;
  border-radius: 10px;
  width: 100%;
  background-color: ${(props) => {
    if (props.type === "appointment") return "#0F4C81";
    return "#5684AE";
  }};
  color: #0f4c81;
`;
const EventContent = styled.div`
  margin-left: 10px;
  padding: 15px 0px 15px 10px;
  background-color: ${(props) => {
    if (props.type === "appointment") return "#FFE4C8";
    return "#F9BE81";
  }};
  height: 100%;
  border-radius: 0px 10px 10px 0px;
  border: none;
`;

function Events({ currentDate }) {
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const { events, isLoading } = useContext(EventContext);

  const currentEvents = events.filter(
    (event) =>
      new Date(event?.start?.local).toDateString() ===
      currentDate.toDateString()
  );
  const currentAppointment = appointments.filter(
    (appointment) =>
      new Date(appointment?.start).toDateString() === currentDate.toDateString()
  );

  const allEvents = currentEvents.concat(currentAppointment);
  console.log(allEvents);

  return (
    <EventList>
      {isLoading ? (
        <Spinner />
      ) : !allEvents.length ? (
        <p>There is no event today </p>
      ) : (
        allEvents.map((event) => (
          <Event key={event.id} type={event.type}>
            <EventContent type={event.type}>
              <h2 style={{ margin: "0px", fontSize: "1.1em" }}>
                {!event.type ? `Webinar: ${event.name.text}` : event.title}
              </h2>
              <p>
                {!event.type
                  ? `${formatTime(event.start.local)} - ${formatTime(
                      event.end.local
                    )}`
                  : `${formatTime(event.start)} - ${formatTime(event.end)}`}
              </p>
            </EventContent>
          </Event>
        ))
      )}
    </EventList>
  );
}

export default Events;
