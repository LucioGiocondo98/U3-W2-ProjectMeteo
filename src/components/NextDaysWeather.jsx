import React, { useEffect, useState } from "react";
import { Card, Col, Row, Container, Spinner } from "react-bootstrap";

const NextDaysWeather = ({ city }) => {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = "862e77528bc6cb4f843982801f5c11d1";

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=it`
        );
        if (!res.ok) throw new Error("Errore nel recupero dei dati");
        const data = await res.json();

        const dailyData = data.list.filter((item) =>
          item.dt_txt.includes("12:00:00")
        );

        setForecast(dailyData.slice(0, 3));
        setLoading(false);
      } catch (err) {
        setError("Errore nel caricamento del meteo");
        setLoading(false);
      }
    };

    if (city) fetchForecast();
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
    <Container className="my-4">
      <Row className="g-3">
        {forecast.map((day, idx) => (
          <Col key={idx} md={4}>
            <Card className="text-center weather-card">
              <Card.Body>
                <Card.Title>
                  {new Date(day.dt_txt).toLocaleDateString("it-IT", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </Card.Title>
                <Card.Img
                  variant="top"
                  src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  alt={day.weather[0].description}
                  style={{ width: "80px", margin: "auto" }}
                />
                <Card.Text>{day.weather[0].description}</Card.Text>
                <Card.Text>
                  {day.main.temp_min}°C / {day.main.temp_max}°C
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default NextDaysWeather;
