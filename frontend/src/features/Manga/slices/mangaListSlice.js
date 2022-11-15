import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import mangaApi from '../../../api/mangaApi';

//To Do: Change all createAsyncThunk to try catch function to catch error 

export const getAllManga = createAsyncThunk(
  'mangaList/getAll',
  async () => {
    const response = await mangaApi.getAll();
    return response
  }
)

export const addManga = createAsyncThunk(
  'mangaList/addManga',
  async(formData) => {
    const response = await mangaApi.addManga(formData)
    return response 
  }
)

const mangaList = createSlice({
  name: 'mangaList',
  initialState: [],
  reducers: {
    
  },

  extraReducers: {
    [addManga.fulfilled]: (state, action) => {
      state.push(action.payload)
    },
    
    [getAllManga.fulfilled]: (state, action) => {
      const data = action.payload.map((manga) => (
        {value: manga.id, label: manga.name, cover: manga.cover}
      ))

      return data
    }
  },
})

const { reducer, actions } = mangaList
export const { } = actions
export default reducer