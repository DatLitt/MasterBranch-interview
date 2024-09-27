import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { styled } from "styled-components";
import { useContext, useState, useRef } from "react";
import { EventContext } from "./App";
import "./CustomBigCalendar.css";
import Spinner from "./Spinner";
import { appointments } from "./appointment";

const RightSide = styled.div`
  border: 1px solid #d3d3d3;
  width: 60%;
  background-color: white;
  height: fit-content;
`;
const Event = styled.div`
  background-color: ${(props) => {
    if (props.type === "appointment") return "#0F4C81";
    return "#5684AE";
  }};
  border-radius: 3px;
  width: 100%;
`;
const EventContent = styled.div`
  margin-left: 3px;
  padding-left: 3px;
  border: none;
  height: 20px;
  overflow: hidden;
  background-color: ${(props) => {
    if (props.type === "appointment") return "#FFE4C8";
    return "#F9BE81";
  }};
  border-radius: 0px 3px 3px 0px;
  display: flex;
  align-items: center;
`;
const DropDown = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 70px;
  right: 10px;
  z-index: 1000;
  gap: 5px;
`;
const Button = styled.button`
  background-color: white;
  border: 1px solid #0f4c81;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
`;

function BigCalendar() {
  const { events, isLoading } = useContext(EventContext);
  const calendarRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [customButtonText, setCustomButtonText] = useState("Month ▾");

  const formattedEvents = events.map((event) => ({
    id: event.id,
    title: event.name.text,
    start: event.start.local,
    end: event.end.local,
  }));

  const allEvents = formattedEvents.concat(appointments);
  // console.log(allEvents);

  function handleClick() {
    const dummyUrl = `http://example.com`;
    window.location.href = dummyUrl;
  }

  const handleViewChange = (viewType) => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(viewType); // Change the view based on the selected option
    setDropdownOpen(false);
    setCustomButtonText(`${viewType.replace(/dayGrid/, "")} ▾`);
  };

  return (
    <RightSide>
      {isLoading ? (
        <Spinner />
      ) : (
        <div style={{ position: "relative" }}>
          {dropdownOpen && (
            <DropDown>
              <Button
                onClick={() => handleViewChange("dayGridMonth")}
                className="dropdown-item"
              >
                Month
              </Button>
              <Button
                onClick={() => handleViewChange("dayGridWeek")}
                className="dropdown-item"
              >
                Week
              </Button>
              <Button
                onClick={() => handleViewChange("dayGridDay")}
                className="dropdown-item"
              >
                Day
              </Button>
            </DropDown>
          )}
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            weekends={true}
            dateClick={handleClick}
            headerToolbar={{
              left: "today prev,next title",
              // center: "title",
              // right: "dayGridMonth,dayGridWeek,dayGridDay",
              right: "customViewDropdown",
            }}
            customButtons={{
              customViewDropdown: {
                text: customButtonText, // Label for dropdown button
                click: () => {
                  setDropdownOpen(!dropdownOpen);
                  (event) => handleDropdownToggle(event);
                }, // Toggle dropdown visibility
              },
            }}
            events={allEvents}
            eventContent={(event) => {
              return (
                <Event type={event.event._def.extendedProps.type}>
                  <EventContent type={event.event._def.extendedProps.type}>
                    <span>
                      {" "}
                      {!event.event._def.extendedProps.type
                        ? "Webinar: "
                        : ""}{" "}
                    </span>
                    <strong>{event.event.title}</strong>
                  </EventContent>
                </Event>
              );
            }}
          />
        </div>
      )}
    </RightSide>
  );
}

export default BigCalendar;
