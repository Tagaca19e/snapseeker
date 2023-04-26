export default function ProductDetails() {
  return (
    <div className="w-full max-w-4xl rounded-md border border-blue-300 bg-white p-4 shadow">
      <div className="flex animate-pulse flex-col gap-3 sm:flex-row">
        <div>
          <div className="h-[400px] w-[400px] rounded-md bg-slate-200"></div>
          <div className="mt-4 flex gap-4">
            <div className="h-20 w-20 rounded bg-slate-200"></div>
            <div className="h-20 w-20 rounded bg-slate-200"></div>
            <div className="h-20 w-20 rounded bg-slate-200"></div>
          </div>
        </div>
        <div className="flex-1 space-y-6 space-x-0">
          <div className="h-3 rounded bg-slate-200"></div>
          <div className="h-3 w-28 rounded bg-slate-200"></div>
          <div className="h-3 w-24 rounded bg-slate-200"></div>

          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 h-2 rounded bg-slate-200"></div>
              <div className="col-span-1 h-2 rounded bg-slate-200"></div>
            </div>
            <div className="h-2 rounded bg-slate-200"></div>
            <div className="h-2 rounded bg-slate-200"></div>
            <div className="h-2 rounded bg-slate-200"></div>
            <div className="h-2 rounded bg-slate-200"></div>
          </div>
          <div className="h-8 w-24 rounded bg-slate-200"></div>
          <div className="grid grid-cols-4 gap-4">
            <div className="h-8 rounded-full bg-slate-200"></div>
            <div className="h-8 rounded-full bg-slate-200"></div>
          </div>
          <div className="h-6 rounded-md bg-slate-200"></div>
          <div className="h-6 rounded-md bg-slate-200"></div>
        </div>
      </div>
    </div>
  );
}
