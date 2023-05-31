import React, { useState, useEffect } from "react";
import GlobalCities from "./Components/GlobalCities";
import Search from "./Components/Search";
import TimeLocation from "./Components/TimeLocation";
import Temperature from "./Components/Temperature";
import Forecast from "./Components/Forecast";
import getWeatherData from "./Weather.js";
import { isNightTime } from "./Utility.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = useState(null);
  const [units, setUnits] = useState("metric");
  const [loading, setLoading] = useState(true);
  const [localTimeAndDay, setLocalTimeAndDay] = useState(null);
  const [localTime, setLocalTime] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);
  const [backgroundClass, setBackgroundClass] = useState(
    "from-cyan-700 to-blue-700"
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        toast.info("Fetching weather for " + query.q);
        const data = await getWeatherData(query, units);

        setLoading(true);
        if (data.error) {
          setErrorMessage(data.error);
        } else {
          setWeatherData(data.formattedData);
          setLocalTimeAndDay(data.localTimeAndDay);
          setLocalTime(data.localTime);
          setForecastData(data.forecastData);
          setSunrise(data.sunrise);
          setSunset(data.sunset);
          setErrorMessage(null);

          const tempThreshold = units === "metric" ? 25 : 77;

          const currentTemp = data.formattedData.temp;
          const tempBackgroundClass =
            currentTemp <= tempThreshold
              ? "from-cyan-700 to-blue-700"
              : "from-yellow-700 to-orange-700";
          setBackgroundClass(tempBackgroundClass);

          const isNight = isNightTime(
            data.localTime,
            data.sunrise,
            data.sunset
          );
          const backgroundClass = isNight
            ? "from-gray-400 to-gray-800"
            : tempBackgroundClass;
          setBackgroundClass(backgroundClass);
        }
      } catch (error) {
        setErrorMessage(error);
        console.log("error", error);
      } finally {
        setLoading(false);
        toast.success(`Successfully fetched weather for ` + query.q);
      }
    };

    if (query) {
      fetchData();
    }
  }, [query, units]);

  return (
    <div className=" flex justify-center">
      <div
        className={`max-w-screen-md w-full my-10 px-24 py-5 bg-gradient-to-br sm:bg-gradient-to-br md:bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${backgroundClass}`}
      >
        <GlobalCities setQuery={setQuery} />
        <Search
          setQuery={setQuery}
          units={units}
          setUnits={setUnits}
          setWeatherData={setWeatherData}
          loading={loading}
        />
        {weatherData && (
          <>
            <TimeLocation
              formattedData={weatherData}
              localTimeAndDay={localTimeAndDay}
            />
            <Temperature
              formattedData={weatherData}
              units={units}
              sunrise={sunrise}
              sunset={sunset}
            />
            <Forecast
              title="Hourly Forecast"
              forecastData={forecastData}
              units={units}
            />
          </>
        )}
      </div>

      <ToastContainer autoClose={2000} theme="colored" newestOnTop={true} />

      {errorMessage && (
        <div className="fixed top-0 left-0 right-0 bg-red-500 p-2 text-white text-sm text-center">
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default App;
