import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { ProductCard, ProductSkeleton } from "./ProductCard";
import { Pagination } from "./Pagination";
import { Search, SlidersHorizontal } from "lucide-react";

const ProductSection = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useProducts(page, search);
  const isLastPage = page >= (data?.totalPages || 1);

  return (
    <section id="products" className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-2">
              Our Collection
            </p>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Featured Products
            </h2>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
            />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all"
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>

        {/* Results count */}
        {!isLoading && data?.products.length > 0 && (
          <p className="text-sm text-slate-400 dark:text-slate-500 mb-6">
            Showing{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {data.products.length}
            </span>{" "}
            products {search && `for "${search}"`}
          </p>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 min-h-[400px]">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
          ) : data?.products.length > 0 ? (
            data.products.map((p) => <ProductCard key={p.id} product={p} />)
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-4">
                <Search size={24} className="text-slate-300 dark:text-slate-600" />
              </div>
              <p className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-1">
                No products found
              </p>
              <p className="text-sm text-slate-400 dark:text-slate-500">
                Try different keywords or browse all products
              </p>
            </div>
          )}
        </div>

        {!isLoading && data?.products.length > 0 && (
          <Pagination page={page} setPage={setPage} isPreviousData={isLastPage} />
        )}
      </div>
    </section>
  );
};

export default ProductSection;
