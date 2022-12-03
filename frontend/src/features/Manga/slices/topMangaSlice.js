import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import mangaApi from '../../../api/mangaApi'

export const getTopManga = createAsyncThunk(
  'topManga/getAll',
  async () => {
    try {
      const response = await mangaApi.getTopMangas()
      return response
    }

    catch(error) {
      console.log(error)
    }
  }
)

const topManga = createSlice({
  name: 'topManga',
  initialState: [],
  reducers: {

  },

  extraReducers: {
    [getTopManga.fulfilled]: (state, action) => {
      const data = action.payload
      return data
    }
  }
})

const { reducer, actions } = topManga
export const { } = actions
export default reducer