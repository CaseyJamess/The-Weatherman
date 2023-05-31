import React from "react";
import { formatSunTime } from "../Utility.js";

const ForecastItem = ({ time, icon, temperature, units }) => {
  return (
    <div className="flex flex-col items-center justify-between text-xs sm:text-lg font-light mb-10 p-1 h-16 w-24">
      <p className="leading-normal">{time}</p>
      <img
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="Weather Image"
        className="w-12"
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
      <div className="flex items-center align-self-start mt-6">
        <p className="text-white font-medium uppercase">Daily Forecast</p>
      </div>
      <hr className="my-2" />
      <div className="text-white flex items-center justify-between">
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
