import React from "react";
import { Box } from "@chakra-ui/react";
import Orders from "./components/Orders";
import { OrderProvider } from "./context/orderContext";

const App = () => {
  return (
    <OrderProvider>
      <Box d="flex" h="100vh" alignItems="center" justifyContent="center">
        <Orders />
      </Box>
    </OrderProvider>
  );
};

export default App;
