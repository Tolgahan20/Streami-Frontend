
import Hero from "@/components/landing/hero/Hero";
import Cta from "@/components/landing/cta/Cta";
import Navbar from "@/components/layout/Main/Navbar/Navbar";
import Footer from "@/components/layout/Main/Footer/Footer";
import Features from "@/components/landing/Features/Features";
import Customization from "@/components/landing/Customization/Customization";
import StreamiFeatures from "@/components/landing/StreamiFeatures";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Customization />
        <StreamiFeatures />
        <Cta />
      </main>
      <Footer />
    </>
  );
}