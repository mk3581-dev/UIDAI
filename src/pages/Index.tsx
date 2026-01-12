import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { ArrowRight, Database, BarChart3, Bot, Shield, FileText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Database,
    title: "Verified Data Sources",
    description: "Access enrolment statistics from authenticated government datasets with full transparency.",
  },
  {
    icon: Bot,
    title: "AI-Powered Analytics",
    description: "Query complex data using natural language through Chip, our intelligent assistant.",
  },
  {
    icon: BarChart3,
    title: "Interactive Dashboards",
    description: "Visualize enrolment trends, state-wise statistics, and biometric success rates.",
  },
  {
    icon: Shield,
    title: "Privacy-Aware Design",
    description: "No personal identification data is displayed. Analytics focus on aggregate statistics.",
  },
  {
    icon: FileText,
    title: "Exportable Reports",
    description: "Generate and download detailed reports in CSV and PDF formats for offline analysis.",
  },
  {
    icon: Users,
    title: "Citizen-Centric",
    description: "Designed for transparency and accessibility, enabling informed decision-making.",
  },
];

const stats = [
  { value: "18.6M+", label: "Enrolments Processed" },
  { value: "94.2%", label: "Success Rate" },
  { value: "36", label: "States & UTs Covered" },
  { value: "24/7", label: "Data Availability" },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary/50 to-background py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Official Government Portal
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight animate-fade-in">
              Making Enrolment Data Transparent, Explainable, and Accessible
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Query national enrolment statistics using verified datasets and AI-assisted analytics. 
              Designed for citizens, administrators, and policymakers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-base">
                <Link to="/assistant">
                  <Bot className="w-5 h-5 mr-2" />
                  Open AI Assistant
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base">
                <Link to="/dashboard">
                  View Enrolment Dashboard
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Portal Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A comprehensive platform designed to provide transparent access to national enrolment data 
              while ensuring data credibility and user privacy.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div 
                key={feature.title} 
                className="p-6 bg-card border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-alt py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Explore Enrolment Data?
            </h2>
            <p className="text-muted-foreground mb-8">
              Start with our AI-powered assistant for quick insights or dive into the detailed dashboard 
              for comprehensive analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/assistant">
                  Ask Chip a Question
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/data-sources">
                  Learn About Our Data
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Notice Banner */}
      <section className="bg-accent/10 border-t border-b border-accent/20 py-4">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-center gap-3 text-sm">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <p>
              <strong>Notice:</strong> This portal provides analytics based on verified enrolment datasets. 
              All data is aggregated and anonymized.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
