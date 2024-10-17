// src/App.js
import React from "react";
import { Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { FilterProvider } from "./context/FilterContext";
import { UserProvider } from "./context/UserContext"; // Import UserProvider
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute

const App = () => {
  return (
    <UserProvider>
      <FilterProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<PrivateRoute element={<HomePage />} />} />{" "}
          {/* Protect homepage */}
          <Route path="/login" element={<LoginPage />} /> {/* Public route */}
          <Route path="/register" element={<RegisterPage />} />{" "}
          {/* Public route */}
        </Routes>
      </FilterProvider>
    </UserProvider>
  );
};

export default App;
