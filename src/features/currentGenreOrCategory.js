import { createSlice } from "@reduxjs/toolkit";

export const genreOrCategory = createSlice({
    name:'genreOrCategory',
    initialState:{
        genreIDOrCategoryName:'',
        page:1,
        searchQuery:'',

    },
    reducers:{
        selectGenreOrCategory:(state, action)=>{

            state.genreIDOrCategoryName = action.payload;

            state.searchQuery = '';

            //console.log(action.payload);

            // state.genreOrCategoryName;
        },

        searchMovie:(state, action)=>{
            // console.log(action.payload)
            state.searchQuery = action.payload;
        },

    },



});

export const { selectGenreOrCategory, searchMovie } = genreOrCategory.actions;
export default genreOrCategory.reducer;