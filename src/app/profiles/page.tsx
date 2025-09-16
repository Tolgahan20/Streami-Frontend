import { AnchorScrollHandler } from "@/components/layout/AnchorScrollHandler/AnchorScrollHandler";
import Navbar from "@/components/layout/Main/Navbar/Navbar";
import Footer from "@/components/layout/Main/Footer/Footer";
import ProfilesHero from "@/components/profiles/Hero/ProfilesHero";
import SocialLinks from "@/components/profiles/SocialLinks/SocialLinks";
import Analytics from "@/components/profiles/Analytics/Analytics";
import Dashboards from "@/components/profiles/Dashboards/Dashboards";
import PageCta from "@/components/shared/PageCta/PageCta";

export default function ProfilesPage() {
  return (
    <AnchorScrollHandler>
      <>
        <Navbar />
        <main style={{ background: "var(--foreground)" }}>
          <ProfilesHero />
          <SocialLinks />
          <Analytics />
          <Dashboards />
        </main>
        <PageCta
          banner="Start Building Your Creator Brand"
          title="Join Thousands of Creators Showcasing Their Work"
          subtitle="Create your professional creator profile, connect all platforms, and track your growth with comprehensive analytics designed for success."
          primaryCta={{
            text: "Create Profile",
            href: "#social-links"
          }}
          secondaryCta={{
            text: "View Analytics",
            href: "#analytics"
          }}
        />
        <Footer />
      </>
    </AnchorScrollHandler>
  );
}
