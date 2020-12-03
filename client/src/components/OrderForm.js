import React, { useContext } from "react";
import { Field, Form, Formik } from "formik";
import {
  Box,
  Button,
  FormLabel,
  Grid,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalContent,
  useToast,
  FormErrorMessage,
  FormControl,
} from "@chakra-ui/react";
import CalculatedField from "./CalculatedField";
import * as Yup from "yup";
import { OrderContext } from "../context/orderContext";
import OrderList from "./OrderList";

const validationSchema = Yup.object().shape({
  productName: Yup.string().trim().required("Product Name is Required!"),
  productNumber: Yup.string().trim().required("Product Number is Required!"),
  quantity: Yup.number().required("Must be a Number!").min(1),
  unitCost: Yup.number().required("Must be a Number!"),
  totalCost: Yup.number().required("Must be a Number!"),
  customerName: Yup.string().trim().required("Customer Name is Required!"),
  customerNumber: Yup.string().trim().required("Customer Number is Required!"),
  amount: Yup.number().required("Required!"),
});

const OrderForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { addOrder } = useContext(OrderContext);
  const toast = useToast();

  const openModal = () => {
    toast(
      {
        title: "Order successfully created",
        description: "We've created your order for you.",
        status: "success",
        duration: 1000,
        isClosable: true,
      },
      onOpen()
    );
  };

  return (
    <Box>
      <Formik
        initialValues={{
          productName: "",
          productNumber: "",
          quantity: 1,
          unitCost: 0,
          totalCost: 0,
          customerName: "",
          customerNumber: "",
          amount: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          const newOrder = data;
          addOrder(newOrder)
            .then((res) => {
              res.json();
            })
            .then(() => {
              toast({
                title: "Order Added successfully.",
                status: "success",
                duration: 2000,
                isClosable: true,
              });
              resetForm();
              setSubmitting(false);
              setTimeout(() => {
                onClose();
              }, 3000);
            })
            .catch((err) => {
              setSubmitting(true);
              console.log(err);
              setSubmitting(false);
            });
        }}
      >
        {({
          values,
          handleBlur,
          handleChange,
          setFieldValue,
          isSubmitting,
          errors,
          touched,
          handleSubmit,
          isValid,
        }) => (
          <Form>
            <Box>
              <Grid templateColumns="repeat(2, 1fr)" gap={5}>
                <Box>
                  <FormControl
                    isInvalid={errors.productName && touched.productName}
                  >
                    <FormLabel>Product Name:</FormLabel>
                    <Field
                      as={Input}
                      name="productName"
                      type="text"
                      placeholder="Product Name:"
                    />
                    <FormErrorMessage>{errors.productName}</FormErrorMessage>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl
                    isInvalid={errors.productNumber && touched.productNumber}
                  >
                    <FormLabel>Product Number:</FormLabel>
                    <Field
                      as={Input}
                      name="productNumber"
                      type="number"
                      placeholder="Product Number:"
                    />
                    <FormErrorMessage>{errors.productNumber}</FormErrorMessage>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl isInvalid={errors.quantity && touched.quantity}>
                    <FormLabel>Quantity:</FormLabel>
                    <Field
                      as={Input}
                      name="quantity"
                      type="number"
                      value={values.quantity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Quantity:"
                    />
                    <FormErrorMessage> {errors.quantity} </FormErrorMessage>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl isInvalid={touched.unitCost && errors.unitCost}>
                    <FormLabel>Unit Cost:(in Naira)</FormLabel>
                    <Field
                      as={Input}
                      name="unitCost"
                      type="number"
                      value={values.unitCost}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Unit Cost:"
                    />
                    <FormErrorMessage> {errors.unitCost} </FormErrorMessage>
                  </FormControl>
                </Box>
                <Box>
                  <FormLabel>Total Cost:(in Naira)</FormLabel>
                  <CalculatedField
                    type="number"
                    name="totalCost"
                    values={values}
                    value={values.totalCost}
                    setFieldValue={setFieldValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Box>
              </Grid>

              <Button
                isDisabled={
                  !values.productName ||
                  !values.productNumber ||
                  !values.quantity ||
                  !values.unitCost
                }
                mt={4}
                colorScheme="green"
                onClick={openModal}
                isFullWidth
              >
                Order Now
              </Button>

              <Modal
                closeOnOverlayClick={true}
                isOpen={isOpen}
                onClose={onClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Customer Details</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Box>
                      <Grid templateColumns="repeat(2, 1fr)" gap={5}>
                        <Box>
                          <FormControl
                            isInvalid={
                              errors.customerName && errors.customerName
                            }
                          >
                            <FormLabel>Customer Name: </FormLabel>
                            <Field
                              as={Input}
                              name="customerName"
                              type="text"
                              placeholder="Customer Name:"
                            />
                            <FormErrorMessage>
                              {" "}
                              {errors.customerName}{" "}
                            </FormErrorMessage>
                          </FormControl>
                        </Box>

                        <Box>
                          <FormControl
                            isInvalid={
                              errors.customerNumber && touched.customerNumber
                            }
                          >
                            <FormLabel>Customer Number: </FormLabel>
                            <Field
                              as={Input}
                              name="customerNumber"
                              type="text"
                              isRequired={true}
                              placeholder="Customer Number:"
                            />
                            <FormErrorMessage>
                              {" "}
                              {errors.customerNumber}{" "}
                            </FormErrorMessage>
                          </FormControl>
                        </Box>

                        <Box>
                          <FormControl
                            isInvalid={errors.amount && touched.amount}
                          >
                            <FormLabel>Amount: </FormLabel>
                            <Field
                              as={Input}
                              name="amount"
                              type="text"
                              isRequired={true}
                              placeholder="Amount:"
                            />
                            <FormErrorMessage>
                              {" "}
                              {errors.amount}{" "}
                            </FormErrorMessage>
                          </FormControl>
                        </Box>
                      </Grid>
                    </Box>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      colorScheme="green"
                      type="button"
                      isDisabled={!isValid}
                      isLoading={isSubmitting}
                      isFullWidth
                      mb={7}
                      onClick={handleSubmit}
                    >
                      Pay Now
                    </Button>
                  </ModalFooter>
                  <OrderList />
                </ModalContent>
              </Modal>
              {/* 
              <pre>{JSON.stringify(errors, null, 2)}</pre> */}
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default OrderForm;
