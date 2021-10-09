import React, { Fragment, useState } from "react";
// import * as yup from "yup";
import Typography from "../Typography";
import Grid from "../grid/Grid";
import Button from "../buttons/Button";
import Link from "next/link";
// import { useRouter } from "next/router";
import { Card1 } from "../Card1";
import Radio from "../radio/Radio";
import { useRouter } from "next/router";
import { checoutCompletePaymentSuccess, createRazorpayPayment } from "@/store/checkout";
import { PaymentGateway } from "@/generated/graphql";
// import useWindowSize from "../../hooks/useWindowSize";

declare var Razorpay;

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
type PartialPaymentGateway = DeepPartial<PaymentGateway>
interface PaymentFormProps {
  availablePaymentGateways: PartialPaymentGateway[];
  firstName: string;
  lastName: string;
  reseller: string;
}
const PaymentForm: React.FC<PaymentFormProps> = ({ availablePaymentGateways, firstName, lastName, reseller }) => {
  const [paymentMethod, setPaymentMethod] = useState({
    id: "",
    name: "",
    config: {
      value: ""
    }
  });

  // const width = useWindowSize();
  // const router = useRouter();
  // const isMobile = width < 769;

  // const handleFormSubmit = async (values) => {
  //   console.log(values);
  //   router.push("/payment");
  // };
  const router = useRouter();

  const handlePaymentMethodChange = (gateway) => {
    setPaymentMethod(gateway);
  };
  const handleRazoryPay = async () => {
    const razorpayOrderId = await createRazorpayPayment({ gatewayId: paymentMethod.id })
    console.log(razorpayOrderId);

    try {
      const options = {
        key: paymentMethod.config.value, // Enter the Key ID generated from the Dashboard
        amount: "100", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        order_id: razorpayOrderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async function (response) {
          console.log(response);
          const responseString = JSON.stringify(response);
          checoutCompletePaymentSuccess({ razorpaySuccessResponse: responseString, reseller: reseller }).then(() => {
            router.push('/orders');
          });
          // ------ set loading of processing
          // setProcessingOrder(true);
          // ------ call our complete Checkout
          // await markPaymentSuccess(
          //   res,
          //   response.razorpay_payment_id,
          //   response.razorpay_signature,
          //   paymentMode
          // );
          // router.push('/orders');
        },
        modal: {
          ondismiss: function () {
            // 
            // Router.replace(`/order-received/${res.purchaseOrderId}`).then(() => window.scrollTo(0, 0));
          },
        },
        prefill: {
          name: `${firstName} ${lastName}`,
          contact: "+919999123657",
          // email: "test12@gmail.com"
        },
      };
      var rzp1 = new Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        console.log("payment failed");
        console.log(response.error.code);
        console.log(response.error.description);
        console.log(response.error.source);
        console.log(response.error.step);
        console.log(response.error.reason);
        console.log(response.error.metadata.order_id);
        console.log(response.error.metadata.payment_id);
      });
      rzp1.open();
    } catch (e) {
      console.log('something went wrong during razorpay payment');
      // show Error
      // addToast("Error during payment. Please retry after sometime.", ToastType.error);
    }

    // checkout Razorpay open
    // on payment successfull completeion
    // router.push('/orders');
  }

  const handlePlaceOrder = () => {
    if (paymentMethod.name === 'Razorpay') {
      handleRazoryPay();
    } else {
      //
    }
  }

  return (
    <Fragment>
      <Card1 mb="2rem">
        {availablePaymentGateways?.map((gateway) => {
          return <>
            <Radio
              name={gateway.name}
              mb="1.5rem"
              color="secondary"
              checked={paymentMethod.name === gateway.name}
              label={
                <Typography ml="6px" fontWeight="600" fontSize="18px">
                  {gateway.name}
                </Typography>
              }
              onChange={() => { handlePaymentMethodChange(gateway) }}
            />
            {/* <Divider mb="1.25rem" mx="-2rem" /> */}
          </>
        })}
        {/* <Radio
          name="razorpay"
          mb="1.5rem"
          color="secondary"
          checked={paymentMethod === "razorpay"}
          label={
            <Typography ml="6px" fontWeight="600" fontSize="18px">
              Pay with Razorpay
            </Typography>
          }
          onChange={handlePaymentMethodChange}
        />

        <Divider mb="1.25rem" mx="-2rem" />

        <Radio
          name="cod"
          color="secondary"
          checked={paymentMethod === "cod"}
          label={
            <Typography ml="6px" fontWeight="600" fontSize="18px">
              Cash On Delivery
            </Typography>
          }
          onChange={handlePaymentMethodChange}
        /> */}
      </Card1>

      <Grid container spacing={7}>
        <Grid item sm={6} xs={12}>
          <Link href="/checkout">
            <Button variant="outlined" color="primary" type="button" fullwidth>
              Back to checkout details
            </Button>
          </Link>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Button variant="contained" color="primary" type="submit" fullwidth onClick={handlePlaceOrder}>
            Place Order
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default PaymentForm;
