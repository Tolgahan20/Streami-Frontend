import { AnchorScrollHandler } from "@/components/layout/AnchorScrollHandler/AnchorScrollHandler";
import Navbar from "@/components/layout/Main/Navbar/Navbar";
import Footer from "@/components/layout/Main/Footer/Footer";
import MessagingHero from "@/components/messaging/Hero/MessagingHero";
import GeneralMessages from "@/components/messaging/GeneralMessages/GeneralMessages";
import StreamerGroups from "@/components/messaging/StreamerGroups/StreamerGroups";
import CreatorGroups from "@/components/messaging/CreatorGroups/CreatorGroups";
import PageCta from "@/components/shared/PageCta/PageCta";

export default function MessagingPage() {
  return (
    <AnchorScrollHandler>
      <>
        <Navbar />
        <main style={{ background: "var(--foreground)" }}>
          <MessagingHero />
          <GeneralMessages />
          <StreamerGroups />
          <CreatorGroups />
        </main>
        <PageCta
          banner="Start Communicating Better"
          title="Connect with Creators Through Better Messaging"
          subtitle="Join thousands of streamers and creators using Streami's messaging tools to collaborate, share, and grow together."
          primaryCta={{
            text: "Start Messaging",
            href: "#general-messages"
          }}
          secondaryCta={{
            text: "Join Groups",
            href: "#streamer-groups"
          }}
        />
        <Footer />
      </>
    </AnchorScrollHandler>
  );
}
