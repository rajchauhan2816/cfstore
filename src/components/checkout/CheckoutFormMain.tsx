import { useAppDispatch, useAppSelector } from "@/app/hooks";
import Avatar from "@component/avatar/Avatar";
import Box from "@component/Box";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import { Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import * as yup from "yup";
import Button from "../buttons/Button";
import { Card1 } from "../Card1";
import Divider from "../Divider";
import Grid from "../grid/Grid";
import Icon from "../icon/Icon";
import Typography, { H6, Paragraph } from "../Typography";
import Link from "next/link";
import { attachShippingAddress, attachBillingAddress } from "@/store/checkoutAddress";
import { DeepPartial } from ".pnpm/redux@4.1.1/node_modules/redux";

interface Address {
    firstName: string;
    lastName: string;
    streetAddress1: string;
    streetAddress2: string;
    city: string;
    postalCode: string;
    phone: string;
    countryArea: string;
}
interface CheckoutFormMainProps {
    addresses: DeepPartial<Address>[];
}

const CheckoutFormMain: React.FC<CheckoutFormMainProps> = ({ addresses }) => {
    const router = useRouter();
    const handleFieldValueChange = (value, fieldName, setFieldValue) => () => {
        setFieldValue(fieldName, value.address);
        setFieldValue(fieldName + '_raw', value.rawAddress);
    };
    const dispatch = useAppDispatch();
    const userAddress = addresses.map(address => {
        return {
            header: address.firstName + " " + address.lastName,
            address: address.streetAddress1 + ", " + address.streetAddress2 + ", " + address.city + ", " + address.countryArea + ", " + address.postalCode,
            contact: address.phone,
            rawAddress: address
        }
    });

    /* -------------- Attach Shipping and Billing Address to Token -------------- */
    const handleFormSubmit = async (values) => {
        const shippingAddress = values.shipping_address_raw;
        const billingAddress = values.billing_address_raw;
        console.log(shippingAddress);
        console.log(billingAddress);
        dispatch(attachShippingAddress({
            firstName: shippingAddress.firstName,
            lastName: shippingAddress.lastName,
            streetAddress1: shippingAddress.streetAddress1,
            streetAddress2: shippingAddress.streetAddress2,
            city: shippingAddress.city,
            countryArea: shippingAddress.countryArea,
            postalCode: shippingAddress.postalCode,
            phone: shippingAddress.phone,
        }));
        dispatch(attachBillingAddress({
            firstName: billingAddress.firstName,
            lastName: billingAddress.lastName,
            streetAddress1: billingAddress.streetAddress1,
            streetAddress2: billingAddress.streetAddress2,
            city: billingAddress.city,
            countryArea: billingAddress.countryArea,
            postalCode: billingAddress.postalCode,
            phone: billingAddress.phone,
        }));
        router.push("/payment");
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
                handleSubmit,
                setFieldValue,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Card1 mb="1.5rem">
                        <FlexBox alignItems="center" mb="1.75rem">
                            <Avatar
                                bg="primary.main"
                                size={32}
                                color="primary.text"
                                mr="0.875rem"
                            >
                                1
                            </Avatar>
                            <Typography fontSize="20px">Delivery Details</Typography>
                        </FlexBox>

                        <Box mb="1.75rem">
                            <Grid container spacing={6}>
                                <Grid item sm={6} xs={12}>
                                    <Typography mb="0.75rem" fontWeight="600">Delivery Date</Typography>
                                    <Typography mb="0.75rem" >{"2021-10-06"}</Typography>
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <Typography mb="0.75rem" fontWeight="600">Delivery Pincode</Typography>
                                    <Typography mb="0.75rem">{"560044"}</Typography>
                                </Grid>
                            </Grid>
                        </Box>

                        {/* <Typography mb="0.75rem" fontWeight="600">Select Shipping Address</Typography> */}
                        <FlexBox alignItems="center" mb="1.75rem">
                            <Avatar
                                bg="primary.main"
                                size={32}
                                color="primary.text"
                                mr="0.875rem"
                            >
                                2
                            </Avatar>
                            <Typography fontSize="20px">Shipping Address</Typography>
                        </FlexBox>
                        <Grid container spacing={6} key="shipping">
                            {userAddress.map((item, ind) => (
                                <Grid item md={4} sm={6} xs={12} key={ind}>
                                    <Card
                                        bg="gray.200"
                                        p="1rem"
                                        boxShadow="none"
                                        border="1px solid"
                                        minHeight="80px"
                                        cursor="pointer"
                                        borderColor={
                                            item.address === values.shipping_address
                                                ? "primary.main"
                                                : "transparent"
                                        }
                                        onClick={handleFieldValueChange(
                                            item,
                                            "shipping_address",
                                            setFieldValue
                                        )}
                                    >
                                        <H6 mb="0.25rem">{item.header}</H6>
                                        <Paragraph color="gray.700">{item.address}</Paragraph>
                                        <Paragraph color="gray.700">{item.contact}</Paragraph>
                                    </Card>


                                </Grid>
                            ))}
                            <Grid item md={4} sm={6} xs={12}>

                                <Card
                                    bg="gray.200"
                                    p="1rem"
                                    boxShadow="none"
                                    border="2px solid"
                                    cursor="pointer"
                                    minHeight="80px"
                                    borderColor={"transparent"}
                                >
                                    <FlexBox alignItems="center" justifyContent="center" height="80px" >
                                        <Icon size="50px" color="primary">{"add-address"}</Icon>
                                    </FlexBox>
                                </Card>
                            </Grid>
                        </Grid>
                        <Divider height="15px" backgroundColor="transparent"></Divider>
                        {/* <Typography mb="0.75rem" fontWeight="600">Select Billing Address</Typography> */}
                        <FlexBox alignItems="center" mb="1.75rem">
                            <Avatar
                                bg="primary.main"
                                size={32}
                                color="primary.text"
                                mr="0.875rem"
                            >
                                3
                            </Avatar>
                            <Typography fontSize="20px">Billing Address</Typography>
                        </FlexBox>
                        <Grid container spacing={6} key="billing">
                            {userAddress.map((item, ind) => (
                                <Grid item md={4} sm={6} xs={12} key={ind}>
                                    <Card
                                        bg="gray.200"
                                        p="1rem"
                                        boxShadow="none"
                                        border="1px solid"
                                        cursor="pointer"
                                        minHeight="80px"
                                        borderColor={
                                            item.address === values.billing_address
                                                ? "primary.main"
                                                : "transparent"
                                        }
                                        onClick={handleFieldValueChange(
                                            item,
                                            "billing_address",
                                            setFieldValue
                                        )}
                                    >
                                        <H6 mb="0.25rem">{item.header}</H6>
                                        <Paragraph color="gray.700">{item.address}</Paragraph>
                                        <Paragraph color="gray.700">{item.contact}</Paragraph>
                                    </Card>
                                </Grid>
                            ))}
                            <Grid item md={4} sm={6} xs={12}>
                                <Card
                                    bg="gray.200"
                                    p="1rem"
                                    boxShadow="none"
                                    border="2px solid"
                                    cursor="pointer"
                                    borderColor={"transparent"}
                                    minHeight="80px"
                                    alignContent="center"
                                    justifyContent="center"
                                >

                                    <FlexBox alignItems="center" justifyContent="center" height="80px" >
                                        <Icon size="50px" color="primary">{"add-address"}</Icon>
                                    </FlexBox>
                                </Card>
                            </Grid>
                        </Grid>
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
    shipping_address: "",
    billing_address: "",
    shipping_address_raw: {},
    billing_address_raw: {},
};

const checkoutSchema = yup.object().shape({
    shipping_address: yup.string().required("required"),
    billing_address: yup.string().required("required"),
});

export default CheckoutFormMain;
