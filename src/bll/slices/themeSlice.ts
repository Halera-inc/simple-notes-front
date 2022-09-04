import {NoteTextType} from "src/api/notes-api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
   theme:'light'
}
export const themeSlice=createSlice({
    name:'theme',
    initialState,
    reducers:{
       setChangeTheme(state,action: PayloadAction<{changeTheme:string}>){
           state.theme=action.payload.changeTheme
       }
    }
})
export const  {setChangeTheme}=themeSlice.actions
export default themeSlice.reducer
