import React from "react";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <main className="pt-16 min-h-screen">
      <section className="max-w-6xl mx-auto py-12 mt-8">
        <header className="flex justify-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">KONTAK KAMI</h1>
        </header>
        <div className="font-medium text-xl space-y-14 text-slate-800 text-justify">
          <p>
            Ada pertanyaan, saran, atau membutuhkan bantuan terkait perjalanan Anda? 
            Tim RYBTRAVEL siap membantu Anda dengan layanan pelanggan yang cepat dan ramah. 
            Kami hadir untuk menjawab segala kebutuhan transportasi Anda di wilayah Bandung Raya, 
            mulai dari pencarian rute, informasi agen travel, hingga pemesanan tiket secara online.
          </p>
        </div>
        <div className="font-medium text-xl space-y-6 text-slate-800 text-center py-6">
          <p>
            <i class="ri-pushpin-2-fill text-2xl"></i><strong>Alamat Kantor Pusat:</strong><br />
            Jl. Bojong Santos No. 123, Kabupaten Bandung, Jawa Barat, 40235<br />
            (Senin–Jumat, 08.00 – 20.00 WIB)
          </p>
          <p>
            <i class="ri-phone-fill text-2xl"></i><strong>Nomor Telepon:</strong><br />
            0812 3456 7899<br />
            Layanan pelanggan: Senin–Minggu, 08.00 – 20.00 WIB
          </p>
          <p>
            <i class="ri-mail-fill text-2xl"></i><strong>Email Resmi:</strong><br />
            rybtravel@email.ac.id
          </p>
          <p>
            <i class="ri-global-fill text-2xl"></i><strong>Media Sosial:</strong><br />
            Instagram: <a href="https://instagram.com/rybtravel.co" target="_blank" className="text-blue-600 underline"> @rybtravel.co </a><br />
            Facebook: <a href="https://facebook.com/RYBTravel.co" target="_blank" className="text-blue-600 underline"> RYBTravel.co </a><br />
          </p>
        </div>
        <div className="font-medium text-xl space-y-6 text-slate-800 text-justify py-6">
          <p>
            Jika Anda memiliki pertanyaan atau membutuhkan bantuan lebih lanjut, jangan ragu untuk menghubungi tim kami secara langsung.
          </p>
        </div>
      </section>
      <footer>
        <Footer />
      </footer>
    </main>
  );
};

export default Contact;
