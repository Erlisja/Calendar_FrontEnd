import { useEffect, useState } from "react";
import axios from "axios";

function CalendarPage() {
  const [entries, setEntires] = useState([]);
  const LOCAL_URL = "http://localhost:5050";

  const getEntries = async () => {
    console.log("in getEntries");
    //fetch calendar entries from the backend also known as the api that i am creating
    // this endpoint is:
    // /api/calendar

    try {
      const response = await axios.get(`${LOCAL_URL}/api/calendar`);
      console.log(response.data);
      setEntires(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getEntries();
  }, []); // empty array means that this will only run once when the component is mounted on the first load

  const loaded = () => {
    return (
      <ul
        style={{
          listStyleType: "none",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {entries.map((entry) => {
          return (
            <li style={{ width: "100%" }}>
              {entry.startDate} : {entry.label}
            </li>
          );
        })}
      </ul>
    );
  };

  const loading = () => {
    return <h3>There don't seem to be an entries yet... </h3>;
  };

  return (
    <>
      <h1>Calendar Entries</h1>
      <ul>{entries.length ? loaded() : loading()}</ul>
    </>
  );
}

export default CalendarPage;
