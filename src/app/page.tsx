import {
  Benefits,
  CTA,
  FAQ,
  FundingPricing,
  Hero,
  Logos,
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
          description="Free to start. If this helps your team, consider funding the roadmap."
        >
          <FundingPricing />
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
