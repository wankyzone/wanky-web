"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { name: 0, value: 240 },
  { name: 1, value: 285 },
  { name: 2, value: 260 },
  { name: 3, value: 330 },
  { name: 4, value: 305 },
  { name: 5, value: 365 },
  { name: 6, value: 340 },
  { name: 7, value: 410 },
  { name: 8, value: 380 },
  { name: 9, value: 450 },
  { name: 10, value: 420 },
  { name: 11, value: 480 },
];

export default function DemoPanel() {
  const [jobs, setJobs] = useState(128);
  const [runners, setRunners] = useState(54);
  const [revenue, setRevenue] = useState(1200000);

  useEffect(() => {
    const interval = setInterval(() => {
      setJobs((j) => j + Math.floor(Math.random() * 2));
      setRunners((r) => r + (Math.random() > 0.6 ? 1 : 0));
      setRevenue((rev) => rev + Math.floor(Math.random() * 8000));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] p-6 text-white flex flex-col">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <div className="text-xs text-green-400 flex items-center gap-2">
          <span className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
          System Operational
        </div>
        <div className="text-xs text-zinc-500">Live • Lagos</div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4">
        <Stat label="Active Jobs" value={jobs} />
        <Stat label="Runners" value={runners} />
        <Stat label="Revenue" value={`₦${(revenue / 1000000).toFixed(2)}M`} />
      </div>

      {/* CHART */}
      <div className="mt-6 h-24 w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ACTIVITY */}
      <div className="mt-6 text-xs text-zinc-400 space-y-2">
        <Activity text="New delivery assigned" age={12} />
        <Activity text="Runner reached pickup" age={8} />
        <Activity text="Payment confirmed" age={3} />
      </div>

      {/* FOOT */}
      <div className="mt-auto pt-6">
        <div className="h-32 bg-black/40 rounded-lg flex items-center justify-center text-zinc-500 text-sm">
          Live Map / Activity Feed (coming soon)
        </div>
      </div>
    </div>
  );
}

/* ===== COMPONENTS ===== */

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition">
      <p className="text-xs text-zinc-400">{label}</p>
      <p className="text-xl font-bold mt-1">{value}</p>
    </div>
  );
}

function Activity({ text, age }: { text: string; age: number }) {
  return (
    <div className="flex justify-between">
      <span>{text}</span>
      <span>{age}s ago</span>
    </div>
  );
}