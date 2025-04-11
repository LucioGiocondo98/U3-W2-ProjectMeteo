import React from "react";
import { Card } from "react-bootstrap";

const WeatherCard = ({ city, weather, onClick }) => {
  const convertToLocalTime = (utcTime, timezoneOffset) => {
    const localTimeInSeconds = utcTime + timezoneOffset;
    const localDate = new Date(localTimeInSeconds * 1000);

    const hours = localDate.getHours();
    const minutes = localDate.getMinutes().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;

    return formattedTime;
  };

  const localTime = weather
    ? convertToLocalTime(weather.dt, weather.timezone)
    : "N/A";

  const weatherIcon =
    weather.weather && weather.weather[0] ? weather.weather[0].icon : "";

  return (
    <Card
      className="weather-card text-center d-flex flex-column align-items-center justify-content-center"
      onClick={onClick}
    >
      {weatherIcon && (
        <Card.Img
          variant="top"
          src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
          alt="Weather icon"
        />
      )}
      <Card.Body>
        <Card.Title>{city}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <i className="bi bi-thermometer" style={{ marginRight: "8px" }}></i>
          {weather.main ? `${weather.main.temp}°C` : "N/A"}
        </Card.Subtitle>
        <Card.Text>
          {weather.weather && weather.weather[0]
            ? weather.weather[0].description
            : "Previsione non disponibile"}
        </Card.Text>

        <Card.Text>
          <i className="bi bi-clock-history" style={{ marginRight: "8px" }}></i>
          {localTime}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default WeatherCard;
