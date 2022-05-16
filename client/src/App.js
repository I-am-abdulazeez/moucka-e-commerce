import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { OrderProvider } from "./context/orderContext";
import { SalesProvider } from "./context/salesContext";
import Orders from "./components/Orders";
import { Link } from "react-router-dom";
import { ReceiptProvider } from "./context/receiptContext";

const App = () => {
  return (
    <ReceiptProvider>
      <SalesProvider>
        <OrderProvider>
          <Box textAlign="center" mt={2}>
            <Button variant="link" mr={5}>
              <Link to="/">Customers</Link>
            </Button>
            <Button variant="link" mr={5}>
              <Link to="/sales">Sales</Link>
            </Button>
            <Button variant="link" mr={5}>
              <Link to="/receipt">Receipt</Link>
            </Button>
          </Box>
          <Box d="flex" h="95vh" alignItems="center" justifyContent="center">
            <Orders />
          </Box>
        </OrderProvider>
      </SalesProvider>
    </ReceiptProvider>
  );
};

export default App;
