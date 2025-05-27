import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChevronDown } from "lucide-react";
import axios from "axios";
import L from "leaflet";
import gambarsidebar from "../assets/travel1.png";
import noEntryImage from "../assets/no-entry.png";

// Custom Marker Icon
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const Book = () => {
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

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const cityCodeMap = {
    "Banjar": "a102813", 
    "Banjarnegara": "a106448", 
    "Banyumas": "a106660", 
    "Banyuwangi": "a103299", 
    "Bekasi": "a103896", 
    "Blora": "a106859", 
    "Bogor": "a103909", 
    "Boyolali": "a106925", 
    "Brebes": "a106728", 
    "BSD": "g30014989",
    "Cepu": "g106872", 
    "Cianjur": "a104450", 
    "Cibubur": "g30012246", 
    "Cicalengka": "g104132", 
    "Cikarang": "g107729", 
    "Cikopo": "", 
    "Cilacap": "a106767", 
    "Ciledug": "g100337", 
    "Cilegon": "a100351", 
    "Cimahi": "a30072943",
    "Cinere": "g103999", 
    "Cirebon": "a103890", 
    "Denpasar (Bali)": "a102747", 
    "Depok": "a103988",
    "Garut": "a104524", 
    "Grobogan": "a107101", 
    "Indramayu": "a104718", 
    "Jakarta": "a102813", 
    "Jambi": "a104978", 
    "Jatinangor": "g104583", 
    "Jember": "a103361",  
    "Karawang": "a104307", 
    "Kebumen": "a107074",
    "Klampok": "g106468", 
    "Klaten": "a106797", 
    "Kuningan": "a104625", 
    "Magelang": "a106975", 
    "Majalengka": "a103832", 
    "Malang": "a103760", 
    "Mateseh": "g106611",
    "Merak": "a30072984",  
    "Metro": "g100128", 
    "Nagreg": "g104190", 
    "Negara": "",
    "Pandeglang": "a100288", 
    "Pekalongan": "a106792", 
    "Pemalang": "a107039", 
    "Prambanan": "g107468", 
    "Purwakarta": "a104750", 
    "Purbalingga": "a106824", 
    "Purwodadi": "g107106", 
    "Purwokerto": "a30072978",
    "Rangkasbitung": "g100212", 
    "Salatiga": "a106723", 
    "Sampang": "a103267", 
    "Semarang": "a106587", 
    "Serang": "a100344", 
    "Serpong": "g100294",
    "Sleman": "a107457",
    "Soekarno Hatta": "l100004409163", 
    "Subang": "a104594",
    "Sukabumi": "a103916", 
    "Sukoharjo": "a106897", 
    "Sumedang": "a104567", 
    "Sumenep": "a103766", 
    "Surabaya": "a103570", 
    "Surakarta": "a106469",
    "Tangerang": "a100330", 
    "Tasikmalaya": "a104338", 
    "Tegal": "a107034", 
    "Temanggung": "a106746",
    "Terbanggi Besar": "l91607408094607", 
    "Weleri": "g106998", 
    "Wonosobo": "a106843", 
    "Yogyakarta": "a107442"
};

const handleTravelokaBooking = (e) => {
  const missingFields = [];
  if (!selectedKeberangkatan) missingFields.push('keberangkatan');
  if (!selectedTujuan) missingFields.push('tujuan');
  if (!selectedDate) missingFields.push('tanggal');

  if (missingFields.length > 0) {
    e.preventDefault();
    const fieldNames = {
      'keberangkatan': 'Kota Keberangkatan',
      'tujuan': 'Kota Tujuan',
      'tanggal': 'Tanggal Keberangkatan'
    };
    
    const alertMessage = `Anda belum memilih:\n${missingFields
      .map(field => `• ${fieldNames[field]}`)
      .join('\n')}`;

    alert(alertMessage);
  }
};

const generateTravelokaLink = () => {
  const baseUrl = "https://www.traveloka.com/en-id/bus-and-shuttle/search";
  
  // Ambil kode kota dari cityCodeMap
  const departureCode = cityCodeMap[selectedKeberangkatan] || '';
  const destinationCode = cityCodeMap[selectedTujuan] || '';
  
  // Format tanggal ke DD-MM-YYYY
  const formattedDate = selectedDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '-');

  // Tentukan parameter berdasarkan prefix kode tujuan
  let stParam, sttParam, stnParam;
  
  if (destinationCode.startsWith('l')) {
    stParam = `a103859.${destinationCode}`;
    sttParam = 'CITY_GEO.LANDMARK';
    stnParam = `${selectedKeberangkatan}.${selectedTujuan}`;
  } else if (destinationCode.startsWith('g')) {
    stParam = `a103859.${destinationCode}`;
    sttParam = 'CITY_GEO.GEO';
    stnParam = `${selectedKeberangkatan}.${selectedTujuan}`;
  } else if (destinationCode.startsWith('a')) {
    stParam = `a103859.${destinationCode}`;
    sttParam = 'CITY_GEO.CITY_GEO';
    stnParam = `${selectedKeberangkatan}.${selectedTujuan}`;
  } else {
    // Default case jika tidak ada prefix yang cocok
    return '#';
  }

  // Bangun URL dengan parameter
  const params = new URLSearchParams({
    st: stParam,
    stt: sttParam,
    stn: stnParam,
    dt: `${formattedDate}.null`,
    ps: '1',
    stc: ''
  });

  return `${baseUrl}?${params.toString()}`;
};

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
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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

        const uniqueDestinations = [...new Set(normalizedDestinations)].sort((a, b) =>
          a.localeCompare(b)
        );
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
              .map(dest => {
                const trimmed = dest.trim();
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
    
    // Ubah overflow-auto menjadi overflow-hidden untuk mencegah scrolling
    <div className="h-screen w-screen overflow-hidden pt-16">
      <style>{`
        ::-webkit-scrollbar {
          display: none;
        }
        
        * {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        @media screen and (-webkit-min-device-pixel-ratio:0) {
          dialog:modal {
            top: 50%;
            transform: translateY(-50%);
          }
        }
        /* Untuk Firefox */
        dialog {
          top: 50%;
          transform: translateY(-50%);
        }
      `}</style>
      <div className="flex flex-col h-full overflow-hidden">
        <div className="items-center space-x-2 px-4 bg-transparent z-[1050]">
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
                    text-gray-500
                    backdrop-blur-md
                    bg-white/10
                    "
                  >
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
                calendarClassName="custom-datepicker"
                disabledDayClassName="disabled-day"
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
                  hover:text-black
                  hover:placeholder-black
                  hover:bg-opacity-65
                  hover:bg-white"
                style={{ caretColor: "transparent" }}
                placeholderText="Pilih Tanggal Keberangkatan"
                onKeyDown={(e) => e.preventDefault()}
              />
              <style>
                {`
                  .custom-datepicker .react-datepicker__day--disabled:hover {
                    cursor: url(${noEntryImage}), not-allowed !important;
                    opacity: 0.5;
                  }
                `}
              </style>
            </div>
            {(selectedKeberangkatan || selectedTujuan || selectedTipe || !isToday(selectedDate)) && (
              <button
                onClick={() => {
                  setSelectedKeberangkatan("");
                  setSelectedTujuan("");
                  setSelectedTipe("");
                  setSelectedDate(new Date());
                }}
                className="
                  backdrop-blur-sm
                  bg-gray/10 
                  font-sm 
                  rounded-lg 
                  px-4 
                  py-3 
                  hover:bg-opacity-65
                  hover:bg-white
                  transition
                  text-white
                  shadow
                  hover:text-black"
              >
                Reset Filter
              </button>
            )}
          </div>
        </div>

        {/* Map */}
        <div className="flex flex-grow relative h-full">
          <div
            ref={sidebarRef}
            className={`absolute top-0 left-0 h-full w-[385px] bg-transparent shadow-lg z-[1001] overflow-y-auto transform transition-transform duration-300 ease-in-out ${
              selectedLocation ? "translate-x-0 pointer-events-auto" : "-translate-x-full pointer-events-none"
            }`}
          >
            <div className="flex w-full h-[200px]">
              <img 
                src={gambarsidebar} 
                alt="gmbr sidebar" 
                className="w-full h-[215px] object-cover"
                style={{ imageRendering: "auto" }}
              />
            </div>
            <div className="px-10 py-5 text-slate-800 h-full bg-white/55 backdrop-blur-lg rounded-t-lg">
              {selectedLocation && (
                <>
                  <button
                    onClick={() => setSelectedLocation(null)}
                    className="absolute right-[10px] top-1/2 -translate-y-1/2 bg-transparent hover:bg-gray-400 text-black rounded-full p-1 z-[1002]"
                  >
                    <span className="text-xl font-bold">&lt;</span>
                  </button>
                  <div className="border-b border-black mb-4">
                    <h2 className="text-2xl font-bold mb-2">{selectedLocation.name}</h2>
                    <p className="mb-2"><strong>Rating:</strong> {selectedLocation.rating}</p>
                  </div>
                  <p><strong>Alamat:</strong> {selectedLocation.address || "Tidak tersedia"}</p>
                  <p><strong>Tujuan:</strong> {selectedLocation.destination}</p>
                  <p><strong>Koordinat:</strong> {selectedLocation.latitude}, {selectedLocation.longitude}</p>
                  <p>
                    <strong>Link Booking: </strong>
                    <a 
                      href={selectedLocation.website}
                      className="text-blue-600 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Booking Website
                    </a>
                  </p>
                  <p><strong>Traveloka: </strong>
                    <a href={generateTravelokaLink()}
                      onClick={handleTravelokaBooking}
                      className={`text-blue-600 underline ${
                        !selectedKeberangkatan || !selectedTujuan || !selectedDate
                          ? 'cursor-pointer'
                          : ''
                      }`}
                      target="_blank"
                      rel="noopener noreferrer">
                      Booking via Traveloka
                    </a>
                  </p>
                  <p><strong>Tipe:</strong> {selectedLocation.tipe}</p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${selectedLocation.name} ${selectedLocation.address}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-white"
                    style={{ background: "linear-gradient(to right, #99b3b9, rgba(152,181,187,255)", padding: "0.5rem 1rem", borderRadius: "0.375rem" }}
                  >
                    <i class="ri-map-pin-2-line"> </i>
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
                <Tooltip>{loc.name}</Tooltip>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Book;