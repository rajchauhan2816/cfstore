import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useProductVariantsQuery } from "@/api";
import { ProductVariant } from "@/generated/graphql";
import { store } from "./index";

type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};

type PartialProductVariant = DeepPartial<ProductVariant>

/**
 * Async thunk that fetches Product Variants.
 */
const fetchProductVariants = createAsyncThunk(
    "productVariants/fetch",
    async ({ categories }: { categories: string[] }) => {
        const { datePincode, demographic } = store.getState();
        const { deliveryDate, pincode } = datePincode;
        const { channel } = demographic;
        const { data } = await useProductVariantsQuery({ productVariantsChannel: channel, productVariantsDate: deliveryDate, productVariantsFirst: 10, productVariantsPincode: pincode, productVariantsFilter: { categories: categories } });
        const variants = data.productVariants.edges.map(x => x.node);
        return variants;
    }
);

const searchProductVariants = createAsyncThunk(
    "productVariants/search",
    async ({ search }: { search: string }) => {
        const { datePincode, demographic } = store.getState();
        const { deliveryDate, pincode } = datePincode;
        const { channel } = demographic;
        const { data } = await useProductVariantsQuery({ productVariantsChannel: channel, productVariantsDate: deliveryDate, productVariantsFirst: 10, productVariantsPincode: pincode, productVariantsFilter: { search: search } });
        const variants = data.productVariants.edges.map(x => x.node);
        return variants;
    }
);

const realTimeSearchVariants = async ({ search }: { search: string }) => {
    const { datePincode, demographic } = store.getState();
    const { deliveryDate, pincode } = datePincode;
    const { channel } = demographic;
    const { data } = await useProductVariantsQuery({ productVariantsChannel: channel, productVariantsDate: deliveryDate, productVariantsFirst: 10, productVariantsPincode: pincode, productVariantsFilter: { search: search } });
    const variants = data.productVariants.edges.map(x => x.node);
    return variants.map(variant => {
        return {
            id: variant.id,
            name: variant.name,
        }
    });
}

/**
 * Inteface for ProductVariant.
 */
interface ProductVariantState {
    variants: Array<PartialProductVariant>;

    loading: boolean;

    error?: string;
}

// Initial state
const initialState: ProductVariantState = {
    loading: false,
    variants: [],
};

/**
 * Slice for product variants.
 */
export const productVariantsSlice = createSlice({
    name: "productVariants",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchProductVariants.pending, state => {
            state.loading = true;
        });
        builder.addCase(fetchProductVariants.fulfilled, (state, action) => {
            state.variants = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchProductVariants.rejected, (state, action) => {
            state.error = action.error.message;
            state.variants = []
            state.loading = false;
        });
        // for search product variants
        builder.addCase(searchProductVariants.pending, state => {
            state.loading = true;
        });
        builder.addCase(searchProductVariants.fulfilled, (state, action) => {
            state.variants = action.payload;
            state.loading = false;
        });
        builder.addCase(searchProductVariants.rejected, (state, action) => {
            state.error = action.error.message;
            state.variants = []
            state.loading = false;
        });
    },
});

export { fetchProductVariants, searchProductVariants, realTimeSearchVariants };

export default productVariantsSlice.reducer;
