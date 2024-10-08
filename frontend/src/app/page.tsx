import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import withAuth from "./auth/withAuth";

export default function  Home() {
  return (
    <>
      {}
      <Header />
      <main className="relative flex font-[Poppins] bg-[url('/landing_hero2.webp')] bg-cover min-h-custom">
        <div className="flex flex-col justify-center items-start p-8 h-screen max-h-custom z-20">
          <div >
            <h2 className="text-[#235C2A] font-bold md:text-6xl md:pb-3">
              Maximiza tu actividad agrícola
            </h2>
            <h3 className="md:text-5xl font-bold">con datos en tiempo real</h3>
          </div>
          <Link href="home" className="bg-[#F7C35F] my-16 py-[25px] px-[50px] rounded text-xl text-[#1A1A1A]">
            DESCUBRIR MÁS
          </Link>
          
        </div>
        <div className="bg-black absolute inset-0 opacity-20">

        </div>
      </main>
      <Footer/>
    </>
  );
}
