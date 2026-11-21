const App = () => {
  return (
    <main className="w-[360px] h-screen bg-[#0B0D0F] text-[#E8ECE9] flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 border-b border-[#272B2D]">
        <div>
          <h1 className="text-xl font-bold tracking-tight">
            longBall<span className="text-emerald-500">.</span>
          </h1>
          <p className="text-xs text-[#8B9290] mt-1">
            Your go-to football dashboard
          </p>
        </div>

        <button className="text-[#8B9290] hover:text-white transition-colors">
          ⚙
        </button>
      </header>

      {/* Matches toolbar */}
      <section className="px-5 pt-5 pb-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Today's Matches</h2>
          <span className="text-xs text-[#8B9290]">12 MATCHES</span>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mt-4">
          <button className="flex-1 bg-emerald-500 text-[#07110C] text-sm font-medium py-2 rounded-lg">
            All
          </button>

          <button className="flex-1 bg-[#151819] border border-[#272B2D] text-[#8B9290] text-sm py-2 rounded-lg hover:text-white transition-colors">
            Live
          </button>

          <button className="flex-1 bg-[#151819] border border-[#272B2D] text-[#8B9290] text-sm py-2 rounded-lg hover:text-white transition-colors">
            Pinned
          </button>
        </div>
      </section>

      {/* Match content will go here */}
      <div className="flex-1 overflow-y-auto px-5 pb-5">
      </div>
    </main>
  )
}

export default App
