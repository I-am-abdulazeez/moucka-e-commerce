import React, { useContext, useEffect } from "react";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik, Field, FieldArray } from "formik";
import { ReceiptContext } from "../context/receiptContext";

const ReceiptForm = () => {
  const { orders, getOrders, addOrder } = useContext(ReceiptContext);
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
          receiptsHeader: {
            date: "",
            payMode: "",
            bankCode: "",
            receivedFrom: "",
            onBehalfOf: "",
          },
          receiptsLines: [{ accountNo: "", description: "", amount: "" }],
        }}
        onSubmit={(data, { resetForm, setSubmitting }) => {
          setSubmitting(true);
          const Lines = data.receiptsLines.map(
            ({ accountNo, amount, description }) => {
              return {
                accountNo,
                description,
                amount,
              };
            }
          );
          console.log(Lines);
          const request = {
            receiptsHeader: {
              date: data.receiptsHeader.date,
              payMode: data.receiptsHeader.payMode,
              bankCode: data.receiptsHeader.bankCode,
              receivedFrom: data.receiptsHeader.receivedFrom,
              onBehalfOf: data.receiptsHeader.onBehalfOf,
            },
            receiptsLines: Lines,
          };
          addOrder(request)
            .then(() => {
              toast({
                title: "Receipt Added successfully.",
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
              <Grid templateColumns="repeat(3, 1fr)" gap={5}>
                <Box>
                  <FormControl isRequired={true}>
                    <FormLabel>Date:</FormLabel>
                    <Field
                      as={Input}
                      name="receiptsHeader.date"
                      type="text"
                      placeholder="dd/mm/yyyy"
                    />
                  </FormControl>
                </Box>

                <Box>
                  <FormControl isRequired={true}>
                    <FormLabel>Pay Mode:</FormLabel>
                    <Field
                      as={Select}
                      name="receiptsHeader.payMode"
                      type="text"
                      placeholder="Select option"
                    >
                      <option value="BANK">BANK</option>
                      <option value="CASH">CASH</option>
                      <option value="CHEQUE">CHEQUE</option>
                      <option value="EFT">EFT</option>
                    </Field>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl isRequired={true}>
                    <FormLabel>Bank Code:</FormLabel>
                    <Field
                      as={Select}
                      name="receiptsHeader.bankCode"
                      type="text"
                      placeholder="Select Option"
                    >
                      <option value="WWB-TRANSFERS">WWB-TRANSFERS</option>
                      <option value="WWB-OPERATING">WWB-OPERATING</option>
                      <option value="NBL">NBL</option>
                      <option value="GIRO">GIRO</option>
                    </Field>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl isRequired={true}>
                    <FormLabel>Received from:</FormLabel>
                    <Field
                      as={Input}
                      name="receiptsHeader.receivedFrom"
                      type="text"
                      placeholder="Received from"
                    />
                  </FormControl>
                </Box>

                <Box mb={4}>
                  <FormControl isRequired={true}>
                    <FormLabel>On Behalf Of:</FormLabel>
                    <Field
                      as={Input}
                      name="receiptsHeader.onBehalfOf"
                      type="text"
                      placeholder="on Behalf of"
                    />
                  </FormControl>
                </Box>
              </Grid>

              <FieldArray name="receiptsLines">
                {() =>
                  values.receiptsLines.map((re, i) => (
                    <Grid key={i} templateColumns="repeat(2, 1fr)" gap={5}>
                      <Box>
                        <FormControl isRequired={true}>
                          <FormLabel>Account No:</FormLabel>
                          <Field
                            as={Input}
                            type="text"
                            name={`receiptsLines[${i}].accountNo`}
                            placeholder="Account Number"
                          />
                        </FormControl>
                      </Box>

                      <Box>
                        <FormControl isRequired={true}>
                          <FormLabel>Description:</FormLabel>
                          <Field
                            as={Input}
                            type="text"
                            name={`receiptsLines[${i}].description`}
                            placeholder="Description"
                          />
                        </FormControl>
                      </Box>

                      <Box>
                        <FormControl isRequired={true}>
                          <FormLabel>Amount:</FormLabel>
                          <Field
                            as={Input}
                            type="text"
                            name={`receiptsLines[${i}].amount`}
                            placeholder="Amount"
                          />
                        </FormControl>
                      </Box>
                    </Grid>
                  ))
                }
              </FieldArray>
            </Box>

            <Box textAlign="center" mt={5}>
              <Button
                isLoading={isSubmitting}
                type="submit"
                colorScheme="green"
                width={400}
              >
                Pay Now
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ReceiptForm;
