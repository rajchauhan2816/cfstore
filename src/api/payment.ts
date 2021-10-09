import {
    CheckoutPaymentCreateMutationDocument, CheckoutPaymentCreateMutationMutationVariables,
    CheckoutCompleteMutationDocument, CheckoutCompleteMutationMutationVariables,
} from "@/generated/graphql";

import urqlClient from "./graphql";
/**
 *
 * @returns Checkout ID
 * @type Category
 */
export function useCheckoutPaymentCreateMutaion(variables: CheckoutPaymentCreateMutationMutationVariables) {
    return urqlClient.mutation(CheckoutPaymentCreateMutationDocument, variables, { requestPolicy: 'network-only' }).toPromise();
}


export function useCheckoutCompleteMutaion(variables: CheckoutCompleteMutationMutationVariables) {
    return urqlClient.mutation(CheckoutCompleteMutationDocument, variables, { requestPolicy: 'network-only' }).toPromise();
}