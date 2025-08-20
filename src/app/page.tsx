
import Hero from "@/components/landing/hero/Hero";
import Cta from "@/components/landing/cta/Cta";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
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