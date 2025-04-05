import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import axios from "axios";

const TravelMap = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/agen")
      .then((response) => {
        const validLocations = response.data.filter(agent => agent.latitude && agent.longitude);
        setLocations(validLocations);
      })
      .catch((error) => console.error("Error fetching locations:", error));
  }, []);

  return (
    <MapContainer center={[-6.9175, 107.6191]} zoom={12} style={{ height: "500px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {locations.map((location, index) => (
        <Marker key={index} position={[location.latitude, location.longitude]}>
          <Popup>
            <strong>{location.name}</strong><br />
            Rating: {location.rating}<br />
            {location.address}<br />
            {location.hours_today}<br />
            <a href={location.website} target="_blank" rel="noopener noreferrer">Website</a><br />
            Phone: {location.phone}<br />
            Route: {location.from_} → {location.destination}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default TravelMap;