import axios from 'axios';

export const getToday = async (lat, lon) => {
  try {
    const peticion = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: lon,
        appid: process.env.OPEN_WEATHER_API_KEY,
        lang: "es",
        units: "metric",
      },
    });
    return peticion;
  } catch (error) {
    console.error("No se pudo traer el pronóstico de 1 día", error);
    throw error;
  }
};
