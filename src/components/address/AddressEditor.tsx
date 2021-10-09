import Button from "@component/buttons/Button";
import { Card1 } from "@component/Card1";
import Grid from "@component/grid/Grid";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TextField from "@component/text-field/TextField";
import { Formik } from "formik";
import Link from "next/link";
import React from "react";
import Typography from "@component/Typography";
import countryList from "../../data/countryList";
import { useRouter } from "next/router";

import * as yup from "yup";
import DashboardLayout from "../layout/CustomerDashboardLayout";
import Select from "../Select";
import { useAppSelector } from "@/app/hooks";
import { useAddressCreateMutation, useAddressUpdateMutation } from "@/api/address";

const AddressEditor = () => {
  const router = useRouter();
  const {query, isReady} = useRouter();
  const { addresses } = useAppSelector(store => store.accountDetails.accountDetails);
  let addressId;
  // TODO: IF Face Undefined Errors then use useEffect
  let address;
  if(isReady){
    const { id } = query;
    addressId = id;
    if(id!=="create"){
      address = addresses.find(address => address.id==id);
      initialValues.address1 = address.streetAddress1;
      initialValues.address2 = address.streetAddress2;
      initialValues.firstName = address.firstName;
      initialValues.lastName = address.lastName;
      initialValues.state = address.countryArea;
      initialValues.city = address.city;
      initialValues.zip = address.postalCode;
      initialValues.country = address.country.code;
      initialValues.contact = address.phone;
      console.log(address);
    }
    else{
      initialValues.address1 = "";
      initialValues.address2 = "";
      initialValues.firstName = "";
      initialValues.lastName = "";
      initialValues.state = "";
      initialValues.contact = "";
      initialValues.city = "";
      initialValues.zip = "";
      initialValues.country = "";
      initialValues.contact = "";
     }
  }

  const handleFormSubmit = async (values) => {
    console.log("Here in Form Submit ", values);
    if(initialValues.address1){
      // Update Mutation
      const res = await useAddressUpdateMutation({
        accountAddressUpdateId: addressId,
        accountAddressUpdateInput:{
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
      // TODO: Change this redirect when dispatch is added to idx
      //TODO: Error Handling 
      router.push("/");
      console.log("Edit Response",res);
    }
    else{
      // Create Mutation
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
      // TODO: Change this redirect when dispatch is added to idx
      //TODO: Error Handling
      router.push("/");
      console.log(response);
    }
  }

  return (
    <div>
      <DashboardPageHeader
        iconName="pin_filled"
        title={initialValues.address1?"Edit Address":"Add New Address"}
        button={
          <Link href="/address">
            <Button color="primary" bg="primary.light" px="2rem">
              Back to Address
            </Button>
          </Link>
        }
      />

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
            <Grid container spacing={7}>
              <Grid item sm={6} xs={12}>
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
              <Grid item sm={6} xs={12}>

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
              </Grid>
            </Grid>
          </Card1>
          <Button
            type="submit"
            marginTop={20}
            variant="contained"
            color="primary"
            fullwidth
          >
          Submit
        </Button>
        </form>
      )}
    </Formik>
    </div>
  );
};

const initialValues = {
  firstName: "",
  lastName: "",
  state: "",
  contact: "",
  city: "",
  zip: "",
  country: "",
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

AddressEditor.layout = DashboardLayout;

export default AddressEditor;
