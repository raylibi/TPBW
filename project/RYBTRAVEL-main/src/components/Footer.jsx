import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white text-slate-800 py-10 border-t">
      <div className="container mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Kiri: Brand + Sosial Media */}
        <div>
          <h2 className="text-2xl font-bold mb-2">RYBTravel</h2>
          <p className="text-sm mb-2">Layanan Transportasi Terbaik Anda!</p>
          <p className="text-xs">
            Copyright &copy;2025 by <span>Diff & Chesta</span>. All Rights Reserved.
          </p>

          {/* Social Links */}
          <div className="flex flex-wrap space-x-6 mt-4 text-sm text-gray-600">
            <p className="flex items-center gap-1">
              <i className="ri-facebook-circle-fill text-xl"></i>
              RYBTravel.co
            </p>
            <p className="flex items-center gap-1">
              <i className="ri-instagram-fill text-xl"></i>
              rybtravel.co
            </p>
          </div>
        </div>

        {/* Kanan: Navigasi dan Kontak */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Navigasi */}
          <div>
            <h3 className="text-lg font-semibold mb-2">About RYBTravel</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/BOOK" className="hover:underline">Book Now</Link></li>
              <li><Link to="/ABOUT" className="hover:underline">About Us</Link></li>
              <li><Link to="/OFFERS" className="hover:underline">Offers</Link></li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="text-sm space-y-2">
              <li>Jl. Bojong Santos No. 123, Kabupaten Bandung, Jawa Barat, 40235</li>
              <li>0812 3456 7899</li>
              <li>rybtravel@email.ac.id</li>
            </ul>
          </div>

          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
