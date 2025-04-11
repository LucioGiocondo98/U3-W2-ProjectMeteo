import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import WeatherCard from "./WeatherCard";

const MainWeather = () => {
  const [weatherCards, setWeatherCards] = useState([]);
  const myKey = "862e77528bc6cb4f843982801f5c11d1";

  const defaultCities = [
    "New York",
    "Tokyo",
    "Roma,it",
    "Londra",
    "San Francisco",
    "Pechino",
    "Amsterdam",
    "Parigi",
  ];

  const navigate = useNavigate();

  const fetchWeather = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myKey}&units=metric&lang=it`;

    return fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Errore nella richiesta per ${city}`);
        }
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  };

  const loadDefaultCities = () => {
    const results = [];
    let completedRequests = 0;

    defaultCities.forEach((city, index) => {
      fetchWeather(city)
        .then((weatherData) => {
          results[index] = weatherData;
          completedRequests++;

          if (completedRequests === defaultCities.length) {
            setWeatherCards(results);
          }
        })
        .catch((err) => {
          console.error("Errore nel caricamento per ", city, err);
          results[index] = null;
          completedRequests++;

          if (completedRequests === defaultCities.length) {
            setWeatherCards(results);
          }
        });
    });
  };

  useEffect(() => {
    loadDefaultCities();
  }, []);

  const handleCardClick = (city) => {
    navigate(`/weather-details?city=${city}`);
  };

  return (
    <Container className="mt-5">
      <Row>
        {weatherCards.length > 0 ? (
          weatherCards.map((weather, index) => (
            <Col key={index} sm={12} md={3} lg={3} className="mb-4">
              <WeatherCard
                city={defaultCities[index]}
                weather={weather}
                onClick={() => handleCardClick(defaultCities[index])}
              />
            </Col>
          ))
        ) : (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <Spinner animation="border" variant="light" />
          </div>
        )}
      </Row>
    </Container>
  );
};

export default MainWeather;
