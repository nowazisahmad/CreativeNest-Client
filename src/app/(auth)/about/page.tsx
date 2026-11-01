import Link from "next/link";
import { Aperture, Users, ShieldCheck, Star, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AboutUsPage() {
  const stats = [
    { label: "Creative Spaces", value: "500+" },
    { label: "Happy Creators", value: "10K+" },
    { label: "Cities Covered", value: "25+" },
    { label: "Avg. Rating", value: "4.9/5" },
  ];

  const values = [
    {
      title: "Community First",
      description: "We believe in the power of collaboration. Our platform is built to connect visionaries with the spaces that bring their ideas to life.",
      icon: Users,
    },
    {
      title: "Trust & Safety",
      description: "Every host and creator is verified. We provide liability protection and secure payments so you can focus on creating.",
      icon: ShieldCheck,
    },
    {
      title: "Premium Quality",
      description: "We curate only the best. From lighting to acoustics, every studio listed on our platform meets high professional standards.",
      icon: Star,
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-125 bg-[#00A8E8]/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A8E8]/10 text-[#00A8E8] text-sm font-medium mb-6">
            <Aperture className="h-4 w-4" />
            <span>About StudioSpace</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-4xl mx-auto">
            Empowering Creators, <br className="hidden md:block" />
            <span className="text-[#00A8E8]">One Space at a Time.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            StudioSpace is a high-performance peer-to-peer marketplace designed for filmmakers, photographers, podcasters, and musicians. We connect visionary creators with the perfect creative spaces.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/studios">
              <Button className="bg-[#00A8E8] hover:bg-[#0090c9] px-8 h-12 text-base">
                Explore Studios
              </Button>
            </Link>
            <Link href="/host">
              <Button variant="outline" className="px-8 h-12 text-base">
                Become a Host
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col gap-2">
                <span className="text-3xl md:text-4xl font-bold text-[#00A8E8]">{stat.value}</span>
                <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden aspect-square md:aspect-4/3 shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop"
                alt="Creative Studio"
                fill
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-8">
                <p className="text-white font-medium text-lg">Where ideas take shape.</p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Finding the right space used to be a hassle. Endless phone calls, hidden fees, and outdated equipment often got in the way of great ideas. We knew there had to be a better way.
                </p>
                <p>
                  That's why we built StudioSpace. We created a seamless, transparent marketplace where creators can discover, book, and manage professional workspaces instantly. Whether you're recording a hit podcast or shooting a cinematic masterpiece, we provide the canvas for your creativity.
                </p>
                <p>
                  Today, we're proud to connect thousands of creators with top-tier hosts across the country, fostering a community built on trust, quality, and a shared passion for creation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Creators Choose Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We are more than just a booking platform. We are a community built on reliability and creative excellence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-background rounded-2xl p-8 border shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-xl bg-[#00A8E8]/10 flex items-center justify-center text-[#00A8E8] mb-6">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Something Amazing?</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Join thousands of creators and hosts on the premier peer-to-peer studio marketplace.
          </p>
          <Link href="/signup">
            <Button className="bg-[#00A8E8] hover:bg-[#0090c9] px-10 h-12 text-lg rounded-full">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

    </main>
  );
}