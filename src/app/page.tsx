import Navbar from "@/components/layout/navbar/Navbar";
import Hero from "@/components/landing/hero/Hero";
import Cta from "@/components/landing/cta/Cta";
import Footer from "@/components/layout/footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Cta />
      </main>
      <Footer />
    </>
  );
}