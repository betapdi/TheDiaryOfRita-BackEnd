import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import mangaApi from '../../../api/mangaApi'

export const addChapter = createAsyncThunk(
  'chapterList/addChapter',

  async (data) => {
    const response = await mangaApi.addChapter(data)
    return response
  }
)

export const addMultipleChapter = createAsyncThunk(
  // TODO: Waiting 4 backend to write this func 
)

const chapterList = createSlice({
  name: 'chapterList',
  initialState: [],
  reducers: {

  },

  extraReducers: {

  }
})

const { reducer, actions } = chapterList
export const { getAll } = actions
export default reducer