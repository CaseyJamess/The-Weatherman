import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { DateTime } from "luxon";

function withLoading(Component) {
  // Higher-order component to handle loading state
  return function WithLoadingComponent({ data, forecastData }) {
    if (!data?.main && !forecastData?.list) {
      return <div className="loading-Container">Loading...</div>;

    }
    return <Component data={data} forecastData={forecastData} />;
  };
}

function WeatherDisplay(props) {
  const { data, forecastData, isLoading, isError } = props;
  const [isCelsius, setIsCelsius] = useState(false);
  const [location, setLocation] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");

  // useEffect to handle data updates
  useEffect(() => {
    if (
      data &&
      data.coord &&
      data.timezone &&
      forecastData &&
      forecastData.list
    ) {
      setLocation(`${data.coord.lat},${data.coord.lon}`);
      const unixTimestamp = data.dt;
      const offsetSeconds = data.timezone;

      // Create a DateTime object with the provided Unix timestamp
      const dateTimeUtc = DateTime.fromMillis(unixTimestamp * 1000, {
        zone: "utc",
      });

      // Set the time zone using the offset in minutes
      const localDateTime = dateTimeUtc.setZone(offsetSeconds / 60);

      const dateTimeString = localDateTime.toFormat("cccc HH:mm"); // Format the date and time

      setDateTime(dateTimeString);
      setCityName(data.name);
      setCountryName(data.sys.country);
    }
  }, [data, forecastData]);

  const { weather, main } = data || {};
  const weatherMain = weather && weather.length > 0 ? weather[0].main : "";

  const icon = weather[0].icon; // For instance "09d"

  const weather2Image =
    weather && weather.length > 0
      ? `http://openweathermap.org/img/w/${icon}.png`
      : "";

  // Defining weather paramters from the current weather
  const temperature = main
    ? !isCelsius
      ? main.temp.toFixed(1)
      : ((main.temp * 9) / 5 + 32).toFixed(1)
    : "-";
  const feelsLike = main
    ? !isCelsius
      ? main.feels_like.toFixed(1)
      : ((main.feels_like * 9) / 5 + 32).toFixed(1)
    : "-";
  const temperatureUnit = isCelsius ? "°F" : "°C";
  const celsiusUnit = "°C";
  const fahrenheitUnit = "°F";
  const maxTemp = main
    ? !isCelsius
      ? main.temp_max.toFixed(1)
      : ((main.temp_max * 9) / 5 + 32).toFixed(1)
    : "-";
  const minTemp = main
    ? !isCelsius
      ? main.temp_min.toFixed(1)
      : ((main.temp_min * 9) / 5 + 32).toFixed(1)
    : "-";

  const windSpeed = data && data.wind ? data.wind.speed.toFixed(1) : "-";
  const windAngle = data && data.wind ? data.wind.deg : "-";

  function calculateWindDirection(angle) {
    const directions = [
      "North",
      "North East",
      "East",
      "South East",
      "South",
      "South West",
      "West",
      "North West",
    ];
    const index = Math.round(angle / 45) % 8;
    return directions[index];
  }

  const windDirection = calculateWindDirection(windAngle);
  /*
  const displayConditions = weatherDescription
    ? weatherDescription
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "-";
*/
  const humidity = data?.main?.humidity || "-";
  const temperatureUnitStyle = {
    opacity: !isCelsius ? 1 : 0.5,
    cursor: "pointer",
  };

  const fahrenheitStyle = {
    opacity: isCelsius ? 1 : 0.5,
    cursor: "pointer",
  };
  const cloudCoverage = data && data.clouds ? data.clouds.all : "-";
  //const pressure = main ? (main.pressure ? main.pressure : "-") : "-";

  // Defining needed data from the forecast data
  // Get the current day of the week (0: Sunday, 1: Monday, ..., 6: Saturday)
  const currentDay = DateTime.now().weekday;

  // Define an array of days of the week
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Slice the forecast data to get the first 5 entries and map them to a new array
  const forecastEntries = forecastData.list.slice(0, 5).map((entry, index) => ({
    // Calculate the day of the week for each forecast entry
    day: daysOfWeek[(currentDay + index + 1) % 7],
    temp: entry.main.temp.toFixed(1),
    icon: entry.weather[0].icon,
    description: entry.weather[0].description,
  }));

  const day1Forecast = forecastEntries[0];
  const day2Forecast = forecastEntries[1];
  const day3Forecast = forecastEntries[2];
  const day4Forecast = forecastEntries[3];
  const day5Forecast = forecastEntries[4];

  const forecast1Image = `http://openweathermap.org/img/w/${day1Forecast.icon}.png`;
  const forecast2Image = `http://openweathermap.org/img/w/${day2Forecast.icon}.png`;
  const forecast3Image = `http://openweathermap.org/img/w/${day3Forecast.icon}.png`;
  const forecast4Image = `http://openweathermap.org/img/w/${day4Forecast.icon}.png`;
  const forecast5Image = `http://openweathermap.org/img/w/${day5Forecast.icon}.png`;

  const forecast1Temp = !isCelsius
    ? forecastEntries[0].temp
    : ((forecastEntries[0].temp * 9) / 5 + 32).toFixed(1);
  const forecast2Temp = !isCelsius
    ? forecastEntries[1].temp
    : ((forecastEntries[1].temp * 9) / 5 + 32).toFixed(1);
  const forecast3Temp = !isCelsius
    ? forecastEntries[2].temp
    : ((forecastEntries[2].temp * 9) / 5 + 32).toFixed(1);
  const forecast4Temp = !isCelsius
    ? forecastEntries[3].temp
    : ((forecastEntries[3].temp * 9) / 5 + 32).toFixed(1);
  const forecast5Temp = !isCelsius
    ? forecastEntries[4].temp
    : ((forecastEntries[4].temp * 9) / 5 + 32).toFixed(1);

  if (!data?.main) {
    return null;
  }

  if (isLoading) {
    return (
      <Container id="weatherContainer" className="text-center">
        <p>Loading...</p>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container id="weatherContainer" className="text-center">
        <p>Failed to fetch weather data.</p>
      </Container>
    );
  }

  return (
    <Container id="weatherContainer" className="text-left">
      <Row id="location">
        <Col md={12} className="text-left">
          <div className="text-left">
            <p>
              Showing results for {cityName}, {countryName}
            </p>
            <p>{dateTime}</p>
          </div>
        </Col>
      </Row>

      <Row id="mainDisplay">
        <Col className="text-center">
          <div className="d-flex align-items-center justify-content-center">
            <div className="weather-image">
              <img
                src={weather2Image}
                className="weatherImage"
                alt={`Weather Icon: ${weatherMain}`}
              />
            </div>
            <div className="ml-3">
              {temperature}{" "}
              <span
                onClick={() => setIsCelsius(false)}
                style={temperatureUnitStyle}
              >
                {celsiusUnit}
              </span>{" "}
              |{" "}
              <span onClick={() => setIsCelsius(true)} style={fahrenheitStyle}>
                {fahrenheitUnit}
              </span>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <div>
            <p>
              Feels like {feelsLike} {temperatureUnit}
            </p>
            <p>
              Range: {minTemp} - {maxTemp} {temperatureUnit}
            </p>
          </div>
        </Col>
        <Col className="text-center">
          <div>
            <p>Wind Speed: {windSpeed} MPH</p>
            <p>Wind Direction: {windDirection} </p>
          </div>
        </Col>
        <Col className="text-center">
          <div>
            <p>Cloud Coverage: {cloudCoverage}%</p>
            <p>Humidity: {humidity}%</p>
          </div>
        </Col>
      </Row>
      <hr />
      <Row id="forecast">
        <Col className="text-left">
          <div className="text-left">
            <p>Week Forecast:</p>
          </div>
        </Col>
      </Row>
      <Row id="forecastDisplay">
        <Col className="text-center">
          <div>
            <p>{day1Forecast.day}</p>
            <img src={forecast1Image} alt="Day 1 Forecast"></img>
            <p>
              {forecast1Temp}
              {temperatureUnit}
            </p>
          </div>
        </Col>
        <Col className="text-center">
          <div>
            <p>{day2Forecast.day}</p>
            <img src={forecast2Image} alt="Day 2 Forecast"></img>
            <p>
              {forecast2Temp}
              {temperatureUnit}
            </p>
          </div>
        </Col>
        <Col className="text-center">
          <div>
            <p>{day3Forecast.day}</p>
            <img src={forecast3Image} alt="Day 3 Forecast"></img>
            <p>
              {forecast3Temp}
              {temperatureUnit}
            </p>
          </div>
        </Col>
        <Col className="text-center">
          <div>
            <p>{day4Forecast.day}</p>
            <img src={forecast4Image} alt="Day 4 Forecast"></img>
            <p>
              {forecast4Temp}
              {temperatureUnit}
            </p>
          </div>
        </Col>
        <Col className="text-center">
          <div>
            <p>{day5Forecast.day}</p>
            <img src={forecast5Image} alt="Day 5 Forecast"></img>
            <p>
              {forecast5Temp}
              {temperatureUnit}
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default withLoading(WeatherDisplay);
