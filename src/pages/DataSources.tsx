import Layout from "@/components/layout/Layout";
import { Database, FileCheck, Shield, AlertTriangle } from "lucide-react";

const DataSources = () => {
  return (
    <Layout>
      {/* Page Header */}
      <section className="bg-secondary/30 py-8 border-b">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-2xl md:text-3xl font-bold">Data Sources</h1>
          <p className="text-muted-foreground mt-1">
            Transparency about the datasets powering this portal
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Primary Sources */}
            <div className="bg-card border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Database className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Primary Data Sources</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                All analytics displayed on this portal are computed from the following official sources:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <FileCheck className="w-5 h-5 text-success mt-0.5" />
                  <div>
                    <h3 className="font-medium">Biometric Enrolment Records</h3>
                    <p className="text-sm text-muted-foreground">
                      Contains fingerprint and iris authentication data from authorized enrolment centres.
                      Includes success/failure status, timestamp, and location metadata.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <FileCheck className="w-5 h-5 text-success mt-0.5" />
                  <div>
                    <h3 className="font-medium">Demographic Enrolment Records</h3>
                    <p className="text-sm text-muted-foreground">
                      Aggregated demographic statistics including state, district, and date of enrolment.
                      No personally identifiable information is stored or displayed.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <FileCheck className="w-5 h-5 text-success mt-0.5" />
                  <div>
                    <h3 className="font-medium">Authentication Logs</h3>
                    <p className="text-sm text-muted-foreground">
                      System-level logs capturing authentication attempts, outcomes, and failure reasons
                      for quality improvement analysis.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Data Types */}
            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Types of Data Processed</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Biometric Data</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Fingerprint quality scores</li>
                    <li>• Iris scan results</li>
                    <li>• Authentication success/failure</li>
                    <li>• Device calibration status</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Demographic Data</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• State and district codes</li>
                    <li>• Enrolment timestamps</li>
                    <li>• Centre identifiers</li>
                    <li>• Processing status</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Transparency Statement */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h2 className="text-lg font-semibold mb-2">Transparency Statement</h2>
                  <p className="text-muted-foreground">
                    All analytics presented on this portal are computed directly from source datasets.
                    <strong className="text-foreground"> No synthetic data is generated.</strong> When data
                    is unavailable for a specific query, the system clearly indicates this limitation.
                    Our commitment is to provide accurate, verifiable, and explainable insights.
                  </p>
                </div>
              </div>
            </div>

            {/* Limitations */}
            <div className="bg-card border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-5 h-5 text-accent" />
                <h2 className="text-xl font-semibold">Known Limitations</h2>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Real-time data may have a processing delay of up to 24 hours.</li>
                <li>• Some remote districts may have incomplete records due to connectivity issues.</li>
                <li>• Historical data before 2020 may have varying levels of completeness.</li>
                <li>• Analytics are refreshed monthly; daily granularity is available for recent data only.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DataSources;
