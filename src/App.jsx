import { Routes, Route } from "react-router";
import { useState } from "react";
import Welcome from "./Pages/Welcome";
import CalendarPage from "./Pages/CalendarPage";
import BrainDumpPage from "./Pages/BrainDumpPage";
import TodosPage from "./Pages/TodosPage";
import AuthPage from "./Pages/AuthPage";

import "./App.css";
import Nav from "./Components/Nav";

function App() {
  const [user, setUser] = useState("");

  return (
    <>
      {user ? (
        <>
        <Nav />
          <div>hi {user}</div>

          <h1>Calendar App</h1>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/braindump" element={<BrainDumpPage />} />
            <Route path="/todos" element={<TodosPage />} />
          </Routes>
        </>
      ) : (
        <AuthPage />
      )}
    </>
  );
}

export default App;


//notes
// we added conditional rendering to the App component to show the AuthPage component
// if there is no user, and the rest of the app if there is a user.
// so if there is a user the app will show the Welcome component, the CalendarPage component, the BrainDumpPage component, and the TodosPage component.
// if there is no user, the app will show the AuthPage component.