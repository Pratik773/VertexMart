import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../features/cartSlice";
import { useState } from "react";
import PaymentModal from "../components/PaymentModal";
import { ShoppingCart, Trash2, CreditCard, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(0);

  const handleBuyNow = (amount) => {
    setSelectedAmount(amount);
    setIsModalOpen(true);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/"
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-indigo-300 dark:hover:border-indigo-500/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Shopping Cart
            </h2>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </p>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="w-20 h-20 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center mb-5 shadow-sm">
              <ShoppingCart size={32} className="text-slate-300 dark:text-slate-600" />
            </div>
            <p className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">
              Your cart is empty
            </p>
            <p className="text-slate-400 dark:text-slate-500 text-sm mb-6">
              Add some products to get started
            </p>
            <Link
              to="/"
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-white/5 rounded-2xl hover:border-slate-200 dark:hover:border-white/10 transition-colors"
                >
                  <div className="w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-700/50">
                    <img
                      src={item.image}
                      className="w-full h-full object-cover"
                      alt={item.name}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm truncate">
                      {item.name}
                    </h3>
                    <p className="text-indigo-600 dark:text-indigo-400 font-bold text-sm mt-0.5">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => dispatch(updateQuantity({ id: item.id, amount: -1 }))}
                      className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 font-bold text-sm transition-colors"
                    >
                      −
                    </button>
                    <span className="w-6 text-center font-bold text-sm text-slate-900 dark:text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => dispatch(updateQuantity({ id: item.id, amount: 1 }))}
                      className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 font-bold text-sm transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleBuyNow(item.price * item.quantity)}
                      className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold text-xs transition-colors shadow-sm shadow-indigo-600/20"
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-white/5 rounded-2xl p-6 sticky top-24">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-5">
                  Order Summary
                </h3>
                <div className="space-y-3 text-sm mb-5">
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      ₹{total.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>Shipping</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      {total >= 999 ? "Free" : "₹49"}
                    </span>
                  </div>
                  <div className="border-t border-slate-100 dark:border-white/10 pt-3 flex justify-between font-bold text-slate-900 dark:text-white text-base">
                    <span>Total</span>
                    <span>₹{(total + (total >= 999 ? 0 : 49)).toLocaleString("en-IN")}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleBuyNow(total + (total >= 999 ? 0 : 49))}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-indigo-600/25"
                >
                  <CreditCard size={16} />
                  Checkout
                </button>
                {total < 999 && (
                  <p className="text-xs text-center text-slate-400 dark:text-slate-500 mt-3">
                    Add ₹{(999 - total).toLocaleString("en-IN")} more for free shipping
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        amount={selectedAmount}
      />
    </div>
  );
};

export default CartPage;
