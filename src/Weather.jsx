import {
  formatLocalTime,
  formatSunTime,
  formatLocalTimeAndDay,
} from "./Utility.jsx";

const weatherAPI = import.meta.env.VITE_REACT_APP_WEATHER_API_KEY;
const urlConstruct = "https://api.openweathermap.org/data/2.5";

// Unfortunately limited by open weather API for the functionality
/*
https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid=

https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&appid=

*/

const getWeatherData = async (searchParam, unitPref) => {
  try {
    let url = `${urlConstruct}/weather?q=${searchParam.q}&appid=${weatherAPI}&units=${unitPref}`;
    const response = await fetch(url);
    const weatherData = await response.json();
    if (weatherData.cod === "404") {
      return { error: "Sorry, we could not find that place. Please try again" };
    }

    const formattedData = formatWeatherData(weatherData);
    const localTimeAndDay = formatLocalTimeAndDay(
      formattedData.dt,
      formattedData.timezone
    );
    const localTime = formatLocalTime(formattedData.dt, formattedData.timezone);
    const sunrise = formatSunTime(
      formattedData.sunrise,
      formattedData.timezone
    );
    const sunset = formatSunTime(formattedData.sunset, formattedData.timezone);
    const { lat, lon } = weatherData.coord;
    const unit = unitPref;
    const forecastData = await fetchForecastWeather(lat, lon, unit);
    return {
      formattedData,
      localTime,
      localTimeAndDay,
      forecastData,
      sunrise,
      sunset,
    };
  } catch (error) {
    console.error("An error occurred while fetching weather data:", error);
    throw new Error(
      "An error occurred while fetching weather data. Please try again."
    );
  }
};

const formatWeatherData = (data) => {
  const {
    sys: { country },
    weather: [{ description, icon }],
    dt,
    timezone,
    main: { feels_like, humidity, temp, temp_max, temp_min },
    coord: { lat, lon },
    name,
    wind: { speed },
    sys: { sunrise, sunset },
  } = data;

  return {
    country,
    timezone,
    details: description,
    dt,
    feels_like,
    humidity,
    icon,
    lat,
    lon,
    name,
    speed,
    sunrise,
    sunset,
    temp,
    temp_max,
    temp_min,
  };
};

async function fetchForecastWeather(lat, lon, unitPref) {
  try {
    const url = `${urlConstruct}/forecast?lat=${lat}&lon=${lon}&appid=${weatherAPI}&units=${unitPref}`;
    const response = await fetch(url);
    const forecastData = await response.json();
    console.log("forecastData", forecastData);

    const { list } = forecastData;
    const filteredData = list
      .slice(0, 5)
      .map((item) => formatForecastItem(item, forecastData.city.timezone));
    console.log("filteredForecastWeather: ", filteredData);
    return filteredData;
  } catch (error) {
    throw new Error(
      "An error occurred while fetching forecast data. Please try again."
    );
  }
}

const formatForecastItem = (item, timezone) => {
  const {
    dt,
    dt_txt,
    main: { temp },
    weather,
  } = item;
  return {
    dt,
    dt_txt,
    temp,
    weather,
    timezone,
  };
};

export default getWeatherData;
