export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="mb-8 text-4xl font-bold">CareerOps X</h1>
      <p className="mb-12 text-xl text-slate-400">Dashboard coming soon...</p>

      <div className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-2 text-xl font-semibold">Kanban Board</h2>
          <p className="text-sm text-slate-400">
            Drag-to-transition Kanban built with dnd-kit writing back to local
            SQLite.
          </p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-2 text-xl font-semibold">Scorecard Views</h2>
          <p className="text-sm text-slate-400">
            Full scorecard radar, gap analysis, and JD side-by-side view.
          </p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-2 text-xl font-semibold">Resume Diffing</h2>
          <p className="text-sm text-slate-400">
            Resume diff viewer with inline PDF preview via Next.js components.
          </p>
        </div>
      </div>
    </main>
  );
}
