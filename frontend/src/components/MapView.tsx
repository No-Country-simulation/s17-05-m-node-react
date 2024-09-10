import { MapContainer, TileLayer, Popup } from "react-leaflet";
import React, { useEffect, useRef } from "react";
import L from "leaflet";

type Props = {
  latitude: number;
  longitude: number;
};

const MapView: React.FC<Props> = React.memo(({ latitude, longitude }) => {
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
      <div className="w-full h-[300px] bg-[#575857] flex items-center justify-center">
        Coordenadas incorrectas
      </div>
    );
  }

  if (!navigator.geolocation) {
    return (
      <div className="w-full h-[300px] bg-[#575857] flex items-center justify-center">
        Tu navegador no tiene opción de Geolocation.
      </div>
    );
  }

  return (
    <MapContainer
      className="h-[300px] w-full rounded"
      center={[latitude, longitude]}
      zoom={15}
      scrollWheelZoom={false}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Popup
        position={[latitude, longitude]}
        minWidth={90}
        closeButton={false}
        autoClose={false}
        closeOnClick={false}
      >
        <span>Usted está aquí</span>
      </Popup>
    </MapContainer>
  );
});

export default MapView;
