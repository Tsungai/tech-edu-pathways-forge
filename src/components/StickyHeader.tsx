import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = [
  { href: "#top", label: "Home" },
  { href: "#courses", label: "Courses" },
  { href: "#about", label: "Why TechEdu" },
  { href: "#contact", label: "Contact" },
];

export const StickyHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass border-b border-border/60 py-2"
            : "bg-transparent py-4"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-5 flex items-center justify-between">
          {/* Logo */}
          <a href="#top" className="flex items-center gap-2 group">
            <span className="grid place-items-center h-9 w-9 rounded-lg bg-primary text-primary-foreground font-display font-bold">
              T
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-foreground">
              TechEdu<span className="text-primary">.</span>
            </span>
          </a>

          {/* Centre nav */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/auth" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Login
            </Link>
            <a href="#contact">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-full px-5">
                Enrol Now
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            aria-label="Open menu"
            className="md:hidden text-foreground"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] md:hidden transition ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-background/70 backdrop-blur-sm transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute right-0 top-0 h-full w-[78%] max-w-sm bg-card border-l border-border p-6 transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between mb-8">
            <span className="font-display font-bold text-lg">Menu</span>
            <button aria-label="Close menu" onClick={() => setOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-lg font-medium text-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            ))}
            <Link
              to="/auth"
              onClick={() => setOpen(false)}
              className="text-lg font-medium text-muted-foreground"
            >
              Login
            </Link>
            <a href="#contact" onClick={() => setOpen(false)} className="mt-4">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-full">
                Enrol Now
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </a>
          </div>
        </aside>
      </div>
    </>
  );
};
