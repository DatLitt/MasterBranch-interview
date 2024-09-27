import Events from "./Events";

function UpcomingEvent({ currentDate }) {
  return (
    <div
      style={{
        width: "100%",
        borderTop: "1px solid #d3d3d3",
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "90%",
        }}
      >
        <h1
          style={{
            color: "#0F4C81",
            fontSize: "1.7em",
            marginTop: "30px",
          }}
        >
          Upcoming Events
        </h1>
        <p>{currentDate.toDateString()}</p>
        <Events currentDate={currentDate} />
      </div>
    </div>
  );
}

export default UpcomingEvent;
