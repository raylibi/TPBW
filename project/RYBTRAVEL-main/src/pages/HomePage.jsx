import React from 'react'
import { Link } from 'react-router-dom' // untuk navigasi internal SPA
import image1 from "../assets/image1.jpg"
import image2 from "../assets/image2.jpg"
import image3 from "../assets/image3.jpg"
import google from "../assets/google.png"
import appstore from "../assets/app-store.png"
import hpapp from "../assets/hp-aplikasi.png"
import Footer from '../components/Footer'
import travel1 from "../assets/travel1.png"
import pantai2 from "../assets/pantai2.jpg"
import pantai3 from "../assets/pantai3.jpg"
import iphone2 from "../assets/iphone2.png"


const HomePage = () => {
  return (
    <main className='homepage pt-16'>
      <div className="container mx-auto px-6 md:px-20 py-10">

        {/* Hero Section */}
        <section className="hero grid grid-cols-1 md:grid-cols-2 items-center gap-10" aria-label="Hero">
          <div>
            <h1 className='text-5xl/tight font-semibold mb-4 text-slate-800'>
              <span className='font-bold text-gray-800'>RYBTRAVEL</span> - Layanan Transportasi Terbaik Anda!
            </h1>
            <p className='text-base/8 mb-7 text-lg text-justify text-slate-800'>
              Nggak perlu bingung cari travel lagi! Lewat <span className='font-semibold'>RYBTRAVEL</span>, kamu bisa tahu semua titik layanan travel, rute favorit, dan jadwal berangkat dari berbagai penyedia di sekitarmu.
            </p>
            {/* Link yang benar untuk navigasi */}
            <Link
              to="/BOOK"
              className='inline-block font-medium bg-slate-800 hover:bg-slate-500 transition-all py-4 px-6 text-white shadow rounded-full text-2xl'
            >
              Pesan Sekarang <i className="ri-cursor-fill ms-1 text-2xl"></i>
            </Link>
          </div>
          <figure>
            <img src={travel1} className='w-full rounded shadow-lg' alt="Ilustrasi layanan RYBTRAVEL" />
          </figure>
        </section>

        {/* Intro Section */}
        <section className='py-20' aria-label="Tentang RYBTRAVEL">
          <article className="about bg-slate-100 py-20 px-6 md:px-24 rounded shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-16">
              <figure>
                <img src={pantai3} alt="Tentang RYBTRAVEL" className="w-full rounded shadow-lg" />
              </figure>
              <div className="text-gray-800">
                <h2 className="text-4xl font-semibold mb-6">
                  Siap Menemani Perjalanan Anda!
                </h2>
                <p className="text-lg text-base leading-relaxed mb-6 text-justify">
                  RYBTRAVEL adalah platform layanan transportasi modern yang menghubungkan Anda dengan berbagai penyedia travel terpercaya di seluruh Indonesia. Kami memudahkan proses pencarian, pemesanan, dan perbandingan tiket dalam satu aplikasi yang cepat dan aman.
                </p>
                <p className="text-lg text-base leading-relaxed mb-6 text-justify">
                  Dengan fitur pencarian rute, jadwal keberangkatan, serta promo menarik, RYBTRAVEL siap menjadi solusi perjalanan terbaik Anda — kapan pun dan di mana pun.
                </p>
              </div>
            </div>
          </article>
        </section>

        {/* Section: Alasan Memilih RYBTRAVEL */}
        <section className="" aria-label="Alasan memilih RYBTRAVEL">
        <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
            Kenapa harus RYBTRAVEL?
            </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Box 1 */}
            <div className="bg-slate-100 rounded-lg shadow-md p-6 transition-all">
            <div className="flex items-start gap-4">
                <img src="#" alt="Fitur 1" className="w-12 h-12" />
                <div>
                <h3 className="font-bold text-lg text-slate-800 mb-1">Semua dalam satu tempat</h3>
                <p className="text-gray-600 text-sm">Cari travel, cek rute, dan pesan tiket dari berbagai penyedia hanya di RYBTRAVEL.</p>
                </div>
            </div>
            </div>

            {/* Box 2 */}
            <div className="bg-slate-100 rounded-lg shadow-md p-6 transition-all">
            <div className="flex items-start gap-4">
                <img src="#" alt="Fitur 2" className="w-12 h-12" />
                <div>
                <h3 className="font-bold text-lg text-slate-800 mb-1">Rute Lengkap dan Menyeluruh</h3>
                <p className="text-gray-600 text-sm">Temukan titik keberangkatan dan tujuan dari berbagai wilayah Bandung Raya tanpa ribet.</p>
                </div>
            </div>
            </div>

            {/* Box 3 */}
            <div className="bg-slate-100 rounded-lg shadow-md p-6 transition-all">
            <div className="flex items-start gap-4">
                <img src="#" alt="Fitur 3" className="w-12 h-12" />
                <div>
                <h3 className="font-bold text-lg text-slate-800 mb-1">Ulasan Jujur dari Penumpang</h3>
                <p className="text-gray-600 text-sm">Cek rating dari penyedia layanan untuk bantu pilih opsi paling terpercaya dan nyaman.</p>
                </div>
            </div>
            </div>
        </div>
        </section>


        {/* Advertisement Section */}
        <section className='pt-20' aria-label="Promosi aplikasi RYBTRAVEL">
        <div className="bg-slate-600 rounded text-white px-6 md:px-16 py-10 flex flex-col md:flex-row items-center justify-center gap-y-10 md:gap-x-32 shadow-lg">
            
            {/* Kiri - Teks */}
            <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Install aplikasi RYBTravel sekarang!
            </h2>
            <p className="text-lg text-base leading-relaxed mb-6">
                Dapatkan diskon sebesar RP 5.000 untuk setiap pemesanan tiket!
            </p>
            <div className="flex justify-center md:justify-start gap-4">
                <img src={google} alt="Google Play" className="h-12" />
                <img src={appstore} alt="App Store" className="h-12" />
            </div>
            </div>

            {/* Kanan - Gambar HP */}
            <div className="flex justify-center">
            <img src={iphone2} alt="Aplikasi RYBTRAVEL di HP" className="w-[240px]" />
            </div>
            
        </div>
        </section>


      </div>
      
      <footer>
        <Footer />
      </footer>
    </main>
  )
}

export default HomePage
