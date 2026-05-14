export default function DemoPanel() {
  return (
    <div className="h-full w-full bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] p-6 text-white flex flex-col">

      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-xs text-green-400 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          System Operational
        </div>
        <div className="text-xs text-zinc-500">Live • Lagos</div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white/5 p-4 rounded-lg">
          <p className="text-xs text-zinc-400">Active Jobs</p>
          <p className="text-xl font-bold mt-1">128</p>
        </div>

        <div className="bg-white/5 p-4 rounded-lg">
          <p className="text-xs text-zinc-400">Runners</p>
          <p className="text-xl font-bold mt-1">54</p>
        </div>

        <div className="bg-white/5 p-4 rounded-lg">
          <p className="text-xs text-zinc-400">Revenue</p>
          <p className="text-xl font-bold mt-1">₦1.2M</p>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="mt-6 space-y-3 text-xs text-zinc-400">
        <div className="flex justify-between">
          <span>New delivery assigned</span>
          <span>2s ago</span>
        </div>
        <div className="flex justify-between">
          <span>Runner reached pickup</span>
          <span>10s ago</span>
        </div>
        <div className="flex justify-between">
          <span>Payment confirmed</span>
          <span>25s ago</span>
        </div>
      </div>

      {/* Bottom Visualization */}
      <div className="mt-auto pt-6">
        <div className="h-36 rounded-lg bg-black/40 flex items-center justify-center text-zinc-500 text-sm">
          Live Map / Activity Feed (coming soon)
        </div>
      </div>

    </div>
  );
}