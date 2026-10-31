"use client";

import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IStudio } from "@/lib/types/studio"; 

interface StudioCardProps {
  studios: IStudio[];
}

export default function StudioCard({ studios }: StudioCardProps) {
  if (!studios || studios.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground bg-white rounded-xl border border-dashed">
        <h2 className="text-xl font-medium">No studios found</h2>
        <p className="mt-2">Be the first to <Link href="/add-studio" className="text-[#00A8E8] underline">add a studio!</Link></p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {studios.map((studio) => (
        <div 
          key={studio._id} 
          className="group flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
        >
          {/* Image Section */}
          <div className="relative h-48 w-full overflow-hidden bg-muted">
            <img
              src={studio?.imageUrl"}
              alt={studio.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute top-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
              {studio.category}
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-1 flex-col p-5">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-lg line-clamp-1" title={studio.title}>
                {studio.title}
              </h3>
              <div className="flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 shrink-0">
                <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                4.9 
              </div>
            </div>

            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="line-clamp-1">{studio.location}</span>
            </div>

            <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
              <div>
                <span className="text-xl font-bold text-foreground">${studio.hourlyRate}</span>
                <span className="text-sm text-muted-foreground"> / hr</span>
              </div>
              <Link href={`/studios/${studio._id}`}>
                <Button variant="outline" size="sm" className="rounded-full border-[#00A8E8] text-[#00A8E8] hover:bg-[#00A8E8] hover:text-white transition-colors">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}