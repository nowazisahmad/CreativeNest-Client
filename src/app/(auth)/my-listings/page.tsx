"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PlusCircle, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import Image from "next/image";
import DeleteStudioDialog from "@/components/Studios/DeleteStudiosDialog";
import EditStudioDialog from "@/components/Studios/EditStudiosDialog";

export default function MyStudioListingsPage() {
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const [studios, setStudios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionLoading) return;

    const fetchMyStudios = async () => {
      if (!session?.user?.email) {
        router.push("/login");
        return;
      }
      
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/my-studios?email=${session.user.email}`
        );
        if (res.ok) {
          const data = await res.json();
          setStudios(data);
        }
      } catch (error) {
        toast.error("Failed to load your studios.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyStudios();
  }, [session, sessionLoading, router]);

  if (sessionLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#00A8E8]" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-muted/30 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Studio Listings</h1>
            <p className="text-muted-foreground mt-1">Manage your listed creative spaces.</p>
          </div>
          <Link href="/add-studio">
            <Button className="bg-[#00A8E8] hover:bg-[#0090c9]">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Studio
            </Button>
          </Link>
        </div>

        {studios.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-white py-20 text-center">
            <h3 className="text-xl font-semibold">No studios listed yet</h3>
            <p className="mt-2 text-muted-foreground mb-6">Start earning by listing your space today.</p>
            <Link href="/add-studio">
              <Button className="bg-[#00A8E8] hover:bg-[#0090c9]">Add Your First Studio</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {studios.map((studio) => (
              <div 
                key={studio._id} 
                className="flex flex-col sm:flex-row items-center gap-4 rounded-xl border bg-white p-4 shadow-sm"
              >
                <div className="relative h-24 w-full sm:w-32 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={studio?.imageUrl}
                    alt={studio.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium bg-[#00A8E8]/10 text-[#00A8E8] px-2 py-0.5 rounded-full">
                      {studio.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg">{studio.title}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {studio.location}
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto sm:flex-col sm:items-end gap-3 sm:gap-2">
                  <div className="text-right">
                    <span className="text-lg font-bold">${studio.hourlyRate}</span>
                    <span className="text-xs text-muted-foreground"> / hr</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <EditStudioDialog studio={studio} />
                    
                    <DeleteStudioDialog id={studio._id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}