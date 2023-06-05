//Utility file for complex functions such as time/date formatting
//Used to streamline code in other folders
import { DateTime } from "luxon";

export function formatLocalTimeAndDay(
  unixTimestamp,
  offsetSeconds,
  format = "cccc HH:mm"
) {
  const dateTimeUtc = DateTime.fromMillis(unixTimestamp * 1000, {
    zone: "utc",
  });
  const localDateTime = dateTimeUtc.setZone(offsetSeconds / 60);
  return localDateTime.toFormat(format);
}

export function formatLocalTime(
  unixTimestamp,
  offsetSeconds,
  format = "HH:mm"
) {
  const dateTimeUtc = DateTime.fromMillis(unixTimestamp * 1000, {
    zone: "utc",
  });
  const localDateTime = dateTimeUtc.setZone(offsetSeconds / 60);
  return localDateTime.toFormat(format);
}

export function formatFullTime(
  unixTimestamp,
  offsetSeconds,
  format = "LLLL, cccc HH:mm"
) {
  const dateTimeUtc = DateTime.fromMillis(unixTimestamp * 1000, {
    zone: "utc",
  });
  const localDateTime = dateTimeUtc.setZone(offsetSeconds / 60);
  return localDateTime.toFormat(format);
}

export function formatSunTime(unixTimestamp, offsetSeconds, format = " HH:mm") {
  const dateTimeUtc = DateTime.fromMillis(unixTimestamp * 1000, {
    zone: "utc",
  });
  const localDateTime = dateTimeUtc.setZone(offsetSeconds / 60);
  return localDateTime.toFormat(format);
}

export const isNightTime = (localTime, sunrise, sunset) => {
  const [localHour, localMinute] = localTime.split(":");
  const [sunriseHour, sunriseMinute] = sunrise.split(":");
  const [sunsetHour, sunsetMinute] = sunset.split(":");
  const localTimeValue = parseInt(localHour) * 60 + parseInt(localMinute);
  const sunriseValue = parseInt(sunriseHour) * 60 + parseInt(sunriseMinute);
  const sunsetValue = parseInt(sunsetHour) * 60 + parseInt(sunsetMinute);
  return localTimeValue < sunriseValue || localTimeValue > sunsetValue;
};


export function formatTemperature(temperature, unit) {
  const formattedTemperature = temperature.toFixed(1);
  return `${formattedTemperature} °${unit}`;
}
