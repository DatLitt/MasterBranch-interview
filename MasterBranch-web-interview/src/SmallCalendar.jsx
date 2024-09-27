import { useState } from "react";
import { styled } from "styled-components";
import UpcomingEvent from "./UpcomingEvents";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CustomSmallCalendar.css";

const LeftSide = styled.div`
  border: 1px solid #d3d3d3;
  width: 30%;

  max-width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;

function SmallCalendar() {
  const [date, setDate] = useState(new Date());

  return (
    <LeftSide>
      <Calendar onChange={setDate} value={date} locale="en-GB" />

      <UpcomingEvent currentDate={date} />
    </LeftSide>
  );
}

export default SmallCalendar;
