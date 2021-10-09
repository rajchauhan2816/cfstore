import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Category } from "@/generated/graphql";
import { useCategoriesQuery } from "@/api/category";

type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};

type PartialCategory = DeepPartial<Category>

/**
 * Async thunk that fetches categories.
 */
const fetchCategories = createAsyncThunk(
    "categories/fetch",
    async () => {
        const { data } = await useCategoriesQuery();
        const categories = data.categories.edges.map((x)=> x.node);
        return categories;
    }
);

/**
 * Inteface for Category.
 */
interface CategoryState {
    categories: Array<PartialCategory>;

    loading: boolean;

    error?: string;
}

// Initial state
const initialState: CategoryState = {
    loading: false,
    categories: [],
};

/**
 * Slice for product variants.
 */
export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchCategories.pending, state => {
            state.loading = true;
        });
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        });
    },
});

export { fetchCategories };

export default categorySlice.reducer;
