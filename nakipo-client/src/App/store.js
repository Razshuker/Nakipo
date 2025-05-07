import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from "@reduxjs/toolkit/query";
import {authApiSlice} from "../Components/Auth/AuthApiSlice";
import {photoApiSlice} from "../Components/photoApiSlice";
import {ratingApiSlice} from "../Components/Account/ratingApiSlice";
import {brandApiSlice} from "../Components/Account/brandApiSlice";
export const store = configureStore({
    reducer:{
        [authApiSlice.reducerPath]: authApiSlice.reducer,
        [photoApiSlice.reducerPath]: photoApiSlice.reducer,
        [ratingApiSlice.reducerPath]: ratingApiSlice.reducer,
        [brandApiSlice.reducerPath]: brandApiSlice.reducer,
    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware().concat(authApiSlice.middleware, photoApiSlice.middleware,ratingApiSlice.middleware, brandApiSlice.middleware);
    }
})
setupListeners(store.dispatch)

