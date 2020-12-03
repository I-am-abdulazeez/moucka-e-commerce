import React, { useContext, useEffect } from "react";
import { Box, Image, Text } from "@chakra-ui/react";

import MoukaLogo from "../assets/images/logo.png";

import { OrderContext } from "../context/orderContext";
import OrderForm from "./OrderForm";

// "start:production": "npm run build && npm run start:prod",
// "start:prod": "cross-env NODE_ENV=production node ../server",

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
      <Image mb={6} src={MoukaLogo} width="100px" />
      <Text mb={6} as="h3" fontSize="xl" fontWeight="medium">
        Ecommerce Portal
      </Text>
      <OrderForm />
    </Box>
  );
};

export default Orders;
