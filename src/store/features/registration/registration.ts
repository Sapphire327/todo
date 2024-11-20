import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {UserDto} from "@/types/dto";

export const registrationApi = createApi({
    reducerPath: 'registrationApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXTAUTH_SECRET }),
    endpoints: (builder) => ({
        signUp: builder.mutation<void, UserDto>({
            query:dto=>({
                url:'/api/registration',
                method:'POST',
                body:{...dto}
            })
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useSignUpMutation } = registrationApi