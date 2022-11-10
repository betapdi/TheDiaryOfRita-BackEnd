import { createSlice } from '@reduxjs/toolkit'
import mangaApi from '../../../api/mangaApi'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getCategoryList = createAsyncThunk(
  'categoryList/getAll',
  async () => {
    const response = await mangaApi.getAllCategories()
    return response
  }
)

const categoryList = createSlice({
  name: 'categoryList',
  initialState: [],
  reducers: {

  },

  extraReducers: {
    [getCategoryList.fulfilled]: (state, action) => {
      const data = action.payload.map((category) => (
        {value: category.id, label: category.name}
      ))

      return data
    }
  }
})

const { reducer, actions } = categoryList
export const { getAll } = actions
export default reducer