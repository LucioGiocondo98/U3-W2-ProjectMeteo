import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
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
  ];

  const fetchWeather = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myKey}&units=metric&lang=it`;

    return fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            `Errore nella richiesta per ${city}: ${response.statusText}`
          );
        }
      })
      .then((data) => data)
      .catch((error) => console.error(error));
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

  return (
    <div>
      <Container className="mt-5">
        <Row>
          {weatherCards.length > 0 ? (
            weatherCards.map((weather, index) => (
              <Col key={index} sm={6} md={4} lg={2} className="mb-4">
                <WeatherCard city={defaultCities[index]} weather={weather} />
              </Col>
            ))
          ) : (
            <p>Caricamento in corso...</p>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default MainWeather;
