import  { useState } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";

const Search = ({ setQuery, units, setUnits, loading }) => {
  const [city, setCity] = useState("");

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };

  const handleSearchClick = () => {
    if (city.trim() !== "") {
      setQuery({ q: city });
      setCity("");
    } else {
      return { error: "Please enter a valid city name" };
    }
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter" && city.trim() !== "") {
      setQuery({ q: city });
      setCity("");
    } else {
      return { error: "Please enter a valid city name" };
    }
  };

  const handleCityChange = (e) => {
    const input = e.target.value;

    if (/^[a-zA-Z\s]+$/.test(input.trim())) {
      setCity(input);
    } else {
      setCity("");
    }
  };

  // Function commented out because it is unfortunately in compatitble with the current free OpenWeather API2.5
  /*

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        setQuery({ lat, lon });
        console.log('query:', { lat, lon });
      });
    }
  };
  */

  return (
    <div className="flex flex-col justify-center items-center my-2 sm:my-6 sm:flex-row sm:justify-center sm:items-center">
     
        <input
          value={city}
          type="text"
          placeholder="Search for a city..."
          className="text-xs sm:text-xl font-light p-2 w-full md:w-1/2 shadow-xl focus:outline-none capitalize placeholder:lowercase mb-2 sm:mb-0 sm:mr-2"
          onChange={handleCityChange}
          onKeyDown={handleInputKeyDown}
        />

         <div className="flex flex-col md:flex-row items-center justify-around">
        <div className="flex flex-row justify-center">
          <div className="mx-1 sm:mx-1">
            <UilSearch
              size={25}
              className="text-white cursor-pointer transition ease-out hover:scale-125 w-4 sm:w-auto"
              onClick={handleSearchClick}
            />
          </div>
          <div className="mx-1 sm:mx-1">
            <UilLocationPoint
              size={25}
              className="text-white cursor-pointer transition ease-out hover:scale-125 w-4 sm:w-auto"
              //onClick={handleLocationClick}
            />
          </div>
        </div>
      
  
      <div className="flex flex-row w-1/4 items-center justify-center text-white text-sm sm:text-xl font-light">
        <button
          name="metric"
          className={`mx-0 sm:mx-1 ${units === "imperial" ? "text-gray-400" : ""}`}
          onClick={handleUnitsChange}
        >
          °C
        </button>
        <p className="mx-1">|</p>
        <button
          name="imperial"
          className={`mx-0 sm:mx-1 ${units === "metric" ? "text-gray-400" : ""}`}
          onClick={handleUnitsChange}
        >
        °F
        </button>
        </div>
      </div>
    </div>
  );
}
  export default Search;
  