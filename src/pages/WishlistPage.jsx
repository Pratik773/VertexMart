import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../features/wishlistSlice";
import { addToCart } from "../features/cartSlice";
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const WishlistPage = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/"
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-rose-300 dark:hover:border-rose-500/40 hover:text-rose-500 transition-all"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Wishlist
            </h2>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">
              {wishlistItems.length} saved{" "}
              {wishlistItems.length === 1 ? "item" : "items"}
            </p>
          </div>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="w-20 h-20 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center mb-5 shadow-sm">
              <Heart size={32} className="text-slate-300 dark:text-slate-600" />
            </div>
            <p className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">
              Your wishlist is empty
            </p>
            <p className="text-slate-400 dark:text-slate-500 text-sm mb-6">
              Save products you love for later
            </p>
            <Link
              to="/"
              className="px-6 py-2.5 bg-rose-500 text-white rounded-xl font-semibold text-sm hover:bg-rose-400 transition-colors shadow-lg shadow-rose-500/20"
            >
              Discover Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {wishlistItems.map((item) => {
              const inCart = cartItems.some((c) => c.id === item.id);
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-white/5 rounded-2xl hover:border-slate-200 dark:hover:border-white/10 transition-colors group"
                >
                  <div className="w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-700/50">
                    <img
                      src={item.image}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      alt={item.name}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm truncate">
                      {item.name}
                    </h3>
                    <p className="text-indigo-600 dark:text-indigo-400 font-bold text-sm mt-0.5">
                      ₹{item.price?.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => dispatch(addToCart(item))}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-semibold text-xs transition-all ${
                        inCart
                          ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30"
                          : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-600/20"
                      }`}
                    >
                      <ShoppingCart size={13} />
                      {inCart ? "In Cart" : "Add to Cart"}
                    </button>
                    <button
                      onClick={() => dispatch(removeFromWishlist(item.id))}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
