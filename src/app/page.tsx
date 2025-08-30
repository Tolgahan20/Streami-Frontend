
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
      <main >
        {/* Hero section - top perforated block with illustration */}
        <div className="hero-wrapper" style={{ background: 'var(--foreground)' }}>
        <Hero />

        </div>
        
        {/* Features section - first content block */}
        <section style={{ 
          background: 'var(--secondary)',
          padding: 'var(--space-16) var(--space-6)',
          borderBottom: '2px dashed var(--border)'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <Features />
          </div>
        </section>

        {/* Customization section - second content block */}
        <section style={{ 
          background: 'color-mix(in srgb, var(--primary) 3%, var(--background))',
          padding: 'var(--space-16) var(--space-6)',
          borderBottom: '2px dashed var(--border)'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <Customization />
          </div>
        </section>
        {/* StreamiFeatures section - third content block with bottom border radius */}
        
        <section style={{ 
          background: 'color-mix(in srgb, var(--accent) 3%, var(--background))',
          padding: 'var(--space-16) var(--space-6)',
          borderBottom: '2px dashed var(--border)',
          borderRadius: '0 0 3rem 3rem'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <StreamiFeatures />
          </div>
        </section>

        {/* CTA section - final block */}
        <Cta />
      </main>
      <Footer />
    </>
  );
}