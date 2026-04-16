import {
  Benefits,
  CTA,
  FAQ,
  Hero,
  Logos,
  Pricing,
  Stats,
  Testimonials,
} from "@/components/pages/home";
import { Container, Section } from "@/components/shared";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Logos />
      <Container>
        <Benefits />

        <Section
          id="pricing"
          title="Pricing"
          description="Simple, transparent pricing. No surprises."
        >
          <Pricing />
        </Section>

        <Section
          id="testimonials"
          title="What Our Clients Say"
          description="Hear from those who have partnered with us."
        >
          <Testimonials />
        </Section>

        <FAQ />

        <Stats />
        
        <CTA />
      </Container>
    </>
  );
};

export default HomePage;
