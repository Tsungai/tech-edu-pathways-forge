import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Courses } from "@/components/Courses";
import { About } from "@/components/About";
import { Testimonials } from "@/components/Testimonials";
import { Partners } from "@/components/Partners";
import { Contact } from "@/components/Contact";
import { StickyHeader } from "@/components/StickyHeader";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <StickyHeader />
      <Hero />
      <Features />
      <Courses />
      <About />
      <Testimonials />
      <Partners />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
