// import { Checkout } from "@/generated/graphql";
import { store } from "./index"
import { useCheckoutCompleteMutaion, useCheckoutPaymentCreateMutaion } from "@/api/payment";

// type DeepPartial<T> = {
//     [P in keyof T]?: DeepPartial<T[P]>;
// };

// type PartialCheckout = DeepPartial<Checkout>

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



export { createRazorpayPayment, checoutCompletePaymentSuccess };

// export default checkoutSlice.reducer;
