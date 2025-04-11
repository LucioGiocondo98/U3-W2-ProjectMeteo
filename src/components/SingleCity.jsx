import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import WeatherCard from "./WeatherCard";
import { Col, Container, Row } from "react-bootstrap";
import NextDaysWeather from "./NextDaysWeather";

const SingleCity = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const city = new URLSearchParams(location.search).get("city");

  const myKey = "862e77528bc6cb4f843982801f5c11d1";

  const fetchWeather = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myKey}&units=metric&lang=it`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Città non trovata o errore nella richiesta");
        setLoading(false);
        console.log("errore nel recupero", error);
      });
  };

  useEffect(() => {
    if (city) {
      fetchWeather(city);
    }
  }, [city]);

  if (loading) return <p>Caricamento...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={6} lg={4}>
          {weather ? (
            <WeatherCard city={city} weather={weather} />
          ) : (
            <p>Errore nel caricamento delle informazioni meteo</p>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <h4 className="text-center text-white mb-4">Prossimi 3 Giorni</h4>
          <NextDaysWeather city={city} />
        </Col>
      </Row>
    </Container>
  );
};

export default SingleCity;
