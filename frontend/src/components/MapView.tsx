import { MapContainer, TileLayer, Popup } from "react-leaflet";
import React, { useEffect, useRef, ReactNode } from "react";
import L from "leaflet";

type Props = {
  latitude: number;
  longitude: number;
  name?: string;
  children?: ReactNode;
};

const MapView: React.FC<Props> = React.memo(function MapView({
  latitude,
  longitude,
  name,
  children,
}) {
  const mapRef = useRef<L.Map>(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      const currentCenter = map.getCenter();
      if (currentCenter.lat !== latitude || currentCenter.lng !== longitude) {
        map.setView([latitude, longitude], 15);
      }
    }
  }, [latitude, longitude]);

  if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
    return (
      <div
        className="w-full
                   h-[332px]
                   bg-[#575857]
                   rounded-lg
                   flex
                   items-center
                   justify-center"
      >
        Coordenadas incorrectas
      </div>
    );
  }

  if (!navigator.geolocation) {
    return (
      <div
        className="w-full
                   h-[332px]
                   bg-[#575857]
                   flex
                   items-center
                   justify-center"
      >
        Tu navegador no tiene opción de Geolocation.
      </div>
    );
  }

  return (
    <MapContainer
      className="w-full
                 h-full
                 rounded-lg"
      center={[latitude, longitude]}
      zoom={15}
      scrollWheelZoom={true}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Popup
        position={[latitude, longitude]}
        minWidth={90}
        closeButton={true}
        autoClose={false}
        closeOnClick={false}
      >
        <span>{name || "Sin nombre"}</span>
      </Popup>
      {children && children}
    </MapContainer>
  );
});

export default MapView;
