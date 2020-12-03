import React, { useContext } from "react";

import { Box, Stack, Heading, Text, Divider, Spinner } from "@chakra-ui/react";
import { OrderContext } from "../context/orderContext";

const OrderList = () => {
  const { orders } = useContext(OrderContext);

  return (
    <Box p={6}>
      {orders ? (
        orders.map(
          ({
            customerName,
            _id,
            productName,
            productNumber,
            quantity,
            unitCost,
            createdAt,
          }) => (
            <Stack mt={3} spacing={6} key={_id}>
              <Box p={5} shadow="md" borderWidth="1px">
                <Heading fontSize="lg">{productName}</Heading>
                <Text
                  mt={4}
                >{`${customerName} ordered for the above product, with the product number of ${productNumber}. Hoping to recieve ${quantity} quantity of goods at the price of ${unitCost} `}</Text>
                <Divider mt={3} />
                <Box>
                  <Text
                    mt={2}
                    as="h6"
                    fontStyle="italic"
                    fontSize="sm"
                  >{`Order created on: ${createdAt}`}</Text>
                </Box>
              </Box>
            </Stack>
          )
        )
      ) : (
        <Spinner />
      )}
    </Box>
  );
};

export default OrderList;
