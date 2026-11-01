import Link from "next/link";
import { Camera, Film, Mic, Music, Palette } from "lucide-react";

const categories = [
  { 
    name: "Photo Studios", 
    value: "Photo Studio", 
    icon: Camera, 
    color: "bg-blue-50 text-blue-600 group-hover:bg-blue-600" 
  },
  { 
    name: "Sound Stages", 
    value: "Film Stage", 
    icon: Film, 
    color: "bg-purple-50 text-purple-600 group-hover:bg-purple-600" 
  },
  { 
    name: "Podcast Rooms", 
    value: "Podcast Lounge", 
    icon: Mic, 
    color: "bg-green-50 text-green-600 group-hover:bg-green-600" 
  },
  { 
    name: "Music Suites", 
    value: "Music Suite", 
    icon: Music, 
    color: "bg-orange-50 text-orange-600 group-hover:bg-orange-600" 
  },
  { 
    name: "Art Workshops", 
    value: "Workshop", 
    icon: Palette, 
    color: "bg-pink-50 text-pink-600 group-hover:bg-pink-600" 
  },
];

const CategorySection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Browse by Studio Categories</h2>
          <p className="text-muted-foreground mt-2">
            Find the perfect space tailored to your creative needs.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/studios?category=${encodeURIComponent(category.value)}`}
              className="group flex flex-col items-center justify-center gap-4 rounded-2xl border bg-card p-6 transition-all hover:border-[#00A8E8] hover:shadow-md hover:-translate-y-1"
            >
              <div className={`flex h-16 w-16 items-center justify-center rounded-full transition-colors ${category.color} group-hover:text-white`}>
                <category.icon className="h-8 w-8" />
              </div>
              <span className="text-sm font-semibold text-center">{category.name}</span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CategorySection;