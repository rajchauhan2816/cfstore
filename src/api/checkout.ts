import {
    CheckoutCreateMutationDocument, CheckoutCreateMutationMutationVariables,
    CheckoutLinesUpdateMutationDocument, CheckoutLinesUpdateMutationMutationVariables,
    CheckoutTokenDetailsDocument, CheckoutTokenDetailsQueryVariables,
    CheckoutShippingAddressUpdateMutationDocument, CheckoutShippingAddressUpdateMutationMutationVariables,
    CheckoutBillingAddressUpdateMutationDocument, CheckoutBillingAddressUpdateMutationMutationVariables,
} from "@/generated/graphql";

import { mutation, query } from "./graphql";
/**
 *
 * @returns Checkout ID
 * @type Category
 */
export function useCheckoutCreateMutaion(variables: CheckoutCreateMutationMutationVariables) {
    return mutation(CheckoutCreateMutationDocument, variables, { requestPolicy: 'network-only' }).toPromise();
}

/**
 * 
 * @param variables CheckoutLinesUpdateMutationMutationVariables
 * @returns checkoutlinesupdate
 */
export function useCheckoutLinesUpdateMutation(variables: CheckoutLinesUpdateMutationMutationVariables) {
    return mutation(CheckoutLinesUpdateMutationDocument, variables, { requestPolicy: 'network-only' }).toPromise();
}

/**
 *
 * @param variables CheckoutTokenDetailsQueryVariables
 * @returns CheckoutDetails
 */

export function useCheckoutTokenDetailsQuery(variables: CheckoutTokenDetailsQueryVariables) {
    return query(CheckoutTokenDetailsDocument, variables, { requestPolicy: 'network-only' }).toPromise();
}

/**
 *
 * @param variables CheckoutShippingAddressUpdateMutationMutationVariables
 * @returns totalPrice
 */

export function useCheckoutShippingAddressUpdateMutation(variables: CheckoutShippingAddressUpdateMutationMutationVariables) {
    return mutation(CheckoutShippingAddressUpdateMutationDocument, variables, { requestPolicy: 'network-only' }).toPromise();
}

/**
 *
 * @param variables CheckoutBillingAddressUpdateMutationMutationVariables
 * @returns totalPrice
 */

export function useCheckoutBillingAddressUpdateMutation(variables: CheckoutBillingAddressUpdateMutationMutationVariables) {
    return mutation(CheckoutBillingAddressUpdateMutationDocument, variables, { requestPolicy: 'network-only' }).toPromise();
}