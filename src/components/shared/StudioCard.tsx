import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { IStudio } from "@/lib/types/Studio";

const StudioCard = ({ studio }: {studio: IStudio }) => {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
      
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        <Image
          src={studio?.imageUrl}
          alt={studio.title}
          fill
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
          {studio.category}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        
        {/* Title & Rating */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-base md:text-lg line-clamp-1" title={studio.title}>
            {studio.title}
          </h3>
          <div className="flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 shrink-0">
            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
            4.8
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
          <MapPin className="h-4 w-4 shrink-0" />
          <span className="line-clamp-1">{studio.location}</span>
        </div>

        {/* Rate & View Details Button */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
          <div>
            <span className="text-lg md:text-xl font-bold text-foreground">${studio.hourlyRate}</span>
            <span className="text-xs md:text-sm text-muted-foreground"> / hr</span>
          </div>
          <Link href={`/studios/${studio._id}`}>
            <Button variant="outline" size="sm" className="rounded-full border-[#00A8E8] text-[#00A8E8] hover:bg-[#00A8E8] hover:text-white transition-colors text-xs md:text-sm">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StudioCard;