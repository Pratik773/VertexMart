import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { toggleWishlist } from "../features/wishlistSlice";
import { Heart, ShoppingCart } from "lucide-react";

// Skeleton loader
export const ProductSkeleton = () => (
  <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-white/5 overflow-hidden">
    <div className="animate-pulse">
      <div className="h-52 bg-slate-200 dark:bg-slate-700/50" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-slate-200 dark:bg-slate-700/50 rounded-lg w-3/4" />
        <div className="h-4 bg-slate-200 dark:bg-slate-700/50 rounded-lg w-1/3" />
        <div className="h-10 bg-slate-200 dark:bg-slate-700/50 rounded-xl mt-4" />
      </div>
    </div>
  </div>
);

export const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const cartItems = useSelector((state) => state.cart.items);
  const isWishlisted = wishlistItems.some((item) => item.id === product.id);
  const isInCart = cartItems.some((item) => item.id === product.id);

  return (
    <div className="group relative bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-white/5 overflow-hidden hover:border-indigo-200 dark:hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/5 transition-all duration-300">
      {/* Image area */}
      <div className="relative overflow-hidden bg-slate-50 dark:bg-slate-700/30 h-52">
        <img
          src={product.image}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          alt={product.name}
        />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Wishlist button */}
        <button
          onClick={() => dispatch(toggleWishlist(product))}
          className={`absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full shadow-md transition-all duration-200 hover:scale-110 active:scale-95 ${
            isWishlisted
              ? "bg-rose-500 text-white shadow-rose-500/30"
              : "bg-white/90 dark:bg-slate-800/90 text-slate-400 hover:text-rose-500"
          }`}
        >
          <Heart
            size={16}
            className={isWishlisted ? "fill-current" : ""}
          />
        </button>

        {/* In cart badge */}
        {isInCart && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded-full">
            In Cart
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-slate-900 dark:text-white text-sm leading-snug truncate mb-1">
          {product.name}
        </h3>
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 truncate">
          {product.category || "Electronics"}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400 tracking-tight">
            ₹{product.price?.toLocaleString("en-IN")}
          </p>
        </div>

        <button
          onClick={() => dispatch(addToCart(product))}
          className={`w-full mt-3 py-2.5 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm transition-all duration-200 active:scale-95 ${
            isInCart
              ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30 hover:bg-indigo-100 dark:hover:bg-indigo-500/20"
              : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-indigo-600 dark:hover:bg-indigo-100 shadow-sm"
          }`}
        >
          <ShoppingCart size={15} />
          {isInCart ? "Add Again" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};
