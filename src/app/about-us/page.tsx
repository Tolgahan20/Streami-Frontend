import { AnchorScrollHandler } from "@/components/layout/AnchorScrollHandler/AnchorScrollHandler";
import Navbar from "@/components/layout/Main/Navbar/Navbar";
import Footer from "@/components/layout/Main/Footer/Footer";
import AboutUsHero from "@/components/about-us/Hero/AboutUsHero";
import WhatIsStreami from "@/components/about-us/WhatIsStreami/WhatIsStreami";
import FAQ from "@/components/about-us/FAQ/FAQ";
import PageCta from "@/components/shared/PageCta/PageCta";

export default function AboutUsPage() {
  return (
    <AnchorScrollHandler>
      <>
        <Navbar />
        <main style={{ background: "var(--foreground)" }}>
          <AboutUsHero />
          <WhatIsStreami />
          <FAQ />
        </main>
        <PageCta
          banner="Ready to Start Your Journey?"
          title="Join the Creator Revolution with Streami"
          subtitle="Discover how our AI-powered platform can help you grow, monetize, and connect with your community like never before."
          primaryCta={{
            text: "Get Started",
            href: "#what-is-streami"
          }}
          secondaryCta={{
            text: "Read FAQ",
            href: "#faq"
          }}
        />
        <Footer />
      </>
    </AnchorScrollHandler>
  );
}
