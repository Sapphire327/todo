import { configureStore } from '@reduxjs/toolkit'
import {registrationApi} from "@/store/features/registration/registration";

export const makeStore=()=>{
    return configureStore({
        reducer: {
            [registrationApi.reducerPath]: registrationApi.reducer
        },
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware().concat(registrationApi.middleware),
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']