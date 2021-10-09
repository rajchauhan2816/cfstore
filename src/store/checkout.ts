import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// import { Checkout } from "@/generated/graphql";
import { useCheckoutCreateMutaion } from "@/api/checkout";
import { store } from "./index"
import { useCheckoutCompleteMutaion, useCheckoutPaymentCreateMutaion } from "@/api/payment";
import { Checkout } from "@/generated/graphql";

// type DeepPartial<T> = {
//     [P in keyof T]?: DeepPartial<T[P]>;
// };

// type PartialCheckout = DeepPartial<Checkout>

/**
 * Async thunk that create checkout.
 */
enum CountryCode {
    In = 'IN'
}
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


/**
 * async thunk that create payment
 */
const createRazorpayPayment = async ({ gatewayId }: { gatewayId: string }) => {
    const { accountDetails: { accountDetails: { checkoutToken } } } = store.getState();
    const { data, error: _ } = await useCheckoutPaymentCreateMutaion({ checkoutPaymentCreateInput: { gateway: gatewayId }, checkoutPaymentCreateToken: checkoutToken });
    const { token } = data.checkoutPaymentCreate.payment;
    // TODO: also send the Error
    return token;
}

const checoutCompletePaymentSuccess = async ({ razorpaySuccessResponse, reseller }: { razorpaySuccessResponse: string, reseller: string }) => {
    const { datePincode: { deliveryDate }, accountDetails: { accountDetails: { checkoutToken } } } = store.getState();
    const { data, error: _ } = await useCheckoutCompleteMutaion({ checkoutCompleteDeliveryDate: deliveryDate, checkoutCompleteToken: checkoutToken, thumbnailSize: 80, checkoutCompletePaymentData: razorpaySuccessResponse, checkoutCompleteResellerId: reseller });
    const { order } = data.checkoutComplete;
    // TODO: also send the Error
    return order;
}


/**
 * Inteface for CheckoutCreate.
 */


type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};

type PartialCheckout = DeepPartial<Checkout>
interface CheckoutState {
    checkout: PartialCheckout;
    loading: boolean;
    error?: string;
}

// Initial state
const initialState: CheckoutState = {
    loading: false,
    checkout: {},
};


export { createRazorpayPayment, checoutCompletePaymentSuccess };

// export default checkoutSlice.reducer;
