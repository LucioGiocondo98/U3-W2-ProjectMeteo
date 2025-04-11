import "./App.css";
import MainWeather from "./components/MainWeather";
import NavbarWeather from "./components/Navbarweather";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
function App() {
  return (
    <>
      <header>
        <NavbarWeather />
      </header>
      <main>
        <MainWeather />
      </main>
      <footer></footer>
    </>
  );
}

export default App;
