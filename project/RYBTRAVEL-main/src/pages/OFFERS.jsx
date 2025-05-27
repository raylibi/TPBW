import React from "react";
import Footer from "../components/Footer";
import kupon1 from "../assets/kupon1.jpg";
import kupon2 from "../assets/kupon2.jpg";
import image1 from "../assets/image1.jpg";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Konten utama */}
      <main className="flex-grow pt-16">
        <section className="max-w-6xl mx-auto py-12 mt-8">
          <header className="flex justify-center mb-8">
            <h1 className="text-4xl font-bold text-slate-800">SPECIAL OFFERS</h1>
          </header>
          <div className="font-medium text-xl space-y-14 text-slate-800 text-center">
            <p>
                Temukan berbagai promo dan diskon menarik untuk layanan shuttle, travel, dan bus, plus penawaran eksklusif lainnya! Jangan lewatkan update terbaru — download aplikasi kami sekarang dan nikmati kemudahannya!            </p>

            {/* Gambar voucher */}
            <div className="space-y-14">
              <img src={kupon1} alt="Voucher 1" className="w-full rounded-xl shadow-md" />
              <img src={kupon2} alt="Voucher 2" className="w-full rounded-xl shadow-md" />
              <img src={image1} alt="Voucher 3" className="w-full rounded-xl shadow-md" />
            </div>
          </div>
        </section>
      </main>

      {/* Footer tetap di bawah */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default About;
