import { Navbar, Container, Form, FormControl } from "react-bootstrap";

const NavbarWeather = function ({
  searchValue,
  onSearchChange,
  onSearchSubmit,
}) {
  return (
    <Navbar bg="secondary" expand="lg" className="mb-4 shadow-sm bg text-light">
      <Container className="justify-content-between">
        <Navbar.Brand className="text-light">MeteoApp </Navbar.Brand>
        <Form className="d-flex mx-auto w-50" onSubmit={onSearchSubmit}>
          <FormControl
            type="search"
            placeholder="Search a city..."
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
