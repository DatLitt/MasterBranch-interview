import { createContext } from "react";
import BigCalendar from "./BigCalendar";
import SmallCalendar from "./SmallCalendar";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";

export const EventContext = createContext();

function App() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://www.eventbriteapi.com/v3/organizations/2342160303043/events/",
          {
            headers: {
              Authorization: `Bearer LNJZYU3C2REX5D5I2AZN`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();
        setEvents(data.events);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <EventContext.Provider value={{ events, isLoading }}>
      <div
        style={{
          display: "flex",
          gap: "15px",
          justifyContent: "center",
          // marginTop: "20px",
          paddingTop: "20px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <SmallCalendar />
        <BigCalendar />
      </div>
    </EventContext.Provider>
  );
}

export default App;
