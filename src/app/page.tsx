
import Hero from "@/components/landing/hero/Hero";
import Cta from "@/components/landing/cta/Cta";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import Features from "@/components/landing/Features/Features";
import Customization from "@/components/landing/Customization/Customization";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Customization />
        <Cta />
      </main>
      <Footer />
    </>
  );
}