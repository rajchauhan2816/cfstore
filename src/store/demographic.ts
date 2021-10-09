import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DemographicState {
    channel: string;
    affiliateId: string;
    resellerId: string;
}

const initialState: DemographicState = {
    channel: "",
    affiliateId: "",
    resellerId: "",
};

export const demographicSlice = createSlice({
    name: "demographic",
    initialState,
    reducers: {
        setDemographic: (state, { payload: { channel,affiliateId,resellerId } }: PayloadAction<{ channel: string; affiliateId: string, resellerId:string }>) => {
            state.channel = channel;
            state.affiliateId = affiliateId;
            state.resellerId = resellerId;
        },
    },
});

export const { setDemographic } = demographicSlice.actions;

export default demographicSlice.reducer;
