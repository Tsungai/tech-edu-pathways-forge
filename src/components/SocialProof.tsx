import { Quote, BadgeCheck } from "lucide-react";

const partners = [
  "MICT SETA",
  "Microsoft Learn",
  "CompTIA",
  "Google",
  "IITPSA",
  "Oracle",
];

const testimonials = [
  {
    name: "Lerato M.",
    city: "Johannesburg",
    initials: "LM",
    color: "from-primary/30 to-primary/5",
    quote:
      "I went from zero coding experience to landing a junior developer role in 8 months. The mentors actually care.",
  },
  {
    name: "Tendai N.",
    city: "Harare",
    initials: "TN",
    color: "from-secondary/30 to-secondary/5",
    quote:
      "Studying online from Harare while working full-time was finally possible. The evening track was a game-changer.",
  },
  {
    name: "Aviwe K.",
    city: "Cape Town",
    initials: "AK",
    color: "from-primary/20 to-secondary/20",
    quote:
      "The capstone project is now the first thing I show recruiters. Real skills, real portfolio, real opportunities.",
  },
];

export const SocialProof = () => {
  return (
    <section className="relative bg-background py-20 border-t border-border/60">
      <div className="max-w-7xl mx-auto px-6">
        {/* Partners / accreditation */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase">
            <BadgeCheck className="h-3.5 w-3.5" />
            Partners & Accreditation
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-4 text-foreground">
            Built on industry-recognised standards
          </h2>
          <p className="text-muted-foreground mt-2 text-sm max-w-2xl">
            Our curriculum maps to globally respected certifications and
            employer-trusted frameworks.
          </p>

          <div className="mt-10 w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {partners.map((p) => (
              <div
                key={p}
                className="glow-border rounded-xl border border-border bg-card/50 backdrop-blur-sm px-4 py-5 text-center font-display font-semibold text-sm text-muted-foreground tracking-tight"
              >
                {p}
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="glow-border relative rounded-2xl border border-border bg-card p-7 reveal"
            >
              <Quote className="absolute top-5 right-5 h-7 w-7 text-primary/30" />
              <p className="text-foreground/90 leading-relaxed text-base">
                "{t.quote}"
              </p>
              <div className="mt-6 flex items-center gap-3 pt-5 border-t border-border/60">
                <div
                  className={`h-11 w-11 rounded-full grid place-items-center font-display font-bold text-foreground bg-gradient-to-br ${t.color} border border-border`}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">
                    {t.name}
                  </div>
                  <div className="text-xs text-muted-foreground">{t.city}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
