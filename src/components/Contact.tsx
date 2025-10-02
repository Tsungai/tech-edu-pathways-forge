
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const Contact = () => {
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
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    First Name
                  </label>
                    <Input placeholder="Enter your first name" />
                  </div>
                  <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Last Name
                  </label>
                    <Input placeholder="Enter your last name" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <Input type="email" placeholder="your.email@example.com" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <Input placeholder="+27 XX XXX XXXX" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Course Interest
                  </label>
                  <select className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground">
                    <option>Select a course</option>
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
                    placeholder="Tell us about your goals and any questions you have..."
                    rows={4}
                  />
                </div>
                
                <Button className="w-full" size="lg">
                  Submit Application
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
                    <p className="text-muted-foreground">admissions@techedu.academy</p>
                    <p className="text-muted-foreground">info@techedu.academy</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-primary-foreground mb-1">Call Us</h4>
                    <p className="text-muted-foreground">+27 11 XXX XXXX</p>
                    <p className="text-muted-foreground">WhatsApp: +27 XX XXX XXXX</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-primary-foreground mb-1">Location</h4>
                    <p className="text-muted-foreground">100% Online Learning</p>
                    <p className="text-muted-foreground">Serving all of South Africa</p>
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
