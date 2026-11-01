"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import StudioCard from "@/components/shared/StudioCard";
import { IStudio } from "@/lib/types/Studio";

const FeaturedStudios = () => {
  const [studios, setStudios] = useState<IStudio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/featured-studios`);
        if (res.ok) {
          const data = await res.json();
          setStudios(data);
        }
      } catch (error) {
        console.error("Failed to fetch featured studios", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center bg-muted/20">
        <Loader2 className="h-8 w-8 animate-spin text-[#00A8E8]" />
      </div>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Studios</h2>
            <p className="text-muted-foreground mt-2">
              Top-rated and recently added spaces ready for your next project.
            </p>
          </div>
          <Link 
            href="/studios" 
            className="hidden sm:flex items-center text-sm font-medium text-[#00A8E8] hover:underline"
          >
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {studios.map((studio) => (
            <StudioCard key={studio._id} studio={studio} />
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:hidden">
          <Link 
            href="/studios" 
            className="flex items-center text-sm font-medium text-[#00A8E8] hover:underline"
          >
            View All Studios <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedStudios;