import { useEffect } from "react";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Courses } from "@/components/Courses";
import { About } from "@/components/About";
import { Testimonials } from "@/components/Testimonials";
import { Partners } from "@/components/Partners";
import { Contact } from "@/components/Contact";
import { StickyHeader } from "@/components/StickyHeader";
import { Footer } from "@/components/Footer";
import { SocialProof } from "@/components/SocialProof";

const Index = () => {
  // Force dark mode on the landing page
  useEffect(() => {
    const root = document.documentElement;
    const had = root.classList.contains("dark");
    root.classList.add("dark");
    return () => {
      if (!had) root.classList.remove("dark");
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth">
      <StickyHeader />
      <Hero />
      <SocialProof />
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
