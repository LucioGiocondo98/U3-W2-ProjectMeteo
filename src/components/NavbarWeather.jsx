import { Navbar, Container, Form, FormControl } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NavbarWeather = ({ searchValue, onSearchChange }) => {
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue) {
      navigate(`/weather-details?city=${searchValue}`);
    }
  };

  return (
    <Navbar bg="secondary" expand="lg" className="mb-4 shadow-sm text-light">
      <Container className="justify-content-between">
        <Link to="/" className="navbar-brand text-light text-decoration-none">
          MeteoApp
        </Link>
        <Form className="d-flex mx-auto w-50" onSubmit={handleSearchSubmit}>
          <FormControl
            type="search"
            placeholder="Cerca una città..."
            className="me-2"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </Form>
      </Container>
    </Navbar>
  );
};

export default NavbarWeather;
