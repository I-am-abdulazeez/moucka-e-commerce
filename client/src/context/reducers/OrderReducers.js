//eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case "GET_ORDERS":
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case "ORDER_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "DELETE_ORDER":
      return {
        ...state,
        orders: state.orders.filter((order) => order._id !== action.id),
      };
    case "ADD_ORDER":
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      };
    default:
      return state;
  }
};
