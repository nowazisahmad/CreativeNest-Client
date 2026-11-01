import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Star, Users, ShieldCheck, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IStudio } from "@/lib/types/Studio"; 
import Image from "next/image";

async function getStudio(id: string): Promise<IStudio | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/studios/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function StudiosDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const studio = await getStudio(resolvedParams.id);

  if (!studio) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-muted/30 pb-20">
      
      <div className="bg-background border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/studios" className="flex items-center text-sm font-medium text-muted-foreground hover:text-[#00A8E8] transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Studios
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="bg-[#00A8E8]/10 text-[#00A8E8] px-3 py-1 rounded-full text-sm font-semibold">
              {studio.category}
            </span>
            <div className="flex items-center text-sm font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-md">
              <Star className="h-4 w-4 fill-amber-500 text-amber-500 mr-1" />
              4.8 (120+ reviews)
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {studio.title}
          </h1>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            {studio.location}
          </div>
        </div>

        <div className="relative w-full h-100 md:h-125 rounded-2xl overflow-hidden mb-8 shadow-sm">
          <Image
            src={studio?.imageUrl }
            alt={studio.title}
            fill
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            
            <div className="flex items-center justify-between p-6 bg-card border rounded-xl shadow-sm">
              <div>
                <h3 className="text-lg font-semibold">Hosted by {studio.hostName}</h3>
                <p className="text-sm text-muted-foreground">Verified Host</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-[#00A8E8]/10 flex items-center justify-center text-[#00A8E8] font-bold text-xl">
                {studio.hostName?.charAt(0) || "H"}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">About this space</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {studio.description}
              </p>
            </div>

            <div className="border-y py-6">
              <h2 className="text-xl font-semibold mb-4">Space Details</h2>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-5 w-5 text-[#00A8E8]" />
                <span>Accommodates up to <strong className="text-foreground">{studio.maxCapacity}</strong> people</span>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">What this place offers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {studio.amenities && studio.amenities.length > 0 ? (
                  studio.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>{amenity}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No amenities listed.</p>
                )}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="sticky top-24 bg-card border rounded-2xl p-6 shadow-md">
              <div className="flex items-end gap-2 mb-6">
                <span className="text-4xl font-bold text-foreground">${studio.hourlyRate}</span>
                <span className="text-muted-foreground pb-1">/ hour</span>
              </div>

              <div className="space-y-3 mb-6 text-sm text-muted-foreground">
                <div className="flex justify-between border-b pb-2">
                  <span>Security Deposit</span>
                  <span className="font-medium text-foreground">${studio.securityDeposit}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Max Capacity</span>
                  <span className="font-medium text-foreground">{studio.maxCapacity} People</span>
                </div>
                <div className="flex items-start gap-2 pt-2 text-green-600">
                  <ShieldCheck className="h-4 w-4 mt-0.5" />
                  <span>Covered by StudioSpace Guarantee</span>
                </div>
              </div>

              <Button className="w-full bg-[#00A8E8] hover:bg-[#0090c9] h-12 text-lg">
                Book This Studio
              </Button>
              <p className="text-center text-xs text-muted-foreground mt-4">
                You won't be charged yet
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}