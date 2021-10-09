import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Checkout } from "@/generated/graphql";
import { useCheckoutShippingAddressUpdateMutation, useCheckoutBillingAddressUpdateMutation } from "@/api/checkout";
import { store } from "./index";

type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};

type PartialCheckout = DeepPartial<Checkout>

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
 * Async thunk that attach shipping address to token.
 */
const attachShippingAddress = createAsyncThunk(
    "shippingAddress/attach",
    async (address: Address) => {
        const { accountDetails: { accountDetails: { checkoutToken } } } = store.getState();
        const { data, error } = await useCheckoutShippingAddressUpdateMutation({
            checkoutShippingAddressUpdateToken: checkoutToken, checkoutShippingAddressUpdateShippingAddress: {
                country: CountryCode.In,
                ...address
            }
        });
        console.log(error);
        const { checkout } = data.checkoutShippingAddressUpdate;
        return checkout;
    }
);

/**
 * Async thunk that attach billing address to token.
 */
const attachBillingAddress = createAsyncThunk(
    "billingAddress/attach",
    async (address: Address) => {
        const { accountDetails: { accountDetails: { checkoutToken } } } = store.getState();
        const { data } = await useCheckoutBillingAddressUpdateMutation({
            checkoutBillingAddressUpdateToken: checkoutToken, checkoutBillingAddressUpdateBillingAddress: {
                country: CountryCode.In,
                ...address
            }
        });
        const { checkout } = data.checkoutBillingAddressUpdate;
        return checkout;
    }
);

/**
 * Inteface for Collections.
 */
interface CollectionState {
    checkout: PartialCheckout;

    loading: boolean;

    error?: string;
}

// Initial state
const initialState: CollectionState = {
    loading: false,
    checkout: {},
};

/**
 * Slice for product variants.
 */
export const checkoutAddressSlice = createSlice({
    name: "checkoutAddress",
    initialState,
    reducers: {},
    extraReducers: ({ addCase }) => {
        addCase(attachShippingAddress.pending, state => {
            state.loading = true;
        });
        addCase(attachShippingAddress.fulfilled, (state, action) => {
            if (action.payload) {
                state.checkout = action.payload;
            }
            state.loading = false;
        });
        addCase(attachShippingAddress.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        });
        addCase(attachBillingAddress.pending, state => {
            state.loading = true;
        });
        addCase(attachBillingAddress.fulfilled, (state, action) => {
            if (action.payload) {
                state.checkout = action.payload;
            }
            state.loading = false;
        });
        addCase(attachBillingAddress.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        });
    },
});

export { attachShippingAddress, attachBillingAddress };

export default checkoutAddressSlice.reducer;
