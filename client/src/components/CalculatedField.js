import React, { useEffect } from "react";

import { Field } from "formik";
import { Input } from "@chakra-ui/react";

const CalculatedField = (props) => {
  useEffect(() => {
    let val = 0;
    if (props.values.unitCost && props.values.quantity) {
      val = props.values.unitCost * props.values.quantity;
    }
    props.setFieldValue("totalCost", val);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.values]);

  return (
    <Field
      as={Input}
      name="totalCost"
      isDisabled
      type="number"
      value={props.values.totalCost}
      placeholder="Total Cost:"
    />
  );
};

export default CalculatedField;
