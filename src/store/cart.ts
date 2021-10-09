import { setCheckoutToken } from '@/store/account-details';
import { useCheckoutCreateMutaion, useCheckoutLinesUpdateMutation, useCheckoutTokenDetailsQuery } from "@/api/checkout";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { store } from '@/store'
import { cloneDeep } from 'lodash'

type Item = { id: string, name: string, imgUrl: string, price: number, qty: number }

const updateTokenCart = createAsyncThunk(
    'cart/updateCart',
    async (items: Item[]) => {
        const { accountDetails: { accountDetails: { checkoutToken } } } = store.getState()
        const { data: { checkoutLinesUpdate: { checkout: { lines } } }, error } = await useCheckoutLinesUpdateMutation({ checkoutLinesAddToken: checkoutToken, checkoutLinesAddLines: items.map(item => ({ variantId: item.id, quantity: item.qty })) })
        return lines.map(({ variant, quantity }) => ({ id: variant.id, name: variant.name, imgUrl: variant.media[0].url, price: variant.pricing.price.net.amount, qty: quantity }))
    }
)

const fetchTokenCart = async () => {
    const { accountDetails: { accountDetails: { checkoutToken } } } = store.getState()
    const { data: { checkout: { lines } } } = await useCheckoutTokenDetailsQuery({ token: checkoutToken })
    return lines.map(({ variant, quantity }) => ({ id: variant.id, name: variant.name, imgUrl: variant.media[0].url, price: variant.pricing.price.net.amount, qty: quantity }))
}

const createTokenCart = async () => {
    const { demographic: { affiliateId, channel, resellerId }, datePincode: { deliveryDate, pincode } } = store.getState()
    if (deliveryDate && pincode && resellerId) {
        const { data } = await useCheckoutCreateMutaion({ checkoutCreateInput: { lines: [], affiliateId, channel, resellerId, deliveryPincode: pincode, deliveryDate } })
        const { checkoutCreate: { checkout: { token } } } = data
        return token as string
    }
}

async function createToken() {
    const token = await createTokenCart();
    store.dispatch(setCheckoutToken(token));
}

async function initCart() {

    console.log("Initializng cart");
    const { accountDetails: { accountDetails: { checkoutToken } }, cart: { items } } = store.getState()

    // Creating a new token if the token is not present
    if (!checkoutToken) {
        await createToken()
    }

    const tokenItems = await fetchTokenCart()

    // If the local cart is empty, update the local cart else update the token cart with the local cart
    if (!items.length) {

        // Update local cart
        store.dispatch(updateLocalCart(tokenItems));
    }
    else {
        // Update token cart
        store.dispatch(updateTokenCart(items));
    }
}


/**
 * Interface for CartState
 */
interface CartState {
    items: Item[]
    loading: boolean,
    error?: string
}

const initialState: CartState = {
    items: [],
    loading: false
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItemToCart: (state, { payload: item }: PayloadAction<Item>) => {
            const items = state.items.filter(x => x.id !== item.id)
            if (item.qty != 0) {
                items.push(item)
            }
            state.items = items
        },
        updateLocalCart: (state, { payload: items }: PayloadAction<Item[]>) => {
            state.items = items
        }
    },
    extraReducers: ({ addCase }) => {
        addCase(updateTokenCart.fulfilled, (state, { payload }) => {
            state.items = payload
            state.loading = false
        })
        addCase(updateTokenCart.rejected, (state, { error: { message } }) => {
            state.error = message
            state.loading = false

        })
        addCase(updateTokenCart.pending, (state) => {
            state.loading = true
        })
    }

})

export { fetchTokenCart, updateTokenCart, createTokenCart, initCart, }

export const { addItemToCart, updateLocalCart } = cartSlice.actions

export default cartSlice.reducer