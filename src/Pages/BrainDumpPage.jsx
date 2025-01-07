import { useEffect, useState } from "react";
import axios from "axios";

function BrainDumpPage() {
  const current = new Date();
  // const currDate = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
  const [entries, setEntires] = useState([]);
  const [formData, setFormData] = useState({
    entryDate: current,
    entryType: "",
    description: "",
  }); // this is the form data that will be used to create a new entry

  const [entryUpdate, setEntryUpdate] = useState("nothing changed yet");
  const [entType, setEntType] = useState("");
  const [editingEntryId, setEditingEntryId] = useState(null);


  const LOCAL_URL = "http://localhost:5050";

  const getEntries = async () => {
    console.log("in getEntries");
    //fetch brain dump entries from the backend also known as the api that i am creating
    // this endpoint is:
    // /api/braindump

    try {
      const response = await axios.get(`${LOCAL_URL}/api/braindump`);
      console.log(response.data);
      setEntires(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addEntry = async (newEntry) => {
    let error = false;
    let addedEntry = {};
    try {
      const response = await axios.post(`${LOCAL_URL}/api/braindump`, newEntry);
      addedEntry = response.data;
    } catch (err) {
      error = true;
      console.error(err);
    } finally {
      // lets the user know if the add was successful or not
      if (error) {
        setEntryUpdate("there was an error");
      } else {
        // once i actually post the route in my backend, i will show the added entry
        setEntryUpdate(`Successfully added: ${addedEntry.entryType} : ${addedEntry.description}`);
    }
  }
  };

 

  const handleDelete = (e, id) => {
    console.log("deleting... entry:");
    deleteEntry(id);
    // add a delete function
  };

  const deleteEntry = async (id) => {
    try {
      const response = await axios.delete(`${LOCAL_URL}/api/braindump/${id}`);
      console.log(response);
      setEntryUpdate(`deleted successfully ${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const editEntry = async (id, updatedData) => {
    try {
      const response = await axios.put(`${LOCAL_URL}/api/braindump/${id}`, updatedData);
      console.log(response.data);
      setEntryUpdate(`Successfully edited entry: ${response.data.entryType} : ${response.data.description}`);
    } catch (error) {
      console.error(error);
      setEntryUpdate(`Edit failed for ${id}`);
    }
  };
  


  const handleEdit = (id, entry) => {
    // Populate the form with the existing entry details for editing
    setFormData({
      entryDate: entry.entryDate,
      description: entry.description,
    });
    setEntType(entry.entryType);
  
    // Save the current editing entry ID to track which entry is being edited
    setEditingEntryId(id);
  };
  




  useEffect(() => {
    getEntries();
  }, [entryUpdate]); // empty array means that this will only run once when the component is mounted on the first load

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
            <>
              <li style={{ display: "block", width: "80%" }}>
                {entry.entryDate}: {entry.entryType}: {entry.description}{" "}
                <button
                  onClick={() => {
                    handleEdit(entry._id, entry);
                  }}
                >
                  Edit
                </button>
                <button onClick={(e) => handleDelete(e, entry._id)}>
                  Delete
                </button>
              </li>
              <br />
            </>
          );
        })}
      </ul>
    )
  };
  

  const loading = () => {
    return <h3>There don't seem to be an entries yet... </h3>;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEntry = {
      entryDate: formData.entryDate,
      entryType: entType || "none",
      description: formData.description,
    };
  
    if (editingEntryId) {
      // Edit the existing entry
      await editEntry(editingEntryId, newEntry);
      setEditingEntryId(null); // Reset editing state after submission
    } else {
      // Add a new entry
      await addEntry(newEntry);
    }
  };
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTypeSelect = (e) => {
    setEntType(e.target.value);
  };

  return (
    <>
      <h1>Brain Dump Entries</h1>
      <ol>
        CRUD operations:
        <li>Update - a form to edit specific entry</li>
        <li>Delete - button to delete an entry</li>
      </ol>

      <div style={{ display: "flex" }}>
        <div>
          <h3> Add a new entry </h3>
          <form onSubmit={handleSubmit}>
            <input
              type="date"
              name="entryDate"
              required
              onChange={handleChange}
              value={formData.entryDate}
            />
            <br />
            <label>Choose the Entry Type</label>
            <select
              name="entryType"
              required
              onChange={handleTypeSelect}
              value={entType}
            >
              <option value="none"></option>
              <option value="todo">ToDo</option>
              <option value="Idea">Idea</option>
              <option value="schedule">Schedule</option>
              <option value="appointment">Appointment</option>
              <option value="list">List</option>
            </select>
            <br />
            <input
              type="text"
              name="description"
              required
              onChange={handleChange}
              value={formData.description}
            />
            <br />
            <input type="submit" value="add a new entry" />
          </form>
          <p>{entryUpdate}</p>
        </div>
        <div>{entries.length ? loaded() : loading()}</div>
      </div>
    </>
  );
}

export default BrainDumpPage;
