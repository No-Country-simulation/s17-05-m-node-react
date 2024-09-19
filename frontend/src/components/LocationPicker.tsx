import { useMapEvents } from "react-leaflet";

export const LocationPicker = ({
  setLocation,
}: {
  setLocation: (latitude: number, longitude: number) => void;
}) => {
  const map = useMapEvents({
    click: (e) => {
      const latitude = e.latlng.lat;
      const longitude = e.latlng.lng;
      console.log(e.latlng);
      setLocation(latitude, longitude);
    },
    locationfound: (location) => {
      console.log("location found:", location.latlng);
    },
  });
  return null;
};
