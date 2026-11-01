import { ShieldCheck, UserCheck, Wrench, HeadphonesIcon } from "lucide-react";

const features = [
  {
    title: "Liability Protection",
    description: "Comprehensive coverage for hosts and creators during every booking, so you can create with peace of mind.",
    icon: ShieldCheck,
  },
  {
    title: "Verified Profiles",
    description: "Every user undergoes ID verification to ensure a trusted, secure, and professional community.",
    icon: UserCheck,
  },
  {
    title: "Equipment Safety",
    description: "Secure storage and strict platform policies ensure that your gear and studio equipment are always protected.",
    icon: Wrench,
  },
  {
    title: "24/7 Host Support",
    description: "Dedicated support team available around the clock to assist you with any issues or emergencies.",
    icon: HeadphonesIcon,
  },
];

export default function HostGuarantee() {
  return (
    <section className="py-20 bg-slate-950 text-white relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Host Guarantee & Creator Support
          </h2>
          <p className="text-slate-400 mt-3 max-w-2xl mx-auto">
            We've got your back, so you can focus on what you do best—creating amazing content.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div 
              key={feature.title} 
              className="flex flex-col items-start p-6 rounded-2xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800/50 transition-colors"
            >
              <div className="mb-5 rounded-xl bg-[#00A8E8]/10 p-3 text-[#00A8E8]">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}