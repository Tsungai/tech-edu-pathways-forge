
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useGeolocation } from "@/hooks/useGeolocation";
import { Skeleton } from "@/components/ui/skeleton";

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  });
  const { toast } = useToast();
  const { country, loading } = useGeolocation();
  
  const contactInfo = {
    ZW: {
      phone: "+263 78 209 2695",
      address: "15 Bedford Court, Corner Leopold Takawira and Josiah Chinamano, Avenues, Harare, Zimbabwe"
    },
    ZA: {
      phone: "+27 76 835 3089",
      address: "31 Landsborough, Robertsham, South Africa"
    }
  };
  
  const currentContactInfo = contactInfo[country as 'ZW' | 'ZA'] || contactInfo.ZA;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to prospective_users table
      const { error: dbError } = await supabase.from("prospective_users").insert({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        course_interest: formData.course,
        message: formData.message,
      });

      if (dbError) throw dbError;

      // Also send notification email
      await supabase.functions.invoke("send-contact-form", {
        body: formData,
      });

      toast({
        title: "Application submitted!",
        description: "Our admissions team will contact you soon.",
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        course: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary-foreground mb-4">
            Ready to Start Your Tech Journey?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get in touch with our admissions team to learn more about our courses 
            and find the perfect program for your career goals.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border-0 shadow-2xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Apply Now
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    First Name
                  </label>
                    <Input
                      required
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Last Name
                  </label>
                    <Input
                      required
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <Input
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+27 XX XXX XXXX"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Course Interest
                  </label>
                  <select
                    required
                    value={formData.course}
                    onChange={(e) =>
                      setFormData({ ...formData, course: e.target.value })
                    }
                    className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground"
                  >
                    <option value="">Select a course</option>
                    <option>Introduction to Tech</option>
                    <option>Software Engineering</option>
                    <option>Web Development</option>
                    <option>IT Support</option>
                    <option>Product Manager/Owner</option>
                    <option>CodeStars (Under 18)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell us about your goals and any questions you have..."
                    rows={4}
                  />
                </div>
                
                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-primary-foreground mb-6">
                Get in Touch
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-primary-foreground mb-1">Email Us</h4>
                    <p className="text-muted-foreground">tsungaikatsuro@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-primary-foreground mb-1">Call Us</h4>
                    {loading ? (
                      <Skeleton className="h-5 w-40 mb-1" />
                    ) : (
                      <p className="text-muted-foreground">{currentContactInfo.phone}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-primary-foreground mb-1">Location</h4>
                    {loading ? (
                      <>
                        <Skeleton className="h-5 w-64 mb-1" />
                        <Skeleton className="h-5 w-48" />
                      </>
                    ) : (
                      <p className="text-muted-foreground">{currentContactInfo.address}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-primary-foreground mb-1">Support Hours</h4>
                    <p className="text-muted-foreground">Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p className="text-muted-foreground">Saturday: 9:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <Card className="bg-primary border-0 text-primary-foreground">
              <CardContent className="p-8 text-center">
                <h4 className="text-xl font-bold mb-4">
                  Start Your Application Today
                </h4>
                <p className="mb-6 opacity-90">
                  Join hundreds of students who have transformed their careers with TechEdu Academy.
                </p>
                <Button variant="secondary" size="lg">
                  Download Brochure
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
