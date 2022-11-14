import { createSlice } from '@reduxjs/toolkit'
import mangaApi from '../../../api/mangaApi'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const addChapter = createAsyncThunk(
  'chapterList/addChapter',

  async (data) => {
    const response = await mangaApi.addChapter(data)
    return response
  }
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