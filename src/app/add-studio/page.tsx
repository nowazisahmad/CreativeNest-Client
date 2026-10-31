"use client";

import { useState } from "react";
import { Building2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { authClient } from "@/lib/auth-client"; 

const categories = ["Photo Studio", "Film Stage", "Podcast Lounge", "Music Suite", "Workshop"];
const amenityOptions = ["Wi-Fi", "Air Conditioning", "Parking", "Green Screen", "Lighting Equipment", "Soundproofing"];

const initialForm = {
  title: "",
  category: "",
  hourlyRate: "",
  securityDeposit: "",
  maxCapacity: "",
  location: "",
  imageUrl: "",
  description: "",
};

export default function AddStudioPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession(); 
  const [form, setForm] = useState(initialForm);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const update = (field: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  const toggleAmenity = (amenity: string) => {
    setAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      const studioData = {
        ...form,
        amenities,
        hostName: session?.user?.name || "Unknown",
        hostEmail: session?.user?.email || "Unknown",
        hourlyRate: Number(form.hourlyRate),
        securityDeposit: Number(form.securityDeposit),
        maxCapacity: Number(form.maxCapacity),
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/add-studio`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studioData),
      });

      const result = await res.json().catch(() => null);

      if (!res.ok) {
        toast.error(result?.message || "Failed to add the studio.");
        return;
      }

      toast.success("Studio added successfully!");
      router.push("/my-listings"); 
      router.refresh();
      setForm(initialForm);
      setAmenities([]);
      
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClear = () => {
    setForm(initialForm);
    setAmenities([]);
    toast.info("Form cleared.");
  };

  return (
    <main 
      className="relative min-h-screen w-full flex items-center justify-center px-4 py-12 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop')" }}
    >
      <div className="absolute inset-0 bg-slate-950/60 z-0" />
      
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#00A8E8]/30 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/20 blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-3xl rounded-3xl border border-white/20 bg-white/10 p-6 sm:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-xl">
        
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-light tracking-tight text-white sm:text-4xl md:text-5xl">
            Add New Studio
          </h1>
          <p className="mt-2 text-white/70">List your creative space and start earning today.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6">
          
          {/* Read-only User Info */}
          <div className="grid grid-cols-1 gap-4 rounded-xl border border-white/10 bg-black/20 p-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium text-white/50 uppercase tracking-wider">Host Name</p>
              <p className="font-medium text-white">{session?.user?.name || "Loading..."}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-white/50 uppercase tracking-wider">Host Email</p>
              <p className="font-medium text-white">{session?.user?.email || "Loading..."}</p>
            </div>
          </div>

          {/* Title */}
          <div className="grid gap-2">
            <Label htmlFor="title" className="text-white/80">Studio Title</Label>
            <Input
              id="title"
              placeholder="e.g., Downtown Photo Loft"
              value={form.title}
              onChange={(event) => update("title", event.target.value)}
              required
              className="border-white/20 bg-white/5 text-white placeholder:text-white/30 focus-visible:ring-[#00A8E8]"
            />
          </div>

          {/* Category + Location */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label className="text-white/80">Category</Label>
              <Select
                value={form.category}
                onValueChange={(value) => update("category", value ?? "")}
              >
                <SelectTrigger className="w-full border-white/20 bg-white/5 text-white focus:ring-[#00A8E8]">
                  <SelectValue placeholder="Select a category" className="text-white/50" />
                </SelectTrigger>
                {/* Dropdown Content ডার্ক থিমের জন্য */}
                <SelectContent className="border-white/20 bg-slate-900/90 backdrop-blur-xl text-white">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category} className="focus:bg-white/10 focus:text-white">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location" className="text-white/80">Location / Address</Label>
              <Input
                id="location"
                placeholder="123 Main St, New York"
                value={form.location}
                onChange={(event) => update("location", event.target.value)}
                required
                className="border-white/20 bg-white/5 text-white placeholder:text-white/30 focus-visible:ring-[#00A8E8]"
              />
            </div>
          </div>

          {/* Pricing & Capacity */}
          <div className="grid gap-5 sm:grid-cols-3">
            <div className="grid gap-2">
              <Label htmlFor="hourlyRate" className="text-white/80">Hourly Rate ($)</Label>
              <Input
                id="hourlyRate"
                type="number"
                placeholder="50"
                value={form.hourlyRate}
                onChange={(event) => update("hourlyRate", event.target.value)}
                required
                min="0"
                className="border-white/20 bg-white/5 text-white placeholder:text-white/30 focus-visible:ring-[#00A8E8]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="securityDeposit" className="text-white/80">Security Deposit ($)</Label>
              <Input
                id="securityDeposit"
                type="number"
                placeholder="100"
                value={form.securityDeposit}
                onChange={(event) => update("securityDeposit", event.target.value)}
                required
                min="0"
                className="border-white/20 bg-white/5 text-white placeholder:text-white/30 focus-visible:ring-[#00A8E8]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="maxCapacity" className="text-white/80">Max Capacity</Label>
              <Input
                id="maxCapacity"
                type="number"
                placeholder="10"
                value={form.maxCapacity}
                onChange={(event) => update("maxCapacity", event.target.value)}
                required
                min="1"
                className="border-white/20 bg-white/5 text-white placeholder:text-white/30 focus-visible:ring-[#00A8E8]"
              />
            </div>
          </div>

          {/* Image URL */}
          <div className="grid gap-2">
            <Label htmlFor="imageUrl" className="text-white/80">Image URL</Label>
            <Input
              id="imageUrl"
              type="url"
              placeholder="https://example.com/studio.jpg"
              value={form.imageUrl}
              onChange={(event) => update("imageUrl", event.target.value)}
              required
              className="border-white/20 bg-white/5 text-white placeholder:text-white/30 focus-visible:ring-[#00A8E8]"
            />
          </div>

          {/* Amenities Checkboxes */}
          <div className="grid gap-3">
            <Label className="text-white/80">Amenities</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {amenityOptions.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity}
                    checked={amenities.includes(amenity)}
                    onCheckedChange={() => toggleAmenity(amenity)}
                    className="border-white/30 data-[state=checked]:bg-[#00A8E8] data-[state=checked]:border-[#00A8E8]"
                  />
                  <label
                    htmlFor={amenity}
                    className="text-sm font-medium leading-none text-white/80 cursor-pointer"
                  >
                    {amenity}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <Label htmlFor="description" className="text-white/80">Detailed Overview</Label>
            <Textarea
              id="description"
              placeholder="Describe your space, lighting, equipment..."
              className="min-h-36 border-white/20 bg-white/5 text-white placeholder:text-white/30 focus-visible:ring-[#00A8E8]"
              value={form.description}
              onChange={(event) => update("description", event.target.value)}
              required
            />
          </div>

          {/* Actions */}
          <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={handleClear}
              className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white sm:w-auto"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="bg-[#00A8E8] text-white hover:bg-[#0095d1] sm:w-auto shadow-[0_0_15px_rgba(0,168,232,0.5)]"
            >
              <Building2 className="mr-2 h-4 w-4" />
              {submitting ? "Adding..." : "Add Studio"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}