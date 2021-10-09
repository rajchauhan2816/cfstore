import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Collection } from "@/generated/graphql";
import { useCollectionsQuery } from "@/api/collection";
import { store } from "./index";

type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};

type PartialCollection = DeepPartial<Collection>

/**
 * Async thunk that fetches collections.
 */
const fetchCollections = createAsyncThunk(
    "collections/fetch",
    async () => {
        const { demographic: { channel }, datePincode: { deliveryDate, pincode } } = store.getState();
        if (channel && deliveryDate && pincode) {
            const { data } = await useCollectionsQuery({ collectionsFirst: 10, productsFirst: 10, collectionsChannel: channel, collectionsDate: deliveryDate, collectionsPincode: pincode });
            const collections = data.collections.edges.map((collection) => collection.node)
            return collections;
        }
    }
);

/**
 * Inteface for Collections.
 */
interface CollectionState {
    collections: Array<PartialCollection>;

    loading: boolean;

    error?: string;
}

// Initial state
const initialState: CollectionState = {
    loading: false,
    collections: [],
};

/**
 * Slice for product variants.
 */
export const collectionSlice = createSlice({
    name: "collection",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchCollections.pending, state => {
            state.loading = true;
        });
        builder.addCase(fetchCollections.fulfilled, (state, action) => {
            if (action.payload) {
                state.collections = action.payload;
            }
            state.loading = false;
        });
        builder.addCase(fetchCollections.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        });
    },
});

export { fetchCollections };

export default collectionSlice.reducer;
