import FeaturedStudios from "@/components/home/Featured-Studios";
import HeroSlider from "@/components/home/HeroSlider";
import CategorySection from "@/components/home/CategorySection";
import HowItWorks from "@/components/home/HowItWorks";

export default function Page() {
  return (
    <div>
      <HeroSlider/>
      <FeaturedStudios/>
      <CategorySection/>
      <HowItWorks/>
    </div>
  );
}
