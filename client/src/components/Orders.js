import React, { useContext, useEffect } from "react";
import { Box, Image, Text } from "@chakra-ui/react";

import MoukaLogo from "../assets/images/logo.png";
import { Switch, Route } from "react-router-dom";
import { OrderContext } from "../context/orderContext";
import CustomerForm from "./CustomerForm";
import SalesForm from "./SalesForm";
import ReceiptForm from "./ReceiptForm";

const Orders = () => {
  const { orders, getOrders } = useContext(OrderContext);

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(orders);

  return (
    <Box
      p="5"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      boxShadow="md"
      alignItems="center"
      borderWidth="1px"
      borderRadius="7px"
    >
      <Image src={MoukaLogo} width="90px" />
      <Text mb={6} as="h3" fontSize="2xl" fontWeight="medium">
        Ecommerce Portal
      </Text>
      <Switch>
        <Route path="/" exact>
          <CustomerForm />
        </Route>
        <Route path="/sales">
          <SalesForm />
        </Route>
        <Route path="/receipt">
          <ReceiptForm />
        </Route>
      </Switch>
    </Box>
  );
};

export default Orders;
