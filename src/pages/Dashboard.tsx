import Layout from "@/components/layout/Layout";
import StatCard from "@/components/dashboard/StatCard";
import EnrolmentCharts from "@/components/dashboard/EnrolmentCharts";
import { Users, CheckCircle, XCircle, Percent, TrendingUp, Calendar } from "lucide-react";

const Dashboard = () => {
  return (
    <Layout>
      {/* Page Header */}
      <section className="bg-secondary/30 py-8 border-b">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Enrolment Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                High-level national statistics and enrolment trends at a glance
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Last updated: January 12, 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Cards */}
      <section className="py-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Enrolments Processed"
              value={18640000}
              caption="Cumulative enrolments across all states"
              icon={Users}
              trend="up"
              trendValue="8.2%"
            />
            <StatCard
              title="Successful Authentications"
              value={17554880}
              caption="Biometric verifications completed"
              icon={CheckCircle}
              trend="up"
              trendValue="7.5%"
            />
            <StatCard
              title="Failed Authentications"
              value={1085120}
              caption="Requires re-verification"
              icon={XCircle}
              trend="down"
              trendValue="2.1%"
            />
            <StatCard
              title="Overall Failure Rate"
              value="5.8%"
              caption="National average failure rate"
              icon={Percent}
              trend="neutral"
              trendValue="0.3%"
            />
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="py-8 section-alt">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Analytics Overview</h2>
          </div>
          <EnrolmentCharts />
        </div>
      </section>

      {/* Data Notes */}
      <section className="py-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="bg-card border rounded-lg p-6">
            <h3 className="font-semibold mb-3">Data Notes</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• All statistics are computed from official enrolment records and authentication logs.</li>
              <li>• Failure rates include fingerprint quality issues, iris scan failures, and environmental factors.</li>
              <li>• Monthly data reflects registrations processed through authorized enrolment centres.</li>
              <li>• State-wise figures are based on the registered address of enrolees.</li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
