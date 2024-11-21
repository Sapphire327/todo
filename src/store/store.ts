import { configureStore } from '@reduxjs/toolkit'
import {registrationApi} from "@/store/features/registration/registration";
import notesReducer from "@/store/features/notes/notesSlice";
import prioritiesSlice from "@/store/features/priorities/prioritiesSlice";
import {notesApi} from "@/store/features/notes/notesApiSlice";

export const makeStore=()=>{
    return configureStore({
        reducer: {
            [registrationApi.reducerPath]: registrationApi.reducer,
            [notesApi.reducerPath]: notesApi.reducer,
            notes:notesReducer,
            priorities:prioritiesSlice
        },
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware().concat(registrationApi.middleware,notesApi.middleware),
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']