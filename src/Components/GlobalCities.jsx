

const GlobalCities = ({ setQuery }) => {
  const cities = [
    {
      id: 0,
      name: "New York",
    },
    {
      id: 1,
      name: "London",
    },
    {
      id: 2,
      name: "Paris",
    },
    {
      id: 3,
      name: "Tokyo",
    },
    {
      id: 4,
      name: "Sydney",
    },
  ];

  const handleCityClick = (city) => {
    setQuery({ q: city });
  };

  return (
    <div className="flex flex-row justify-center my-3 sm:my-6  text-white">
      {cities.map((city) => (
        <button
          key={city.id}
          onClick={() => handleCityClick(city.name)}
          className="whitespace-nowrap px-1 py-2 text-sm sm:text-xl cursor-pointer lg:hover:scale-110 duration-300 hover:text-sky-400 sm:px-3"
        >
          {city.name}
        </button>
      ))}
    </div>
  );
      };  

export default GlobalCities;
