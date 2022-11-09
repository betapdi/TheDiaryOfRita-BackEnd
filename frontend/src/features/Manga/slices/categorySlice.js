import { createSlice } from '@reduxjs/toolkit'

const categoryList = createSlice({
  name: 'categoryList',
  initialState: [],
  reducers: {
    getAll: (state, action) => {
      
    }
  }
})

const { reducer, actions } = categoryList
export const { getAll } = actions
export default reducer