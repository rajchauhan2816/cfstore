import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchAccountDetails } from "@/store/account-details";
import React, { useEffect } from "react";
import CheckoutFormMain from "../components/checkout/CheckoutFormMain";
import CheckoutSummaryMain from "../components/checkout/CheckoutSummaryMain";
import Grid from "../components/grid/Grid";
import CheckoutNavLayout from "../components/layout/CheckoutNavLayout";

const Checkout = () => {
  const dispatch = useAppDispatch();
  const { accountDetails: { addresses } } = useAppSelector(store => store.accountDetails);
  useEffect(() => {
    dispatch(fetchAccountDetails());
  }, [JSON.stringify(addresses)]);
  return (
    <Grid container flexWrap="wrap-reverse" spacing={6}>
      <Grid item lg={8} md={8} xs={12}>
        <CheckoutFormMain addresses={addresses} />
      </Grid>
      <Grid item lg={4} md={4} xs={12}>
        <CheckoutSummaryMain />
      </Grid>
    </Grid>
  );
};

Checkout.layout = CheckoutNavLayout;

export default Checkout;
