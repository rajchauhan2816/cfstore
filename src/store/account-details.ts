import { store } from './index';
import { useAccountDetailsQuery } from "@/api/account-details";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from "@/generated/graphql";
type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};

type PartialAccountDetails = DeepPartial<User & { checkoutToken: string }>

/**
 * Async Function to Fetch Logged in Account Details.
 */
const fetchAccountDetails = createAsyncThunk(
    "accountDetails/fetch",
    async () => {
        console.log("Fetching account details");
        const { demographic: { channel }, datePincode: { deliveryDate, pincode } } = store.getState();
        const { data } = await useAccountDetailsQuery({ ordersFirst: 10, thumbnailSize: 80, checkoutTokensChannel: channel, checkoutTokensDate: deliveryDate, checkoutTokensPincode: pincode });
        return data.me;
    }

);

/**
 * Interface for Account Details
 */
interface AccountDetailsState {
    accountDetails: PartialAccountDetails;

    isFirstTime: boolean;

    loading: boolean;

    error?: string;
}

/**
 * Initial State
 */
const initialState: AccountDetailsState = {
    loading: false,
    isFirstTime: true,
    accountDetails: {
        addresses: [],
        checkoutTokens: [],
        checkoutToken: "",
        firstName: "",
        lastName: "",
        isActive: false,
        mobile: "",
    },
}

/**
 *  Slice of Account Details
 */
export const accountDetailsSlice = createSlice({
    name: "accountDetails",
    initialState,
    reducers: {
        setCheckoutToken: (state, action) => {
            state.accountDetails.checkoutToken = action.payload;
        },
        clearAccountDetails: (state) => {
            // Reset state
            state.accountDetails = initialState.accountDetails;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchAccountDetails.pending, state => {
            state.loading = true;
        });
        builder.addCase(fetchAccountDetails.fulfilled, (state, action) => {
            if (action.payload) {
                state.accountDetails = action.payload;

                // Extracting the checkout token from the account details
                if (action.payload.checkoutTokens.length > 0) {
                    state.accountDetails.checkoutToken = action.payload.checkoutTokens[0].token;
                }

                if (state.isFirstTime) {
                    console.log("Changing first time" + state.isFirstTime);
                    state.isFirstTime = false;
                }
            }
            state.loading = false;
        });
        builder.addCase(fetchAccountDetails.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        });
    },
});

export { fetchAccountDetails };

export const { setCheckoutToken, clearAccountDetails } = accountDetailsSlice.actions;

export default accountDetailsSlice.reducer;