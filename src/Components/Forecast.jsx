
import { formatSunTime } from "../Utility.jsx";

const ForecastItem = ({ time, icon, temperature, units }) => {
  return (
    <div className="flex flex-col text-center items-center mx:auto justify-between text-xs sm:text-lg font-light mb-10 p-1 h-16 w-full sm:w-24">
      <p className="leading-normal">{time}</p>
      <img
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="Weather"
        className="w-10 sm:w-12 lg:w-16"
      />
      <p className="leading-normal">
        {temperature} {units === "metric" ? "°C" : "°F"}
      </p>
    </div>
  );
};

const Forecast = ({ forecastData, units }) => {
  return (
    <div>
      <div className="flex items-center justify-between align-self-start mt-2 p-2 sm:mt-6">
        <p className="text-white font-medium text-sm sm:text-lg uppercase">Daily Forecast</p>
      </div>
      <hr className="my-2" />
      <div className="text-white flex items-center justify-center sm:justify-between">
        {forecastData.map((item) => (
          <ForecastItem
            key={item.dt}
            time={formatSunTime(item.dt, item.timezone)}
            icon={item.weather[0].icon}
            temperature={item.temp.toFixed(1)}
            units={units}
          />
        ))}
      </div>
    </div>
  );
};

export default Forecast;
