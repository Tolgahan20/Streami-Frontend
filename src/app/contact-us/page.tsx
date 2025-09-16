import { AnchorScrollHandler } from "@/components/layout/AnchorScrollHandler/AnchorScrollHandler";
import Navbar from "@/components/layout/Main/Navbar/Navbar";
import Footer from "@/components/layout/Main/Footer/Footer";
import ContactUsHero from "@/components/contact-us/Hero/ContactUsHero";
import GeneralContact from "@/components/contact-us/GeneralContact/GeneralContact";
import PageCta from "@/components/shared/PageCta/PageCta";

export default function ContactUsPage() {
  return (
    <AnchorScrollHandler>
      <>
        <Navbar />
        <main style={{ background: "var(--foreground)" }}>
          <ContactUsHero />
          <GeneralContact />
        </main>
        <PageCta
          banner="Ready to Connect?"
          title="Let's Build Something Amazing Together"
          subtitle="Join our community of creators and discover how Streami can help you grow, monetize, and connect with your audience."
          primaryCta={{
            text: "Get in Touch",
            href: "#general-contact"
          }}
          secondaryCta={{
            text: "Start Creating",
            href: "/register"
          }}
        />
        <Footer />
      </>
    </AnchorScrollHandler>
  );
}
