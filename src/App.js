import React, { useState, useRef } from "react";
import WeatherDisplay from "./WeatherDisplay";
import { Row, Col } from "react-bootstrap";

//Main function call App with React State variables defined underneath
function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const weatherAPI = process.env.REACT_APP_WEATHER_API_KEY;
  const inputRef = useRef(null);

  // This function fetches weather data from the API
  const fetchData = async () => {
    try {
      setLoading(true); // Set the loading state to true

      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPI}&units=metric`
      );
      const weatherData = await weatherResponse.json();

      if (weatherData.cod === "404") {
        setWeatherData(null);
        setLoading(false);
        setErrorMessage(
          "Sorry, we could not find that place. Please try again."
        );
        return;
      }

      setWeatherData(weatherData);

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherAPI}&units=metric`
      );
      const forecastData = await forecastResponse.json();

      if (forecastData.cod === "404") {
        setForecastData(null);
        setLoading(false);
        setErrorMessage(
          "Sorry, we could not find the forecast for that place. Please try again."
        );
        return;
      }

      setForecastData(forecastData);
      setLoading(false);
      setErrorMessage(null);
    } catch (error) {
      console.log(error);
      setWeatherData(null);
      setForecastData(null);
      setLoading(false);
      setErrorMessage("Sorry, something went wrong. Please try again later.");
    }
  };

  const handleInputKeyDown = async (event) => {
    if (event.key === "Enter") {
      const inputValue = inputRef.current.value.trim();
      if (inputValue !== "") {
        setCity(inputValue);
        await fetchData(); // Call the fetchData function to fetch weather and forecast data
      }
    }
  };

  const handleCityChange = (e) => {
    const input = e.target.value; // Get the value of the input without trimming

    if (/^[a-zA-Z\s]+$/.test(input.trim())) {
      // Check if the trimmed input only contains letters and spaces
      setCity(input); // Set the city state to the input without trimming
      setErrorMessage(null);
    } else {
      setCity("");
      setWeatherData(null);
      setErrorMessage("Please enter a valid city name");
    }
  };
  // Define the dynamic text for the h6 element
  const h6Text = loading ? "Loading..." : "...Where would you like to know the weather of?";
  
  // Main display - featuring JSX WeatherDisplay from child component
  return (
    <div className="App text-center">
      <Row>
        <Col>
          <h1>The Weatherman</h1>
          <h6>{h6Text}</h6>
        </Col>
      </Row>

      <input
        ref={inputRef}
        className="userInput"
        type="text"
        value={city}
        onChange={handleCityChange}
        onKeyDown={handleInputKeyDown}
      />
      {weatherData && forecastData && (
        <WeatherDisplay data={weatherData} forecastData={forecastData} />
      )}
      {errorMessage && <p id="errorMessage">{errorMessage}</p>}
    </div>
  );
}
export default App;
