import { Search, CalendarDays, CreditCard, Clapperboard } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Discover Spaces",
    description: "Browse our curated list of top-tier photo studios, sound stages, and podcast rooms.",
    icon: Search,
  },
  {
    step: "02",
    title: "Select Shoot Hours",
    description: "Choose your preferred dates and times based on real-time availability.",
    icon: CalendarDays,
  },
  {
    step: "03",
    title: "Book Instantly",
    description: "Secure your space with transparent pricing and instant booking confirmation.",
    icon: CreditCard,
  },
  {
    step: "04",
    title: "Create & Produce",
    description: "Show up, get creative, and bring your vision to life in a world-class space.",
    icon: Clapperboard,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 bg-[#00A8E8]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight">How Booking Works</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            From discovery to production in four simple steps. We make finding and booking your creative space effortless.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, index) => (
            <div key={item.step} className="relative flex flex-col items-center text-center p-6 rounded-2xl border bg-card/50 backdrop-blur-sm transition-all hover:shadow-md hover:-translate-y-1">
              
              {index !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-linear-to-r from-border to-transparent" />
              )}

              <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#00A8E8]/10 text-[#00A8E8] shadow-sm">
                <item.icon className="h-7 w-7" />
                <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#00A8E8] text-[10px] font-bold text-white ring-2 ring-background">
                  {item.step}
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}