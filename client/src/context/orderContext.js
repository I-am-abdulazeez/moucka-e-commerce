import React, { createContext, useReducer } from "react";
import OrderReducers from "./reducers/OrderReducers";
import axios from "axios";

// Initial State
const initialState = {
  orders: [],
  error: null,
  loading: true,
};

// Create Context
export const OrderContext = createContext(initialState);

// Provider
export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(OrderReducers, initialState);

  // Actions
  const getOrders = async () => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.get("/api/v1/orderings", config);
      dispatch({
        type: "GET_ORDERS",
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({
        type: "ORDER_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  const addOrder = async (order) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(`/api/v1/orderings`, order, config);
      dispatch({
        type: "ADD_ORDER",
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: "ORDER_ERROR",
        payload: error.response.data.error,
      });
      console.log(error);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders: state.orders,
        error: state.error,
        loading: state.loading,
        addOrder,
        getOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
