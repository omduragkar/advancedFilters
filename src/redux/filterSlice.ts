import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import data from "../data/mainData.json";
import { Tstate } from "../types/Tcontext";
import { TcolumnStrings } from "../types/Tcolumn";


export const INITIALVALUE= {
    filterData:{
        mod3:[],
        mod4:[],
        mod5:[],
        mod6:[],
    },
    filterOptions:{
        mod3:uniqueValuesFinder('mod3'),
        mod4:uniqueValuesFinder('mod4'),
        mod5:uniqueValuesFinder('mod5'),
        mod6:uniqueValuesFinder('mod6'),
    },
    data:[...data],
    filteredData:[...data],
}
function uniqueValuesFinder(key:("mod3" | "mod4" | "mod5" | "mod6")){
    const values = data.map(elm=>elm[key]?.toString());
    return Array.from(new Set(values));
}
export const filterSlice = createSlice({
    name: 'filters',
    initialState:INITIALVALUE,
    reducers: {
        UPDATE_FILTER: (state:Tstate, action: PayloadAction<{
            key:TcolumnStrings,
            value:String[]
        }>) => {
            state.filterData[action.payload.key] = action.payload.value  
        },
        UPDATE_FILTERED_DATA: (state:Tstate, action: PayloadAction<any>) => {
            console.log({
                ac:action.payload
            })
            state.filteredData = action.payload  
        },
        UPDATE_FILTER_DATA: (state:Tstate, action: PayloadAction<any>) => {
            console.log({
                ac:action.payload
            })
            state.filterOptions = action.payload  
        },
    },
  })

export const { UPDATE_FILTER, UPDATE_FILTERED_DATA, UPDATE_FILTER_DATA } = filterSlice.actions
export const selectFilter = (state:{
    filters:Tstate
}) => state.filters


export default filterSlice.reducer