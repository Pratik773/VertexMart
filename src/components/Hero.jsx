import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    const element = document.getElementById("products");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/products");
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 text-white py-36 px-6 flex flex-col items-center">
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="relative max-w-4xl text-center z-10">
        {/* Eyebrow label */}
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-6 tracking-wide">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          New arrivals every week
        </span>

        <h1 className="text-6xl sm:text-7xl font-extrabold leading-tight tracking-tight mb-6">
          Shop the Future at{" "}
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            VertexMart
          </span>
        </h1>

        <p className="text-slate-300 text-xl leading-relaxed max-w-2xl mx-auto mb-10">
          Premium electronics and cutting-edge gadgets, curated for those who
          live ahead of the curve.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleExplore}
            className="group relative px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-lg transition-all duration-300 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Explore Products</span>
          </button>
          <button
            onClick={() => navigate("/wishlist")}
            className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white rounded-xl font-semibold text-lg transition-all duration-300 backdrop-blur-sm"
          >
            View Wishlist
          </button>
        </div>

        {/* Trust bar */}
        <div className="mt-14 flex flex-wrap justify-center gap-8 text-slate-400 text-sm font-medium">
          {["Free Shipping over ₹999", "Easy 30-day Returns", "Secure Payments", "24/7 Support"].map(
            (item) => (
              <span key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                {item}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
