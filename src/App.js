import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import Editor from "./components/Editor";  // Import the Editor component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/editor" element={<Editor />} />  {/* Route for creating a new document */}
        <Route path="/document/:id" element={<Editor />} />  {/* Route for editing an existing document */}
      </Routes>
    </Router>
  );
};

export default App;
