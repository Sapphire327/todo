import {ActionReducerMapBuilder, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Notes, Prisma} from "@prisma/client";
import {RootState} from "@/store/store";
import {NotesDto} from "@/types/dto";

export const notesData = createAsyncThunk(
"data/notes",
async ()=>{
    console.log('thunk')
        const response = await fetch(`/api/notes`)
        const data:NotesDto[] =await response.json()
        return data
    }
)
interface INotesState {
    notes: NotesDto[];
}
const notesSlice = createSlice({
    name: "notes",
    initialState: {
        notes:[]
    } as INotesState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(notesData.fulfilled,(state,action)=>{
            state.notes= action.payload as unknown as NotesDto[]
        })
    }
})
export default notesSlice.reducer;
export const selectNotes = (state:RootState)=>state.notes;