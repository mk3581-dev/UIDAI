import { useMemo, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Download, Filter, FileText, Table } from "lucide-react";
import { toast } from "sonner";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Papa from "papaparse";

type StateRow = {
  state: string;
  district?: string;
  enrolments: number;
  successRate: number;
  failureRate: number;
  yoyGrowth: string;
  year: number;
};

const DATA: StateRow[] = [
  { state: "Maharashtra", enrolments: 2850000, successRate: 94.2, failureRate: 5.8, yoyGrowth: "+8.5%", year: 2026 },
  { state: "Uttar Pradesh", enrolments: 2640000, successRate: 93.8, failureRate: 6.2, yoyGrowth: "+7.2%", year: 2026 },
  { state: "Bihar", enrolments: 1980000, successRate: 92.5, failureRate: 7.5, yoyGrowth: "+9.1%", year: 2026 },
  { state: "Karnataka", enrolments: 1750000, successRate: 95.0, failureRate: 5.0, yoyGrowth: "+6.8%", year: 2026 },
  { state: "Tamil Nadu", enrolments: 1620000, successRate: 94.8, failureRate: 5.2, yoyGrowth: "+5.9%", year: 2026 },
  // add older years for filtering demonstration
  { state: "Maharashtra", enrolments: 2600000, successRate: 92.0, failureRate: 8.0, yoyGrowth: "+6.0%", year: 2025 },
  { state: "Uttar Pradesh", enrolments: 2460000, successRate: 91.5, failureRate: 8.5, yoyGrowth: "+5.4%", year: 2025 },
];

// Make the dataset editable by importing additional CSVs
const [data, setData] = useState<StateRow[]>(DATA);
const uniqueStates = useMemo(() => ["All States", ...Array.from(new Set(data.map((d) => d.state)))], [data]);
const uniqueYears = useMemo(() => Array.from(new Set(data.map((d) => d.year))).sort((a, b) => b - a), [data]);

const Analytics = () => {
  const [stateFilter, setStateFilter] = useState<string>("All States");
  const [yearFilter, setYearFilter] = useState<number>(uniqueYears[0] || new Date().getFullYear());

  const filteredData = useMemo(() => {
    return DATA.filter((row) => {
      if (stateFilter !== "All States" && row.state !== stateFilter) return false;
      if (yearFilter && row.year !== yearFilter) return false;
      return true;
    });
  }, [stateFilter, yearFilter]);

  const handleApplyFilters = () => {
    toast.success("Filters applied");
  };

  const generateCSV = (rows: StateRow[]) => {
    const header = ["State", "Year", "Total Enrolments", "Success Rate", "Failure Rate", "YoY Growth"];
    const csv = [header.join(",")]
      .concat(
        rows.map((r) => [r.state, r.year.toString(), r.enrolments.toString(), `${r.successRate}%`, `${r.failureRate}%`, r.yoyGrowth].join(","))
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `enrolment-report-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleExportCSV = () => {
    if (filteredData.length === 0) {
      toast.error("No data to export for the selected filters");
      return;
    }
    generateCSV(filteredData);
    toast.success("CSV export started");
  };

  const handleGeneratePDF = async () => {
    if (filteredData.length === 0) {
      toast.error("No data to export for the selected filters");
      return;
    }

    try {
      const doc = new jsPDF();
      doc.setFontSize(14);
      doc.text("Enrolment Report", 14, 20);

      const columns = ["State", "Year", "Total Enrolments", "Success Rate", "Failure Rate", "YoY Growth"];
      const rows = filteredData.map((r) => [r.state, r.year.toString(), r.enrolments.toLocaleString(), `${r.successRate}%`, `${r.failureRate}%`, r.yoyGrowth]);

      // @ts-ignore - autoTable has slightly different typings in some versions
      autoTable(doc, {
        startY: 28,
        head: [columns],
        body: rows,
        styles: { fontSize: 10 },
      });

      doc.save(`enrolment-report-${Date.now()}.pdf`);
      toast.success("PDF generated and downloaded");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate PDF");
    }
  };

  const handleImportFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    let added = 0;

    const normalizeNumber = (v: any) => {
      if (v == null) return 0;
      const n = Number(String(v).replace(/[^0-9.-]/g, ""));
      return Number.isNaN(n) ? 0 : n;
    };

    Array.from(files).forEach((file) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        worker: true,
        complete: (results: any) => {
          const parsed: StateRow[] = (results.data || []).map((row: any) => {
            const state = row.state || row.State || row["State/UT"] || row.state_name || "";
            const year = Number(row.year || row.Year || new Date().getFullYear());
            const enrolments = normalizeNumber(row.enrolments || row.enrolment || row.total || row.Total || row.Enrolments);
            const successRate = Number(String(row.successRate || row["Success Rate"] || row.success || "").replace("%", "")) || 0;
            const failureRate = Number(String(row.failureRate || row["Failure Rate"] || row.failure || "").replace("%", "")) || 0;
            const yoyGrowth = String(row.yoyGrowth || row["YoY Growth"] || "+0%");
            return { state, enrolments, successRate, failureRate, yoyGrowth, year } as StateRow;
          }).filter((r) => r.state);

          if (parsed.length) {
            setData((prev) => [...prev, ...parsed]);
            added += parsed.length;
            toast.success(`Imported ${parsed.length} rows from ${file.name}`);
          } else {
            toast.error(`No valid rows found in ${file.name}`);
          }
        },
        error: (err) => {
          console.error(err);
          toast.error(`Failed parsing ${file.name}`);
        },
      });
    });
  };

  return (
    <Layout>
      {/* Page Header */}
      <section className="bg-secondary/30 py-8 border-b">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Analytics & Reports</h1>
              <p className="text-muted-foreground mt-1">
                Generate detailed reports with customizable filters and export options
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleExportCSV}>
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button size="sm" onClick={handleGeneratePDF}>
                <FileText className="w-4 h-4 mr-2" />
                Generate PDF
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-primary" />
            <h2 className="font-semibold">Filters</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)} className="w-full px-3 py-2 border rounded-md bg-background">
                {uniqueStates.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">District</label>
              <select className="w-full px-3 py-2 border rounded-md bg-background">
                <option>All Districts</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Year</label>
              <select value={yearFilter} onChange={(e) => setYearFilter(Number(e.target.value))} className="w-full px-3 py-2 border rounded-md bg-background">
                {uniqueYears.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end space-x-2">
              <input id="file-input" type="file" accept=".csv" multiple className="hidden" onChange={(e) => handleImportFiles(e.target.files)} />
              <label htmlFor="file-input" className="w-1/2">
                <Button className="w-full" variant="ghost" size="sm">Import CSV</Button>
              </label>
              <div className="w-1/2">
                <Button className="w-full" onClick={handleApplyFilters}>Apply Filters</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Report Sections */}
      <section className="py-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="space-y-8">
            {/* State-wise Analysis */}
            <div className="bg-card border rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Table className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">State-wise Enrolment Analysis</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium">State</th>
                      <th className="text-right px-4 py-3 font-medium">Total Enrolments</th>
                      <th className="text-right px-4 py-3 font-medium">Success Rate</th>
                      <th className="text-right px-4 py-3 font-medium">Failure Rate</th>
                      <th className="text-right px-4 py-3 font-medium">YoY Growth</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredData.map((r, i) => (
                      <tr key={`${r.state}-${i}`}>
                        <td className="px-4 py-3">{r.state}</td>
                        <td className="text-right px-4 py-3">{r.enrolments.toLocaleString()}</td>
                        <td className="text-right px-4 py-3 text-success">{r.successRate}%</td>
                        <td className="text-right px-4 py-3">{r.failureRate}%</td>
                        <td className="text-right px-4 py-3 text-success">{r.yoyGrowth}</td>
                      </tr>
                    ))}
                    {filteredData.length === 0 && (
                      <tr>
                        <td colSpan={5} className="text-center py-6 text-muted-foreground">No results for the selected filters.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Year-on-Year Trends */}
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Year-on-Year Trends</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-3xl font-bold text-primary">+8.2%</p>
                  <p className="text-sm text-muted-foreground">Enrolment Growth</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-3xl font-bold text-success">-0.4%</p>
                  <p className="text-sm text-muted-foreground">Failure Rate Reduction</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-3xl font-bold text-primary">+12%</p>
                  <p className="text-sm text-muted-foreground">Processing Efficiency</p>
                </div>
              </div>
            </div>

            {/* Biometric Insights */}
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Biometric Success vs Failure Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Common Failure Reasons</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between py-2 border-b">
                      <span>Fingerprint quality issues</span>
                      <span className="font-medium">42%</span>
                    </li>
                    <li className="flex justify-between py-2 border-b">
                      <span>Iris scan failures</span>
                      <span className="font-medium">28%</span>
                    </li>
                    <li className="flex justify-between py-2 border-b">
                      <span>Environmental factors</span>
                      <span className="font-medium">18%</span>
                    </li>
                    <li className="flex justify-between py-2">
                      <span>Hardware/software issues</span>
                      <span className="font-medium">12%</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Improvement Recommendations</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Regular calibration of biometric devices</li>
                    <li>• Operator training for fingerprint capture</li>
                    <li>• Environmental controls at enrolment centres</li>
                    <li>• Multi-modal biometric backup options</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Analytics;
