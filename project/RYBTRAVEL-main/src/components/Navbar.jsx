import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-slate-100 fixed w-full top-0 z-[1000] h-16 shadow-md">
      <div className="container mx-auto px-4">
        {/* Main Navbar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-3xl font-bold text-slate-800">RYBTRAVEL</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-right space-x-6">
            <Link to="/" className="text-slate-800 hover:text-slate-400 font-semibold">HOME</Link>
            <Link to="/BOOK" className="text-slate-800 hover:text-slate-400 font-semibold">BOOKINGS</Link>
            <Link to="/ABOUT" className="text-slate-800 hover:text-slate-400 font-semibold">ABOUT US</Link>
            <Link to="/OFFERS" className="text-slate-800 hover:text-slate-400 font-semibold">OFFERS</Link>
            {/* <Link to="/CONTACT" className="text-slate-800 hover:text-slate-400 font-semibold">CONTACT US</Link> */}
          </nav>
        </div>
      </div>
    </div>
  );
}
