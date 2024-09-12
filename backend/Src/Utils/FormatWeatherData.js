export function formatearClima(data) {
  console.log("Datos recibidos para formatear:", data); // Para depuración

  if (!data || !data.main || !data.weather || !data.sys || !data.wind) {
    throw new Error("Datos del clima incompletos");
  }

  const climaActual = {
    temperaturaActual: data.main.temp || 'No disponible',
    climaActual: data.weather[0]?.description || 'No disponible',
    iconoClimaActual: data.weather[0]?.icon || 'No disponible',
    amanecer: data.sys?.sunrise ? new Date(data.sys.sunrise * 1000).toLocaleTimeString() : 'No disponible',
    atardecer: data.sys?.sunset ? new Date(data.sys.sunset * 1000).toLocaleTimeString() : 'No disponible',
    faseLunar: 'No disponible', // Este campo no está en los datos proporcionados
    temperaturaMaxima: data.main.temp_max || 'No disponible',
    temperaturaMinima: data.main.temp_min || 'No disponible',
    humedad: data.main.humidity || 'No disponible',
    viento: {
      velocidad: data.wind?.speed || 'No disponible',
      direccion: data.wind?.deg || 'No disponible',
      rafaga: data.wind?.gust || 'No disponible',
    },
  };

  
  const pronosticoPorHoras = [];
  const prediccionDias = [];
  const alertas = [];

  return {
    climaActual,
    pronosticoPorHoras,
    prediccionDias,
    alertas,
  };
}
