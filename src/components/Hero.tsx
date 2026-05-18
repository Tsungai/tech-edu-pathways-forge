import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";

const tickerStats = [
  "3,000+ Students Enrolled",
  "12+ Courses",
  "South Africa & Zimbabwe",
  "Job-Ready Curriculum",
  "Evening & Full-Time Tracks",
  "Industry Mentors",
];

export const Hero = () => {
  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden bg-background pt-28 pb-20"
    >
      {/* Layered backgrounds: gradient mesh + tribal pattern */}
      <div className="absolute inset-0 mesh-bg" aria-hidden />
      <div className="absolute inset-0 pattern-tribal opacity-60" aria-hidden />
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background"
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-8 reveal">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              African Silicon Valley Energy
            </span>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.02] text-foreground">
              Your Tech Career{" "}
              <span className="text-primary">Starts Here</span>
              <span className="block text-foreground/90">
                Built for Africa,{" "}
                <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                  Built for the World
                </span>
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Learn in-demand tech skills online. Flexible. Affordable. Job-ready.
              Globally competitive curriculum designed for learners in South Africa
              and Zimbabwe.
            </p>

            {/* Enrolment banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl border border-primary/30 bg-primary/5 px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-primary">
                  Next cohort enrolment closes 5 June 2026
                </p>
                <p className="text-xs text-muted-foreground">
                  Classes start 9 June 2026
                </p>
              </div>
              <a href="#contact">
                <Button
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-full"
                >
                  Reserve a Seat
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#courses">
                <Button
                  size="lg"
                  className="w-full sm:w-auto px-7 py-6 text-base font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Browse Courses
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="#about">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto px-7 py-6 text-base font-semibold rounded-full border-foreground/20 text-foreground hover:bg-foreground/5 hover:text-foreground bg-transparent"
                >
                  <PlayCircle className="mr-2 h-5 w-5 text-primary" />
                  Watch How It Works
                </Button>
              </a>
            </div>
          </div>

          {/* Visual block: stacked geometric cards */}
          <div className="lg:col-span-5 relative hidden lg:block reveal">
            <div className="relative aspect-[4/5] max-w-md ml-auto">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/30 via-secondary/20 to-transparent blur-3xl" />
              <div className="absolute top-6 right-0 w-3/4 h-3/4 rounded-3xl border border-primary/30 bg-card/70 backdrop-blur-md p-6 glow-border">
                <div className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">
                  Live Cohort
                </div>
                <div className="font-display text-3xl font-bold text-foreground leading-tight">
                  Full-Stack Web Development
                </div>
                <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                  {["Mon", "Wed", "Fri"].map((d) => (
                    <div
                      key={d}
                      className="rounded-lg bg-primary/10 text-primary font-bold py-2"
                    >
                      {d}
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-sm text-muted-foreground">
                  24-week sprint · Live mentors · Capstone project
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-2/3 h-2/3 rounded-3xl border border-secondary/30 bg-card/80 backdrop-blur-md p-6 glow-border">
                <div className="text-xs uppercase tracking-widest text-secondary font-semibold mb-3">
                  Career Outcome
                </div>
                <div className="font-display text-2xl font-bold text-foreground">
                  Junior Developer
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                    <div className="h-full w-[85%] bg-gradient-to-r from-primary to-secondary" />
                  </div>
                  <span className="text-sm font-bold text-foreground">85%</span>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  Placement rate across cohorts
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated stats ticker */}
        <div className="mt-16 relative overflow-hidden border-y border-border/60 py-4">
          <div className="flex gap-12 animate-ticker whitespace-nowrap">
            {[...tickerStats, ...tickerStats].map((stat, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-sm font-medium text-muted-foreground"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="font-display font-semibold text-foreground tracking-tight">
                  {stat}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
