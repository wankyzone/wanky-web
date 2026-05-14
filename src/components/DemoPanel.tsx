export default function DemoPanel() {
  return (
    <div className="h-full w-full rounded-xl bg-gradient-to-br from-[#0f0f0f] to-[#1c1c1c] p-6 text-white">

      {/* Top Status Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-xs text-green-400 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          System Operational
        </div>
        <div className="text-xs text-slate-500">Live • Lagos</div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
          <p className="text-xs text-slate-400">Active Jobs</p>
          <p className="text-xl font-bold mt-1">128</p>
        </div>

        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
          <p className="text-xs text-slate-400">Runners</p>
          <p className="text-xl font-bold mt-1">54</p>
        </div>

        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
          <p className="text-xs text-slate-400">Revenue</p>
          <p className="text-xl font-bold mt-1">₦1.2M</p>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="mt-6 space-y-3">
        <div className="flex justify-between text-xs text-slate-400">
          <span>New delivery assigned</span>
          <span>2s ago</span>
        </div>
        <div className="flex justify-between text-xs text-slate-400">
          <span>Runner reached pickup</span>
          <span>10s ago</span>
        </div>
        <div className="flex justify-between text-xs text-slate-400">
          <span>Payment confirmed</span>
          <span>25s ago</span>
        </div>
      </div>

      {/* Map / Visualization Placeholder */}
      <div className="mt-6 h-40 rounded-lg bg-black/30 border border-white/10 flex items-center justify-center text-slate-500 text-sm">
        Live Map / Activity Feed (coming soon)
      </div>

    </div>
  );
}