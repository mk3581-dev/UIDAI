import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const stateData = [
  { state: "Maharashtra", enrolments: 2850000 },
  { state: "Uttar Pradesh", enrolments: 2640000 },
  { state: "Bihar", enrolments: 1980000 },
  { state: "Karnataka", enrolments: 1750000 },
  { state: "Tamil Nadu", enrolments: 1620000 },
];

const monthlyData = [
  { month: "Jan", registrations: 245000 },
  { month: "Feb", registrations: 268000 },
  { month: "Mar", registrations: 312000 },
  { month: "Apr", registrations: 298000 },
  { month: "May", registrations: 342000 },
  { month: "Jun", registrations: 385000 },
  { month: "Jul", registrations: 356000 },
  { month: "Aug", registrations: 378000 },
  { month: "Sep", registrations: 402000 },
  { month: "Oct", registrations: 425000 },
  { month: "Nov", registrations: 398000 },
  { month: "Dec", registrations: 445000 },
];

const successRateData = [
  { name: "Successful", value: 94.2, color: "hsl(142, 45%, 35%)" },
  { name: "Failed", value: 5.8, color: "hsl(0, 65%, 50%)" },
];

const EnrolmentCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Bar Chart - Top States */}
      <div className="bg-card border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Top 5 States by Enrolment</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={stateData} layout="vertical" margin={{ left: 80 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
            <YAxis type="category" dataKey="state" tick={{ fontSize: 12 }} />
            <Tooltip 
              formatter={(value: number) => [value.toLocaleString(), "Enrolments"]}
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px"
              }}
            />
            <Bar dataKey="enrolments" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart - Monthly Trend */}
      <div className="bg-card border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Registrations Over Time (Monthly)</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={(v) => `${(v / 1000)}K`} />
            <Tooltip 
              formatter={(value: number) => [value.toLocaleString(), "Registrations"]}
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px"
              }}
            />
            <Line 
              type="monotone" 
              dataKey="registrations" 
              stroke="hsl(var(--chart-1))" 
              strokeWidth={2}
              dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart - Success Rate */}
      <div className="bg-card border rounded-lg p-6 lg:col-span-2">
        <h3 className="text-lg font-semibold mb-4">Biometric Authentication Rate</h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <ResponsiveContainer width={280} height={280}>
            <PieChart>
              <Pie
                data={successRateData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={2}
                dataKey="value"
              >
                {successRateData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value}%`, ""]}
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px"
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="space-y-4">
            {successRateData.map((item) => (
              <div key={item.name} className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-sm" 
                  style={{ backgroundColor: item.color }}
                />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-2xl font-bold">{item.value}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrolmentCharts;
