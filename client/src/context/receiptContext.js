import React, { createContext, useReducer } from "react";
import ReceiptReducers from "./reducers/ReceiptReducers";
import axios from "axios";

// Initial State
const initialState = {
  orders: [],
  error: null,
  loading: true,
};

// Create Context
export const ReceiptContext = createContext(initialState);

// Always Add this to disable CORS issues, it was not disabled in the server side:
// https://cors-anywhere.herokuapp.com/http://your-own-api.com

// Provider
export const ReceiptProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ReceiptReducers, initialState);

  // Actions
  const getOrders = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.get(
        "https://cors-anywhere.herokuapp.com/http://sompower.westeurope.cloudapp.azure.com/MOUKA/Api/receipts",
        config
      );
      dispatch({
        type: "GET_ORDERS",
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: "ORDER_ERROR",
        payload: error.response.data.error,
      });
    }
  };

  const addOrder = async (receipt) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "https://cors-anywhere.herokuapp.com/http://sompower.westeurope.cloudapp.azure.com/MOUKA/Api/receipts",
        receipt,
        config
      );
      dispatch({
        type: "ADD_ORDER",
        payload: res.data,
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
    <ReceiptContext.Provider
      value={{
        orders: state.orders,
        error: state.error,
        loading: state.loading,
        addOrder,
        getOrders,
      }}
    >
      {children}
    </ReceiptContext.Provider>
  );
};
