import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import WeatherCard from "./WeatherCard";
import NextDaysWeather from "./NextDaysWeather";

const WeatherDetails = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const city = new URLSearchParams(location.search).get("city");

  const apiKey = "862e77528bc6cb4f843982801f5c11d1";

  useEffect(() => {
    const fetchWeather = () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=it`;
      fetch(url)
        .then((res) => {
          if (!res.ok) throw new Error("Errore nella richiesta");
          return res.json();
        })
        .then((data) => {
          setWeather(data);
          setLoading(false);
        })
        .catch((err) => {
          setError("Errore nel recupero dei dati meteo");
          setLoading(false);
        });
    };

    if (city) {
      fetchWeather();
    }
  }, [city]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="light" />
      </div>
    );
  }
  if (error) return <p>{error}</p>;

  return (
    <Container className="mt-5">
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={6}>
          <h4 className="text-center text-white mb-4">Today</h4>
          <WeatherCard city={city} weather={weather} />
        </Col>
      </Row>
      <Row>
        <Col>
          <h4 className="text-center text-white mb-4">Next 3 days</h4>
          <NextDaysWeather city={city} />
        </Col>
      </Row>
    </Container>
  );
};

export default WeatherDetails;
