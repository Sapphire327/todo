import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {NotesCreateDto, NotesUpdateDto} from "@/types/dto";

export const notesApi = createApi({
    reducerPath: 'notesApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXTAUTH_SECRET }),
    endpoints: (builder) => ({
        createNote: builder.mutation<void, NotesCreateDto>({
            query:dto=>({
                url:'/api/notes',
                method:'POST',
                body:{...dto},
            })
        }),
        updateNote: builder.mutation<void, NotesUpdateDto>({
            query:dto=>({
                url:'/api/notes',
                method:'PUT',
                body:{...dto},
            })
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {  useCreateNoteMutation,useUpdateNoteMutation} = notesApi