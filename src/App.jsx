import { useState, useEffect } from "react";
import GlobalCities from "./Components/GlobalCities";
import Search from "./Components/Search";
import TimeLocation from "./Components/TimeLocation";
import Temperature from "./Components/Temperature";
import Forecast from "./Components/Forecast";
import getWeatherData from "./Weather.jsx";
import { isNightTime } from "./Utility.jsx";
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
    <div className={`flex flex-col items-center lg:mx-auto  min-h-screen w-full  bg-gradient-to-br  ${backgroundClass} `}>
   
    
 
      <div className="mt-2 lg:mt-4 mx-5 lg:mx-auto ">
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
    
      <ToastContainer autoClose={1000} theme="colored" newestOnTop={true} />

      {errorMessage && (
        <div className="fixed top-0 left-0 right-0 bg-red-500 p-2 text-white text-sm text-center">
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default App;
