import React, { createContext, useReducer } from "react";
import SaleReducers from "./reducers/SaleReducers";
import axios from "axios";

// Initial State
const initialState = {
  orders: [],
  error: null,
  loading: true,
};

// Create Context
export const SalesContext = createContext(initialState);

// Always Add this to disable CORS issues, it was not disabled in the server side:
// https://cors-anywhere.herokuapp.com/http://your-own-api.com

// Provider
export const SalesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SaleReducers, initialState);

  // Actions
  const getOrders = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.get(
        "https://cors-anywhere.herokuapp.com/http://sompower.westeurope.cloudapp.azure.com/MOUKA/Api/salesorder/1001",
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

  const addOrder = async (order) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "https://cors-anywhere.herokuapp.com/http://sompower.westeurope.cloudapp.azure.com/MOUKA/Api/salesorder",
        order,
        config
      );
      dispatch({
        type: "ADD_ORDER",
        payload: res,
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
    <SalesContext.Provider
      value={{
        orders: state.orders,
        error: state.error,
        loading: state.loading,
        addOrder,
        getOrders,
      }}
    >
      {children}
    </SalesContext.Provider>
  );
};
