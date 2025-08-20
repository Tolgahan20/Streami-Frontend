import Navbar from "@/components/layout/navbar/navbar";
import Hero from "@/components/landing/hero/Hero";
import Cta from "@/components/landing/cta/Cta";
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
