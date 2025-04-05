import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AkiyamartHeader() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  // Opsi dropdown
  const dropdownOptions = {
    Keberangkatan: ["Bandung"],
    Tujuan: [
      "Jakarta",
      "Tangerang Selatan",
      "Depok",
      "Bogor",
      "Semarang",
      "Bekasi",
      "Yogyakarta",
      "Bali",
      "Lombok",
      "Medan",
      "Makassar",
    ],
    "Tipe Kendaraan": ["Bus", "Travel"],
  };

  return (
    <div className="border-b bg-white shadow-sm relative z-[1000]">
      <div className="container mx-auto px-4">
        {/* Main Navbar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-gray-800">RYBTRAVEL</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/HOME" className="text-gray-700 hover:text-slate-800 font-semibold">HOME</Link>
            <Link to="/ABOUT-US" className="text-gray-700 hover:text-slate-800 font-semibold">ABOUT US</Link>
            <Link to="/SERVICES" className="text-gray-700 hover:text-slate-800 font-semibold">SERVICES</Link>
          </nav>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center space-x-2 py-4 relative z-[1000]">
          {/* Keberangkatan */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("Keberangkatan")}
              className="border px-3 py-1 rounded-full flex items-center gap-1 text-gray-700 hover:bg-gray-100"
            >
              Keberangkatan <ChevronDown className="h-4 w-4" />
            </button>

            {openDropdown === "Keberangkatan" && (
              <div className="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-[1050]">
                <ul className="py-2 text-gray-700">
                  {dropdownOptions["Keberangkatan"].map((option) => (
                    <li key={option}>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Tanggal */}
          <div className="relative">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              className="border px-3 py-1 rounded-full text-gray-700"
            />
          </div>

          {/* Tujuan */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("Tujuan")}
              className="border px-3 py-1 rounded-full flex items-center gap-1 text-gray-700 hover:bg-gray-100"
            >
              Tujuan <ChevronDown className="h-4 w-4" />
            </button>

            {openDropdown === "Tujuan" && (
              <div className="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-[1050]">
                <ul className="py-2 text-gray-700">
                  {dropdownOptions["Tujuan"].map((option) => (
                    <li key={option}>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Tipe Kendaraan */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("Tipe Kendaraan")}
              className="border px-3 py-1 rounded-full flex items-center gap-1 text-gray-700 hover:bg-gray-100"
            >
              Tipe Kendaraan <ChevronDown className="h-4 w-4" />
            </button>

            {openDropdown === "Tipe Kendaraan" && (
              <div className="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-[1050]">
                <ul className="py-2 text-gray-700">
                  {dropdownOptions["Tipe Kendaraan"].map((option) => (
                    <li key={option}>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
