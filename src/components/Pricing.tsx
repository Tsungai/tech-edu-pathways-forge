
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, MapPin } from "lucide-react";
import { useGeolocation } from "@/hooks/useGeolocation";
import { convertPrice } from "@/utils/currency";

export const Pricing = () => {
  const { country, currency, loading } = useGeolocation();

  const pricingTiers = [
    {
      name: "CodeStars",
      subtitle: "Perfect for Under 18",
      price: "R1,000",
      period: "/month",
      upfront: "R2,500 upfront",
      description: "Designed for young minds to explore tech careers early",
      features: [
        "3-month course duration",
        "ICDL Certification",
        "Programming basics",
        "Digital literacy training",
        "Age-appropriate curriculum",
        "Flexible learning schedule"
      ],
      popular: false,
      color: "border-gray-200"
    },
    {
      name: "TechEdu Standard",
      subtitle: "Most Popular Choice",
      price: "R3,625",
      period: "/month",
      upfront: "R19,995 upfront",
      description: "Comprehensive tech education for career changers",
      features: [
        "6-12 month courses",
        "Industry certifications",
        "Real-world projects",
        "Weekly live sessions",
        "Job placement assistance",
        "Lifetime access to materials",
        "Community support",
        "Internship opportunities"
      ],
      popular: true,
      color: "border-emerald-500 ring-2 ring-emerald-100"
    },
    {
      name: "Premium Plus",
      subtitle: "Advanced Professional",
      price: "R5,599",
      period: "/month",
      upfront: "R30,000 upfront",
      description: "Advanced courses for leadership roles",
      features: [
        "6-month intensive program",
        "PMP Certification",
        "1-on-1 mentoring",
        "Advanced methodologies",
        "Executive networking",
        "Career coaching",
        "Priority job placement",
        "Continuing education credits"
      ],
      popular: false,
      color: "border-gray-200"
    }
  ];

  const getDisplayPrice = (price: string) => {
    return convertPrice(price, currency);
  };

  const getCountryFlag = (countryCode: string) => {
    const flags: { [key: string]: string } = {
      'ZA': '🇿🇦',
      'ZW': '🇿🇼'
    };
    return flags[countryCode] || '🌍';
  };

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="h-5 w-5 text-emerald-600" />
            {loading ? (
              <span className="text-sm text-gray-600">Detecting location...</span>
            ) : (
              <span className="text-sm text-gray-600">
                {getCountryFlag(country)} Prices shown in {currency}
              </span>
            )}
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Affordable Education for Everyone
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your goals and budget. All plans include 
            industry certifications and job placement assistance.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {pricingTiers.map((tier, index) => (
            <div 
              key={index}
              className={`relative p-8 rounded-2xl border-2 ${tier.color} bg-white hover:shadow-xl transition-all duration-300`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-emerald-500 text-white px-4 py-2 flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {tier.name}
                </h3>
                <p className="text-emerald-600 font-medium mb-4">
                  {tier.subtitle}
                </p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {getDisplayPrice(tier.price)}
                  </span>
                  <span className="text-gray-600">{tier.period}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  or {getDisplayPrice(tier.upfront)}
                </p>
                <p className="text-gray-600">
                  {tier.description}
                </p>
              </div>

              <div className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                className={`w-full ${
                  tier.popular 
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
                    : 'bg-gray-900 hover:bg-gray-800 text-white'
                }`}
                size="lg"
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center space-y-4">
          <p className="text-gray-600">
            🎓 All courses include industry-recognized certifications
          </p>
          <p className="text-gray-600">
            💼 85% job placement rate within 6 months of graduation
          </p>
          <p className="text-gray-600">
            🔄 Flexible payment plans available - contact us for custom options
          </p>
          {currency === 'USD' && (
            <p className="text-sm text-gray-500">
              * Prices converted from ZAR at rate of $1 = R17
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
