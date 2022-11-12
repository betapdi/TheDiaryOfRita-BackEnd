import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import mangaApi from '../../../api/mangaApi'

export const addChapter = createAsyncThunk(
  /*
   * TODO: write this silly function
  */
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
    }
  },
})

const { reducer, actions } = mangaList
export const { } = actions
export default reducer