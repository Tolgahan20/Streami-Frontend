import { AnchorScrollHandler } from "@/components/layout/AnchorScrollHandler/AnchorScrollHandler";
import Navbar from "@/components/layout/Main/Navbar/Navbar";
import Footer from "@/components/layout/Main/Footer/Footer";
import CommunityHero from "@/components/community/Hero/CommunityHero";
import SocialFeed from "@/components/community/SocialFeed/SocialFeed";
import StreamersCommunity from "@/components/community/StreamersCommunity/StreamersCommunity";
import CreatorsCommunity from "@/components/community/CreatorsCommunity/CreatorsCommunity";
import PageCta from "@/components/shared/PageCta/PageCta";

export default function CommunityPage() {
  return (
    <AnchorScrollHandler>
      <>
        <Navbar />
        <main style={{ background: "var(--foreground)" }}>
          <CommunityHero />
          <SocialFeed />
          <StreamersCommunity />
          <CreatorsCommunity />
        </main>
        <PageCta
          banner="Start Building Connections"
          title="Join Thousands of Creators in Our Community"
          subtitle="Share your journey, get feedback, and grow together with fellow streamers and creators who understand your path."
          primaryCta={{
            text: "Join Community",
            href: "#social-feed"
          }}
          secondaryCta={{
            text: "Browse Groups",
            href: "#streamers-community"
          }}
        />
        <Footer />
      </>
    </AnchorScrollHandler>
  );
}
