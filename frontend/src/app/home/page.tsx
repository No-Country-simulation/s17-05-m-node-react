"use client";
import { userStore } from "@/context/zustand";
import useFetchData from "@/hooks/useFetchData";
import { getShortRecommendation, getWeatherForecast } from "@/services";
import Head from "next/head";
import Image from "next/image";
import { FC, useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import withAuth from "../auth/withAuth";
import Header from "../common/Header";

interface WeatherForecast {
  pronosticoPorHoras: any;
  climaActual: {
    amanecer: string;
    atardecer: string;
    faseLunar: number;
    temperaturaMaxima: number;
    temperaturaMinima: number;
    humedad: number;
    viento: any;
    iconoClimaActual: string;
    temperaturaActual: number;
  };
  prediccionDias: any[];
}


// Sample location data
const locations = [
  { id: 1, name: "Córdoba, Argentina", lat: "-31.4167", lon: "-64.1833", crop: "maiz" },
  { id: 2, name: "Buenos Aires, Argentina", lat: "-34.6037", lon: "-58.3816", crop: "soja" },
  { id: 3, name: "Rosario, Argentina", lat: "-32.9468", lon: "-60.6393", crop: "sorgo" },
  { id: 4, name: "Mendoza, Argentina", lat: "-32.8833", lon: "-68.8167", crop: "trigo" },
  { id: 5, name: "Salta, Argentina", lat: "-24.7833", lon: "-65.4167", crop: "girasol" },
];

const WeatherDashboard: FC = () => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [weatherForescast, setWeatherForescast] = useState<WeatherForecast>(
    {} as WeatherForecast
  );
  const [recommendation, setRecommendation] = useState({} as any);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, fields } = userStore((data) => data);
  const { fetchData } = useFetchData();

  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getForescast = async (lat: string, lon: string) => {
    const { ok, data } = await fetchData(getWeatherForecast, {
      querys: { lat, lon },
    });

    ok
      ? setWeatherForescast(data)
      : toast.error("No se puedo traer la prediccion del clima");

    // console.log(weatherForescast);
  };

  const bodyRecommendation = {
    latitud: selectedLocation.lat,
    longitude: selectedLocation.lon,
    crop: selectedLocation.crop,
    humidity: weatherForescast?.climaActual?.humedad,
    maxTemp: weatherForescast?.climaActual?.temperaturaMaxima,
    minTemp: weatherForescast?.climaActual?.temperaturaMinima,
    wind: weatherForescast?.climaActual?.viento,
    clouds: 20,
    uv: 5,
  };

  const getRecommendation = async ({ }) => {
    const { ok, data } = await fetchData(getShortRecommendation, {
      body: bodyRecommendation,
    });

    ok
      ? setRecommendation(data)
      : toast.error("No se puedo traer las recomendaciones");

    console.log("Bodyrecommendation", bodyRecommendation);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    getForescast(selectedLocation.lat, selectedLocation.lon); // aqui deberia ir la ubi del user o el campo

    
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedLocation]);
  useEffect(() => {
    
    getRecommendation(bodyRecommendation);
  }, [weatherForescast]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-pink-50 p-8">
        <Head>
          <title>Panel del clima</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="max-w-4xl mx-auto">
          {/* City selector dropdown */}
          <div className="mb-4 relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-white border border-gray-300 rounded-md px-4 py-2  text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 w-80 flex items-center justify-between"
            >
              {selectedLocation.name + " - " + selectedLocation.crop}
              {isOpen ? <Image src="/downarrow.svg" width={20} height={20} alt="" /> : <Image src="/uparrow.svg" width={20} height={20} alt="" />}
            </button>
            {isOpen && (
              <div className="absolute mt-2 w-80 bg-white text-gray-700 border border-gray-300 rounded-md shadow-lg z-10">
                <input
                  type="text"
                  placeholder="Buscar parcela..."
                  className="w-full px-4 py-2 border-b border-gray-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="max-h-60 overflow-y-auto">
                  {filteredLocations.map((location) => (
                    <div
                      key={location.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelectedLocation(location);
                        setIsOpen(false);
                        setSearchTerm("");
                      }}
                    >
                      {location.name + " - " + location.crop}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Weather card for selected location */}
          <div className="grid grid-cols-8 gap-4">
            <div className="col-span-2 row-span-3 bg-green-300 rounded-lg p-4 text-gray-800">
              <div className="flex flex-col items-center mb-2 gap-4">
                {/* <div className="w-24 h-24 bg-yellow-300 rounded-full mr-2"></div> */}
                <Image
                  src={`https://openweathermap.org/img/wn/${weatherForescast?.climaActual?.iconoClimaActual}.png`}
                  alt="clima actual"
                  width={100}
                  height={100}
                />
                <div className="text-4xl font-bold">
                  {weatherForescast?.climaActual?.temperaturaActual}°C
                </div>
                <div className="text-center">{selectedLocation.name}</div>
                <div className="border-b-2 border-gray-200 pb-4 text-center">
                  {new Intl.DateTimeFormat("es-AR", {
                    weekday: "long",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date())}
                </div>
                <div className="text-center">
                  {new Intl.DateTimeFormat("es-AR", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  }).format(new Date(Date.now() + 1000 * 60 * 60 * 24))}
                </div>
                <div className="text-center">
                  {weatherForescast?.prediccionDias?.[1]?.clima ?? ""}
                </div>
              </div>
            </div>

            {/* Weekly forecast */}
            <div className="col-span-6 bg-gray-800 rounded-lg p-4 text-white">
              <div className="flex justify-between">
                {Array.from({ length: 7 }, (_, i) =>
                  new Intl.DateTimeFormat("es-AR", { weekday: "long" }).format(
                    new Date(Date.now() + 1000 * 60 * 60 * 24 * i)
                  )
                ).map((day, index) => (
                  <div key={day} className="text-center">
                    <div>{day}</div>
                    <Image
                      src={`https://openweathermap.org/img/wn/${weatherForescast?.prediccionDias?.[index]?.icono}.png`}
                      alt="clima"
                      width={50}
                      height={50}
                    />
                    <div>
                      {weatherForescast?.prediccionDias?.[index]
                        ?.temperaturaMaxima ?? ""}
                      °C -{" "}
                      {weatherForescast?.prediccionDias?.[index]
                        ?.temperaturaMinima ?? ""}
                      °C
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sunrise/Sunset */}
            <div className="col-span-2 bg-gray-800 rounded-lg p-4 text-white">
              <div className="flex justify-between">
                <div>
                  <Image
                    src="/sunrise.svg"
                    alt="Sunrise"
                    width={50}
                    height={50}
                  />
                  <div>Amanecer</div>
                  <div>{weatherForescast?.climaActual?.amanecer}</div>
                </div>
                <div>
                  <Image
                    src="/sunset.svg"
                    alt="Sunset"
                    width={50}
                    height={50}
                  />
                  <div>Atardecer</div>
                  <div>{weatherForescast?.climaActual?.atardecer}</div>
                </div>
              </div>
            </div>

            {/* UV Index */}
            <div className="col-span-2 bg-gray-800 rounded-lg p-4 text-white">
              <div>Índice de UV</div>
              <div className="text-2xl font-bold">5.50 uv</div>
              <div>Alto</div>
            </div>

            {/* Moon phase */}
            <div className="col-span-2 bg-gray-800 rounded-lg flex flex-col items-center p-4 text-white">
              <Image src="/sunset.svg" alt="Sunset" width={50} height={50} />
              <div className="text-center">{selectedLocation.name}</div>
              <div>08:30</div>
              <div>Fase lunar: {weatherForescast.climaActual?.faseLunar}</div>
            </div>

            {/* Weather details */}
            <div className="col-span-3 bg-gray-800 rounded-lg p-4 text-white">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  Temperatura máxima:{" "}
                  {weatherForescast?.climaActual?.temperaturaMaxima}°
                </div>
                <div>
                  Temperatura mínima:{" "}
                  {weatherForescast?.climaActual?.temperaturaMinima}°
                </div>
                <div>Humedad: {weatherForescast?.climaActual?.humedad}%</div>
                <div>Nubes: 86%</div>
                <div>
                  Viento: {weatherForescast?.climaActual?.viento.velocidad}km/h
                </div>
              </div>
            </div>
            {/* Weather infographics */}
            <div className="col-span-3 row-span-2 bg-gray-800 rounded-lg ">
              <Image src="/riego.png" alt="Weather" width={500} height={500} />
            </div>

            {/* Hourly forecast */}
            <div className="col-span-3 bg-gray-800 rounded-lg p-4 text-white">
              <div className="flex justify-between">
                {Array.from(
                  { length: 6 },
                  (_, i) => new Date(Date.now() + i * 60 * 60 * 1000)
                ).map((date, i) => (
                  <div key={date.toTimeString()} className="text-center">
                    <div>
                      {date.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    <Image
                      src={`https://openweathermap.org/img/wn/${weatherForescast?.pronosticoPorHoras?.[i]?.icono}.png`}
                      alt="clima"
                      width={50}
                      height={50}
                    />
                    <div>
                      {weatherForescast?.pronosticoPorHoras?.[
                        i
                      ]?.temperatura.toFixed(1)}
                      °
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Generic advice */}
            <div className="col-span-2 bg-gray-800 rounded-lg p-2 text-white">
              <div className="flex justify-between ">
                {recommendation?.recomendation}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default withAuth(WeatherDashboard);
