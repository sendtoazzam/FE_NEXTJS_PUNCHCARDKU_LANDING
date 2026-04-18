import PricingColumn from "@/components/Pricing/PricingColumn";
import { tiers } from "@/data/pricing";

const FundingPricing: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-20">
      <div className="relative lg:col-span-7">
        {/* <div className="absolute -right-10 top-6 z-10 rotate-45 rounded-full bg-primary px-10 py-1 text-xs font-bold uppercase tracking-widest text-black">
          FREE
        </div> */}
        <div className="pointer-events-none relative opacity-50 saturate-50">
          <PricingColumn tier={{ ...tiers[0], price: "FREE" }} highlight />
          {/* <div className="absolute inset-0 z-10 flex items-center justify-center">
            <span className="-rotate-[34deg] text-7xl font-black uppercase tracking-[0.2em] text-red-600/75 md:text-8xl">
              FREE
            </span>
          </div> */}
        </div>
      </div>

      <div className="relative rounded-xl border border-primary/40 bg-gradient-to-br from-primary/10 via-background to-background p-6 shadow-[0_0_0_1px_rgba(255,214,10,0.15),0_18px_48px_rgba(0,0,0,0.28)] lg:col-span-13 lg:p-8">
        <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wide text-black">
          Featured
        </span>
        <h3 className="text-2xl font-semibold">Fund this project</h3>
        <p className="mt-3 text-foreground-accent">
          We keep the core platform free for teams getting started. Your support helps us ship new modules faster,
          improve reliability, and keep maintenance sustainable.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-foreground/15 bg-hero-background p-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-foreground-accent">
              What your funding unlocks
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>- Faster release cadence for attendance and payroll workflows</li>
              <li>- Better analytics and management reporting</li>
              <li>- Performance and security improvements</li>
              <li>- Priority bug fixes and support SLA</li>
            </ul>
          </div>
          <div className="rounded-lg border border-foreground/15 bg-hero-background p-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-foreground-accent">
              Suggested support options
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>- One-time sponsorship for feature milestones</li>
              <li>- Monthly support contribution for ongoing maintenance</li>
              <li>- Custom implementation package for your organization</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#contact" className="rounded-full bg-primary px-6 py-3 text-base font-semibold text-black shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-primary-accent">
            Become a Sponsor
          </a>
          <a href="#contact" className="rounded-full border border-primary/30 px-5 py-3 font-semibold transition hover:bg-primary/10">
            Request Partnership Deck
          </a>
        </div>
      </div>
    </div>
  );
};

export default FundingPricing;
