import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import bannerApi from '../api/bannerApi';

export const getBannerList = createAsyncThunk(
  'bannerList/getAllBanners',
  async () => {
    const response = await bannerApi.getAllBanners();
    return response
  }
)

const bannerList = createSlice({
  name: 'bannerList',
  initialState: [],
  reducers: {

  },

  extraReducers: {
    [getBannerList.fulfilled]: (state, action) => {
      const data = action.payload
      return data
    }
  }
})

const { reducer, actions } = bannerList
export const { } = actions
export default reducer