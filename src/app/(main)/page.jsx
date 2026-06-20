import HeroSection from "@/components/homepage/HeroSection";
import FeaturedDoctors from "@/components/homepage/FeaturedDoctors";
import Specializations from "@/components/homepage/Specializations";
import StatsRow from "@/components/homepage/StatsRow";
import PatientStories from "@/components/homepage/PatientStories";
import WhyChoose from "@/components/homepage/WhyChoose";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturedDoctors />
      <Specializations />
      <StatsRow />
      <PatientStories />
      <WhyChoose />
    </main>
  );
}
