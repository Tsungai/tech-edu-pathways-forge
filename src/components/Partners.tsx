
import { Badge } from "@/components/ui/badge";

export const Partners = () => {
  const certificationPartners = [
    { name: "AWS", description: "Cloud Computing Certifications" },
    { name: "Google", description: "Cloud & Digital Marketing" },
    { name: "Microsoft", description: "Azure & Office Certifications" },
    { name: "Oracle", description: "Database & Java Certifications" },
    { name: "ICDL", description: "Digital Literacy Certifications" },
    { name: "MICT SETA", description: "Accreditation & Skills Development" }
  ];

  const industryPartners = [
    "BBD", "BCX", "Platform45", "IQBusiness", "Yoco", "Investec", 
    "Deloitte", "Uber", "Nedbank", "ABSA", "Pick n Pay", "Woolworths"
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our partnerships with leading technology companies ensure you receive 
            the most current and industry-relevant education.
          </p>
        </div>

        {/* Certification Partners */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-foreground text-center mb-8">
            Certification Partners
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificationPartners.map((partner, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 text-center"
              >
                <h4 className="text-xl font-bold text-foreground mb-2">
                  {partner.name}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {partner.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Partners */}
        <div>
          <h3 className="text-2xl font-semibold text-foreground text-center mb-8">
            Industry Partners & Job Placement Network
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {industryPartners.map((partner, index) => (
              <Badge 
                key={index}
                variant="outline" 
                className="px-4 py-2 text-sm border-primary/30 text-primary hover:bg-accent transition-colors"
              >
                {partner}
              </Badge>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-8">
            Our graduates have secured positions at these leading companies across South Africa
          </p>
        </div>
      </div>
    </section>
  );
};
