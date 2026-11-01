"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PlusCircle, MapPin, Edit, Trash2, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { IStudio } from "@/lib/types/Studio";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

export default function MyStudioListingsPage() {
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  
  const [studios, setStudios] = useState<IStudio[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (sessionLoading) return;

    const fetchMyStudios = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/my-studios?email=${session?.user?.email}`
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

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    const toastId = toast.loading("Deleting studio...");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/studios/${deleteId}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        toast.success("Studio deleted successfully!", { id: toastId });
        setStudios((prev) => prev.filter((s) => s._id !== deleteId));
        setDeleteId(null); 
        router.refresh();
      } else {
        toast.error("Failed to delete studio.", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong.", { id: toastId });
    } finally {
      setIsDeleting(false);
    }
  };

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
                className="flex flex-col sm:flex-row items-center gap-4 rounded-xl border bg-white p-4 shadow-sm relative"
              >
                <Image
                  src={studio?.imageUrl}
                  alt={studio.title}
                  width={128}
                  height={96}
                  className="h-24 w-full sm:w-32 rounded-lg object-cover"
                />
                
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
                    <Link href={`/studios/edit/${studio._id}`}>
                      <Button variant="outline" size="sm" className="h-8 px-2 text-muted-foreground">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>

                    <Dialog open={deleteId === studio._id} onOpenChange={(open) => !open && setDeleteId(null)}>
                      <DialogTrigger 
  render={
    <Button
      variant="outline"
      size="sm"
      onClick={() => setDeleteId(studio._id)}
      className="h-8 px-2 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  }
/>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                            Delete Studio
                          </DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete <strong>{studio.title}</strong>? This action cannot be undone and will remove all associated data.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setDeleteId(null)}>
                            Cancel
                          </Button>
                          <Button 
                            variant="destructive" 
                            onClick={handleDelete} 
                            disabled={isDeleting}
                          >
                            {isDeleting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                            Delete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
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