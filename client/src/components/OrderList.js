import React, { useContext } from "react";

import { Box, Stack, Heading, Text, Divider } from "@chakra-ui/react";
import { OrderContext } from "../context/orderContext";

const OrderList = () => {
  const { orders } = useContext(OrderContext);

  return (
    <Box p={6}>
      {orders && orders.map((order, i) => <Box key={i}>{order}</Box>)}
    </Box>
  );
};

export default OrderList;
