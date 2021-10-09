import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DatePincodeState {
    pincode: string;
    deliveryDate: string;
    isOpen: boolean;
}

const initialState: DatePincodeState = {
    pincode: "",
    deliveryDate: "",
    isOpen: false,
};

export const datePincodeSlice = createSlice({
    name: "datePincode",
    initialState,
    reducers: {
        setPincodeAndDate: (state, {payload:{date,pincode}}: PayloadAction<{pincode: string; date: string}>) => {
            state.pincode = pincode;
            state.deliveryDate = date;
            state.isOpen = false;
        },
        setIsOpen: (state, action: PayloadAction<boolean> ) => {
            state.isOpen = action.payload;
        }
    },
});

export const { setPincodeAndDate, setIsOpen } = datePincodeSlice.actions;

export default datePincodeSlice.reducer;
