import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import Founder from "@/components/Founder";
import Network from "@/components/Network";
import Academy from "@/components/Academy";
import Franchise from "@/components/Franchise";
import Location from "@/components/Location";
import Consult from "@/components/Consult";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Services />
        <Gallery />
        <Reviews />
        <Founder />
        <Network />
        <Academy />
        <Franchise />
        <Location />
        <Consult />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
