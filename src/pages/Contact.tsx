import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Mail, Clock, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback. We will respond within 3-5 business days.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <Layout>
      {/* Page Header */}
      <section className="bg-secondary/30 py-8 border-b">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-2xl md:text-3xl font-bold">Contact Us</h1>
          <p className="text-muted-foreground mt-1">
            Get in touch with the NEIP support team
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Information */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-card border rounded-lg p-6">
                  <h2 className="font-semibold mb-4">Contact Information</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">Office Address</h3>
                        <p className="text-sm text-muted-foreground">
                          National Enrolment Intelligence Portal<br />
                          Ministry of Electronics & IT<br />
                          New Delhi - 110001
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">Email</h3>
                        <p className="text-sm text-muted-foreground">
                          support@neip.gov.in
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">Helpline</h3>
                        <p className="text-sm text-muted-foreground">
                          1800-XXX-XXXX (Toll Free)
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">Office Hours</h3>
                        <p className="text-sm text-muted-foreground">
                          Monday - Friday<br />
                          9:00 AM - 6:00 PM IST
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feedback Form */}
              <div className="lg:col-span-2">
                <div className="bg-card border rounded-lg p-6">
                  <h2 className="font-semibold mb-4">Submit Feedback</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Have questions, suggestions, or need assistance? Fill out the form below
                    and our team will respond within 3-5 business days.
                  </p>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Full Name <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Email Address <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Subject <span className="text-destructive">*</span>
                      </label>
                      <select
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="technical">Technical Support</option>
                        <option value="data">Data Query</option>
                        <option value="feedback">Feedback/Suggestion</option>
                        <option value="bug">Report an Issue</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Message <span className="text-destructive">*</span>
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                        placeholder="Describe your query or feedback..."
                      />
                    </div>
                    
                    <Button type="submit" className="w-full md:w-auto">
                      <Send className="w-4 h-4 mr-2" />
                      Submit Feedback
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
