import Layout from "@/components/layout/Layout";
import ChatInterface from "@/components/assistant/ChatInterface";
import { Bot, Database, Shield, Zap } from "lucide-react";

const capabilities = [
  {
    icon: Database,
    title: "Data-Backed Responses",
    description: "All answers are derived from verified enrolment datasets",
  },
  {
    icon: Zap,
    title: "Natural Language Queries",
    description: "Ask questions in plain English without complex syntax",
  },
  {
    icon: Shield,
    title: "No Hallucinations",
    description: "Chip clearly states when data is unavailable",
  },
];

const Assistant = () => {
  return (
    <Layout>
      {/* Page Header */}
      <section className="bg-secondary/30 py-8 border-b">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
              <Bot className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Chip – Enrolment Intelligence Assistant</h1>
              <p className="text-muted-foreground mt-1">
                An AI-powered assistant that understands natural-language queries and provides 
                data-backed answers from verified enrolment datasets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-6 border-b">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {capabilities.map((cap) => (
              <div key={cap.title} className="flex items-start gap-3 p-4 bg-card rounded-lg border">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <cap.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">{cap.title}</h3>
                  <p className="text-xs text-muted-foreground">{cap.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chat Interface */}
      <section className="py-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <ChatInterface />
          </div>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="py-8 section-alt">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg font-semibold mb-4">Assistant Behaviour Guidelines</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium text-sm mb-2 text-success">What Chip Does</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>✓ Searches verified enrolment datasets</li>
                  <li>✓ Provides structured, factual responses</li>
                  <li>✓ Explains results in simple language</li>
                  <li>✓ Clearly states data limitations</li>
                </ul>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium text-sm mb-2 text-destructive">What Chip Avoids</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>✗ Generating synthetic or fake data</li>
                  <li>✗ Making predictions without evidence</li>
                  <li>✗ Providing personal identification info</li>
                  <li>✗ Speculating beyond available data</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Assistant;
