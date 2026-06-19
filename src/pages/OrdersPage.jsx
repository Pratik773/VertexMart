import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Package, ArrowLeft, CheckCircle2, ShoppingBag, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const StatusBadge = ({ status }) => {
  const styles = {
    Delivered: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20",
    Processing: "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20",
    Shipped: "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/20",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${styles[status] || styles.Delivered}`}>
      <CheckCircle2 size={11} />
      {status}
    </span>
  );
};

const OrderCard = ({ order }) => {
  const [expanded, setExpanded] = useState(false);
  const date = new Date(order.date);
  const formattedDate = date.toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("en-IN", {
    hour: "2-digit", minute: "2-digit",
  });

  return (
    <div className="bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-white/5 rounded-2xl overflow-hidden hover:border-slate-200 dark:hover:border-white/10 transition-colors">
      {/* Order header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center">
            <Package size={16} className="text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Order ID</p>
            <code className="text-xs font-mono text-slate-600 dark:text-slate-300">{order.txnId}</code>
          </div>
        </div>
        <StatusBadge status={order.status} />
      </div>

      {/* Date + amount row */}
      <div className="flex items-center justify-between px-5 py-3 bg-slate-50/50 dark:bg-white/[0.02]">
        <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500">
          <span>{formattedDate}</span>
          <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
          <span>{formattedTime}</span>
          <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
          <span>{order.items?.length} {order.items?.length === 1 ? "item" : "items"}</span>
        </div>
        <p className="font-extrabold text-slate-900 dark:text-white text-sm tracking-tight">
          ₹{order.amount?.toLocaleString("en-IN")}
        </p>
      </div>

      {/* Item previews (collapsed) */}
      {!expanded && order.items?.length > 0 && (
        <div className="px-5 py-3 flex items-center gap-2">
          <div className="flex -space-x-2">
            {order.items.slice(0, 4).map((item, i) => (
              <div key={i} className="w-10 h-10 rounded-lg border-2 border-white dark:border-slate-800 overflow-hidden bg-slate-100 dark:bg-slate-700 flex-shrink-0">
                {item.image
                  ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center text-[8px] font-bold text-slate-400">{item.name?.[0]}</div>
                }
              </div>
            ))}
            {order.items.length > 4 && (
              <div className="w-10 h-10 rounded-lg border-2 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-500 dark:text-slate-400">
                +{order.items.length - 4}
              </div>
            )}
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 ml-1 truncate">
            {order.items[0]?.name}{order.items.length > 1 ? ` and ${order.items.length - 1} more` : ""}
          </p>
        </div>
      )}

      {/* Expanded item list */}
      {expanded && (
        <div className="px-5 py-3 space-y-3">
          {order.items?.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-12 h-12 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-700/50">
                {item.image
                  ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center text-sm font-bold text-slate-400">{item.name?.[0]}</div>
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{item.name}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">Qty: {item.quantity || 1}</p>
              </div>
              <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                ₹{(item.price * (item.quantity || 1)).toLocaleString("en-IN")}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Toggle expand */}
      {order.items?.length > 0 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors border-t border-slate-100 dark:border-white/5"
        >
          {expanded ? <><ChevronUp size={14} /> Show less</> : <><ChevronDown size={14} /> View {order.items.length} {order.items.length === 1 ? "item" : "items"}</>}
        </button>
      )}
    </div>
  );
};

const OrdersPage = () => {
  const orders = useSelector((state) => state.orders.orders);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-3xl mx-auto px-6 py-12">
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
              My Orders
            </h2>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">
              {orders.length} {orders.length === 1 ? "order" : "orders"} placed
            </p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="w-20 h-20 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center mb-5 shadow-sm">
              <ShoppingBag size={32} className="text-slate-300 dark:text-slate-600" />
            </div>
            <p className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">
              No orders yet
            </p>
            <p className="text-slate-400 dark:text-slate-500 text-sm mb-6">
              Complete a purchase to see your orders here
            </p>
            <Link
              to="/"
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
