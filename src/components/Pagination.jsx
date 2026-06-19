import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({ page, setPage, isPreviousData }) => (
  <div className="flex justify-center items-center gap-3 mt-14">
    <button
      onClick={() => setPage((p) => Math.max(p - 1, 1))}
      disabled={page === 1}
      className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
    >
      <ChevronLeft size={16} />
      Prev
    </button>

    <div className="flex items-center gap-1.5">
      <span className="w-9 h-9 flex items-center justify-center rounded-xl bg-indigo-600 text-white text-sm font-bold shadow-md shadow-indigo-600/30">
        {page}
      </span>
    </div>

    <button
      onClick={() => setPage((p) => p + 1)}
      disabled={isPreviousData}
      className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
    >
      Next
      <ChevronRight size={16} />
    </button>
  </div>
);
