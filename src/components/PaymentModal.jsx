import { useState } from "react";
import { useDispatch } from "react-redux";
import { addOrder } from "../features/ordersSlice";
import { clearCart, removeFromCart } from "../features/cartSlice";
import { X, Lock, CreditCard, Smartphone, Wallet, Building2, CheckCircle2, ShieldCheck, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TABS = [
  { id: "card", label: "Card", icon: CreditCard },
  { id: "upi", label: "UPI", icon: Smartphone },
  { id: "wallet", label: "Wallet", icon: Wallet },
  { id: "netbanking", label: "Netbanking", icon: Building2 },
];

const UPI_APPS = [
  { id: "gpay", name: "Google Pay", sub: "rahul@okaxis", color: "#5f259f", short: "G" },
  { id: "phonepe", name: "PhonePe", sub: "9876543210@ybl", color: "#5f259f", short: "P" },
  { id: "bhim", name: "BHIM UPI", sub: "rahul@upi", color: "#004B87", short: "B" },
];

const WALLETS = [
  { id: "paytm", name: "Paytm", color: "#243782", short: "P" },
  { id: "amazon", name: "Amazon Pay", color: "#ff6600", short: "A" },
  { id: "freecharge", name: "FreeCharge", color: "#d71149", short: "F" },
  { id: "mobikwik", name: "MobiKwik", color: "#00baf2", short: "M" },
];

const BANKS = [
  { id: "sbi", name: "State Bank", short: "SBI", color: "#003087" },
  { id: "hdfc", name: "HDFC Bank", short: "HDFC", color: "#e31837" },
  { id: "icici", name: "ICICI Bank", short: "ICICI", color: "#004C97" },
  { id: "axis", name: "Axis Bank", short: "AXIS", color: "#f37021" },
];

const PROCESSING_MSGS = [
  "Connecting to your bank...",
  "Authenticating payment...",
  "Processing transaction...",
  "Almost there...",
];

function formatCardNumber(val) {
  return val.replace(/\D/g, "").substring(0, 16).replace(/(.{4})/g, "$1  ").trim();
}
function formatExpiry(val) {
  const digits = val.replace(/\D/g, "");
  if (digits.length >= 2) return digits.substring(0, 2) + " / " + digits.substring(2, 4);
  return digits;
}
function generateTxnId() {
  return "pay_" + Math.random().toString(36).substring(2, 12).toUpperCase();
}

const CardForm = ({ onPay, amount }) => {
  const [cardNum, setCardNum] = useState("");
  const [expiry, setExpiry] = useState("");
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Card Number</label>
        <div className="relative">
          <input type="text" placeholder="1234  5678  9012  3456" value={cardNum}
            onChange={(e) => setCardNum(formatCardNumber(e.target.value))} maxLength={19}
            className="w-full h-10 pl-3 pr-10 border border-slate-200 dark:border-white/10 rounded-lg bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all" />
          <CreditCard size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600" />
        </div>
      </div>
      <div>
        <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Name on Card</label>
        <input type="text" placeholder="Rahul Sharma"
          className="w-full h-10 px-3 border border-slate-200 dark:border-white/10 rounded-lg bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Expiry</label>
          <input type="text" placeholder="MM / YY" value={expiry}
            onChange={(e) => setExpiry(formatExpiry(e.target.value))} maxLength={7}
            className="w-full h-10 px-3 border border-slate-200 dark:border-white/10 rounded-lg bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all" />
        </div>
        <div>
          <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">CVV</label>
          <input type="password" placeholder="•••" maxLength={4}
            className="w-full h-10 px-3 border border-slate-200 dark:border-white/10 rounded-lg bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all" />
        </div>
      </div>
      <button onClick={onPay} className="w-full h-11 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-md shadow-blue-600/25 mt-1">
        <Lock size={14} />Pay ₹{amount?.toLocaleString("en-IN")}
      </button>
    </div>
  );
};

const UpiForm = ({ onPay, amount }) => {
  const [selected, setSelected] = useState("gpay");
  const [customUpi, setCustomUpi] = useState("");
  return (
    <div className="space-y-3">
      {UPI_APPS.map((app) => (
        <button key={app.id} onClick={() => { setSelected(app.id); setCustomUpi(""); }}
          className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${selected === app.id ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10" : "border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"}`}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: app.color }}>{app.short}</div>
          <div className="text-left">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{app.name}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500">{app.sub}</p>
          </div>
          <div className="ml-auto">
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${selected === app.id ? "border-blue-500 bg-blue-500" : "border-slate-300 dark:border-slate-600"}`}>
              {selected === app.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </div>
          </div>
        </button>
      ))}
      <div className="flex items-center gap-3 text-xs text-slate-400">
        <div className="flex-1 h-px bg-slate-200 dark:bg-white/10" />or enter UPI ID
        <div className="flex-1 h-px bg-slate-200 dark:bg-white/10" />
      </div>
      <input type="text" placeholder="yourname@bankname" value={customUpi}
        onChange={(e) => { setCustomUpi(e.target.value); if (e.target.value) setSelected(""); }}
        className="w-full h-10 px-3 border border-slate-200 dark:border-white/10 rounded-lg bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all" />
      <button onClick={onPay} className="w-full h-11 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-md shadow-blue-600/25">
        Verify & Pay ₹{amount?.toLocaleString("en-IN")}
      </button>
    </div>
  );
};

const WalletForm = ({ onPay, amount }) => {
  const [selected, setSelected] = useState("paytm");
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        {WALLETS.map((w) => (
          <button key={w.id} onClick={() => setSelected(w.id)}
            className={`flex items-center gap-2.5 p-3 rounded-lg border transition-all ${selected === w.id ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10" : "border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"}`}>
            <div className="w-7 h-7 rounded-md flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0" style={{ background: w.color }}>{w.short}</div>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{w.name}</span>
          </button>
        ))}
      </div>
      <button onClick={onPay} className="w-full h-11 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-md shadow-blue-600/25">
        Pay with Wallet
      </button>
    </div>
  );
};

const NetbankingForm = ({ onPay, amount }) => {
  const [selected, setSelected] = useState("sbi");
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        {BANKS.map((b) => (
          <button key={b.id} onClick={() => setSelected(b.id)}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border transition-all ${selected === b.id ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10" : "border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"}`}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-[9px] font-bold" style={{ background: b.color }}>{b.short}</div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">{b.name}</span>
          </button>
        ))}
      </div>
      <button onClick={onPay} className="w-full h-11 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-md shadow-blue-600/25">
        Proceed to Netbanking
      </button>
    </div>
  );
};

// ── Main Modal ──────────────────────────────────────────────────────

const PaymentModal = ({ isOpen, onClose, amount, items, isSingleItem = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("card");
  const [stage, setStage] = useState("form");
  const [msgIndex, setMsgIndex] = useState(0);
  const [txnId, setTxnId] = useState("");

  if (!isOpen) return null;

  const handlePay = () => {
    setStage("processing");
    setMsgIndex(0);
    let idx = 0;
    const iv = setInterval(() => {
      idx++;
      if (idx < PROCESSING_MSGS.length) setMsgIndex(idx);
    }, 750);
    setTimeout(() => {
      clearInterval(iv);
      const newTxnId = generateTxnId();
      setTxnId(newTxnId);

      // Save order to Redux + localStorage
      dispatch(
        addOrder({
          id: newTxnId,
          txnId: newTxnId,
          date: new Date().toISOString(),
          amount,
          // If buying single item from "Buy Now", wrap in array; else use full cart
          items: items
            ? items.map((item) => ({
                id: item.id,
                name: item.name,
                image: item.image,
                price: item.price,
                quantity: item.quantity || 1,
              }))
            : [],
          status: "Delivered",
        })
      );

      // Clear purchased items from cart
      if (!isSingleItem && items) {
        dispatch(clearCart());
      } else if (isSingleItem && items?.[0]) {
        dispatch(removeFromCart(items[0].id));
      }

      setStage("success");
    }, 3200);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStage("form");
      setActiveTab("card");
      setMsgIndex(0);
    }, 300);
  };

  const handleViewOrders = () => {
    handleClose();
    navigate("/orders");
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-2xl border border-slate-100 dark:border-white/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dark header */}
        <div className="bg-[#0f1117] px-6 py-5 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1 8L5 1l4 7H1z" fill="white" />
                </svg>
              </div>
              <span className="text-[11px] text-slate-500 tracking-wide">Secured by Razorpay</span>
            </div>
            <p className="text-slate-400 text-xs mb-1">VertexMart</p>
            <p className="text-white text-3xl font-bold tracking-tight">
              ₹{amount?.toLocaleString("en-IN")}
            </p>
            {items && (
              <p className="text-slate-500 text-xs mt-1">
                {items.length === 1
                  ? items[0].name
                  : `${items.length} items`}
              </p>
            )}
          </div>
          <button
            onClick={handleClose}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors flex-shrink-0 mt-1"
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-5">
          {stage === "form" && (
            <>
              <div className="flex border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden mb-5">
                {TABS.map(({ id, label, icon: Icon }) => (
                  <button key={id} onClick={() => setActiveTab(id)}
                    className={`flex-1 flex flex-col items-center gap-1 py-2 text-[11px] font-medium transition-all border-r border-slate-200 dark:border-white/10 last:border-r-0 ${activeTab === id ? "bg-blue-600 text-white" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5"}`}>
                    <Icon size={16} />{label}
                  </button>
                ))}
              </div>
              {activeTab === "card" && <CardForm onPay={handlePay} amount={amount} />}
              {activeTab === "upi" && <UpiForm onPay={handlePay} amount={amount} />}
              {activeTab === "wallet" && <WalletForm onPay={handlePay} amount={amount} />}
              {activeTab === "netbanking" && <NetbankingForm onPay={handlePay} amount={amount} />}
              <div className="flex items-center justify-center gap-1.5 mt-4 text-[11px] text-slate-400 dark:text-slate-500">
                <ShieldCheck size={12} />
                <span>256-bit SSL encrypted · Safe & Secure</span>
              </div>
            </>
          )}

          {stage === "processing" && (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <div className="w-12 h-12 border-2 border-slate-200 dark:border-white/10 border-t-blue-500 rounded-full animate-spin mb-5" />
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                {PROCESSING_MSGS[msgIndex] || "Processing..."}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">Do not close this window</p>
            </div>
          )}

          {stage === "success" && (
            <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center mb-4">
                <CheckCircle2 size={36} className="text-emerald-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                Payment Successful!
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                ₹{amount?.toLocaleString("en-IN")} paid to VertexMart
              </p>
              <code className="text-xs text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-lg font-mono mb-6">
                {txnId}
              </code>
              <div className="flex gap-3 w-full">
                <button
                  onClick={handleClose}
                  className="flex-1 py-2.5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 rounded-lg font-semibold text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={handleViewOrders}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-md shadow-blue-600/20"
                >
                  <Package size={14} />
                  View Orders
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
