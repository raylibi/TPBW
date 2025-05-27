import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChevronDown } from "lucide-react";
import axios from "axios";
import L from "leaflet";
import { useRef } from "react";
import gambarsidebar from "../assets/rzq.jpg";



// Custom Marker Icon
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const Home = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [locations, setLocations] = useState([]);
  const [selectedKeberangkatan, setSelectedKeberangkatan] = useState("");
  const [selectedTujuan, setSelectedTujuan] = useState("");
  const [selectedTipe, setSelectedTipe] = useState("");
  const [tujuanList, setTujuanList] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const sidebarRef = useRef();
  const mapRef = useRef();
  const wasDragging = useRef(false);
  const dropdownRef = useRef();
  



  useEffect(() => {
    const handleMouseDown = () => {
      wasDragging.current = false; // mulai asumsi: bukan drag
    };

    const handleMouseMove = () => {
      wasDragging.current = true; // ada gerakan, berarti drag
    };

    const handleClickOutside = (event) => {
      const isSidebar = sidebarRef.current && sidebarRef.current.contains(event.target);
      const isMarker = event.target.closest(".leaflet-marker-icon");

      if (wasDragging.current) {
        wasDragging.current = false; // reset drag setelah click
        return; // abaikan click yang terjadi setelah drag
      }

      if (!isSidebar && !isMarker) {
        setSelectedLocation(null);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [selectedLocation]);

  useEffect(() => {
    const handleClickOutsideDropdown = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpenDropdown(null); // Tutup dropdown jika klik di luar
      }
    };

    document.addEventListener("mousedown", handleClickOutsideDropdown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, []);

  useEffect(() => {
  axios.get("http://localhost:3000/agen")
    .then((response) => {
      const rawData = response.data;

      // Ambil semua tujuan dari semua data dan pisah berdasarkan koma
      const destinations = rawData.flatMap(agent =>
        agent.destination
          ? agent.destination.split(",").map(dest => dest.trim())
          : []
      );

      const normalizedDestinations = destinations.map(dest => {
        if (dest.toLowerCase() === "denpasar") return "Denpasar (Bali)"; 
          return dest;
        });

      const uniqueDestinations = [...new Set(normalizedDestinations)].sort((a, b) => a.localeCompare(b));
      setTujuanList(uniqueDestinations);

      // Filter lokasi valid berdasarkan keberangkatan & tujuan
      let validLocations = rawData.filter(agent => agent.latitude && agent.longitude);

      if (selectedKeberangkatan) {
        validLocations = validLocations.filter(agent => agent.from_ === selectedKeberangkatan);
      }
      if (selectedTujuan) {
        // Cek apakah destination agent mengandung kota yang dipilih
        validLocations = validLocations.filter(agent => {
          const destList = agent.destination
            ?.split(",")
            .map(dest => {const trimmed = dest.trim();
            return trimmed.toLowerCase() === "denpasar" ? "Denpasar (Bali)" : trimmed;
          });
          return destList.includes(selectedTujuan);   
        });
      }
      if (selectedTipe) {
        validLocations = validLocations.filter(agent =>
          agent.tipe?.toLowerCase().trim() === selectedTipe.toLowerCase().trim()
        );
      }

      setLocations(validLocations);
    })
    .catch((error) => console.error("Error fetching locations:", error));
}, [selectedKeberangkatan, selectedTujuan, selectedTipe]);


  const toggleDropdown = (key) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const dropdownOptions = {
    Keberangkatan: ["Bandung"],
    Tujuan: tujuanList, // gunakan hasil dari database
    Tipe: ["Bus", "Shuttle"],
  };

  return (
    
    <div className="h-screen w-screen overflow-auto">
      <div className="flex flex-col h-full overflow-auto">
        <div className="items-center space-x-2 px-4 bg-transparent  z-[1050]">
          <div ref={dropdownRef} className="flex items-center space-x-2 py-4 px-4">
            {Object.keys(dropdownOptions).map((key) => (
              <div key={key} className="relative">
                <button
                  onClick={() => toggleDropdown(key)}
                  className="
                  w-[200px]
                  bg-transparent
                  font-medium
                  text-gray-200 
                  shadow 
                  hover:placeholder-black
                  hover:bg-opacity-65
                  hover:bg-white
                  hover:text-black
                  rounded-lg p-3 flex 
                  justify-between 
                  items-center 
                  truncate
                  w-[220px]"
                  
                >
                  {key === "Keberangkatan" && (selectedKeberangkatan || "Pilih Keberangkatan")}
                  {key === "Tujuan" && (selectedTujuan || "Pilih Tujuan")}
                  {key === "Tipe" && (selectedTipe || "Pilih Tipe")}
                  <ChevronDown className="w-4 h-4 ml-2" />
                </button>
                
                {openDropdown === key && (
                  <div className="
                    absolute 
                    z-[1100] 
                    w-full 
                    mt-2 
                    rounded-lg 
                    shadow-lg 
                    max-h-60 
                    overflow-auto
                    text-gray-200
                    "
                    style={{ background: `linear-gradient(170deg, hsla(36, 83.00%, 32.40%, 0.81) 35%, rgba(19, 87, 235, 0.8))`,}}>
                    {dropdownOptions[key].map((option) => (
                      <div
                        key={option}
                        className="px-4 py-2 hover:bg-white hover:text-black hover:bg-opacity-65 cursor-pointer"
                        onClick={() => {
                          if (key === "Keberangkatan") setSelectedKeberangkatan(option);
                          if (key === "Tujuan") setSelectedTujuan(option);
                          if (key === "Tipe") setSelectedTipe(option);
                          setOpenDropdown(null);
                        }}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="relative">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd MMMM yyyy"
                minDate={new Date()}
                className="
                  rounded-lg 
                  p-3 w-[280px] 
                  text-center 
                  text-gray-200
                  placeholder-gray-200
                  font-medium 
                  bg-transparent
                  shadow 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-blue-500 
                  placeholder:font-medium
                  hover:placeholder-black
                  hover:bg-opacity-65
                  hover:bg-white"
                  
                style={{ caretColor: "transparent" }}
                placeholderText="Pilih Tanggal Keberangkatan"
                onKeyDown={(e) => e.preventDefault()}
              />
            </div>
            {(selectedKeberangkatan || selectedTujuan || selectedTipe || selectedDate) && (
              <button
                onClick={() => {
                  setSelectedKeberangkatan("");
                  setSelectedTujuan("");
                  setSelectedTipe("");
                  setSelectedDate(null);
                }}
                className="
                  backdrop-blur-sm
                  bg-white/30 
                  font-medium 
                  rounded-lg 
                  px-4 
                  py-3 
                  hover:bg-gray-300 
                  transition
                  text-white
                  hover:text-black"
                  
              >
                Reset Filter
              </button>
            )}          
          </div>
        </div>
            
        {/* Map */}
        
        <div className="flex flex-grow relative h-[calc(100vh-80px)]">
          
          <div
            ref={sidebarRef}
            className={`absolute top-0 left-0 h-full w-[385px] bg-white shadow-lg z-[1001] overflow-auto transform transition-transform duration-300 ease-in-out ${
              selectedLocation ? "translate-x-0 pointer-events-auto" : "-translate-x-full pointer-events-none"
            }`}

          >
            <div className="flex w-full h-[200px]">
              <img 
              src={gambarsidebar} 
              alt="gmbr sidebar" 
              
              className="w-full h-auto object-cover"
              style={{ imageRendering: "auto" }}
              />
            </div>


            <div className=" px-10 py-5">
              {selectedLocation && (
                <>
                  <button
                    onClick={() => setSelectedLocation(null)}
                    className="absolute right-[10px] top-1/2 -translate-y-1/2 bg-transparent hover:bg-gray-400 text-black rounded-full p-1 z-[1002]"
                  >
                    <span className="text-xl font-bold">&lt;</span>
                  </button>
                <div className="border-b border-black mb-4">
                  <h2 className="text-2xl font-bold">{selectedLocation.name}</h2>
                  <p className="mb-2"><strong>Rating:</strong> {selectedLocation.rating}</p>
                </div>
                
                  <p><strong>Alamat:</strong> {selectedLocation.address || "Tidak tersedia"}</p>
                  <p><strong>Tujuan:</strong> {selectedLocation.destination}</p>
                  <p><strong>Koordinat:</strong> {selectedLocation.latitude}, {selectedLocation.longitude}</p>
                  <p><strong>Link Booking:</strong><a href={selectedLocation.website}> {selectedLocation.website}</a></p>
                  <p><strong>Tipe:</strong> {selectedLocation.tipe}</p>
                  <a
                    href={`https://www.google.com/maps?q=${selectedLocation.latitude},${selectedLocation.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline mt-2 inline-block"
                  >
                    Buka di Google Maps
                  </a>
                </>
              )}          
            </div>

          </div>
          

          <MapContainer center={[-6.902253152913098, 107.61865888465789]} zoom={12} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              attribution='&copy; OpenStreetMap'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations.map((loc, index) => (
              <Marker
                key={index}
                position={[loc.latitude, loc.longitude]}
                icon={customIcon}
                eventHandlers={{
                  click: () => setSelectedLocation(loc),
                }}
              >
                <Tooltip>
                  {loc.name}
                </Tooltip>
              </Marker>
            ))}
          </MapContainer>
      </div>
      {/* Dropdowns */}

      </div>
    </div>
    
  );
};

export default Home;