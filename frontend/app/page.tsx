import Header from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/utils/Hero";
import Categories from "@/components/utils/Categories";
import HowItWorks from "@/components/utils/HowItWork";
import Testimonial from "@/components/utils/Testimonial";
import Features from "@/components/utils/Features";
import CtaBanner from "@/components/utils/CtaBanner";
import HoverCards from "@/components/utils/HoverCard";
import CardEvent from "@/components/utils/CardEvent";
import AddEventForm from "@/components/utils/AddEventForm";
import ParticleBackground from "@/components/utils/ParticuleBackground";
import Navbar from "@/components/layout/Header";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <ParticleBackground />
      <Header />
      <Hero />
      <Categories />
      <HowItWorks />
      <Testimonial />
      <CtaBanner />
      {/* <ParticleBackground/> */}
      <Footer />
    </main>
  );
}
