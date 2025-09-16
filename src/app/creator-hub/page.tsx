import { AnchorScrollHandler } from "@/components/layout/AnchorScrollHandler/AnchorScrollHandler";
import Navbar from "@/components/layout/Main/Navbar/Navbar";
import Footer from "@/components/layout/Main/Footer/Footer";
import CreatorHubHero from "@/components/creator-hub/Hero/CreatorHubHero";
import CreatorMarketplace from "@/components/creator-hub/CreatorMarketplace/CreatorMarketplace";
import CreatorConnect from "@/components/creator-hub/CreatorConnect/CreatorConnect";
import PageCta from "@/components/shared/PageCta/PageCta";

export default function CreatorHubPage() {
  return (
    <AnchorScrollHandler>
      <>
        <Navbar />
        <main style={{ background: "var(--foreground)" }}>
          <CreatorHubHero />
          <CreatorMarketplace />
          <CreatorConnect />
        </main>
        <PageCta
          banner="Unlock Your Creative Potential"
          title="Start Your Creator Journey Today"
          subtitle="Discover thousands of premium assets in our marketplace or connect with talented creators for your next collaboration."
          primaryCta={{
            text: "Browse Marketplace",
            href: "#creator-marketplace"
          }}
          secondaryCta={{
            text: "Find Creators",
            href: "#creator-connect"
          }}
        />
        <Footer />
      </>
    </AnchorScrollHandler>
  );
}