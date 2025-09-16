import { AnchorScrollHandler } from "@/components/layout/AnchorScrollHandler/AnchorScrollHandler";
import Navbar from "@/components/layout/Main/Navbar/Navbar";
import Footer from "@/components/layout/Main/Footer/Footer";
import NetworkHubHero from "@/components/network-hub/Hero/NetworkHubHero";
import Sponsorships from "@/components/network-hub/Sponsorships/Sponsorships";
import BrandDeals from "@/components/network-hub/BrandDeals/BrandDeals";
import StreamiAffiliate from "@/components/network-hub/StreamiAffiliate/StreamiAffiliate";
import Advertising from "@/components/network-hub/Advertising/Advertising";
import PageCta from "@/components/shared/PageCta/PageCta";

export default function NetworkHubPage() {
  return (
    <AnchorScrollHandler>
      <>
        <Navbar />
        <main style={{ background: "var(--foreground)" }}>
          <NetworkHubHero />
          <Sponsorships />
          <BrandDeals />
          <StreamiAffiliate />
          <Advertising />
        </main>
        <PageCta
          banner="Start Growing Your Network"
          title="Join Thousands of Creators Already Earning"
          subtitle="Connect with brands, manage partnerships, and grow your revenue through transparent collaborations designed for long-term success."
          primaryCta={{
            text: "Start Networking",
            href: "#sponsorships"
          }}
          secondaryCta={{
            text: "View Opportunities",
            href: "#brand-deals"
          }}
        />
        <Footer />
      </>
    </AnchorScrollHandler>
  );
}
