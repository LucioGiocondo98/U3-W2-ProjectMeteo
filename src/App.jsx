import "./App.css";
import WeatherDetails from "./components/WeatherDetails";
import MainWeather from "./components/MainWeather";
import NavbarWeather from "./components/Navbarweather";
import SingleCity from "./components/SingleCity";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FooterWeather from "./components/FooterWeather";
function App() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (newSearchValue) => {
    setSearchValue(newSearchValue);
  };
  return (
    <div className="app">
      <Router>
        <header>
          <NavbarWeather
            searchValue={searchValue}
            onSearchChange={handleSearchChange}
          />
        </header>
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<MainWeather />} />
            <Route path="/single-city" element={<SingleCity />} />
            <Route path="/weather-details" element={<WeatherDetails />} />
          </Routes>
        </main>
        <footer>
          <FooterWeather />
        </footer>
      </Router>
    </div>
  );
}

export default App;
