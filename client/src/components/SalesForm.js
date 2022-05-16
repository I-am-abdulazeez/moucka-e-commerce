import React, { useEffect, useContext } from "react";
import {
  Box,
  Grid,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik, Field, FieldArray } from "formik";
import { SalesContext } from "../context/salesContext";

const SalesForm = () => {
  const { orders, getOrders, addOrder } = useContext(SalesContext);
  const toast = useToast();

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(orders);

  return (
    <Box>
      <Formik
        initialValues={{
          salesOrder: { custNo: "" },
          salesOrderLines: [{ itemNo: "", location: "", Quantity: "" }],
        }}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          const stuff = data.salesOrderLines.map((sale) => {
            return {
              itemNo: sale.itemNo,
              location: sale.location,
              Quantity: sale.Quantity,
            };
          });
          console.log(stuff);
          const request = {
            salesOrderHeader: { custNo: data.salesOrder.custNo },
            salesOrderLines: stuff,
          };
          addOrder(request)
            .then(() => {
              toast({
                title: "Sales Added successfully.",
                status: "success",
                duration: 2000,
                isClosable: true,
              });
              resetForm();
              setSubmitting(false);
            })
            .catch((err) => {
              setSubmitting(true);
              console.log(err);
              setSubmitting(false);
            });
          console.log(data);
        }}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <Box>
              <Box mb={5}>
                <FormControl isRequired={true}>
                  <FormLabel>Customer No:</FormLabel>
                  <Field
                    as={Input}
                    name="salesOrder.custNo"
                    type="text"
                    placeholder="Customer No:"
                  />
                </FormControl>
              </Box>
            </Box>

            <Box>
              <FieldArray name="salesOrderLines">
                {({ arrayHelpers }) => (
                  <Box>
                    {values.salesOrderLines.map((sale, i) => (
                      <Grid key={i} templateColumns="repeat(2, 1fr)" gap={4}>
                        <Box>
                          <FormControl isRequired={true}>
                            <FormLabel>Item No:</FormLabel>
                            <Field
                              as={Input}
                              type="text"
                              name={`salesOrderLines[${i}].itemNo`}
                              placeholder="item Number"
                            />
                          </FormControl>
                        </Box>

                        <Box>
                          <FormControl isRequired={true}>
                            <FormLabel>Location:</FormLabel>
                            <Field
                              as={Select}
                              type="text"
                              name={`salesOrderLines[${i}].location`}
                              placeholder="Select option"
                            >
                              <option value="RED">RED</option>
                              <option value="SILVER">SILVER</option>
                              <option value="WHITE">WHITE</option>
                              <option value="OWN LOG.">OWN LOG.</option>
                              <option value="GREEN">GREEN</option>
                            </Field>
                          </FormControl>
                        </Box>
                        <Box mt={4}>
                          <FormControl isRequired={true}>
                            <FormLabel>Quantity:</FormLabel>
                            <Field
                              as={Input}
                              type="text"
                              name={`salesOrderLines[${i}].Quantity`}
                              placeholder="Quantity"
                            />
                          </FormControl>
                        </Box>
                      </Grid>
                    ))}
                  </Box>
                )}
              </FieldArray>
            </Box>

            <Button
              isLoading={isSubmitting}
              type="submit"
              isDisabled={!values.salesOrder.custNo}
              mt={4}
              colorScheme="green"
              isFullWidth
            >
              Order Sales
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SalesForm;
