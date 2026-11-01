import FeaturedStudios from "@/components/home/Featured-Studios";
import HeroSlider from "@/components/home/HeroSlider";
import CategorySection from "../components/home/CategorySection";

export default function Page() {
  return (
    <div>
      <HeroSlider/>
      <FeaturedStudios/>
      <CategorySection/>
    </div>
  );
}
