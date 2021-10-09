import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as yup from "yup";
import Button from "../buttons/Button";
import TextField from "../text-field/TextField";
import { H3, H5 } from "../Typography";
import { StyledDatePincodeDialog } from "./DatePincodeDialogStyle";
import Modal from "../modal/Modal";
import Box from "../Box";
import { format } from "date-fns";
import { setPincodeAndDate } from "@/store/date-pincode";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

interface DatePincodeDialogProps {
  open: boolean;
}

const DatePincodeDialog: React.FC<DatePincodeDialogProps> = ({ open }) => {



  const addDays = 3600 * 1000 * 24;
  const dispatch = useAppDispatch();

  const handleFormSubmit = async (values) => {
    dispatch(setPincodeAndDate({ date: values.date, pincode: values.pincode }))
  };
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    onSubmit: handleFormSubmit,
    initialValues,
    validationSchema: formSchema,
  });
  // values.pincode = pincode;

  const { deliveryDate, pincode } = useAppSelector(store => store.datePincode);
  useEffect(()=>{
    if(pincode){
      initialValues.pincode = pincode;
    }
    if (deliveryDate){
      initialValues.date = format(new Date(deliveryDate), "yyyy-MM-dd");
    }
  },[])
  return (
    <Modal open={open} onClose={() => { }}>
      <Box>
        <StyledDatePincodeDialog mx="auto" my="2rem" boxShadow="large">
          <form className="content" onSubmit={handleSubmit}>
            <H3 textAlign="center" mb="0.5rem">
              Welcome To The Good Fish Company
            </H3>
            <H5
              fontWeight="600"
              fontSize="12px"
              color="gray.800"
              textAlign="center"
              mb="2.25rem"
            >
              Choose Date And Pincode
            </H5>

            <TextField
              mb="0.75rem"
              name="date"
              label="Select Delivery Date"
              type="date"
              fullwidth
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.date}
              errorText={touched.date && errors.date}
              min={format(new Date(), "yyyy-MM-dd")}
              max={format(new Date(Date.now() + 7 * addDays), "yyyy-MM-dd")}
            />

            <TextField
              mb="0.75rem"
              name="pincode"
              placeholder="550066"
              label="Enter Delivery Pincode"
              type="text"
              fullwidth
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.pincode || ""}
              errorText={touched.pincode && errors.pincode}
            />

            <Button
              mb="1.65rem"
              variant="contained"
              color="primary"
              type="submit"
              fullwidth
            >
              Submit
            </Button>
          </form>
        </StyledDatePincodeDialog>
      </Box>
    </Modal>
  );
};
const initialValues = {
  pincode: "",
  date: format(new Date(), "yyyy-MM-dd"),
};

const formSchema = yup.object().shape({
  date: yup.string().required("${path} is required"),
  pincode: yup.string().required("${path} is required").test(
    "len",
    "Enter Valid Pincode",
    (val) => val?.length === 6
  ),
});

export default DatePincodeDialog;
