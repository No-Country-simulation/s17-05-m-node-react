export function formatearClima(data) {
  // Obtener la hora actual, clima y otros detalles
  const climaActual = {
    temperaturaActual: data.current.temp,
    climaActual: data.current.weather[0].description,
    iconoClimaActual: data.current.weather[0].icon,
    amanecer: new Date(data.current.sunrise * 1000).toLocaleTimeString(),
    atardecer: new Date(data.current.sunset * 1000).toLocaleTimeString(),
    faseLunar: data.daily[0].moon_phase,
    temperaturaMaxima: data.daily[0].temp.max,
    temperaturaMinima: data.daily[0].temp.min,
    indiceUv: data.current.uvi,
    nubes: data.current.clouds,
    humedad: data.current.humidity,
    viento: {
      velocidad: data.current.wind_speed,
      direccion: data.current.wind_deg,
      rafaga: data.current.wind_gust,
    },
  };

  // Pronóstico por hora para hoy
  const pronosticoPorHoras = data.hourly.map((hora) => ({
    hora: new Date(hora.dt * 1000).toLocaleTimeString(),
    temperatura: hora.temp,
    clima: hora.weather[0].description,
    icono: hora.weather[0].icon,
  }));

  // Predicción para los próximos días
  const prediccionDias = data.daily.map((dia) => ({
    fecha: new Date(dia.dt * 1000).toLocaleDateString(),
    temperaturaMaxima: dia.temp.max,
    temperaturaMinima: dia.temp.min,
    clima: dia.weather[0].description,
    icono: dia.weather[0].icon,
  }));

  // Alertas
  const alertas = data.alerts
    ? data.alerts.map((alerta) => ({
        nombreEmisor: alerta.sender_name,
        evento: alerta.event,
        descripcion: alerta.description,
        inicio: new Date(alerta.start * 1000).toLocaleString(),
        fin: new Date(alerta.end * 1000).toLocaleString(),
      }))
    : [];

  return {
    climaActual,
    pronosticoPorHoras,
    prediccionDias,
    alertas,
  };
}
