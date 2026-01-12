import Layout from "@/components/layout/Layout";
import { Target, Brain, Lock, Scale } from "lucide-react";

const About = () => {
  return (
    <Layout>
      {/* Page Header */}
      <section className="bg-secondary/30 py-8 border-b">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-2xl md:text-3xl font-bold">About the Portal</h1>
          <p className="text-muted-foreground mt-1">
            Understanding the purpose and principles behind NEIP
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Mission */}
            <div className="prose prose-slate max-w-none">
              <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                The National Enrolment Intelligence Portal (NEIP) is designed to improve transparency
                in enrolment systems, enable data-driven policy decisions, and provide citizens and
                administrators with clear, accessible insights into national enrolment data.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                By combining verified government datasets with AI-powered analytics, we aim to
                make complex enrolment statistics understandable and actionable for all stakeholders.
              </p>
            </div>

            {/* Core Objectives */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border rounded-lg p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Improve Transparency</h3>
                <p className="text-sm text-muted-foreground">
                  Making enrolment data accessible and understandable for citizens, researchers,
                  and policymakers alike.
                </p>
              </div>
              
              <div className="bg-card border rounded-lg p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Enable Data-Driven Decisions</h3>
                <p className="text-sm text-muted-foreground">
                  Providing accurate analytics that support evidence-based policy formulation
                  and program evaluation.
                </p>
              </div>
              
              <div className="bg-card border rounded-lg p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Privacy-Aware Design</h3>
                <p className="text-sm text-muted-foreground">
                  No personal identification is displayed. All analytics focus on aggregate
                  statistics and anonymized trends.
                </p>
              </div>
              
              <div className="bg-card border rounded-lg p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Scale className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Responsible AI Usage</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI assistant provides explainable, fact-based responses without
                  generating synthetic or speculative data.
                </p>
              </div>
            </div>

            {/* Architecture */}
            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Technical Architecture</h2>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  The portal employs a <strong className="text-foreground">hybrid architecture</strong> that
                  combines rule-based analytics with AI-powered natural language processing:
                </p>
                <ul className="space-y-2 pl-4">
                  <li>• <strong className="text-foreground">Rule-Based Engine:</strong> Handles structured
                  queries, statistical computations, and data validation</li>
                  <li>• <strong className="text-foreground">AI Layer:</strong> Interprets natural language
                  queries and generates human-readable explanations</li>
                  <li>• <strong className="text-foreground">Data Pipeline:</strong> Secure ingestion and
                  processing of enrolment records with full audit trails</li>
                </ul>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-2">Important Notice</h2>
              <p className="text-sm text-muted-foreground">
                This portal is a <strong className="text-foreground">prototype</strong> developed for
                analytical and research purposes. While we strive for accuracy, users should verify
                critical information through official government channels. The portal does not replace
                official records or documentation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
