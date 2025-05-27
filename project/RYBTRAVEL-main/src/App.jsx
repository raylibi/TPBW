import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HOMEPAGE";
import About from "./pages/ABOUT";
import Contact from "./pages/CONTACT_US";
import Book from "./pages/BOOK";
import Footer from "./components/Footer";
import bg from "./assets/bg2.jpg";
import './index.css';
import Offers from "./pages/OFFERS";

function App() {
  return (
    <Router>
      {/* Background Fullscreen */}
      <div
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "fixed",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />
      {/* Layer konten */}
      <div className="flex flex-col min-h-screen relative z-10 bg-white/60">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/BOOK" element={<Book />} />
            <Route path="/ABOUT" element={<About />} />
            <Route path="/CONTACT" element={<Contact />} />
            <Route path="/OFFERS" element={<Offers />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
