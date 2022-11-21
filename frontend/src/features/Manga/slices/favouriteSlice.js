import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import mangaApi from '../../../api/mangaApi'

export const getFavouriteList = createAsyncThunk(
  'favouriteList/getAll',
  async () => {
    const response = await mangaApi.getAllFavourites()
    return response
  }
)

const favouriteList = createSlice({
  name: 'favouriteList',
  initialState: [],
  reducers: {

  },

  extraReducers: {
    [getFavouriteList.fulfilled]: (state, action) => {
      const data = action.payload
      return data
    }
  }
})

const { reducer, actions } = favouriteList
export const { } = actions
export default reducer