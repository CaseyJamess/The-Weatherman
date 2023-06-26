
import {
  UilArrowUp,
  UilArrowDown,
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from '@iconscout/react-unicons';

import {formatTemperature} from '../Utility.jsx';

const Temperature = ({formattedData, units, sunrise, sunset}) => {

  const icon = formattedData.icon;
  

  function capitaliseWords(input) {
    return input.replace(/\b\w/g, function(match) {
      return match.toUpperCase();
    });
  }
  console.log('units', units);

const description = capitaliseWords(formattedData.details);

const temp = formatTemperature(formattedData.temp, units === 'metric' ? 'C' : 'F');
const feelsLike = formatTemperature(formattedData.feels_like, units === 'metric' ? 'C' : 'F');
const temp_min = formatTemperature(formattedData.temp_min, units === 'metric' ? 'C' : 'F');
const temp_max = formatTemperature(formattedData.temp_max, units === 'metric' ? 'C' : 'F');


const humidity = `${formattedData.humidity} %`;

const wind = units === 'metric' ? `${formattedData.speed.toFixed(1)} m/s` : `${formattedData.speed.toFixed(1)} mph`;


return (
  <div >
    <div className='flex flex-col sm:flex-row items-center justify-center text-center my-0 mt-2 text-xl sm:text-4xl sm:my-2 text-neutral-100'>
      <p>{description}</p>
    </div>

    <div className='flex flex-col sm:flex-row items-center mx-auto text-center justify-between text-neutral-100 py-1  sm:mb-3'>
      <img
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="Weather Image"
        
      />

      <p className='text-2xl mb-1 sm:text-4xl flex-shrink-0'>{temp}</p>

      <div className='flex flex-col font-light text-xs sm:text-lg space-y-2 my-3'>
        <div className='flex  items-center justify-center'>
          <UilTemperature size={20} className="mr-1"/>
          <span>Feels like:</span>
          <span className='font-medium ml-1'>{feelsLike}</span>
        </div>

        <div className='flex items-center justify-center'>
          <UilTear size={20} className="mr-1"/>
          <span>Humidity:</span>
          <span className='font-medium ml-1'>{humidity}</span>
        </div>

        <div className='flex items-center justify-center'>
          <UilWind size={20} className="mr-1"/>
          <span>Wind:</span>
          <span className='font-medium ml-1'>{wind}</span>
        </div>
      </div>
    </div>

    <div className='flex flex-row items-center justify-center space-x-1 sm:space-x-3 text-xs sm:text-lg text-neutral-100 font-light '>
  <UilSun size={25} className="mr-1 "/> 
  <p>Rise: <span>{sunrise}</span></p>
  <p>|</p>

  <UilSunset size={25} /> 
  <p>Sunset: <span>{sunset}</span></p>
  <p>|</p>

  <UilArrowDown size={25}/> 
  <p>Low: <span>{temp_min}</span></p>
  <p>|</p>

  <UilArrowUp size={25} /> 
  <p>High: <span>{temp_max}</span></p>
</div>

  </div>
);

};

export default Temperature;
