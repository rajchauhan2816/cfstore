import { configureStore, combineReducers, } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import DatePincodeReducer from "./date-pincode";
import ProductVariantsReducer from "./product-variants";
import AuthReducer from "./auth";
import CategoryReducer from "./category"
import AccountDetailsReducer from "./account-details";
import CollectionReducer from "./collection"
import DemographicReducer from "./demographic"
import CartReducer from './cart'
// import CheckoutReducer from "./checkout"

const reducers = combineReducers({
    auth: AuthReducer,
    datePincode: DatePincodeReducer,
    productVariants: ProductVariantsReducer,
    category: CategoryReducer,
    accountDetails: AccountDetailsReducer,
    collections: CollectionReducer,
    demographic: DemographicReducer,
    cart: CartReducer,
    // checkout: CheckoutReducer

});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);


export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
