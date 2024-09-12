import { getToday } from "../../Service/Clima/Clima.service.js";
import { formatearClima } from "../../Utils/FormatWeatherData.js";

export const weatherForecast = async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "Falta longitude o latitud" });
  }

  try {
    const response = await getToday(lat, lon);
    const forecast = formatearClima(response.data);
    res.json(forecast);
  } catch (error) {
    console.error("Error al obtener el clima:", error);
    res.status(500).json({ error: `No se pudo buscar el clima ${error.message}` });
  }
};
