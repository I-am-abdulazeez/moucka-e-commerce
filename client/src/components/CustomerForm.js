import React, { useContext } from "react";
import { Field, Form, Formik } from "formik";
import {
  Box,
  Button,
  FormLabel,
  Grid,
  Input,
  useToast,
  FormErrorMessage,
  FormControl,
  Select,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { OrderContext } from "../context/orderContext";
// import OrderList from "./OrderList";

const matchNumber = "^[0-9]+$";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("email is badly formatted")
    .required("Enter email Address"),
  customerName: Yup.string().trim().required("Customer Name is Required!"),
  customerNumber: Yup.string("Must be a number")
    .matches(matchNumber, "must be a number")
    .required("phone Number is required")
    .max(20),
  address: Yup.string().required("Home address is required"),
});

const CustomerForm = () => {
  const { addOrder } = useContext(OrderContext);
  const toast = useToast();

  return (
    <Box>
      <Formik
        initialValues={{
          customerName: "",
          customerNumber: "",
          email: "",
          gBusPostingGroup: "",
          vBusPostingGroup: "",
          customerPostingGroup: "",
          address: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          const request = {
            custname: data.customerName,
            phoneNo: data.customerNumber,
            ddress2: "",
            email: data.email,
            address: data.address,
            genBusPostingGroup: data.gBusPostingGroup,
            vatBusPostingGroup: data.vBusPostingGroup,
            customerPostingGroup: data.customerPostingGroup,
          };
          addOrder(request)
            .then((res) => {
              toast({
                title: "Customer Added successfully.",
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
        {({ values, isSubmitting, errors, touched }) => (
          <Form>
            <Box>
              <Grid templateColumns="repeat(2, 1fr)" gap={5}>
                <Box>
                  <FormControl
                    isInvalid={errors.customerName && touched.customerName}
                  >
                    <FormLabel>Customer Name:</FormLabel>
                    <Field
                      as={Input}
                      name="customerName"
                      type="text"
                      placeholder="Customer Name:"
                    />
                    <FormErrorMessage>{errors.customerName}</FormErrorMessage>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl isInvalid={errors.address && touched.address}>
                    <FormLabel>Customer Address:</FormLabel>
                    <Field
                      as={Input}
                      name="address"
                      type="text"
                      placeholder="Customer Address:"
                    />
                    <FormErrorMessage>{errors.address}</FormErrorMessage>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl isInvalid={errors.email && touched.email}>
                    <FormLabel>Email Address:</FormLabel>
                    <Field
                      as={Input}
                      name="email"
                      type="email"
                      placeholder="Email Address:"
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl
                    isInvalid={errors.customerNumber && touched.customerNumber}
                  >
                    <FormLabel>Phone Number:</FormLabel>
                    <Field
                      as={Input}
                      name="customerNumber"
                      type="text"
                      placeholder="Phone Number:"
                    />
                    <FormErrorMessage>{errors.customerNumber}</FormErrorMessage>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl
                    isInvalid={
                      errors.gBusPostingGroup && touched.gBusPostingGroup
                    }
                  >
                    <FormLabel>Gen Bus Posting Group:</FormLabel>
                    <Field
                      as={Select}
                      name="gBusPostingGroup"
                      placeholder="select option"
                      type="select"
                    >
                      <option value="DOMESTIC">DOMESTIC</option>
                      <option value="EU">EU</option>
                      <option value="EXPORT">EXPORT</option>
                      <option value="INTERCOMP">INTERCOMP</option>
                    </Field>
                    <FormErrorMessage>
                      {errors.gBusPostingGroup}
                    </FormErrorMessage>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl
                    isInvalid={
                      errors.vBusPostingGroup && touched.vBusPostingGroup
                    }
                  >
                    <FormLabel>Vat Bus Posting Group:</FormLabel>
                    <Field
                      as={Select}
                      name="vBusPostingGroup"
                      placeholder="select option"
                      type="select"
                    >
                      <option value="DOMESTIC">DOMESTIC</option>
                      <option value="EU">EU</option>
                      <option value="EXPORT">EXPORT</option>
                    </Field>
                    <FormErrorMessage>
                      {errors.vBusPostingGroup}
                    </FormErrorMessage>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl
                    isInvalid={
                      errors.customerPostingGroup &&
                      touched.customerPostingGroup
                    }
                  >
                    <FormLabel>Cust Posting Group:</FormLabel>
                    <Field
                      as={Select}
                      name="customerPostingGroup"
                      type="select"
                      placeholder="select option"
                    >
                      <option value="DOMESTIC">DOMESTIC</option>
                      <option value="EU">EU</option>
                      <option value="FOREIGN">FOREIGN</option>
                    </Field>
                    <FormErrorMessage>
                      {errors.vBusPostingGroup}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
              </Grid>

              <Button
                isDisabled={
                  !values.address ||
                  !values.customerName ||
                  !values.customerNumber ||
                  !values.email
                }
                isLoading={isSubmitting}
                type="submit"
                mt={4}
                colorScheme="green"
                isFullWidth
              >
                Create Customer
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      {/* <OrderList /> */}
    </Box>
  );
};

export default CustomerForm;
