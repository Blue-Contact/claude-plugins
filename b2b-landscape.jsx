import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

const BLUE = "#2563EB";
const COLORS = ["#2563EB", "#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE", "#1E40AF", "#1D4ED8"];

const fmt = (n) => {
  if (n >= 1e9) return (n / 1e9).toFixed(1) + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
  return n.toLocaleString();
};

const fmtFull = (n) => Number(n).toLocaleString();

const stateData = [
  { state: "California", count: 8387292 },
  { state: "Florida", count: 7400094 },
  { state: "Texas", count: 6773188 },
  { state: "New York", count: 4556951 },
  { state: "Georgia", count: 2919950 },
  { state: "Pennsylvania", count: 2645060 },
  { state: "Ohio", count: 2487911 },
  { state: "New Jersey", count: 2290736 },
  { state: "Illinois", count: 2288243 },
  { state: "North Carolina", count: 2235249 },
  { state: "Arizona", count: 2142774 },
  { state: "Colorado", count: 2050894 },
  { state: "Virginia", count: 1892031 },
  { state: "Michigan", count: 1785074 },
];

const sizeData = [
  { size: "<10", count: 70306829, order: 1 },
  { size: "10–49", count: 1949072, order: 2 },
  { size: "50–199", count: 336708, order: 3 },
  { size: "200–499", count: 73492, order: 4 },
  { size: "500–999", count: 26083, order: 5 },
  { size: "1K–5K", count: 24516, order: 6 },
  { size: "5K–10K", count: 3784, order: 7 },
  { size: "10K+", count: 4078, order: 8 },
];

const revenueData = [
  { tier: "<$1M", count: 68867575, order: 1 },
  { tier: "$1–2M", count: 1548930, order: 2 },
  { tier: "$2–5M", count: 1054328, order: 3 },
  { tier: "$5–10M", count: 489949, order: 4 },
  { tier: "$10–50M", count: 449706, order: 5 },
  { tier: "$50–100M", count: 61834, order: 6 },
  { tier: "$100–500M", count: 52694, order: 7 },
  { tier: "$500M–1B", count: 7493, order: 8 },
  { tier: "$1B+", count: 9186, order: 9 },
];

const industryData = [
  { industry: "Business Services", count: 8152053 },
  { industry: "Engineering & Management", count: 4803562 },
  { industry: "Real Estate", count: 4004188 },
  { industry: "Health Services", count: 3717534 },
  { industry: "Special Trade Contractors", count: 2651909 },
  { industry: "Investment Offices", count: 2618313 },
  { industry: "Membership Orgs", count: 2462873 },
  { industry: "General Contractors", count: 2440374 },
];

const seniorityData = [
  { level: "Individual Contributor", count: 47683652, color: "#93C5FD" },
  { level: "Manager", count: 19683078, color: "#60A5FA" },
  { level: "C-Level", count: 6722336, color: "#2563EB" },
  { level: "Director", count: 5332890, color: "#3B82F6" },
  { level: "VP", count: 3916760, color: "#1D4ED8" },
  { level: "Other", count: 7335941, color: "#BFDBFE" },
  { level: "Board Member", count: 811721, color: "#1E40AF" },
];

const StatCard = ({ label, value, sub }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 text-center">
    <div className="text-3xl font-bold" style={{ color: BLUE }}>{value}</div>
    <div className="text-sm font-medium text-gray-700 mt-1">{label}</div>
    {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
  </div>
);

const CustomTooltip = ({ active, payload, label, valueLabel = "Companies" }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-3 py-2 rounded shadow-lg border border-gray-200 text-sm">
        <p className="font-medium text-gray-800">{label || payload[0].name}</p>
        <p style={{ color: BLUE }}>{valueLabel}: {fmtFull(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

export default function B2BDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="bg-gray-50 min-h-screen p-6 font-sans">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-2 h-8 rounded-full" style={{ background: BLUE }} />
          <h1 className="text-2xl font-bold text-gray-900">B2B Data Landscape</h1>
        </div>
        <p className="text-gray-500 text-sm ml-5">Blue Contact — Business Database Explorer</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="US Companies" value="76.1M" sub="Across all industries" />
        <StatCard label="Business Contacts" value="93.6M" sub="With job titles & seniority" />
        <StatCard label="Companies w/ Contacts" value="8.2M" sub="Contacts linked to companies" />
        <StatCard label="Top Industries" value="8+" sub="SIC-classified sectors" />
      </div>

      {/* Tab Nav */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {[
          { id: "overview", label: "Geographic Spread" },
          { id: "size", label: "Company Size" },
          { id: "revenue", label: "Revenue Tiers" },
          { id: "industry", label: "Top Industries" },
          { id: "contacts", label: "Contact Seniority" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "text-white shadow-sm"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
            }`}
            style={activeTab === tab.id ? { background: BLUE } : {}}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Charts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {activeTab === "overview" && (
          <>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Top 14 States by Company Count</h2>
            <ResponsiveContainer width="100%" height={420}>
              <BarChart data={stateData} layout="vertical" margin={{ left: 20, right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tickFormatter={fmt} tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="state" width={110} tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill={BLUE} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}

        {activeTab === "size" && (
          <>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Companies by Employee Count</h2>
            <ResponsiveContainer width="100%" height={420}>
              <BarChart data={sizeData} margin={{ bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="size" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={fmt} tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-gray-400 mt-3">92% of companies have fewer than 10 employees — the long tail of American small business.</p>
          </>
        )}

        {activeTab === "revenue" && (
          <>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Companies by Revenue Tier</h2>
            <ResponsiveContainer width="100%" height={420}>
              <BarChart data={revenueData} margin={{ bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="tier" tick={{ fontSize: 11 }} angle={-30} textAnchor="end" height={60} />
                <YAxis tickFormatter={fmt} tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#1D4ED8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-gray-400 mt-3">9,186 companies with $1B+ revenue. 449K in the $10–50M sweet spot.</p>
          </>
        )}

        {activeTab === "industry" && (
          <>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Industries (SIC Classification)</h2>
            <ResponsiveContainer width="100%" height={420}>
              <BarChart data={industryData} layout="vertical" margin={{ left: 30, right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tickFormatter={fmt} tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="industry" width={170} tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#60A5FA" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-gray-400 mt-3">Excludes 18.7M "Nonclassifiable Establishments" for clarity.</p>
          </>
        )}

        {activeTab === "contacts" && (
          <>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">93.6M Contacts by Seniority Level</h2>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <ResponsiveContainer width="100%" height={380}>
                <PieChart>
                  <Pie
                    data={seniorityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={150}
                    paddingAngle={2}
                    dataKey="count"
                    nameKey="level"
                    label={({ level, percent }) => `${level} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {seniorityData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip valueLabel="Contacts" />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-lg font-bold" style={{ color: BLUE }}>6.7M</div>
                <div className="text-xs text-gray-600">C-Level</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-lg font-bold" style={{ color: BLUE }}>3.9M</div>
                <div className="text-xs text-gray-600">VP-Level</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-lg font-bold" style={{ color: BLUE }}>5.3M</div>
                <div className="text-xs text-gray-600">Directors</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-lg font-bold" style={{ color: BLUE }}>19.7M</div>
                <div className="text-xs text-gray-600">Managers</div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 text-center text-xs text-gray-400">
        Data provided by Blue Contact — {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
      </div>
    </div>
  );
}
