import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import WeatherCard from "./WeatherCard";

const MainWeather = () => {
  const [weatherCards, setWeatherCards] = useState([]);
  const myKey = "862e77528bc6cb4f843982801f5c11d1";

  const defaultCities = [
    "New York",
    "Tokyo",
    "Roma",
    "Londra",
    "San Francisco",
    "Pechino",
  ];

  const navigate = useNavigate();

  const fetchWeather = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myKey}&units=metric&lang=it`;

    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Città non trovata: ${city}`);
        }
        return response.json();
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
        .catch(() => {
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
            <Col key={index} sm={12} md={4} lg={2} className="mb-4">
              <WeatherCard
                city={defaultCities[index]}
                weather={weather}
                onClick={() => handleCardClick(defaultCities[index])}
              />
            </Col>
          ))
        ) : (
          <p>Caricamento in corso...</p>
        )}
      </Row>
    </Container>
  );
};

export default MainWeather;
