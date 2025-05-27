import React from "react";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Konten utama */}
      <main className="flex-grow pt-16">
        <section className="max-w-6xl mx-auto py-12 mt-8">
          <header className="flex justify-center mb-8">
            <h1 className="text-4xl font-bold text-slate-800">ABOUT US</h1>
          </header>
          <div className="font-medium text-xl space-y-14 text-slate-800 text-justify">
            <p>
              RYBTRAVEL adalah platform layanan transportasi modern yang
              dirancang khusus untuk menghubungkan masyarakat di wilayah
              Bandung Raya—meliputi Kota Bandung, Kabupaten Bandung, Kota
              Cimahi, dan Kabupaten Bandung Barat—dengan berbagai penyedia jasa
              travel terpercaya, baik yang beroperasi secara lokal maupun
              antar-kota. Melalui aplikasi ini, pengguna dapat dengan mudah
              menemukan pilihan transportasi yang sesuai dengan kebutuhan, baik
              untuk perjalanan harian, urusan bisnis, maupun liburan bersama
              keluarga.
            </p>
            <p>
              Pengguna dapat melakukan pencarian rute perjalanan dengan cepat,
              mengecek jadwal keberangkatan secara real-time, serta
              membandingkan harga tiket dari berbagai agen travel hanya dalam
              satu aplikasi yang terpadu. Proses pemesanan pun berlangsung
              mudah, cepat, dan aman—tanpa perlu berpindah-pindah platform atau
              situs web.
            </p>
            <p>
              Selain itu, RYBTRAVEL juga menawarkan beragam fitur menarik
              seperti promo eksklusif, informasi lengkap mengenai agen travel,
              serta sistem rekomendasi rute terbaik yang dapat disesuaikan
              dengan preferensi dan kebutuhan pengguna. Dengan segala kemudahan
              ini, RYBTRAVEL berkomitmen menjadi partner perjalanan terbaik Anda
              di Bandung Raya—siap menemani setiap langkah perjalanan, kapan
              pun dan di mana pun.
            </p>
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
