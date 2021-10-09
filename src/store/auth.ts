import { useAccoutUpdateMutation } from "@/api/account-update";
import { useGenerateOtpMutation, useValidateOtpMutation } from "@/api/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/**
 * Async function that generates otp.
 */
const generateOtp = async ({ mobile }: { mobile: string }) => {
    const { data } = await useGenerateOtpMutation({ generateOtpMobile: mobile });
    return {
        authCode: data.generateOtp.authCode,
        errors: data.generateOtp.errors.map(e => e.message)
    };
}

/**
 * Async thunk that validates otp.
 */
const validateOtp = createAsyncThunk('validateOtp/fetch', async ({ mobile, authCode, otp }: { authCode: string, mobile: string, otp: string }) => {
    const { data } = await useValidateOtpMutation({ validateOtpAuthCode: authCode, validateOtpMobile: mobile, validateOtpOtp: otp });
    return data.validateOtp;
})

/**
 * Async thunk that updates profile.
 */
const updateUser = createAsyncThunk(
    "updateUser/mutate",
    async ({ firstName, lastName }: { firstName: string; lastName: string }) => {
        const { data } = await useAccoutUpdateMutation({ accountUpdateInput: { firstName, lastName } });
        const user = data.accountUpdate.user;
        return user;
    }
);


/**
 * Interface for AuthState
 */
interface AuthState {
    /**
     * Loading for validating OTP
     */
    loading: boolean;

    /**
     * GraphQL or Network errors for Validating OTP
     */
    error: string;

    /**
     * Authentication Token Expires after 1min
     */
    token: string;

    /**
     * Refresh Token Expires after 1 hour
     */
    refreshToken: string;

    /**
     * User object
     */
    user: {
        firstName: string;
        lastName: string;
        mobile?: string;
        id?: string;
    }

    /**
     * Getter for isLoggedIn
     */
    isLoggedIn: boolean;
}

const initialState: AuthState = {
    loading: false,
    token: "",
    refreshToken: "",
    user: {
        firstName: "",
        lastName: "",
        mobile: "",
        id: "",
    },
    error: "",
    isLoggedIn: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        removeError(state) {
            state.error = ''
        },
        logout(state) {
            state.token = '';
            state.refreshToken = '';
            state.user = {
                firstName: "",
                lastName: "",
                mobile: "",
                id: "",
            };
            state.isLoggedIn = false;
        },
    },
    extraReducers: builder => {
        /**
         * Reducer handles Valiadte OTP
         */
        builder.addCase(validateOtp.pending, state => {
            state.loading = true;
        });
        builder.addCase(validateOtp.fulfilled, (state, action) => {
            const { errors, token, refreshToken, user } = action.payload
            if (errors.length > 0) {
                state.error = errors[0].message;
                state.loading = false;
                return
            }

            // Set token and refresh token
            state.token = token;
            state.refreshToken = refreshToken;
            state.user = user;
            state.isLoggedIn = true;
            state.loading = false;

            // Set the token in local storage
            localStorage.setItem('token', token);
        });

        builder.addCase(validateOtp.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        });
        /**
         * Reducer handles Update Profile
         */
        builder.addCase(updateUser.pending, state => {
            state.loading = true;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            console.log("object");
            const { firstName, lastName } = action.payload
            state.user.firstName = firstName
            state.user.lastName = lastName
            state.loading = false;
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        });
    },
})

export const { removeError, logout } = authSlice.actions;

export { generateOtp, validateOtp, updateUser };

export default authSlice.reducer;