import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import * as yup from "yup";
import countryList from "../../data/countryList";
import Button from "../buttons/Button";
import { Card1 } from "../Card1";
import CheckBox from "../CheckBox";
import Grid from "../grid/Grid";
import Select from "../Select";
import TextField from "../text-field/TextField";
import Typography from "../Typography";

const CheckoutForm = () => {
  const [sameAsShipping, setSameAsShipping] = useState(false);
  const router = useRouter();

  const handleFormSubmit = async (values) => {
    console.log(values);
    const shippingAddress = {
      firstName: values.shipping_firstName,
      lastName: values.shipping_lastName,
      streetAddress1: values.shipping_address1,
      streetAddress2: values.shipping_address2,
      city: values.shipping_city,
      countryArea: values.shipping_state,
      postalCode: values.shipping_zip,
      phone: values.shipping_contact
    }
    const billingAddress =
    {
      firstName: values.billing_firstName,
      lastName: values.billing_lastName,
      streetAddress1: values.billing_address1,
      streetAddress2: values.billing_address2,
      city: values.billing_city,
      countryArea: values.billing_state,
      postalCode: values.billing_zip,
      phone: values.billing_contact
    }
    console.log("shippingAddress", shippingAddress);
    console.log("billing", billingAddress);
    // dispatch(createCheckout({
    //   shippingAddress,
    //   billingAddress
    // }));
    router.push("/payment");
  };

  const handleCheckboxChange = (
    values: typeof initialValues,
    setFieldValue
  ) => ({ target: { checked } }) => {
    setSameAsShipping(checked);
    setFieldValue("same_as_shipping", checked);
    setFieldValue("billing_firstName", checked ? values.shipping_firstName : "");
    setFieldValue("billing_lastName", checked ? values.shipping_lastName : "");
    setFieldValue("billing_contact", checked ? values.shipping_contact : "");
    setFieldValue("billing_zip", checked ? values.shipping_zip : "");
    setFieldValue("billing_city", checked ? values.shipping_city : "");
    setFieldValue("billing_state", checked ? values.shipping_state : "");
    setFieldValue("billing_address1", checked ? values.shipping_address1 : "");
    setFieldValue("billing_address2", checked ? values.shipping_address2 : "");
  };

  return (
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
              Shipping Address
            </Typography>

            <Grid container spacing={7} sm={3}>
              <Grid item sm={6} xs={12}>
                <TextField
                  name="shipping_firstName"
                  label="First Name"
                  fullwidth
                  mb="1rem"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.shipping_firstName || ""}
                  errorText={touched.shipping_firstName && errors.shipping_firstName}
                />
                <TextField
                  name="shipping_address1"
                  label="Address Line 1"
                  fullwidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.shipping_address1 || ""}
                  errorText={
                    touched.shipping_address1 && errors.shipping_address1
                  }
                />
                <TextField
                  name="shipping_state"
                  label="State"
                  type="state"
                  fullwidth
                  mb="1rem"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.shipping_state || ""}
                  errorText={touched.shipping_state && errors.shipping_state}
                />
                <TextField
                  name="shipping_zip"
                  label="Zip Code"
                  type="number"
                  fullwidth
                  mb="1rem"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.shipping_zip || ""}
                  errorText={touched.shipping_zip && errors.shipping_zip}
                />
                <Select
                  mb="1rem"
                  label="Country"
                  defaultValue={{ label: "India", value: "IN" }}
                  options={countryList}
                  value={values.shipping_country}
                  onChange={(country) => {
                    setFieldValue("shipping_country", country);
                  }}
                  errorText={
                    touched.shipping_country && errors.shipping_country
                  }
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  name="shipping_lastName"
                  label="Last Name"
                  fullwidth
                  mb="1rem"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.shipping_lastName || ""}
                  errorText={touched.shipping_lastName && errors.shipping_lastName}
                />
                <TextField
                  name="shipping_address2"
                  label="Address Line 2"
                  fullwidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.shipping_address2 || ""}
                  errorText={
                    touched.shipping_address2 && errors.shipping_address2
                  }
                />
                <TextField
                  name="shipping_city"
                  label="City"
                  fullwidth
                  mb="1rem"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.shipping_city || ""}
                  errorText={
                    touched.shipping_city && errors.shipping_city
                  }
                />
                <TextField
                  name="shipping_contact"
                  label="Phone Number"
                  fullwidth
                  mb="1rem"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.shipping_contact || ""}
                  errorText={
                    touched.shipping_contact && errors.shipping_contact
                  }
                />
              </Grid>
            </Grid>
          </Card1>

          <Card1 mb="2rem">
            <Typography fontWeight="600" mb="1rem">
              Billing Address
            </Typography>

            <CheckBox
              label="Same as shipping address"
              color="secondary"
              mb={sameAsShipping ? "" : "1rem"}
              onChange={handleCheckboxChange(values, setFieldValue)}
            />

            {!sameAsShipping && (
              <Grid container spacing={7}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    name="billing_firstName"
                    label="First Name"
                    fullwidth
                    mb="1rem"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.billing_firstName || ""}
                    errorText={touched.billing_firstName && errors.billing_firstName}
                  />
                  <TextField
                    name="billing_address1"
                    label="Address Line 1"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.billing_address1 || ""}
                    errorText={
                      touched.billing_address1 && errors.billing_address1
                    }
                  />
                  <TextField
                    name="billing_state"
                    label="State"
                    type="state"
                    fullwidth
                    mb="1rem"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.billing_state || ""}
                    errorText={touched.billing_state && errors.billing_state}
                  />
                  <TextField
                    name="billing_zip"
                    label="Zip Code"
                    type="number"
                    fullwidth
                    mb="1rem"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.billing_zip || ""}
                    errorText={touched.billing_zip && errors.billing_zip}
                  />
                  <Select
                    mb="1rem"
                    label="Country"
                    defaultValue={{ label: "India", value: "IN" }}
                    options={countryList}
                    value={values.billing_country}
                    onChange={(country) => {
                      setFieldValue("billing_country", country);
                    }}
                    errorText={
                      touched.billing_country && errors.billing_country
                    }
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    name="billing_lastName"
                    label="Last Name"
                    fullwidth
                    mb="1rem"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.billing_lastName || ""}
                    errorText={touched.billing_lastName && errors.billing_lastName}
                  />
                  <TextField
                    name="billing_address2"
                    label="Address Line 2"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.billing_address2 || ""}
                    errorText={
                      touched.billing_address2 && errors.billing_address2
                    }
                  />
                  <TextField
                    name="billing_city"
                    label="City"
                    fullwidth
                    mb="1rem"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.billing_city || ""}
                    errorText={
                      touched.billing_city && errors.billing_city
                    }
                  />
                  <TextField
                    name="billing_contact"
                    label="Phone Number"
                    fullwidth
                    mb="1rem"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.billing_contact || ""}
                    errorText={
                      touched.billing_contact && errors.billing_contact
                    }
                  />
                </Grid>
              </Grid>
            )}
          </Card1>

          <Grid container spacing={7}>
            <Grid item sm={6} xs={12}>
              <Link href="/cart">
                <Button
                  variant="outlined"
                  color="primary"
                  type="button"
                  fullwidth
                >
                  Back to Cart
                </Button>
              </Link>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullwidth
              >
                Proceed to Payment
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

const initialValues = {
  shipping_firstName: "",
  shipping_lastName: "",
  shipping_contact: "",
  shipping_zip: "",
  shipping_city: "",
  shipping_country: { label: "India", value: "IN" },
  shipping_state: "",
  shipping_address1: "",
  shipping_address2: "",

  billing_firstName: "",
  billing_lastName: "",
  billing_contact: "",
  billing_zip: "",
  billing_city: "",
  billing_country: { label: "India", value: "IN" },
  billing_state: "",
  billing_address1: "",
  billing_address2: "",
};

const checkoutSchema = yup.object().shape({
  // shipping_firstName: yup.string().required("required"),
  // shipping_contact: yup.string().required("${path} is required").test(
  //   "len",
  //   "Phone number must be exactly 10 characters long",
  //   (val) => val?.length <= 13
  // ),
  // shipping_zip: yup.string().required("required"),
  // shipping_city: yup.string().required("required"),
  // shipping_state: yup.string().required("required"),
  // shipping_address1: yup.string().required("required"),

  // billing_firstName: yup.string().required("required"),
  // billing_contact: yup.string().required("${path} is required").test(
  //   "len",
  //   "Phone number must be exactly 10 characters long",
  //   (val) => val?.length <= 13
  // ),
  // billing_zip: yup.string().required("required"),
  // billing_city: yup.string().required("required"),
  // billing_state: yup.string().required("required"),
  // billing_address1: yup.string().required("required"),
});

export default CheckoutForm;
