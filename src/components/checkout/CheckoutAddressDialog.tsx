import React from "react";
import Typography from "@component/Typography";
import countryList from "../../data/countryList";
import * as yup from "yup";
import Select from "../Select";
import { useAddressCreateMutation } from "@/api/address";
import { Formik } from "formik";
import { Card1 } from "../Card1";
import Grid from "../grid/Grid";
import TextField from "../text-field/TextField";
import Button from "../buttons/Button";
import styled from "styled-components";
import Card from "../Card";
import Modal from "../modal/Modal";
import FlexBox from "../FlexBox";

const StyledAddressDialog = styled(Card)`
  width: 500px;
  overflow: hidden;
  z-index:999;
  .content {
    padding: 3rem 3.75rem 0px;
  }
  .row{
      column-gap:10px;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
    .content {
      padding: 1.5rem 1rem 0px;
    }
    .row{
        flex-direction:column;
    }
  }
`;


const CheckoutAddressDialog = ({open}) => {

const handleFormSubmit = async (values) => {
      // Create Mutation
    //   TODO: Change this function when written in store
    const response = await useAddressCreateMutation({
    accountAddressCreateInput:{
        firstName: values.firstName || "",
        lastName: values.lastName || "",
        city: values.city || "",
        country: values.country.value,
        countryArea: values.state || "",
        phone: values.contact || "",
        postalCode: values.zip || "",
        streetAddress1: values.address1 || "",
        streetAddress2: values.address2 || "",
    }
    })
      console.log(response);
  }

  return (
    <Modal open={open} onClose={()=>{open}} >
    <StyledAddressDialog mx="auto" my="2rem" boxShadow="large">
    <Formik
      initialValues={initialValues}
      validationSchema={checkoutSchema}
      onSubmit={handleFormSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <Card1 mb="2rem">
            <Typography fontWeight="600" mb="1rem">
              Address
            </Typography>
            <Grid container spacing={1}>
              <Grid item sm={12} xs={12}>
                  <FlexBox className="row" >
                    <TextField
                    name="firstName"
                    label="First Name"
                    fullwidth
                    mb="1rem"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName || ""}
                    errorText={touched.name && errors.name}
                    />
                    <TextField
                    name="lastName"
                    label="Last Name"
                    fullwidth
                    mb="1rem"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName || ""}
                    errorText={touched.name && errors.name}
                    />
                  </FlexBox>
              </Grid>

              <Grid item sm={12} xs={12}>
                <FlexBox className="row">
                    <TextField
                    name="address1"
                    label="Address Line 1"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address1 || ""}
                    errorText={
                        touched.address1 && errors.address1
                    }
                    />
                    <TextField
                    name="address2"
                    label="Address Line 2"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address2 || ""}
                    errorText={
                        touched.address2 && errors.address2
                    }
                    />
                </FlexBox>
                </Grid>

              <Grid item sm={12} xs={12}>
                <FlexBox className="row">
                    <TextField
                    name="state"
                    label="State"
                    type="state"
                    fullwidth
                    mb="1rem"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.state || ""}
                    errorText={touched.state && errors.state}
                    />
                    <TextField
                    name="zip"
                    label="Zip Code"
                    type="number"
                    fullwidth
                    mb="1rem"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.zip || ""}
                    errorText={touched.zip && errors.zip}
                    />
                </FlexBox>
            </Grid>

            
            <Grid item sm={12} xs={12}>
                <FlexBox className="row">
                    <TextField
                    name="city"
                    label="City"
                    fullwidth
                    mb="1rem"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.city || ""}
                    errorText={
                        touched.city && errors.city
                    }
                    />
                    <TextField
                    name="contact"
                    label="Phone Number"
                    fullwidth
                    mb="1rem"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.contact || ""}
                    errorText={
                        touched.contact && errors.contact
                    }
                    />
                </FlexBox>
            </Grid>

            <Grid item sm={6} xs={12}>
                <Select
                  mb="1rem"
                  label="Country"
                  defaultValue={{ label: "India", value: "IN" }}
                  options={countryList}
                  value={values.country}
                  onChange={(country) => {
                    setFieldValue("country", country);
                  }}
                  errorText={
                    touched.country && errors.country
                  }
                />
              </Grid>
            </Grid>
                <Button
                    type="submit"
                    marginTop={20}
                    variant="contained"
                    color="primary"
                    fullwidth
                    >
                    Submit
                </Button>
          </Card1>
        </form>
      )}
    </Formik>
    </StyledAddressDialog>
    </Modal>
  );
};

const initialValues = {
  firstName: "",
  lastName: "",
  state: "",
  contact: "",
  city: "",
  zip: "",
  country: {label:"India", value:"IN"},
  address1: "",
  address2: "",
};

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  state: yup.string().required("required"),
  city: yup.string().required("required"),
  contact: yup.string().required("required"),
  zip: yup.string().required("required"),
  country: yup.object().required("required"),
  address1: yup.string().required("required"),
});

CheckoutAddressDialog.layout = CheckoutAddressDialog;

export default CheckoutAddressDialog;