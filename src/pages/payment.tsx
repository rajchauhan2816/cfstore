import { useCheckoutTokenDetailsQuery } from "@/api/checkout";
import { useAppSelector } from "@/app/hooks";
import React, { useEffect } from "react";
import Grid from "../components/grid/Grid";
import CheckoutNavLayout from "../components/layout/CheckoutNavLayout";
import PaymentForm from "../components/payment/PaymentForm";
import PaymentSummary from "../components/payment/PaymentSummary";

const Checkout = () => {
  const [paymentGateways, setPaymentGateways] = React.useState([]);
  const { resellerId } = useAppSelector(store => store.demographic);
  const { accountDetails: { firstName, lastName, checkoutToken } } = useAppSelector(store => store.accountDetails)
  useEffect(() => {
    useCheckoutTokenDetailsQuery({ token: checkoutToken }).then(res => {
      if (res.data)
        setPaymentGateways(res.data.checkout.availablePaymentGateways);
    })
  }, [JSON.stringify(paymentGateways)])
  return (
    <Grid container flexWrap="wrap-reverse" spacing={6}>
      <Grid item lg={8} md={8} xs={12}>
        <PaymentForm availablePaymentGateways={paymentGateways} firstName={firstName} lastName={lastName} reseller={resellerId} />
      </Grid>
      <Grid item lg={4} md={4} xs={12}>
        <PaymentSummary />
      </Grid>
    </Grid>
  );
};

Checkout.layout = CheckoutNavLayout;

export default Checkout;
