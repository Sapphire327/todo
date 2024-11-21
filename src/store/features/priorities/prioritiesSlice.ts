import {ActionReducerMapBuilder, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "@/store/store";
import {NotesDto, PriorityDto} from "@/types/dto";

export const priorityData = createAsyncThunk(
"data/priorities",
async ()=>{
        const response = await fetch(`/api/priorities`)
        const data:PriorityDto[] =await response.json()
        return data
    }
)
interface IPriorityState {
    priorities: PriorityDto[];
}
const prioritiesSlice = createSlice({
    name: "priorities",
    initialState: {
        priorities:[]
    } as IPriorityState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(priorityData.fulfilled,(state,action)=>{
            state.priorities = action.payload as unknown as PriorityDto[]
        })
    }
})
export default prioritiesSlice.reducer;
export const selectPriorities = (state:RootState)=>state.priorities;