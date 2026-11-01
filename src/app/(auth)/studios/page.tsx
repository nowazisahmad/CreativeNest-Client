"use client";

import { useEffect, useState } from "react";
import StudioCard from "@/components/shared/StudioCard"; 
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IStudio } from "@/lib/types/Studio";

export default function ExploreStudiosPage() {
  const [studios, setStudios] = useState<IStudio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchStudios = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/studios`);
        if (!res.ok) throw new Error("Failed to fetch studios");
        const data = await res.json();
        setStudios(data);
      } catch (err) {
        setError("Something went wrong while fetching studios.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudios();
  }, []);

  const totalPages = Math.ceil(studios.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentStudios = studios.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#00A8E8]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-muted/30 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Explore Studios</h1>
          <p className="text-muted-foreground mt-2">
            Find the perfect space for your next creative project.
          </p>
        </div>

        {currentStudios.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground bg-white rounded-xl border border-dashed">
            <h2 className="text-xl font-medium">No studios found</h2>
            <p className="mt-2">Be the first to add a studio!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {currentStudios.map((studio) => (
              <StudioCard key={studio._id} studio={studio} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>
            
            <span className="text-sm text-muted-foreground font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1"
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}