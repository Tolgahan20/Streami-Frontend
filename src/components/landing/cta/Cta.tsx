import PageCta from "@/components/shared/PageCta/PageCta";

export default function Cta() {
  return (
    <PageCta
      badge="Ready to Transform Your Stream?"
      title="Start Creating with AI Today"
      subtitle="Join thousands of content creators who are already using Streami to enhance their streams"
      primaryCta={{
        text: "GET STARTED",
        href: "/get-started"
      }}
    />
  );
}