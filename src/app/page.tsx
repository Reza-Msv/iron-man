import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/sections/Hero";
import { CinematicReveal } from "@/components/sections/CinematicReveal";
import { HorizontalCards } from "@/components/sections/HorizontalCards";
import { SuitArmory } from "@/components/sections/SuitArmory";
import { SystemsNominal } from "@/components/sections/SystemsNominal";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CinematicReveal />
        <HorizontalCards />
        <SuitArmory />
        <SystemsNominal />
      </main>
      <Footer />
    </>
  );
}
