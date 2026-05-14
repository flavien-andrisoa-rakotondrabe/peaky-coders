import Header from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/utils/Hero";
import Categories from "@/components/utils/Categories";
import HowItWorks from "@/components/utils/HowItWork";
import Testimonial from "@/components/utils/Testimonial";
import Features from "@/components/utils/Features";
import CtaBanner from "@/components/utils/CtaBanner";
import HoverCards from "@/components/utils/HoverCard";
import CardEvent from "@/components/utils/EventCard";
import AddEventForm from "@/components/utils/AddEventCard";
import ParticleBackground from "@/components/utils/ParticuleBackground";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <Header/>
      <Hero/>
      <Categories/>
      {/* <ParticleBackground/> */}
    </main>
  );
}
