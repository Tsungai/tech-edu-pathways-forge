
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Courses } from "@/components/Courses";
import { About } from "@/components/About";
import { Testimonials } from "@/components/Testimonials";
import { Partners } from "@/components/Partners";
import { Contact } from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Features />
      <Courses />
      <About />
      <Testimonials />
      <Partners />
      <Contact />
    </div>
  );
};

export default Index;
