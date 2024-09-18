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
import { useRouter } from "next/navigation";
import UVIndex from "@/components/UVIndex";
import Footer from "../common/Footer";
import MoonPhase from "@/components/MoonPhase";

interface WeatherForecast {
  pronosticoPorHoras: any;
  climaActual: {
    nubes: number;
    indiceUv: number;
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

const WeatherDashboard: FC = () => {
  const locations = userStore((user) => user.fields);
  console.log(locations[0])
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
  const router = useRouter();

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
    latitud: selectedLocation?.latitude,
    longitude: selectedLocation?.longitude,
    crop: selectedLocation?.mainCrop,
    humidity: weatherForescast?.climaActual?.humedad,
    maxTemp: weatherForescast?.climaActual?.temperaturaMaxima,
    minTemp: weatherForescast?.climaActual?.temperaturaMinima,
    wind: weatherForescast?.climaActual?.viento,
    clouds: weatherForescast?.climaActual?.nubes,
    uv: weatherForescast?.climaActual?.indiceUv,
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

    selectedLocation && getForescast(selectedLocation?.latitude, selectedLocation?.longitude); // aqui deberia ir la ubi del user o el campo

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
      {selectedLocation ? (<div className="min-h-screen bg-pink-50 p-8">
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
              {selectedLocation?.name + " - " + selectedLocation?.mainCrop}
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
                      {location.name + " - " + location.mainCrop}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Weather card for selected location */}
          <div className="grid grid-cols-8 gap-4">
            <div className="col-span-2 row-span-3 bg-green-300 rounded-lg p-4 text-gray-800 flex items-center justify-center">
              <div className="flex flex-col items-center mb-2 gap-4 self-center">
                {/* <div className="w-24 h-24 bg-yellow-300 rounded-full mr-2"></div> */}
                <Image
                  src={`https://openweathermap.org/img/wn/${weatherForescast?.climaActual?.iconoClimaActual}.png`}
                  alt="clima actual"
                  width={80}
                  height={80}
                />
                <div className="text-4xl font-bold">
                  {weatherForescast?.climaActual?.temperaturaActual}°C
                </div>
                <div className="text-center">{selectedLocation?.name}</div>
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
                    <div className="flex items-center justify-center">{day}</div>
                    <Image
                      src={`https://openweathermap.org/img/wn/${weatherForescast?.prediccionDias?.[index]?.icono}.png`}
                      alt="clima"
                      width={50}
                      height={50}
                      className="mx-auto"
                    />
                    <div className="flex items-center justify-center">
                      {weatherForescast?.prediccionDias?.[index]
                        ?.temperaturaMaxima.toFixed(0) ?? ""}
                      ° {" "}
                      {weatherForescast?.prediccionDias?.[index]
                        ?.temperaturaMinima.toFixed(0) ?? ""}
                      °
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sunrise/Sunset */}
            <div className="col-span-2 bg-gray-800 rounded-lg p-4 text-white text-center flex items-center">
              <div className="flex justify-center">
                <div className="mx-2">
                  <Image
                    src="/sunrise.svg"
                    alt="Sunrise"
                    width={50}
                    height={50}
                    className="mx-auto"
                  />
                  <div>Amanecer</div>
                  <div>{weatherForescast?.climaActual?.amanecer}</div>
                </div>
                <div className="mx-2">
                  <Image
                    src="/sunset.svg"
                    alt="Sunset"
                    width={50}
                    height={50}
                    className="mx-auto"
                  />
                  <div>Atardecer</div>
                  <div>{weatherForescast?.climaActual?.atardecer}</div>
                </div>
              </div>
            </div>

            {/* UV Index */}
            <div className="col-span-2 bg-gray-800 rounded-lg p-4 text-white  flex items-center align justify-center">

              <UVIndex value={weatherForescast?.climaActual?.indiceUv} maxValue={10} />
            </div>

            {/* Moon phase */}
            <div className="col-span-2  justify-center ">

              <MoonPhase faseLunar={weatherForescast.climaActual?.faseLunar} location={selectedLocation.name} />

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
                <div>Nubes: {weatherForescast?.climaActual?.nubes} %</div>
                <div>
                  Viento: {weatherForescast?.climaActual?.viento.velocidad}km/h
                </div>
              </div>
            </div>
            {/* Weather infographics */}
            <div className="col-span-3 row-span-2 bg-gray-800 rounded-lg ">
              <img src="/riego.webp" alt="Weather" width={500} height={500} />
            </div>

            {/* Hourly forecast */}
            <div className="col-span-3 bg-gray-800 rounded-lg p-4 text-white flex items-center justify-center">
              <div className="flex justify-between">
                {Array.from(
                  { length: 6 },
                  (_, i) => new Date(Date.now() + i * 60 * 60 * 1000)
                ).map((date, i) => (
                  <div key={date.toTimeString()} className="text-center p-1">
                    <div>
                      {date.toLocaleTimeString([], {
                        hour: "numeric",
                        // minute: "2-digit",
                        hour12: true,
                      }).toLowerCase()}
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
                      ]?.temperatura.toFixed(0)}
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
      </div>) : (
        <div className="flex flex-col justify-center items-center bg-primary text-black min-h-custom">
          <h1 className="text-3xl font-bold mb-2 text-center">No hay campos creados!!!</h1>
          <p className="text-lg font-semibold ">Para mostrar el clima en tus campos, primero deberías crea uno</p>
          <button
            onClick={() => router.push("myFields/createField")}
            className="mt-10 bg-[#2f6c3d] text-white px-4 py-2  rounded"
          >
            Crear campo
          </button>
        </div>
      )}
      <Footer/>
    </>
  );
};

export default withAuth(WeatherDashboard);
