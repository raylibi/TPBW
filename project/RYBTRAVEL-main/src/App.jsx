import { useEffect, useState } from "react";
import axios from "axios";
import AkiyamartHeader from "./components/AkiyamartHeader";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function App() {
  const [locations, setLocations] = useState([]); // Store travel agents

  useEffect(() => {
    axios.get("http://localhost:3000/agen") // Fetch from your backend
      .then((response) => {
        console.log("Fetched Data:", response.data); // Debugging
        const validLocations = response.data.filter(agent => agent.latitude && agent.longitude);
        setLocations(validLocations);
      })
      .catch((error) => console.error("Error fetching locations:", error));
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <AkiyamartHeader />

      {/* Map & Side Content */}
      <div className="flex flex-row flex-grow">
        {/* MAP (3/4 Screen) */}
        <div className="w-3/4">
          <MapContainer
            center={[-6.9021732628969605, 107.61864815231802]} // Default center (Bandung)
            zoom={13}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />

            {/* Travel Agent Markers */}
            {locations.map((location, index) => (
              <Marker key={index} position={[location.latitude, location.longitude]}>
                <Popup>
                  <strong>{location.name}</strong><br />
                  {location.address}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Side Content */}
        <div className="w-1/2 flex items-center justify-center bg-gray-100 p-4">
          <p className="text-lg font-semibold text-gray-700">
            nanti ini isinya
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
