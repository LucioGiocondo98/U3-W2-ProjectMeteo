import React from "react";
import { Container } from "react-bootstrap";

const FooterWeather = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-light py-3 mt-auto">
      <Container className="text-center">
        <strong>by Lucio © {currentYear}</strong>
      </Container>
    </footer>
  );
};

export default FooterWeather;
