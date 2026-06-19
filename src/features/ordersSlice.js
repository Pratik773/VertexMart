import { createSlice } from "@reduxjs/toolkit";

const loadOrders = () => {
  try {
    const saved = localStorage.getItem("vertexmart_orders");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveOrders = (orders) => {
  try {
    localStorage.setItem("vertexmart_orders", JSON.stringify(orders));
  } catch {}
};

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: loadOrders(),
  },
  reducers: {
    addOrder: (state, action) => {
      state.orders.unshift(action.payload); // newest first
      saveOrders(state.orders);
    },
  },
});

export const { addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
